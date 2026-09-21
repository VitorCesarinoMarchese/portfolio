import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Object3D } from 'three'
import type { Group, InstancedMesh, Mesh } from 'three'

interface PlasmaWallpaperProps {
  animated?: boolean
  phase: 'day' | 'night'
  cycleProgress: number
  onReady?: () => void
  onError?: () => void
}

interface TreeConfig {
  position: [number, number, number]
  trunkHeight: number
  trunkRadius: number
  canopyHeight: number
  canopyRadius: number
  rotationY: number
  swaySpeed: number
  swayAmount: number
}

const pseudoRandom = (seed: number): number => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const checkWebglSupport = (): boolean => {
  if (typeof document === 'undefined') {
    return true
  }

  const canvas = document.createElement('canvas')
  return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const didNotifyRef = useRef(false)

  useFrame(() => {
    if (didNotifyRef.current) {
      return
    }

    didNotifyRef.current = true
    onReady?.()
  })

  return null
}

function DistantForest({ phase }: { phase: 'day' | 'night' }) {
  const forestRef = useRef<InstancedMesh>(null)
  const trees = useMemo(
    () => Array.from({ length: 120 }, (_, index) => {
      const lane = Math.floor(index / 15)
      const column = index % 15
      return {
        x: (column - 7) * 4.5 + (lane % 2 === 0 ? 1.4 : -1.4) + (pseudoRandom(index + 12.4) - 0.5) * 1.6,
        z: -18 - lane * 3.2 - pseudoRandom(index + 14.2) * 1.8,
        height: 4.2 + pseudoRandom(index + 16.8) * 2.8,
        radius: 1.35 + pseudoRandom(index + 18.1) * 0.9,
        rotation: pseudoRandom(index + 20.6) * Math.PI,
      }
    }),
    [],
  )

  useLayoutEffect(() => {
    const forest = forestRef.current
    if (!forest) return
    const tree = new Object3D()

    trees.forEach((config, index) => {
      tree.position.set(config.x, -2.7 + config.height * 0.5, config.z)
      tree.rotation.set(0, config.rotation, 0)
      tree.scale.set(config.radius, config.height, config.radius)
      tree.updateMatrix()
      forest.setMatrixAt(index, tree.matrix)
    })
    forest.instanceMatrix.needsUpdate = true
  }, [trees])

  return (
    <instancedMesh ref={forestRef} args={[undefined, undefined, trees.length]} frustumCulled={false}>
      <coneGeometry args={[1, 1, 5]} />
      <meshStandardMaterial
        color={phase === 'day' ? '#46543B' : '#2D4034'}
        emissive={phase === 'day' ? '#46543B' : '#182923'}
        emissiveIntensity={phase === 'day' ? 0.1 : 0.34}
        flatShading
        roughness={1}
      />
    </instancedMesh>
  )
}

