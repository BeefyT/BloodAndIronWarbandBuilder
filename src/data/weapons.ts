export interface Weapon {
  name: string
  allowedTags: string[] // Which unit types can use this weapon
  cost: number
}

export const weapons: Weapon[] = [
  { name: 'Rifle', allowedTags: ['Line Trooper'], cost: 5 },
  { name: 'Submachine Gun', allowedTags: ['Shock Trooper'], cost: 4 },
  { name: 'Shotgun', allowedTags: ['Shock Trooper', 'Skirmisher'], cost: 6 },
  { name: 'Sniper Rifle', allowedTags: ['Marksman'], cost: 8 },
]
