
export type ArmorKeywords = 
|'Cumbersome'
|'Heavy' 
| 'Sealed'
|'Agile'
|'Reinforced Joints'
|'Ballistic Resistant'
|'Blast Guard'
|'Shock Absorbing'
|'Reinforced Frame'
|'Void Sealed'
|'Anchor'
|'Purified (1)'
|'Purified (2)'
|'Purified (3)'
|'Warded'
|'Purity Aura'
|'Plate (1)'
|'Plate (2)'
|'Plate (3)'
|'Siege Plate'
|'Shroudfiber'
|'Sacrificial Ward'
|'Holy Rite'
|'Insulator'
|'Mechanical'

export interface ArmorKeyword { 
    name: ArmorKeywords
    description: string
    cost: number
}

export const armorKeywords: ArmorKeyword[] = [
    {
      name: 'Cumbersome',
      description: 'The wearer loses 1 inch of movement.',
      cost: 1,
    },
    {
      name: 'Heavy',
      description: 'The wearer loses 2 inches of movement.',
      cost: 2,
    },
    {
      name: 'Sealed',
      description: 'The wearer is immune to the poisoned state.',
      cost: 1,
    },
    {
      name: 'Agile',
      description: 'The wearer ignores movement penalties from difficult terrain.',
      cost: 1,
    },
    {
      name: 'Reinforced Joints',
      description: 'When taking the Jump action, gain +2 inches of vertical movement.',
      cost: 1,
    },
    {
      name: 'Ballistic Resistant',
      description: 'The wearer gains +1 Armor against ranged attacks.',
      cost: 1,
    },
    {
      name: 'Blast Guard',
      description: 'Reduce Explosive damage by half.',
      cost: 1,
    },
    {
      name: 'Shock Absorbing',
      description: 'The wearer gains +1 Armor against Stun and EMP effects.',
      cost: 1,
    },
    {
      name: 'Reinforced Frame',
      description: '+1 Armor against melee attacks.',
      cost: 1,
    },
    {
      name: 'Void Sealed',
      description: 'The wearer reduces occult damage by 1.',
      cost: 1,
    },
    {
      name: 'Anchor',
      description: 'This unit cannot be forcibly moved by abilities or attacks.',
      cost: 1,
    },
    {
      name: 'Purified (1)',
      description: 'Gain +1 Willpower when resisting occult attacks.',
      cost: 1,
    },
    {
      name: 'Purified (2)',
      description: 'Gain +2 Willpower when resisting occult attacks.',
      cost: 2,
    },
    {
      name: 'Purified (3)',
      description: 'Gain +3 Willpower when resisting occult attacks.',
      cost: 3,
    },
    {
      name: 'Warded',
      description: 'Once per game, negate 1 magical attack targeting the wearer.',
      cost: 1,
    },
    {
      name: 'Purity Aura',
      description:
        'Enemy units using eldritch abilities within 4 inches suffer -1 Competency.',
      cost: 1,
    },
    {
      name: 'Plate (1)',
      description: 'This armor ignores AP(1).',
      cost: 1,
    },
    {
      name: 'Plate (2)',
      description: 'This armor ignores AP(1) and AP(2).',
      cost: 2,
    },
    {
      name: 'Plate (3)',
      description: 'This armor ignores AP(1), AP(2), and AP(3).',
      cost: 3,
    },
    {
      name: 'Siege Plate',
      description:
        'If the wearer does not move this turn, gain +2 Armor against ranged attacks.',
      cost: 1,
    },
    {
      name: 'Sacrificial Ward',
      description:
        'When this unit is killed, add 1 Ritual Token to the shared pool.',
      cost: 1,
    },
    {
      name: 'Holy Rite',
      description: 'The first wound from an Eldritch attack is ignored.',
      cost: 1,
    },
    {
      name: 'Insulator',
      description: 'This armor grants immunity to Stun effects.',
      cost: 1,
    },
    {
      name: 'Mechanical',
      description:
        'This armor is mechanically enhanced and is weak to mechanical targeting weapons.',
      cost: 1,
    },

    {
      name: 'Shroudfiber',
      description:
        '-1 CP to enemy attacks against this unit while in cover.',
      cost: 1,
    },
  ];
  