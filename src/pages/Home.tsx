
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef, useEffect } from "react"

const devices = [
  {
    "id": "iphone",
    "name": "iPhone / iPad"
  },
  {
    "id": "android",
    "name": "Android"
  },
  {
    "id": "windows",
    "name": "Windows"
  },
  {
    "id": "macos",
    "name": "Mac"
  },
  {
    "id": "linux",
    "name": "Linux"
  },
  {
    "id": "chromeos",
    "name": "Chromebook"
  },
  {
    "id": "xbox",
    "name": "Xbox"
  },
  {
    "id": "playstation",
    "name": "PlayStation"
  },
  {
    "id": "router",
    "name": "Wi-Fi Router"
  }
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const devicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  const scrollToDevices = (e: React.MouseEvent) => {
    e.preventDefault()
    devicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (

    <div>

      <section className="h-screen flex items-center justify-center relative overflow-hidden">

        {/* <div
          className="parallax"
          style={{
            backgroundImage: "url('/images/hero.mp4')"
          }}
        /> */}


<video
  ref={videoRef}
  className="parallax"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>
<div className="video-fade" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center relative"
        >

          <h1 className="text-6xl font-semibold mb-6">
            Settings Index
          </h1>

          <p className="text-xl opacity-70">
            Every device. Every version. Every setting.
          </p>

        </motion.div>

        <a
          href="#"
          onClick={scrollToDevices}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>

      </section>

      <section ref={devicesRef} id="devices" className="max-w-6xl mx-auto py-32">

        <div className="grid grid-cols-2 gap-10">

          {devices.map((device, index) => (

            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.15 }}
              viewport={{ once: true }}
            >

              <Link to={`/device/${device.id}`}>

                <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">

                  <h2 className="text-2xl font-medium">
                    {device.name}
                  </h2>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </section>

    </div>

  )

}
