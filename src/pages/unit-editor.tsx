import { useState } from 'react'
import useWarbandStore from '../store/warband-store'
import { unitsByFaction } from '../data/units'
import { weapons } from '../data/weapons'
import { armorList } from '../data/armor'
import { skills } from '../data/skills'
import { equipmentList } from '../data/equipment'

interface UnitEditorProps {
  unitName: string
  closeEditor: () => void
}

export default function UnitEditor({ unitName, closeEditor }: UnitEditorProps) {
  const { selectedFaction, addUnit } = useWarbandStore()
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null)
  const [selectedArmor, setSelectedArmor] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  if (!selectedFaction || !(selectedFaction.name in unitsByFaction)) {
    return (
      <p className="text-center text-white mt-10">Please select a faction.</p>
    )
  }

  const unit = unitsByFaction[selectedFaction.name].find(
    (u) => u.name === unitName
  )
  if (!unit)
    return <p className="text-center text-white mt-10">Unit not found.</p>

  // Get unit's allowed tags
  const allowedTags = unit.tags || []

  // Filter weapons, armor, and skills based on unit tags
  const filteredWeapons = weapons.filter((weapon) =>
    weapon.allowedTags.some((tag) => allowedTags.includes(tag))
  )
  const filteredArmor = armorList.filter((armor) =>
    armor.allowedTags.some((tag) => allowedTags.includes(tag))
  )
  const filteredSkills = skills.filter((skill) =>
    skill.allowedTags.some((tag) => allowedTags.includes(tag))
  )
  const filteredEquipment = equipmentList.filter((equipment) =>
    equipment.allowedTags.some((tag) => allowedTags.includes(tag))
  )
  const totalCost =
    unit.baseCost +
    (selectedWeapon ? 5 : 0) +
    (selectedArmor ? 5 : 0) +
    selectedEquipment.length * 3 +
    selectedSkills.length * 4

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const saveUnit = () => {
    const newUnit = {
      ...unit,
      equipment: selectedEquipment,
      weapons: selectedWeapon ? [selectedWeapon] : [],
      skills: selectedSkills,
      totalCost,
    }

    addUnit(newUnit)
    closeEditor()
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Editing: {unit.name}</h1>

      <h2 className="text-xl mt-4">Customize Loadout</h2>

      {/* Weapon Selection */}
      <h3 className="text-lg mt-3">Weapon (Pick One)</h3>
      <div className="flex gap-2">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map((weapon) => (
            <div
              key={weapon.name}
              onClick={() =>
                setSelectedWeapon(
                  selectedWeapon === weapon.name ? null : weapon.name
                )
              }
              className={`px-4 py-2 rounded border-2 transition ${
                selectedWeapon === weapon.name
                  ? 'bg-blue-700 border-blue-300 text-white font-bold shadow-md'
                  : 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
              }`}
            >
              {weapon.name}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No valid weapons</p>
        )}
      </div>

      {/* Armor Selection */}
      <h3 className="text-lg mt-3">Armor (Pick One)</h3>
      <div className="flex gap-2">
        {filteredArmor.length > 0 ? (
          filteredArmor.map((armor) => (
            <div
              key={armor.name}
              onClick={() =>
                setSelectedArmor(
                  selectedArmor === armor.name ? null : armor.name
                )
              }
              className={`px-4 py-2 rounded border-2 transition ${
                selectedArmor === armor.name
                  ? 'bg-green-700 border-green-300 text-white font-bold shadow-md'
                  : 'bg-green-600 hover:bg-green-700 border-transparent text-white'
              }`}
            >
              {armor.name}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No valid armor</p>
        )}
      </div>

      {/* Equipment Selection */}
      <h3 className="text-lg mt-3">Equipment (Pick Any)</h3>
      <div className="flex gap-2 flex-wrap">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((equipment) => (
            <div
              key={equipment.name}
              onClick={() =>
                toggleSelection(
                  equipment.name,
                  selectedEquipment,
                  setSelectedEquipment
                )
              }
              className={`px-4 py-2 rounded border-2 transition ${
                selectedEquipment.includes(equipment.name)
                  ? 'bg-yellow-700 border-yellow-300 text-white font-bold shadow-md'
                  : 'bg-yellow-600 hover:bg-yellow-700 border-transparent text-white'
              }`}
            >
              {equipment.name}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No valid equipment</p>
        )}
      </div>

      {/* Skills Selection */}
      <h3 className="text-lg mt-3">Skills (Pick Any)</h3>
      <div className="flex gap-2 flex-wrap">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onClick={() =>
                toggleSelection(skill.name, selectedSkills, setSelectedSkills)
              }
              className={`px-4 py-2 rounded border-2 transition ${
                selectedSkills.includes(skill.name)
                  ? 'bg-red-700 border-red-300 text-white font-bold shadow-md'
                  : 'bg-red-600 hover:bg-red-700 border-transparent text-white'
              }`}
            >
              {skill.name}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No valid skills</p>
        )}
      </div>

      {/* Save & Close Button */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={saveUnit}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
        >
          Save Unit
        </button>
        <button
          onClick={closeEditor}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
