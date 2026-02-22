
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const versions: Record<string, string[]> = {
  iphone: ["iOS 26", "iOS 25"],
  android: ["Android 16", "Android 15"],
  windows: ["Windows 11", "Windows 10"],
  macos: ["Sequoia", "Sonoma"],
  linux: ["Ubuntu Linux", "Linux Mint", "Kali Linux"],
  chromeos: ["ChromeOS", "ChromeOS Extended"],
  xbox: ["Xbox Series X", "Xbox Series S"],
  playstation: ["PlayStation 5", "PlayStation 4"]
}

export default function Device() {

  const { deviceId } = useParams<{ deviceId?: string }>()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  useEffect(() => {
    if (deviceId && versions[deviceId]) {
      setList(versions[deviceId])
    } else {
      setList(["Latest"])
    }
  }, [deviceId])

  return (

    <div>

      <section className="h-96 flex items-center justify-center relative overflow-hidden mb-20">

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="video-fade h-96" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center relative z-10"
        >
          <h1 className="text-5xl font-semibold capitalize">
            {deviceId}
          </h1>
        </motion.div>

      </section>

      <div className="max-w-4xl mx-auto py-16 px-6">

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow hover:bg-gray-50"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back Home</span>
        </motion.button>

        <div className="space-y-6">

          {list.map((version: string, index: number) => (

            <motion.div
              key={version}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.15 }}
            >

              <Link to={`/device/${deviceId}/${version}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <p className="text-xl font-medium">{version}</p>
                </div>
              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  )

}
