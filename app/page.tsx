"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function ParticleField() {
  const mesh = useRef<THREE.Points>(null)

  const count = 400
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.04
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#10b981"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--portfolio-bg)]/50 to-[var(--portfolio-bg)] z-10 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-20 min-h-screen flex items-center justify-center py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[var(--portfolio-accent)]/10 text-[var(--portfolio-accent)] border-[var(--portfolio-border)] px-4 py-1.5 text-sm font-medium">
                Available for opportunities
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Mohit Sai <br />
              <span className="text-[var(--portfolio-accent)]">Sekharamahanthi</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[var(--portfolio-muted)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Data Scientist & ML Engineer <br />
              <span className="text-lg">
                Previously at <span className="text-[var(--portfolio-text)] font-medium">Capgemini</span> • MSc Data Science • Right to work in UK
              </span>
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center md:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/projects" className="group/btn">
                <Button
                  className="bg-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent-muted)] text-[var(--portfolio-bg)] text-lg px-8 py-6 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[var(--portfolio-accent)]/20"
                  size="lg"
                >
                  View Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative order-1 md:order-2 flex justify-center group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-300 ease-out group-hover:scale-105">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-25"
                style={{ backgroundColor: "var(--portfolio-accent)" }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[var(--portfolio-border)] group-hover:border-[var(--portfolio-border-hover)] transition-all duration-300">
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
        </div>
      </div>
    </main>
  )
}
