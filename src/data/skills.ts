export interface Skill {
  name: string
  allowedTags: string[] // Which unit types can have this skill
  cost: number
}

export const skills: Skill[] = [
  { name: 'Stealth', allowedTags: ['Skirmisher', 'Operative'], cost: 4 },
  { name: 'Ambusher', allowedTags: ['Shock Trooper'], cost: 5 },
  { name: 'Duelist', allowedTags: ['Melee Specialist'], cost: 4 },
  { name: 'Sniper Training', allowedTags: ['Marksman'], cost: 6 },
]
