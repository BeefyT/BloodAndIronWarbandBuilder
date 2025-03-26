import { WeaponKeywordName, weaponKeywords } from './weapon-tags'

export interface Weapon {
  name: string
  baseCost: number
  baseCP: number
  range: number
  keywords: WeaponKeywordName[]
}

// Helper function to calculate total weapon cost including keywords
export function calculateWeaponCost(weapon: Weapon): number {
  const keywordCosts = weapon.keywords.reduce((total, keywordName) => {
    const keyword = weaponKeywords.find((k) => k.name === keywordName)
    return total + (keyword?.cost || 0)
  }, 0)
  return weapon.baseCost + keywordCosts
}

// Example usage:
export const exampleWeapon: Weapon = {
  name: 'Plasma Rifle',
  baseCost: 10,
  baseCP: 3,
  range: 24,
  keywords: ['Overheat (3)', 'AP(2)', 'Long Range'],
}
