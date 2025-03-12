import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import FactionSelection from './pages/faction-selection'
import UnitSelection from './pages/unit-selection'

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<FactionSelection />} />
          <Route path="/units" element={<UnitSelection />} />
        </Routes>
      </Router>
    </div>
  )
}
