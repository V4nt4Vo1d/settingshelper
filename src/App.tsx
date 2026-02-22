
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Device from "./pages/Device"
import Version from "./pages/Version"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/device/:deviceId" element={<Device />} />
      <Route path="/device/:deviceId/:versionId" element={<Version />} />
    </Routes>
  )
}
