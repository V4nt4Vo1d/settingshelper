
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface Setting {
  name: string
  icon: string
  subsettings: string[]
}

const commonSettings: Setting[] = [
  {
    name: "Display",
    icon: "🖥️",
    subsettings: ["Brightness", "Color Temperature", "Resolution", "Refresh Rate", "Night Light"]
  },
  {
    name: "Sound",
    icon: "🔊",
    subsettings: ["Volume", "Notifications", "System Sounds", "Vibration", "Audio Output"]
  },
  {
    name: "Network",
    icon: "🌐",
    subsettings: ["WiFi", "Bluetooth", "Ethernet", "VPN", "Mobile Data"]
  },
  {
    name: "Battery",
    icon: "🔋",
    subsettings: ["Battery Level", "Power Mode", "Battery Health", "Usage Stats", "Charging"]
  },
  {
    name: "Storage",
    icon: "💾",
    subsettings: ["Used Space", "Available Space", "App Storage", "Photos", "Downloads"]
  },
  {
    name: "Accessibility",
    icon: "♿",
    subsettings: ["Screen Reader", "Magnifier", "Captions", "Font Size", "High Contrast"]
  },
  {
    name: "Privacy",
    icon: "🔒",
    subsettings: ["Location", "Camera", "Microphone", "Contacts", "Photos"]
  },
  {
    name: "About",
    icon: "ℹ️",
    subsettings: ["Device Name", "OS Version", "Build Number", "Serial Number", "System Updates"]
  }
]

export default function Version() {

  const { deviceId, versionId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [expandedSettings, setExpandedSettings] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  const toggleSetting = (settingName: string) => {
    const newExpanded = new Set(expandedSettings)
    if (newExpanded.has(settingName)) {
      newExpanded.delete(settingName)
    } else {
      newExpanded.add(settingName)
    }
    setExpandedSettings(newExpanded)
  }

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
          <h1 className="text-5xl font-semibold">
            {deviceId} — {versionId}
          </h1>
        </motion.div>

      </section>

      <div className="max-w-3xl mx-auto py-16 px-6">

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow hover:bg-gray-50"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white p-10 rounded-2xl shadow-lg mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6">Settings</h2>
          <div className="space-y-3">
            {commonSettings.map((setting, index) => {
              const isExpanded = expandedSettings.has(setting.name)
              return (
                <motion.div
                  key={setting.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleSetting(setting.name)}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{setting.icon}</span>
                      <span className="font-medium text-gray-700">{setting.name}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl"
                    >
                      ▼
                    </motion.span>
                  </button>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-4 py-3 space-y-2">
                      {setting.subsettings.map((subsetting, subIndex) => (
                        <motion.div
                          key={subsetting}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.05 }}
                          className="p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                        >
                          <span className="text-sm font-medium text-gray-600">• {subsetting}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>

    </div>

  )

}
