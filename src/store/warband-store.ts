import { create } from 'zustand'
import { Faction } from '../data/factions'
import { Unit } from '../data/units'
import { Weapon } from '../data/weapons'
import { Equipment } from '../data/equipment'
import { Armor } from '../data/armor'
import { Skill } from '../data/skills'

// Define Warband Unit Interface
export interface WarbandUnit extends Unit {
 name: string
 equipment: Equipment[]
 weapons: Weapon[]
 armor: Armor[]
 skills: Skill[]
 totalCost: number
 // Track individual costs for better management
 equipmentCost: number
 weaponsCost: number
 armorCost: number
 skillsCost: number
}

export interface WarbandState {
 selectedFaction: Faction | null
 warband: WarbandUnit[]
 totalPoints: number

 setFaction: (faction: Faction | null) => void
 addUnit: (unit: WarbandUnit) => void
 removeUnit: (unitIndex: number) => void

 // Equipment management
 addEquipmentToUnit: (unitIndex: number, equipment: Equipment) => void
 removeEquipmentFromUnit: (unitIndex: number, equipmentIndex: number) => void

 // Weapon management
 addWeaponToUnit: (unitIndex: number, weapon: Weapon) => void
 removeWeaponFromUnit: (unitIndex: number, weaponIndex: number) => void

 // Armor management
 addArmorToUnit: (unitIndex: number, armor: Armor) => void
 removeArmorFromUnit: (unitIndex: number, armorIndex: number) => void

 // Skill management
 addSkillToUnit: (unitIndex: number, skill: Skill) => void
 removeSkillFromUnit: (unitIndex: number, skillIndex: number) => void

 getTotalCost: () => number

 updateUnit: (unitIndex: number, updatedUnit: WarbandUnit) => void

 resetWarband: () => void
}

const useWarbandStore = create<WarbandState>((set) => ({
 selectedFaction: null,
 warband: [],
 totalPoints: 0,

 setFaction: (faction: Faction | null) =>
  set((state) => {
   if (state.selectedFaction !== faction) {
    return { selectedFaction: faction, warband: [], totalPoints: 0 }
   }
   return state
  }),

 addUnit: (unit: WarbandUnit) =>
  set((state) => ({
   warband: [...state.warband, unit],
   totalPoints: state.totalPoints + unit.totalCost,
  })),

 removeUnit: (unitIndex: number) =>
  set((state) => {
   const newWarband = state.warband.filter((_, index) => index !== unitIndex)
   const newTotalPoints = newWarband.reduce(
    (sum, unit) => sum + unit.totalCost,
    0
   )
   return { warband: newWarband, totalPoints: newTotalPoints }
  }),

 // Equipment management
 addEquipmentToUnit: (unitIndex: number, equipment: Equipment) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]

   // Check if unit can equip this equipment
   if (!equipment.allowedTags.some((tag) => unit.tags?.includes(tag))) {
    return state
   }

   unit.equipment = [...unit.equipment, equipment]
   unit.equipmentCost += equipment.cost
   unit.totalCost += equipment.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints + equipment.cost,
   }
  }),

 removeEquipmentFromUnit: (unitIndex: number, equipmentIndex: number) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]
   const equipment = unit.equipment[equipmentIndex]

   unit.equipment = unit.equipment.filter(
    (_, index) => index !== equipmentIndex
   )
   unit.equipmentCost -= equipment.cost
   unit.totalCost -= equipment.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints - equipment.cost,
   }
  }),

 // Weapon management
 addWeaponToUnit: (unitIndex: number, weapon: Weapon) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]

   // Check if unit can use this weapon
   if (!weapon.allowedTags.some((tag) => unit.tags?.includes(tag))) {
    return state
   }

   unit.weapons = [...unit.weapons, weapon]
   unit.weaponsCost += weapon.combatPower * 3 // Cost per CP is 3 points
   unit.totalCost += weapon.combatPower * 3

   return {
    warband: newWarband,
    totalPoints: state.totalPoints + weapon.combatPower * 3,
   }
  }),

 removeWeaponFromUnit: (unitIndex: number, weaponIndex: number) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]
   const weapon = unit.weapons[weaponIndex]

   unit.weapons = unit.weapons.filter((_, index) => index !== weaponIndex)
   unit.weaponsCost -= weapon.combatPower * 3
   unit.totalCost -= weapon.combatPower * 3

   return {
    warband: newWarband,
    totalPoints: state.totalPoints - weapon.combatPower * 3,
   }
  }),

 // Armor management
 addArmorToUnit: (unitIndex: number, armor: Armor) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]

   // Check if unit can wear this armor
   if (!armor.allowedTags.some((tag) => unit.tags?.includes(tag))) {
    return state
   }

   unit.armor = [...unit.armor, armor]
   unit.armorCost += armor.cost
   unit.totalCost += armor.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints + armor.cost,
   }
  }),

 removeArmorFromUnit: (unitIndex: number, armorIndex: number) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]
   const armor = unit.armor[armorIndex]

   unit.armor = unit.armor.filter((_, index) => index !== armorIndex)
   unit.armorCost -= armor.cost
   unit.totalCost -= armor.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints - armor.cost,
   }
  }),

 // Skill management
 addSkillToUnit: (unitIndex: number, skill: Skill) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]

   // Check if unit can learn this skill
   if (!skill.allowedTags.some((tag) => unit.tags?.includes(tag))) {
    return state
   }

   unit.skills = [...unit.skills, skill]
   unit.skillsCost += skill.cost
   unit.totalCost += skill.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints + skill.cost,
   }
  }),

 removeSkillFromUnit: (unitIndex: number, skillIndex: number) =>
  set((state) => {
   const newWarband = [...state.warband]
   const unit = newWarband[unitIndex]
   const skill = unit.skills[skillIndex]

   unit.skills = unit.skills.filter((_, index) => index !== skillIndex)
   unit.skillsCost -= skill.cost
   unit.totalCost -= skill.cost

   return {
    warband: newWarband,
    totalPoints: state.totalPoints - skill.cost,
   }
  }),

 getTotalCost: (): number => {
  const state = useWarbandStore.getState()
  return state.warband.reduce((sum, unit) => sum + unit.totalCost, 0)
 },

 updateUnit: (unitIndex: number, updatedUnit: WarbandUnit) =>
  set((state) => {
   const newWarband = [...state.warband]
   const oldUnit = newWarband[unitIndex]

   // Adjust totalPoints by removing old and adding new
   const newTotalPoints =
    state.totalPoints - oldUnit.totalCost + updatedUnit.totalCost

   newWarband[unitIndex] = updatedUnit

   return {
    warband: newWarband,
    totalPoints: newTotalPoints,
   }
  }),

 resetWarband: () => set({ warband: [], totalPoints: 0 }),
}))

export default useWarbandStore
