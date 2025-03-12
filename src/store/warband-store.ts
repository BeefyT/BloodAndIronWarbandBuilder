import { create } from 'zustand'
import { Faction } from '../data/factions'
import { Unit } from '../data/units'

// Define Warband Unit Interface
export interface WarbandUnit extends Unit {
  equipment: string[]
  weapons: string[]
  skills: string[]
  totalCost: number
}

export interface WarbandState {
  selectedFaction: Faction | null
  warband: WarbandUnit[]
  totalPoints: number

  setFaction: (faction: Faction | null) => void
  addUnit: (unit: WarbandUnit) => void
  removeUnit: (unitIndex: number) => void
  resetWarband: () => void
}

const useWarbandStore = create<WarbandState>((set) => ({
  selectedFaction: null,
  warband: [],
  totalPoints: 0,

  // Set Faction and reset warband if a new faction is picked
  setFaction: (faction: Faction | null) =>
    set((state) => {
      if (state.selectedFaction !== faction) {
        return { selectedFaction: faction, warband: [], totalPoints: 0 }
      }
      return state
    }),

  // Add a unit with full customization
  addUnit: (unit: WarbandUnit) =>
    set((state) => ({
      warband: [...state.warband, unit],
      totalPoints: state.totalPoints + unit.totalCost,
    })),

  // Remove a unit and recalculate total points
  removeUnit: (unitIndex: number) =>
    set((state) => {
      const newWarband = state.warband.filter((_, index) => index !== unitIndex)
      const newTotalPoints = newWarband.reduce(
        (sum, unit) => sum + unit.totalCost,
        0
      )
      return { warband: newWarband, totalPoints: newTotalPoints }
    }),

  // Reset the warband
  resetWarband: () => set({ warband: [], totalPoints: 0 }),
}))

export default useWarbandStore
