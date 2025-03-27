import { useState, useMemo } from 'react'
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card'
import { Unit, unitsByFaction } from '@/data/units'
import useWarbandStore, { WarbandState } from '@/store/warband-store'
import { calculateWeaponCost, Weapon, weapons } from '@/data/weapons'
import { Skill, skills } from '@/data/skills'
import { Armor, armorList } from '@/data/armor'
import { Equipment, equipment } from '@/data/equipment'
import {
 Sheet,
 SheetClose,
 SheetContent,
 SheetDescription,
 SheetFooter,
 SheetHeader,
 SheetTitle,
} from '@/components/ui/sheet'
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion'
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from '@/components/ui/tooltip'
import { weaponKeywords } from '@/data/weapon-tags'
import { toast } from 'sonner'
import { armorKeywords } from '@/data/armor-tags'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

interface SelectableItemProps {
 isSelected: boolean
 onClick: () => void
 children: React.ReactNode
}

// A reusable component for selectable items.
function SelectableItem({
 isSelected,
 onClick,
 children,
}: SelectableItemProps) {
 return (
  <div
   onClick={onClick}
   className={clsx('p-3 rounded-lg transition cursor-pointer', {
    'bg-blue-100 border border-blue-200 shadow-sm': isSelected,
    'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-800':
     !isSelected,
   })}
  >
   {children}
  </div>
 )
}

