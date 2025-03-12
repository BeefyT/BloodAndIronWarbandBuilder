export interface Unit {
  name: string
  baseCost: number
  description: string
  tags?: string[]
}

// ✅ Fix: Explicitly type `unitsByFaction` as a Record<string, Unit[]>
export const unitsByFaction: Record<string, Unit[]> = {
  'Church of the Martyr': [
    {
      name: 'Aspirant',
      baseCost: 10,
      description: 'Novice warriors of the Church.',
      tags: ['Line Trooper'],
    },
    {
      name: 'Castellan',
      baseCost: 20,
      description: 'Heavy armor and fire support.',
      tags: ['Shock Trooper'],
    },
    {
      name: 'Judicar',
      baseCost: 25,
      description: 'Close combat specialists.',
      tags: ['Melee Specialist'],
    },
  ],
  'Xiuhcoatl Theocracy': [
    {
      name: 'Teomiqui',
      baseCost: 8,
      description: 'Sacrificial frontline units.',
      tags: ['Skirmisher'],
    },
    {
      name: 'Sunbringer',
      baseCost: 35,
      description: 'A massive eldritch construct.',
      tags: ['Operative'],
    },
    {
      name: 'Serpent’s Fang',
      baseCost: 18,
      description: 'Stealthy infiltrators.',
      tags: ['Operative'],
    },
  ],
  'Cragenhelm Empire': [
    {
      name: 'Shock Trooper',
      baseCost: 15,
      description: 'Fast-moving melee troops.',
      tags: ['Shock Trooper'],
    },
    {
      name: 'Ironclad Sentinel',
      baseCost: 30,
      description: 'Heavily armored mechs.',
      tags: ['Ironclad'],
    },
  ],
  "Lords' Alliance": [
    {
      name: 'Levy Spearman',
      baseCost: 5,
      description: 'Cheap and numerous.',
      tags: ['Line Trooper'],
    },
    {
      name: 'Knight Errant',
      baseCost: 22,
      description: 'Elite warriors of the nobility.',
      tags: ['Melee Specialist'],
    },
  ],
}
