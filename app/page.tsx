"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useCallback } from "react"
import * as THREE from "three"

const ATTRACTION_RADIUS = 1.8
const GRAVITATION_STRENGTH = 0.15
const BRIGHTNESS_RADIUS = 1.5
const GHOST_RADIUS = 1.2
const GHOST_NEIGHBORS = 4
const LERP_SPEED = 0.08
const GHOST_FADE_SPEED = 0.12

function NeuralNetworkBackground({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const ghostLinesRef = useRef<THREE.LineSegments>(null)
  const ghostOpacityRef = useRef(0)
  const ghostPositionsRef = useRef<Float32Array | null>(null)

  const { baseNodePositions, baseLinePositions, nodeCount } = useMemo(() => {
    const layers = [4, 6, 5, 4]
    const layerSpacing = 1.2
    const nodeSpacing = 1.2
    const nodes: [number, number, number][] = []
    let x = -((layers.length - 1) * layerSpacing) / 2
    for (const count of layers) {
      const yOffset = ((count - 1) * nodeSpacing) / 2
      for (let i = 0; i < count; i++) {
        nodes.push([x, yOffset - i * nodeSpacing, (Math.random() - 0.5) * 0.3])
      }
      x += layerSpacing
    }

    const lines: number[] = []
    for (let l = 0; l < layers.length - 1; l++) {
      const start = layers.slice(0, l).reduce((a, b) => a + b, 0)
      const end = start + layers[l]
      const nextEnd = end + layers[l + 1]
      for (let i = start; i < end; i++) {
        for (let j = end; j < nextEnd; j++) {
          lines.push(
            nodes[i][0],
            nodes[i][1],
            nodes[i][2],
            nodes[j][0],
            nodes[j][1],
            nodes[j][2]
          )
        }
      }
    }

    return {
      baseNodePositions: new Float32Array(nodes.flat()),
      baseLinePositions: new Float32Array(lines),
      nodeCount: nodes.length,
    }
  }, [])

  const displacedPositions = useMemo(() => {
    const arr = new Float32Array(baseNodePositions.length)
    arr.set(baseNodePositions)
    return arr
  }, [baseNodePositions])
  const ambientBrightnessRef = useRef(0.5)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.12
    if (groupRef.current) groupRef.current.rotation.y = t

    const { camera } = state
    const ptr = pointerRef.current
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(ptr.x, ptr.y)
    raycaster.setFromCamera(mouse, camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
    const intersect = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, intersect)

    const group = groupRef.current
    if (!group) return
    const worldToLocal = new THREE.Matrix4().copy(group.matrixWorld).invert()
    const mouseLocal = intersect.applyMatrix4(worldToLocal)

    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3
      const bx = baseNodePositions[ix]
      const by = baseNodePositions[ix + 1]
      const bz = baseNodePositions[ix + 2]
      const dx = mouseLocal.x - bx
      const dy = mouseLocal.y - by
      const dz = mouseLocal.z - bz
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      let ox = bx
      let oy = by
      let oz = bz
      if (dist < ATTRACTION_RADIUS && dist > 0.001) {
        const pull = (1 - dist / ATTRACTION_RADIUS) * GRAVITATION_STRENGTH
        const frac = (pull * LERP_SPEED) / dist
        ox = bx + dx * frac
        oy = by + dy * frac
        oz = bz + dz * frac
      }

      const prev = displacedPositions[ix]
      displacedPositions[ix] = prev + (ox - prev) * LERP_SPEED
      displacedPositions[ix + 1] =
        displacedPositions[ix + 1] + (oy - displacedPositions[ix + 1]) * LERP_SPEED
      displacedPositions[ix + 2] =
        displacedPositions[ix + 2] + (oz - displacedPositions[ix + 2]) * LERP_SPEED

    }

    const posAttr = pointsRef.current?.geometry.attributes.position
    if (posAttr) {
      posAttr.array.set(displacedPositions)
      posAttr.needsUpdate = true
    }

    let maxBrightness = 0.5
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3
      const d =
        (mouseLocal.x - displacedPositions[ix]) ** 2 +
        (mouseLocal.y - displacedPositions[ix + 1]) ** 2 +
        (mouseLocal.z - displacedPositions[ix + 2]) ** 2
      if (d < BRIGHTNESS_RADIUS * BRIGHTNESS_RADIUS) {
        const b = 0.5 + 0.5 * (1 - Math.sqrt(d) / BRIGHTNESS_RADIUS)
        if (b > maxBrightness) maxBrightness = b
      }
    }
    ambientBrightnessRef.current +=
      (maxBrightness - ambientBrightnessRef.current) * LERP_SPEED
    const pointsMat = pointsRef.current?.material as THREE.PointsMaterial
    if (pointsMat) pointsMat.opacity = ambientBrightnessRef.current

    const indicesWithDist: { i: number; d: number }[] = []
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3
      const d =
        (mouseLocal.x - displacedPositions[ix]) ** 2 +
        (mouseLocal.y - displacedPositions[ix + 1]) ** 2 +
        (mouseLocal.z - displacedPositions[ix + 2]) ** 2
      if (d < GHOST_RADIUS * GHOST_RADIUS) indicesWithDist.push({ i, d: Math.sqrt(d) })
    }
    indicesWithDist.sort((a, b) => a.d - b.d)
    const nearest = indicesWithDist.slice(0, GHOST_NEIGHBORS)

    const hasGhosts = nearest.length > 0
    const targetGhostOpacity = hasGhosts ? 0.35 : 0
    ghostOpacityRef.current +=
      (targetGhostOpacity - ghostOpacityRef.current) * GHOST_FADE_SPEED

    if (!ghostPositionsRef.current)
      ghostPositionsRef.current = new Float32Array(GHOST_NEIGHBORS * 6)
    const gp = ghostPositionsRef.current
    for (let k = 0; k < GHOST_NEIGHBORS; k++) {
      const base = k * 6
      if (k < nearest.length) {
        const idx = nearest[k].i
        gp[base] = mouseLocal.x
        gp[base + 1] = mouseLocal.y
        gp[base + 2] = mouseLocal.z
        gp[base + 3] = displacedPositions[idx * 3]
        gp[base + 4] = displacedPositions[idx * 3 + 1]
        gp[base + 5] = displacedPositions[idx * 3 + 2]
      } else {
        gp[base] = gp[base + 1] = gp[base + 2] = 0
        gp[base + 3] = gp[base + 4] = gp[base + 5] = 0
      }
    }

    const ghostGeo = ghostLinesRef.current?.geometry
    if (ghostGeo && ghostPositionsRef.current) {
      ;(ghostGeo.attributes.position as THREE.BufferAttribute).array.set(
        ghostPositionsRef.current
      )
      ;(ghostGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
    const ghostMat = ghostLinesRef.current?.material as THREE.LineBasicMaterial
    if (ghostMat) ghostMat.opacity = ghostOpacityRef.current
  })

  const ghostLinePositions = useMemo(
    () => new Float32Array(GHOST_NEIGHBORS * 6),
    []
  )

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[baseLinePositions as Float32Array, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10b981" transparent opacity={0.15} />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[baseNodePositions as Float32Array, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#10b981"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={ghostLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ghostLinePositions as Float32Array, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10b981" transparent opacity={0} />
      </lineSegments>
    </group>
  )
}

