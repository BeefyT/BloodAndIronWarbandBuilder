import useWarbandStore from '../store/warband-store'
import { useNavigate } from 'react-router-dom'

export default function WarbandRoster() {
  const { warband, totalPoints, removeUnit } = useWarbandStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">Your Warband</h1>

      {/* Show total warband cost */}
      <p className="text-xl font-semibold mb-4">
        Total Warband Cost: {totalPoints} pts
      </p>

      {/* Display list of added units */}
      {warband.length > 0 ? (
        <div className="w-full max-w-3xl">
          {warband.map((unit, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">{unit.name}</h2>
                <p className="text-gray-400">Cost: {unit.totalCost} pts</p>
                <p className="text-gray-400">
                  Weapon: {unit.weapons.length > 0 ? unit.weapons[0] : 'None'}
                </p>
                <p className="text-gray-400">
                  Armor:{' '}
                  {unit.equipment.length > 0
                    ? unit.equipment.join(', ')
                    : 'None'}
                </p>
                <p className="text-gray-400">
                  Skills:{' '}
                  {unit.skills.length > 0 ? unit.skills.join(', ') : 'None'}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeUnit(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No units added yet.</p>
      )}

      {/* Buttons for navigation */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/units')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold mr-4"
        >
          Add More Units
        </button>
      </div>
    </div>
  )
}
