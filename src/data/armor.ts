export interface Armor {
  name: string
  allowedTags: string[] // Which unit types can wear this armor
  cost: number
}

export const armorList: Armor[] = [
  { name: 'Light Armor', allowedTags: ['Line Trooper', 'Skirmisher'], cost: 3 },
  { name: 'Heavy Armor', allowedTags: ['Shock Trooper', 'Gunner'], cost: 5 },
  { name: 'Power Plate', allowedTags: ['Ironclad'], cost: 8 },
]
