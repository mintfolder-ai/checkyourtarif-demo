import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../lib/useReveal'

/**
 * Refined 3D accent for the dark KI band: a faceted core inside an orbiting
 * particle ring. Pointer-reactive, pauses offscreen, static frame under
 * reduced motion. Lazy-loaded so Three.js never touches the critical path.
 */
export function PremiumCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = prefersReducedMotion()
    const w = () => mount.clientWidth
    const h = () => mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w() / h(), 0.1, 100)
    camera.position.set(0, 0, 6)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return // WebGL unavailable on this device: skip the 3D gracefully.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w(), h())
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshStandardMaterial({ color: '#124e39', roughness: 0.3, metalness: 0.85, flatShading: true }),
    )
    group.add(core)

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.55, 1)),
      new THREE.LineBasicMaterial({ color: '#45d6a2', transparent: true, opacity: 0.5 }),
    )
    group.add(wire)

    const COUNT = 700
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 2.4 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particles = new THREE.Points(
      pg,
      new THREE.PointsMaterial({ color: '#ffcf6b', size: 0.035, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0x2e4a3e, 1.4))
    const key = new THREE.PointLight(0x5fd3a8, 55, 100); key.position.set(5, 5, 6); scene.add(key)
    const rim = new THREE.PointLight(0xf0a93a, 35, 100); rim.position.set(-6, -3, 2); scene.add(rim)

    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
    io.observe(mount)
    const onResize = () => { camera.aspect = w() / h(); camera.updateProjectionMatrix(); renderer.setSize(w(), h()) }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf = 0
    const draw = () => {
      const t = clock.getElapsedTime()
      if (reduced) {
        group.rotation.set(0.3, 0.6, 0)
      } else {
        group.rotation.y = t * 0.3
        group.rotation.x = Math.sin(t * 0.3) * 0.15
        particles.rotation.y = -t * 0.07
        group.position.x += (pointer.x * 0.4 - group.position.x) * 0.05
        group.position.y += (-pointer.y * 0.4 - group.position.y) * 0.05
      }
      renderer.render(scene, camera)
    }
    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop) }
    if (reduced) draw(); else loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      io.disconnect()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="kiband__canvas" aria-hidden="true" />
}
