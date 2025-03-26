import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import FactionSelection from './pages_v2/faction-select'
import WarbandCreator from './pages_v2/warband-creator'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="w-screen min-h-screen overflow-hidden bg-gray-900">
      <Toaster richColors position='top-right'  />
      <Router>
        <Routes>
          <Route path="/" element={<FactionSelection />} />
          <Route path="/creator" element={<WarbandCreator />} />
          {/* <Route path="/units" element={<UnitSelection />} /> */}
        </Routes>
      </Router>
      
    </div>
  )
}