function PineForest({ animated, phase }: { animated: boolean; phase: 'day' | 'night' }) {
  const treeRefs = useRef<Array<Group | null>>([])

  const trees = useMemo<TreeConfig[]>(
    () =>
      Array.from({ length: 99 }, (_, index) => {
        const lane = Math.floor(index / 11)
        const column = index % 11
        const jitter = pseudoRandom(index + 0.33)

        const x = (column - 5) * 2.85 + (lane % 2 === 0 ? 0.72 : -0.72) + (jitter - 0.5) * 0.72
        const y = -2.78
        const z = -1.8 - lane * 2.15 - pseudoRandom(index + 0.81) * 0.8

        const canopyScale = 0.82 + pseudoRandom(index + 1.15) * 1.02
        const canopyHeight = 2.5 + pseudoRandom(index + 2.11) * 2.05

        return {
          position: [x, y, z],
          trunkHeight: 0.42 + pseudoRandom(index + 2.91) * 0.35,
          trunkRadius: 0.08 + pseudoRandom(index + 3.27) * 0.06,
          canopyHeight,
          canopyRadius: canopyScale,
          rotationY: pseudoRandom(index + 4.02) * Math.PI,
          swaySpeed: 0.16 + pseudoRandom(index + 6.04) * 0.12,
          swayAmount: 0.02 + pseudoRandom(index + 6.88) * 0.018,
        }
      }),
    [],
  )

  useFrame((state) => {
    if (!animated) return
    const elapsed = state.clock.elapsedTime

    treeRefs.current.forEach((tree, index) => {
      if (!tree) {
        return
      }

      const config = trees[index]
      const swayBase = elapsed * config.swaySpeed + index * 0.41

      tree.position.y = config.position[1]
      tree.rotation.z = Math.sin(swayBase) * config.swayAmount
      tree.rotation.y = config.rotationY + Math.sin(elapsed * 0.07 + index) * 0.012
    })
  })

  const lowerCanopyColors = phase === 'day'
    ? ['#2D4034', '#46543B', '#46543B']
    : ['#2D4034', '#46543B', '#2D4034']
  const upperCanopyColors = phase === 'day'
    ? ['#66704C', '#89906B', '#66704C']
    : ['#46543B', '#66704C', '#46543B']

  return (
    <group>
      <mesh position={[0, -2.75, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={phase === 'day' ? '#526442' : '#17251f'} metalness={0.03} roughness={1} />
      </mesh>

      <DistantForest phase={phase} />

      {trees.map((config, index) => (
        <group
          key={index}
          ref={(node) => {
            treeRefs.current[index] = node
          }}
          position={config.position}
          rotation={[0, config.rotationY, 0]}
        >
          <mesh position={[0, config.trunkHeight * 0.5, 0]}>
            <cylinderGeometry args={[config.trunkRadius * 0.7, config.trunkRadius, config.trunkHeight, 6]} />
            <meshStandardMaterial color={phase === 'day' ? '#493627' : '#201b18'} roughness={0.92} metalness={0.02} />
          </mesh>

          <mesh position={[0, config.trunkHeight + config.canopyHeight * 0.45, 0]}>
            <coneGeometry args={[config.canopyRadius, config.canopyHeight, 6]} />
            <meshStandardMaterial
              color={lowerCanopyColors[index % lowerCanopyColors.length]}
              emissive={lowerCanopyColors[index % lowerCanopyColors.length]}
              emissiveIntensity={phase === 'day' ? 0.16 : 0.42}
              flatShading
              roughness={0.86}
              metalness={0.08}
            />
          </mesh>

          <mesh position={[0, config.trunkHeight + config.canopyHeight * 0.78, 0]}>
            <coneGeometry args={[config.canopyRadius * 0.72, config.canopyHeight * 0.72, 6]} />
            <meshStandardMaterial
              color={upperCanopyColors[index % upperCanopyColors.length]}
              emissive={upperCanopyColors[index % upperCanopyColors.length]}
              emissiveIntensity={phase === 'day' ? 0.14 : 0.38}
              flatShading
              roughness={0.84}
              metalness={0.08}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CelestialBody({ animated, phase, progress }: { animated: boolean; phase: 'day' | 'night'; progress: number }) {
  const bodyRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!animated) return
    const body = bodyRef.current
    if (!body) {
      return
    }

    body.rotation.y += 0.0009
  })

  const x = -8 + progress * 16
  const y = 2.8 + Math.sin(progress * Math.PI) * 3.3

  return (
    <mesh ref={bodyRef} position={[x, y, -13.2]}>
      <icosahedronGeometry args={[0.92, 1]} />
      <meshStandardMaterial
        color={phase === 'day' ? '#ffe7a1' : '#e9edf0'}
        emissive={phase === 'day' ? '#f6b94b' : '#9cb5cb'}
        emissiveIntensity={phase === 'day' ? 0.82 : 0.34}
        flatShading
        roughness={0.62}
        metalness={0.14}
      />
    </mesh>
  )
}

export function PlasmaWallpaper({ onReady, onError, phase, cycleProgress, animated = true }: PlasmaWallpaperProps) {
  const webglSupported = useMemo(() => checkWebglSupport(), [])

  useEffect(() => {
    if (!webglSupported) {
      onError?.()
    }
  }, [onError, webglSupported])

  if (!webglSupported) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
      <Canvas camera={{ position: [0, 2.2, 8], fov: 54 }} dpr={[1, 1.5]} frameloop={animated ? 'always' : 'demand'}>
        <color attach="background" args={[phase === 'day' ? '#78b7dc' : '#071521']} />
        <fog attach="fog" args={[phase === 'day' ? '#9cc8dc' : '#071521', 8, 34]} />
        <ambientLight intensity={phase === 'day' ? 0.62 : 0.18} />
        <hemisphereLight color={phase === 'day' ? '#d8eff8' : '#4f7190'} groundColor={phase === 'day' ? '#526442' : '#101d19'} intensity={phase === 'day' ? 1.05 : 0.4} />
        <directionalLight position={[4, 8, 7]} color={phase === 'day' ? '#fff0bf' : '#9cb5cb'} intensity={phase === 'day' ? 1.35 : 0.52} />
        <pointLight position={[-7 + cycleProgress * 14, 4.5, -4]} color={phase === 'day' ? '#ffd36f' : '#8aa9c2'} intensity={phase === 'day' ? 1.4 : 0.62} />
        <PineForest animated={animated} phase={phase} />
        <CelestialBody animated={animated} phase={phase} progress={cycleProgress} />
        <ReadySignal onReady={onReady} />
      </Canvas>
    </div>
  )
}