export default function UnitSelect() {
 const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
 const [unitAddons, setUnitAddons] = useState<{
  weapons: Weapon[]
  armor: Armor[]
  equipment: Equipment[]
  skills: Skill[]
 }>({ weapons: [], armor: [], equipment: [], skills: [] })
 const faction = useWarbandStore((state: WarbandState) => state.selectedFaction)
 const [loadOut, setLoadOut] = useState<{
  weapons: Weapon[]
  armor: Armor[]
  equipment: Equipment[]
  skills: Skill[]
 }>({ weapons: [], armor: [], equipment: [], skills: [] })

 // Calculate total costs using memoization.
 const totalWeaponsCost = useMemo(
  () =>
   loadOut.weapons.reduce(
    (total, weapon) => total + calculateWeaponCost(weapon),
    0
   ),
  [loadOut.weapons]
 )

 const totalEquipmentCost = useMemo(
  () => loadOut.equipment.reduce((total, eq) => total + eq.cost, 0),
  [loadOut.equipment]
 )

 const totalArmorCost = useMemo(
  () => loadOut.armor.reduce((total, armor) => total + armor.cost, 0),
  [loadOut.armor]
 )

 const totalSklillCost = useMemo(
  () => loadOut.skills.reduce((total, skill) => total + skill.cost, 0),
  [loadOut.skills]
 )

 const totalCost = useMemo(() => {
  return (
   (selectedUnit?.baseCost || 0) +
   totalWeaponsCost +
   totalEquipmentCost +
   totalArmorCost +
   totalSklillCost
  )
 }, [
  selectedUnit,
  totalWeaponsCost,
  totalEquipmentCost,
  totalArmorCost,
  totalSklillCost,
 ])

 const warbandTotalCost = useWarbandStore.getState().getTotalCost()

 if (!faction) {
  return <div>Please select a faction</div>
 }

 const units = unitsByFaction[faction.name]

 // Set the selected unit and compute available add-ons based on its allowed tags.
 const handleCardClick = (unit: Unit) => {
  setSelectedUnit(unit)
  const allowedTags = unit.tags || []
  const potentialWeapons = weapons
   .filter((weapon) =>
    weapon.allowedTags.some((tag) => allowedTags.includes(tag))
   )
   .filter(
    (weapon) =>
     !weapon.factionSpecific || weapon.factionSpecific === faction.name
   )
  const potentialArmor = armorList
   .filter((armor) =>
    armor.allowedTags.some((tag) => allowedTags.includes(tag))
   )
   .filter(
    (armor) => !armor.factionSpecific || armor.factionSpecific === faction.name
   )
  const potentSkills = skills.filter((skill) =>
   skill.allowedTags.some((tag) => allowedTags.includes(tag))
  )

  const potentialEquipment = equipment
   .filter((equip) =>
    equip.allowedTags.some((tag) => allowedTags.includes(tag))
   )
   .filter(
    (equip) => !equip.factionSpecific || equip.factionSpecific === faction.name
   )

  setUnitAddons({
   weapons: potentialWeapons,
   armor: potentialArmor,
   equipment: potentialEquipment,
   skills: potentSkills,
  })
 }

 // Handle weapon selection with a slot cost limit.
 const calculateTotalSlotCost = (weapons: Weapon[]): number => {
  return weapons.reduce((total, weapon) => total + weapon.slotCost, 0)
 }

 const handleWeaponClick = (weapon: Weapon) => {
  const updatedWeapons = loadOut.weapons.includes(weapon)
   ? loadOut.weapons.filter((w) => w !== weapon)
   : [...loadOut.weapons, weapon]

  const totalSlotCost = calculateTotalSlotCost(updatedWeapons)
  if (totalSlotCost > 4) {
   toast.error("You've exceeded the maximum weapon slot cost of 4.")
   return
  }
  setLoadOut((prev) => ({ ...prev, weapons: updatedWeapons }))
 }

 // Armor selection (only one allowed).
 const handleArmorClick = (armor: Armor) => {
  const updatedArmor = loadOut.armor.includes(armor)
   ? loadOut.armor.filter((a) => a !== armor)
   : [...loadOut.armor, armor]

  if (updatedArmor.length > 1) {
   toast.error('You can only have one armor equipped at a time.')
   return
  }
  setLoadOut((prev) => ({ ...prev, armor: updatedArmor }))
 }

 // Equipment selection (max 4 pieces allowed).
 const handleEquipmentClick = (equip: Equipment) => {
  const updatedEquipment = loadOut.equipment.includes(equip)
   ? loadOut.equipment.filter((e) => e !== equip)
   : [...loadOut.equipment, equip]

  if (updatedEquipment.length > 4) {
   toast.error('You can only have 4 pieces of equipment equipped at a time.')
   return
  }
  setLoadOut((prev) => ({ ...prev, equipment: updatedEquipment }))
 }

 const handleSkillClick = (skill: Skill) => {
  const updatedSkills = loadOut.skills.includes(skill)
   ? loadOut.skills.filter((s) => s !== skill)
   : [...loadOut.skills, skill]

  if (!selectedUnit?.stats?.willpower) return

  if (updatedSkills.length > selectedUnit?.stats?.willpower) {
   toast.error('You have exceeded the maximum number of skills for this unit.')
   return
  }

  setLoadOut((prev) => ({ ...prev, skills: updatedSkills }))
 }

 // Reset state when the sheet closes.
 const resetState = () => {
  setSelectedUnit(null)
  setLoadOut({ weapons: [], armor: [], equipment: [], skills: [] })
  setUnitAddons({ weapons: [], armor: [], equipment: [], skills: [] })
 }

 function SubmitUnitToWarband() {
  const equipmentCost = loadOut.equipment.reduce((sum, e) => sum + e.cost, 0)
  const weaponsCost = loadOut.weapons.reduce(
   (sum, w) => sum + w.combatPower * 3,
   0
  )
  const armorCost = loadOut.armor.reduce((sum, a) => sum + a.cost, 0)
  const skillsCost = loadOut.skills.reduce((sum, s) => sum + s.cost, 0)

  const totalCost =
   (selectedUnit?.baseCost || 0) +
   equipmentCost +
   weaponsCost +
   armorCost +
   skillsCost

  useWarbandStore.getState().addUnit({
   name: selectedUnit!.name,
   description: selectedUnit!.description, // ✅ Add this line
   baseCost: selectedUnit!.baseCost,
   stats: selectedUnit!.stats,
   tags: selectedUnit!.tags,
   weapons: loadOut.weapons,
   armor: loadOut.armor,
   equipment: loadOut.equipment,
   skills: loadOut.skills,
   totalCost,
   equipmentCost,
   weaponsCost,
   armorCost,
   skillsCost,
  })

  resetState()
 }

 return (
  <div>
   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {units.map((unit) => (
     <Sheet
      key={unit.name}
      open={selectedUnit === unit}
      onOpenChange={(open) => {
       if (!open) resetState()
      }}
     >
      <Card onClick={() => handleCardClick(unit)}>
       <CardHeader>
        <CardTitle>{unit.name}</CardTitle>
        <CardDescription>{unit.description}</CardDescription>
       </CardHeader>
       <CardContent>
        <div>Stats</div>
        <div className="grid grid-cols-3 gap-1 text-xs">
         <div>
          <span>Competency</span>
          <span>{unit.stats?.competency}</span>
         </div>
         <div>
          <span>Resilience</span>
          <span>{unit.stats?.resilience}</span>
         </div>
         <div>
          <span>Willpower</span>
          <span>{unit.stats?.willpower}</span>
         </div>
         <div>
          <span>Vigor</span>
          <span>{unit.stats?.vigor}</span>
         </div>
         <div>
          <span>Wounds</span>
          <span>{unit.stats?.wounds}</span>
         </div>
        </div>
       </CardContent>
      </Card>
      <SheetContent>
       <SheetHeader className="border-b">
        <SheetTitle>{unit.name} - Potential Add-ons</SheetTitle>
        <SheetDescription>{unit.description}</SheetDescription>
        <div className="flex justify-between">
         <span>Cost: {totalCost}</span>
         <span>Warband Total: {warbandTotalCost}</span>
        </div>
       </SheetHeader>
       <div className="overflow-y-auto">
        <Accordion type="multiple">
         {/* Armor Section */}
         <AccordionItem value="armor">
          <AccordionTrigger className="px-4">
           <div>Armor</div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 p-4">
           {unitAddons.armor.map((armor) => (
            <SelectableItem
             key={armor.name}
             isSelected={loadOut.armor.includes(armor)}
             onClick={() => handleArmorClick(armor)}
            >
             <div className="flex flex-col gap-2">
              <div
               className={clsx('cursor-pointer', {
                'text-blue-500': loadOut.armor.includes(armor),
               })}
              >
               <span>{armor.name}</span>
              </div>
              <div className="text-sm text-gray-500">{armor.description}</div>
              <div className="flex gap-2">
               {armor.armorKeywords?.map((keyword) => {
                const keywordInformation = armorKeywords.find(
                 (k) => k.name === keyword
                )
                if (!keywordInformation) return null
                return (
                 <TooltipProvider key={keyword}>
                  <Tooltip>
                   <TooltipTrigger className=" bg-gray-200 text-gray-800 px-0.5 py-0.5 text-xs rounded-md hover:bg-gray-300 transition">
                    <span>{keyword}</span>
                   </TooltipTrigger>
                   <TooltipContent>
                    <div>{keywordInformation.description}</div>
                   </TooltipContent>
                  </Tooltip>
                 </TooltipProvider>
                )
               })}
              </div>
             </div>
            </SelectableItem>
           ))}
          </AccordionContent>
         </AccordionItem>
         {/* Weapons Section */}
         <AccordionItem value="weapons">
          <AccordionTrigger className="px-4">
           <div>Weapons</div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 p-4">
           {unitAddons.weapons.map((weapon) => (
            <SelectableItem
             key={weapon.name}
             isSelected={loadOut.weapons.includes(weapon)}
             onClick={() => handleWeaponClick(weapon)}
            >
             <div className="flex flex-col gap-2">
              <div
               className={clsx('cursor-pointer', {
                'text-blue-700': loadOut.weapons.includes(weapon),
               })}
              >
               <div className="grid grid-cols-2 gap-2">
                <div>{weapon.name}</div>
                <div>Combat Power: {weapon.combatPower}</div>
                <div>Weapon Slot Cost: {weapon.slotCost}</div>
                <div>Cost: {calculateWeaponCost(weapon)}</div>
               </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
               {weapon.keywords.map((keyword) => {
                const keywordInformation = weaponKeywords.find(
                 (k) => k.name === keyword
                )
                if (!keywordInformation) return null
                return (
                 <TooltipProvider key={keyword}>
                  <Tooltip>
                   <TooltipTrigger className=" bg-gray-200 text-gray-800 px-0.5 py-0.5 text-xs rounded-md hover:bg-gray-300 transition">
                    <span>{keyword}</span>
                   </TooltipTrigger>
                   <TooltipContent>
                    <div>{keywordInformation.description}</div>
                   </TooltipContent>
                  </Tooltip>
                 </TooltipProvider>
                )
               })}
              </div>
             </div>
            </SelectableItem>
           ))}
          </AccordionContent>
         </AccordionItem>
         {/* Equipment Section */}
         <AccordionItem value="equipment">
          <AccordionTrigger className="px-4">
           <div>Equipment</div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 p-4">
           {unitAddons.equipment.map((equip) => (
            <SelectableItem
             key={equip.name}
             isSelected={loadOut.equipment.includes(equip)}
             onClick={() => handleEquipmentClick(equip)}
            >
             <div className="grid grid-cols-2 gap-2">
              <div>{equip.name}</div>
              <div>Cost: {equip.cost}</div>

              <div>Effect: {equip.effect}</div>
              <div>Uses: {equip.uses}</div>
             </div>
            </SelectableItem>
           ))}
          </AccordionContent>
         </AccordionItem>
         {/* Skills Section */}
         <AccordionItem value="skills">
          <AccordionTrigger className="px-4">
           <div>Skills</div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
           {unitAddons.skills.map((skill) => (
            <SelectableItem
             key={skill.name}
             isSelected={loadOut.skills.includes(skill)}
             onClick={() => handleSkillClick(skill)}
            >
             <div className="flex flex-col gap-2">
              <div>{skill.name}</div>
              <div>{skill.description}</div>
              <div>Cost: {skill.cost}</div>
             </div>
            </SelectableItem>
           ))}
          </AccordionContent>
         </AccordionItem>
        </Accordion>
       </div>
       <SheetFooter className="border-t">
        <SheetClose asChild>
         <Button
          className="text-black"
          type="submit"
          onClick={SubmitUnitToWarband}
         >
          Save changes
         </Button>
        </SheetClose>
       </SheetFooter>
      </SheetContent>
     </Sheet>
    ))}
   </div>
  </div>
 )
}
