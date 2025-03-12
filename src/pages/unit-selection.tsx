import { useState } from 'react'
import useWarbandStore from '../store/warband-store'
import { unitsByFaction } from '../data/units'
import UnitEditor from './unit-editor'

export default function UnitSelection() {
  const selectedFaction = useWarbandStore((state) => state.selectedFaction)
  const { warband, totalPoints, removeUnit } = useWarbandStore()
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)

  if (!selectedFaction || !(selectedFaction.name in unitsByFaction)) {
    return (
      <p className="text-center text-white mt-10">
        Please select a faction first.
      </p>
    )
  }

  const units = unitsByFaction[selectedFaction.name]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex w-full">
      {/* Left Side: Unit List */}
      <div className="w-1/3 p-6 border-r border-gray-700 h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          {selectedFaction.name} - Select a Unit
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {units.map((unit) => (
            <button
              key={unit.name}
              onClick={() => setSelectedUnit(unit.name)}
              className={`w-full p-4 rounded-lg shadow-md transition ${
                selectedUnit === unit.name
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <h2 className="text-xl font-semibold">{unit.name}</h2>
              <p className="text-gray-400">Cost: {unit.baseCost} pts</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Unit Editor & Warband Roster */}
      <div className="w-2/3 p-6 h-screen overflow-y-auto">
        {selectedUnit ? (
          <UnitEditor
            unitName={selectedUnit}
            closeEditor={() => setSelectedUnit(null)}
          />
        ) : (
          <p className="text-center text-gray-400">Select a unit to edit.</p>
        )}
      </div>
      {/* Warband Roster Section */}
      <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Your Warband</h2>
        <p className="text-xl font-semibold mb-4">
          Total Warband Cost: {totalPoints} pts
        </p>

        {warband.length > 0 ? (
          <div>
            {warband.map((unit, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-md mb-3 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{unit.name}</h3>
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

                {/* Remove Unit Button */}
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
      </div>
    </div>
  )
}
