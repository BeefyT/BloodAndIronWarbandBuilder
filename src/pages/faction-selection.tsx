import { useNavigate } from 'react-router-dom'
import { Faction, factions } from '../data/factions'
import useWarbandStore, { WarbandState } from '../store/warband-store'

export default function FactionSelection() {
  const navigate = useNavigate()
  const setFaction = useWarbandStore((state: WarbandState) => state.setFaction)

  const selectFaction = (faction: Faction) => {
    setFaction(faction)
    navigate('/units') // Navigate to the unit selection page
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">Select Your Faction</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {factions.map((faction, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer transition"
            onClick={() => selectFaction(faction)}
          >
            <img
              src={faction.image}
              alt={faction.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold">{faction.name}</h2>
            <p className="text-gray-400 mt-2">{faction.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
