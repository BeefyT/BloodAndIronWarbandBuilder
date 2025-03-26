import { AllowedTags } from './units'

export interface Skill {
  name: string
  allowedTags: AllowedTags[] // Which unit types can have this skill
  cost: number
  description: string
}

export const skills: Skill[] = [
  {
    name: 'Stealth',
    allowedTags: ['Skirmisher', 'Operative'],
    cost: 4,
    description:
      'This unit cannot be targeted by ranged attacks if it is more than 12 inches away and in cover.',
  },
  {
    name: 'Ambusher',
    allowedTags: ['Shock Trooper'],
    cost: 5,
    description:
      'When this unit charges from cover, it gains +1 CP on its first attack.',
  },
  {
    name: 'Duelist',
    allowedTags: ['Melee Specialist'],
    cost: 4,
    description:
      'When in single combat (only engaged with one enemy), this unit gains +1 to melee attack rolls.',
  },
  {
    name: 'Sniper Training',
    allowedTags: ['Marksmen'],
    cost: 6,
    description:
      'This unit ignores the penalty for firing at long range and gains +1 CP when targeting units in cover.',
  },
]

export function getSkillsByKeyword(keyword: AllowedTags): Skill[] {
  return skills.filter((skill) => skill.allowedTags.includes(keyword))
}