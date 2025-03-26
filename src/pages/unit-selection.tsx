import { useState } from 'react'
import useWarbandStore from '../store/warband-store'
import { unitsByFaction } from '../data/units'
import UnitEditor from './unit-editor'

export default function UnitSelection() {
  const selectedFaction = useWarbandStore((state) => state.selectedFaction)
  const { warband, totalPoints, removeUnit } = useWarbandStore()
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'selection' | 'roster'>('selection')

  if (!selectedFaction || !(selectedFaction.name in unitsByFaction)) {
    return (
      <p className="text-center text-white mt-10">
        Please select a faction first.
      </p>
    )
  }

  const units = unitsByFaction[selectedFaction.name]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row w-full">
      {/* Mobile View: Toggle Between Unit Selection & Warband */}
      <div className="block md:hidden flex-1 overflow-y-auto pb-16">
        {viewMode === 'selection' ? (
          <div className="p-4">
            {/* Unit Selection Section */}
            <h1 className="text-2xl font-bold mb-4 text-center">
              {selectedFaction.name} - Select a Unit
            </h1>
            <div className="grid grid-cols-1 gap-4">
              {units.map((unit) => (
                <button
                  key={unit.name}
                  onClick={() => setSelectedUnit(unit.name)}
                  className={`w-full p-3 rounded-lg shadow-md transition ${
                    selectedUnit === unit.name
                      ? 'bg-blue-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <h2 className="text-lg font-semibold">{unit.name}</h2>
                  <p className="text-gray-400 text-sm">
                    Cost: {unit.baseCost} pts
                  </p>
                </button>
              ))}
            </div>

            {/* Unit Editor */}
            {selectedUnit ? (
              <div className="mt-6">
                <UnitEditor
                  unitName={selectedUnit}
                  closeEditor={() => setSelectedUnit(null)}
                />
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-4">
                Select a unit to edit.
              </p>
            )}
          </div>
        ) : (
          <div className="p-4">
            {/* Warband Roster Section */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Warband
            </h2>
            <p className="text-lg font-semibold mb-3 text-center">
              Total Warband Cost: {totalPoints} pts
            </p>

            {warband.length > 0 ? (
              <div>
                {warband.map((unit, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-3 rounded-lg shadow-md mb-2 flex flex-col justify-between items-center"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold">{unit.name}</h3>
                      <p className="text-gray-400 text-sm">
                        Cost: {unit.totalCost} pts
                      </p>
                      <p className="text-gray-400 text-sm">
                        Weapon:{' '}
                        {unit.weapons.length > 0
                          ? unit.weapons[0].name
                          : 'None'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Armor:{' '}
                        {unit.armor.length > 0
                          ? unit.armor.map((a) => a.name).join(', ')
                          : 'None'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Skills:{' '}
                        {unit.skills.length > 0
                          ? unit.skills.map((s) => s.name).join(', ')
                          : 'None'}
                      </p>
                    </div>

                    {/* Remove Unit Button */}
                    <button
                      onClick={() => removeUnit(index)}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No units added yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Desktop View: Show Both Sections */}
      <div className="hidden md:flex w-full">
        {/* Left Side: Unit Selection */}
        <div className="w-1/3 p-6 border-r border-gray-700 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">
            {selectedFaction.name} - Select a Unit
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {units.map((unit) => (
              <button
                key={unit.name}
                onClick={() => setSelectedUnit(unit.name)}
                className={`w-full p-3 rounded-lg shadow-md transition ${
                  selectedUnit === unit.name
                    ? 'bg-blue-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <h2 className="text-lg font-semibold">{unit.name}</h2>
                <p className="text-gray-400 text-sm">
                  Cost: {unit.baseCost} pts
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Unit Editor & Warband Roster */}
        <div className="w-2/3 p-6">
          {selectedUnit ? (
            <UnitEditor
              unitName={selectedUnit}
              closeEditor={() => setSelectedUnit(null)}
            />
          ) : (
            <p className="text-center text-gray-400">Select a unit to edit.</p>
          )}

          {/* Warband Roster */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-4">Your Warband</h2>
            <p className="text-lg font-semibold mb-3">
              Total Warband Cost: {totalPoints} pts
            </p>

            {warband.length > 0 ? (
              <div>
                {warband.map((unit, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg shadow-md mb-2 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{unit.name}</h3>
                      <p className="text-gray-400">
                        Cost: {unit.totalCost} pts
                      </p>
                      <p className="text-gray-400">
                        Weapon:{' '}
                        {unit.weapons.length > 0
                          ? unit.weapons[0].name
                          : 'None'}
                      </p>
                      <p className="text-gray-400">
                        Armor:{' '}
                        {unit.armor.length > 0
                          ? unit.armor.map((a) => a.name).join(', ')
                          : 'None'}
                      </p>
                      <p className="text-gray-400">
                        Skills:{' '}
                        {unit.skills.length > 0
                          ? unit.skills.map((s) => s.name).join(', ')
                          : 'None'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeUnit(index)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No units added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-3 flex justify-around text-white text-sm md:hidden border-t border-gray-700">
        <button
          onClick={() => setViewMode('selection')}
          className={`${viewMode === 'selection' ? 'text-blue-400' : ''}`}
        >
          Unit Selection
        </button>
        <button
          onClick={() => setViewMode('roster')}
          className={`${viewMode === 'roster' ? 'text-blue-400' : ''}`}
        >
          Warband Roster
        </button>
      </div>
    </div>
  )
}