export default function Home() {
  const pointerRef = useRef({ x: -10, y: -10 })

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    pointerRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }, [])

  return (
    <main
      className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] relative overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <NeuralNetworkBackground pointerRef={pointerRef} />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--portfolio-bg)]/40 to-[var(--portfolio-bg)] z-10 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-20 min-h-screen flex items-center justify-center py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-center md:text-left order-2 md:order-1 w-full md:flex md:flex-col md:items-start">
            <motion.h1
              className="hero-name text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Mohit Sai Sekharamahanthi
            </motion.h1>

            <motion.div
              className="space-y-2 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl font-medium text-[var(--portfolio-muted)] leading-snug max-w-lg">
                I build ML systems that turn messy data into business decisions.
              </p>
              <p className="text-sm text-[var(--portfolio-muted)]/80">
                Ex-Capgemini • MSc Data Science
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-4 w-full md:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/projects"
                className="cta-pop group/btn inline-flex items-center"
              >
                <Button
                  className="h-14 min-h-14 bg-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent-muted)] text-[var(--portfolio-bg)] text-base px-8 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[var(--portfolio-accent)]/20"
                  size="lg"
                >
                  <span className="flex items-center">
                    View Projects
                    <ArrowRight className="ml-2 w-4 h-4 shrink-0 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </Link>
              <Link
                href="/resume.pdf"
                download
                className="cta-pop inline-flex items-center"
              >
                <Button
                  variant="outline"
                  className="h-14 min-h-14 border-[var(--portfolio-border)] text-[var(--portfolio-text)] hover:bg-[var(--portfolio-accent)]/10 hover:border-[var(--portfolio-accent)]/30 text-base px-6 transition-all duration-200"
                  size="lg"
                >
                  <span className="flex items-center">
                    <Download className="mr-2 w-4 h-4 shrink-0" />
                    Download CV
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative order-1 md:order-2 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-56 h-56 md:w-80 md:h-80 transition-transform duration-300 ease-out group-hover:scale-105">
                <div
                  className="absolute inset-0 rounded-full overflow-hidden border-[1px] border-[var(--portfolio-border)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:border-[var(--portfolio-border-hover)] transition-all duration-300"
                  style={{
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Mohit Sai Sekharamahanthi"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </motion.div>
            <Link
              href="/contact"
              className="cta-pop inline-flex items-center"
            >
              <Button
                variant="ghost"
                className="h-14 min-h-14 text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)]/5 text-base px-6 transition-all duration-200"
                size="lg"
              >
                <span className="flex items-center">
                  <MessageCircle className="mr-2 w-4 h-4 shrink-0" />
                  Let&apos;s Talk
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
