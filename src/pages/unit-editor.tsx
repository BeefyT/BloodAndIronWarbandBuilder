import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useWarbandStore from '../store/warband-store'
import { unitsByFaction } from '../data/units'
import { getWeaponCost, weapons } from '../data/weapons'
import { armorList } from '../data/armor'
import { skills } from '../data/skills'
import { equipmentList } from '../data/equipment'
import { weaponKeywords } from '../data/weapon-tags'

interface UnitEditorProps {
 unitName: string
 closeEditor: () => void
}

function KeywordTooltip({ keyword }: { keyword: string }) {
 const [showTooltip, setShowTooltip] = useState(false)
 const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
 const containerRef = useRef<HTMLSpanElement>(null)
 const tooltipRef = useRef<HTMLDivElement>(null)

 const updateTooltipPosition = () => {
  if (containerRef.current && tooltipRef.current) {
   const triggerRect = containerRef.current.getBoundingClientRect()
   const tooltipRect = tooltipRef.current.getBoundingClientRect()
   const isMobile = window.innerWidth <= 480

   if (isMobile) {
    // On mobile, position the tooltip in a fixed position at the bottom of the viewport
    const top = window.innerHeight - tooltipRect.height - 16 // 16px from bottom
    const left = Math.max(
     8,
     Math.min(
      window.innerWidth - tooltipRect.width - 8,
      window.innerWidth / 2 - tooltipRect.width / 2
     )
    )

    setTooltipPosition({ top, left })
   } else {
    // Desktop positioning - above the trigger
    let top = triggerRect.top + window.scrollY - 8
    let left = triggerRect.left + triggerRect.width / 2

    // Ensure tooltip doesn't go off-screen horizontally
    if (left + tooltipRect.width / 2 > window.innerWidth) {
     left = window.innerWidth - tooltipRect.width - 10
    } else if (left - tooltipRect.width / 2 < 0) {
     left = tooltipRect.width / 2 + 10
    }

    // If tooltip would go above viewport, position it below the trigger
    if (top - tooltipRect.height < window.scrollY) {
     top = triggerRect.bottom + window.scrollY + 8
    }

    setTooltipPosition({ top, left })
   }
  }
 }

 useEffect(() => {
  if (showTooltip) {
   updateTooltipPosition()
   window.addEventListener('scroll', updateTooltipPosition)
   window.addEventListener('resize', updateTooltipPosition)

   // Close tooltip when clicking outside
   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
     containerRef.current &&
     !containerRef.current.contains(event.target as Node)
    ) {
     setShowTooltip(false)
    }
   }

   document.addEventListener('mousedown', handleClickOutside)
   document.addEventListener('touchstart', handleClickOutside)

   return () => {
    window.removeEventListener('scroll', updateTooltipPosition)
    window.removeEventListener('resize', updateTooltipPosition)
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
   }
  }
 }, [showTooltip])

 const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
  // Prevent the click from bubbling up to parent elements
  event.stopPropagation()

  updateTooltipPosition()
  setShowTooltip(!showTooltip)
 }

 const tooltip =
  showTooltip &&
  createPortal(
   <div
    ref={tooltipRef}
    className={`fixed p-2 bg-black text-white text-xs rounded shadow-lg z-50 ${
     window.innerWidth <= 480
      ? 'w-[calc(100vw-16px)] bottom-4 left-2 right-2'
      : 'w-48'
    }`}
    style={{
     top: window.innerWidth <= 480 ? 'auto' : `${tooltipPosition.top}px`,
     left: window.innerWidth <= 480 ? '8px' : `${tooltipPosition.left}px`,
     transform: window.innerWidth <= 480 ? 'none' : 'translate(-50%, -100%)',
    }}
   >
    <div className="relative">
     {/* Close button on mobile */}
     {window.innerWidth <= 480 && (
      <button
       className="absolute -top-1 -right-1 w-5 h-5 bg-gray-600 rounded-full text-xs flex items-center justify-center"
       onClick={(e) => {
        e.stopPropagation()
        setShowTooltip(false)
       }}
      >
       ×
      </button>
     )}
     {weaponKeywords.find((k) => k.name === keyword)?.cost && (
      <div className="font-semibold">
       Cost: {weaponKeywords.find((k) => k.name === keyword)?.cost}
      </div>
     )}
     <div className="mt-1">
      {weaponKeywords.find((k) => k.name === keyword)?.description}
     </div>
    </div>
   </div>,
   document.body
  )

 return (
  <span
   ref={containerRef}
   className="bg-gray-700 px-2 py-1 rounded-full text-sm relative inline-block cursor-help select-none"
   onClick={handleInteraction}
   onTouchStart={handleInteraction}
   onMouseEnter={() => {
    if (!('ontouchstart' in window)) {
     updateTooltipPosition()
     setShowTooltip(true)
    }
   }}
   onMouseLeave={() => {
    if (!('ontouchstart' in window)) {
     setShowTooltip(false)
    }
   }}
  >
   {keyword}
   {tooltip}
  </span>
 )
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

 const allowedTags = unit.tags || []

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

 const toggleSelection = (
  item: string,
  _currentList: string[],
  setList: React.Dispatch<React.SetStateAction<string[]>>
 ) => {
  setList((prev) =>
   prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
  )
 }

 const saveUnit = () => {
  const weaponCost = selectedWeapon
   ? getWeaponCost(weapons.find((w) => w.name === selectedWeapon)!)
   : 0
  const armorCost = selectedArmor
   ? armorList.find((a) => a.name === selectedArmor)?.cost || 0
   : 0
  const equipmentCost = selectedEquipment.reduce(
   (sum, e) => sum + (equipmentList.find((eq) => eq.name === e)?.cost || 0),
   0
  )
  const skillsCost = selectedSkills.reduce(
   (sum, s) => sum + (skills.find((sk) => sk.name === s)?.cost || 0),
   0
  )

  const newUnit = {
   ...unit,
   equipment: selectedEquipment.map(
    (name) => equipmentList.find((e) => e.name === name)!
   ),
   weapons: selectedWeapon
    ? [weapons.find((w) => w.name === selectedWeapon)!]
    : [],
   armor: selectedArmor
    ? [armorList.find((a) => a.name === selectedArmor)!]
    : [],
   skills: selectedSkills.map((name) => skills.find((s) => s.name === name)!),
   totalCost:
    unit.baseCost + weaponCost + armorCost + equipmentCost + skillsCost,
   equipmentCost,
   weaponsCost: weaponCost,
   armorCost,
   skillsCost,
  }

  addUnit(newUnit)
  closeEditor()
 }

 return (
  <div className="h-screen flex flex-col bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
   {/* Header */}
   <div className="p-3 md:p-6 bg-gray-900 text-white flex justify-between items-center">
    <h1 className="text-xl md:text-2xl font-bold">Editing: {unit.name}</h1>
    <button
     onClick={closeEditor}
     className="bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
    >
     Close
    </button>
   </div>

   {/* Scrollable Content */}
   <div className="flex-1 overflow-y-auto p-3 md:p-6">
    <h2 className="text-lg md:text-xl">Customize Loadout</h2>

    {/* Weapon Selection */}
    <h3 className="text-base md:text-lg mt-3">Weapon (Pick One)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
     {filteredWeapons.map((weapon) => (
      <div
       key={weapon.name}
       onClick={() =>
        setSelectedWeapon(selectedWeapon === weapon.name ? null : weapon.name)
       }
       className={`p-3 md:p-4 border-2 rounded-lg transition cursor-pointer ${
        selectedWeapon === weapon.name
         ? 'bg-blue-700 border-blue-300 text-white font-bold shadow-md'
         : 'bg-gray-700 hover:bg-gray-600 border-transparent text-white'
       }`}
      >
       <h4 className="text-base md:text-lg font-bold">{weapon.name}</h4>
       <p className="text-xs md:text-sm">Cost: {getWeaponCost(weapon)} pts</p>
       <p className="text-xs md:text-sm">Power: {weapon.combatPower}</p>
       <p className="text-xs md:text-sm">Keywords:</p>
       <div className="flex flex-wrap gap-1 md:gap-2">
        {weapon.keywords.map((keyword) => (
         <KeywordTooltip key={keyword} keyword={keyword} />
        ))}
       </div>
      </div>
     ))}
    </div>

    {/* Armor Selection */}
    <h3 className="text-base md:text-lg mt-3">Armor (Pick One)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
     {filteredArmor.map((armor) => (
      <div
       key={armor.name}
       onClick={() =>
        setSelectedArmor(selectedArmor === armor.name ? null : armor.name)
       }
       className={`p-3 md:p-4 border-2 rounded-lg transition cursor-pointer ${
        selectedArmor === armor.name
         ? 'bg-green-700 border-green-300 text-white font-bold shadow-md'
         : 'bg-gray-700 hover:bg-gray-600 border-transparent text-white'
       }`}
      >
       <h4 className="text-base md:text-lg font-bold">{armor.name}</h4>
      </div>
     ))}
    </div>

    {/* Equipment Selection */}
    <h3 className="text-base md:text-lg mt-3">Equipment (Pick Any)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
     {filteredEquipment.map((equipment) => (
      <div
       key={equipment.name}
       onClick={() =>
        toggleSelection(equipment.name, selectedEquipment, setSelectedEquipment)
       }
       className={`p-3 md:p-4 border-2 rounded-lg transition cursor-pointer ${
        selectedEquipment.includes(equipment.name)
         ? 'bg-yellow-700 border-yellow-300 text-white font-bold shadow-md'
         : 'bg-gray-700 hover:bg-gray-600 border-transparent text-white'
       }`}
      >
       <h4 className="text-base md:text-lg font-bold">{equipment.name}</h4>
      </div>
     ))}
    </div>

    {/* Skills Selection */}
    <h3 className="text-base md:text-lg mt-3">Skills (Pick Any)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
     {filteredSkills.map((skill) => (
      <div
       key={skill.name}
       onClick={() =>
        toggleSelection(skill.name, selectedSkills, setSelectedSkills)
       }
       className={`p-3 md:p-4 border-2 rounded-lg transition cursor-pointer ${
        selectedSkills.includes(skill.name)
         ? 'bg-red-700 border-red-300 text-white font-bold shadow-md'
         : 'bg-gray-700 hover:bg-gray-600 border-transparent text-white'
       }`}
      >
       <h4 className="text-base md:text-lg font-bold">{skill.name}</h4>
      </div>
     ))}
    </div>
   </div>

   {/* Footer Buttons */}
   <div className="p-3 md:p-6 bg-gray-900 flex flex-col sm:flex-row gap-2 justify-between">
    <button
     onClick={saveUnit}
     className="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base w-full sm:w-auto"
    >
     Save Unit
    </button>
    <button
     onClick={closeEditor}
     className="bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base w-full sm:w-auto"
    >
     Cancel
    </button>
   </div>
  </div>
 )
}
