export interface Equipment {
  name: string
  allowedTags: string[] // Which unit types can equip this equipment
  cost: number
}

export const equipmentList: Equipment[] = [
  {
    name: 'Combat Medkit',
    allowedTags: ['Line Trooper', 'Shock Trooper', 'Gunner', 'Marksman'],
    cost: 3,
  },
  {
    name: 'Combat Stimpack',
    allowedTags: ['Line Trooper', 'Shock Trooper', 'Gunner', 'Marksman'],
    cost: 2,
  },
  {
    name: 'Combat Stimpack',
    allowedTags: ['Line Trooper', 'Shock Trooper', 'Gunner', 'Marksman'],
    cost: 2,
  },
]
