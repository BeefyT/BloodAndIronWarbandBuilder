export type WeaponKeywordName =
  | 'Steady'
  | 'AP(1)'
  | 'AP(2)'
  | 'AP(3)'
  | 'Rapid Rife'
  | 'Long Range'
  | 'Close Range'
  | 'Unwieldy'
  | 'Explosive'
  | 'Targetless'
  | 'Deployed'
  | 'Beam'
  | 'Template (Cone)'
  | 'Template (Circle)'
  | 'Supressive'
  | 'Arc (1)'
  | 'Arc (2)'
  | 'Arc (3)'
  | 'Silenced'
  | 'Stun(Organic)'
  | 'Stun(Mechanical)'
  | 'Stun(Eldritch)'
  | 'Stun(Holy)'
  | 'Reload'
  | 'Charge Up'
  | 'Overheat (1)'
  | 'Overheat (2)'
  | 'Overheat (3)'
  | 'Overheat (4)'
  | 'Overheat (5)'
  | 'EMP'
  | 'Lock'
  | 'Beacon'
  | 'Guided'
  | 'Anti-mechanized (AM)'
  | 'Anti-Infantry (AIF)'
  | 'Melee'
  | 'Non-Lethal'
  | 'Savage(1)'
  | 'Savage(2)'
  | 'Savage(3)'
  | 'Parry'
  | 'Reach'
  | 'Brutal'
  | 'Colossal'
  | 'Charge'
  | 'Burn'
  | 'Posion'
  | 'Spray(2)'
  | 'Spray(3)'
  | 'Spray(4)'
  | 'Two Handed'
  | 'Riposte'
  | 'Hooked'
  | 'Shockwave'
  | 'Syphon'
  | 'Swift'
  | 'Returning'
  | 'Purge'
  | 'Smite'
  | 'Vorpal'
  | 'Shove'
  | 'Bleed'
  | 'Cleave'
  | 'Defensive'
  | 'Ritual'
  | 'Knockback'
  | 'Backstab(1)'
  | 'Backstab(2)'
  | 'Backstab(3)'
  | 'Carnage'
  | 'Terror (1)'
  | 'Terror (2)'
  | 'Terror (3)'
  | 'Panic'

export interface WeaponKeyword {
  name: WeaponKeywordName
  cost: number
  description: string
}

export const weaponKeywords: WeaponKeyword[] = [
  {
    name: 'Steady',
    cost: 3,
    description:
      'This weapon gains +1 CP if the user did not move during this activation.',
  },
  {
    name: 'AP(1)',
    cost: 3,
    description: "This weapon reduces the target's Armor by 1",
  },
  {
    name: 'AP(2)',
    cost: 6,
    description: "This weapon reduces the target's Armor by 2",
  },
  {
    name: 'AP(3)',
    cost: 9,
    description: "This weapon reduces the target's Armor by 3",
  },
  {
    name: 'Rapid Rife',
    cost: 3,
    description:
      'This weapon may re-roll one failed roll. The new result must be kept.',
  },
  {
    name: 'Long Range',
    cost: -1,
    description: 'Attacks within 8 inches suffer -1 CP',
  },
  {
    name: 'Close Range',
    cost: -1,
    description: 'Attacks outside of 8 inches suffer a -1 CP',
  },
  {
    name: 'Unwieldy',
    cost: -1,
    description: 'This weapon suffers -1 CP if the user moved this turn.',
  },
  {
    name: 'Explosive',
    cost: 3,
    description:
      "On a successful attack, all units within the template (circle) of the target are hit with half the original attack's CP",
  },
  {
    name: 'Targetless',
    cost: 1,
    description:
      'This weapon can target an area within range instead of a unit. Attacks made out of line of sight suffer a -1 Competency.',
  },
  {
    name: 'Deployed',
    cost: -1,
    description: 'Firing this weapon requires a deployment action.',
  },
  {
    name: 'Beam',
    cost: 3,
    description:
      'This weapon fires a 1in straight beam; all units in its path take a hit. Terrain blocks the line of fire',
  },
  {
    name: 'Template (Cone)',
    cost: 3,
    description: 'All units within the template take a hit.',
  },
  {
    name: 'Template (Circle)',
    cost: 3,
    description: 'All units within the template take a hit.',
  },
  {
    name: 'Supressive',
    cost: 3,
    description:
      'When this weapon hits an enemy, they must make a Willpower check. On failure, they drop 1 Morale Level. If they are already Broken, they must retreat 6 inches toward cover.',
  },
  {
    name: 'Arc (1)',
    cost: 3,
    description:
      'If this attack hits, it arcs to hit up to 1 other units within 2 inches. These secondary attacks must be rolled as normal',
  },
  {
    name: 'Arc (2)',
    cost: 6,
    description:
      'If this attack hits, it arcs to hit up to 2 other units within 2 inches. These secondary attacks must be rolled as normal',
  },
  {
    name: 'Arc (3)',
    cost: 9,
    description:
      'If this attack hits, it arcs to hit up to 3 other units within 2 inches. These secondary attacks must be rolled as normal',
  },
  {
    name: 'Silenced',
    cost: 3,
    description: 'When attacking in the back arc of a unit, gain +1 CP',
  },
  {
    name: 'Stun(Organic)',
    cost: 3,
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to organic targets.',
  },
  {
    name: 'Stun(Mechanical)',
    cost: 3,
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to mechanical targets.',
  },
  {
    name: 'Stun(Eldritch)',
    cost: 3,
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to eldritch targets.',
  },
  {
    name: 'Stun(Holy)',
    cost: 3,
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to holy targets.',
  },
  {
    name: 'Reload',
    cost: -2,
    description:
      'After every attack, this weapon requires an action to reload before it can be fired again.',
  },
  {
    name: 'Charge Up',
    cost: 1,
    description:
      'The user may attempt a Charge-Up roll before attacking. Roll a D10: On a roll of 1, the user is hit by the weapon. On any other result, the weapon gains +1 CP for the next attack. This can be done up to 3 times in a row, with each successive attempt increasing the chance of failure. For the second roll, a 1 or 2 results in the user being hit. For the third roll, a 1, 2, or 3 results in the user being hit. Successfully charging up to 3 times grants a total of +3 CP for the attack.',
  },
  {
    name: 'Overheat (1)',
    cost: -1,
    description:
      'After attacking, roll a D10. On a roll above 1, the weapon overheats, and the user cannot use it during their next activation.',
  },
  {
    name: 'Overheat (2)',
    cost: -2,
    description:
      'After attacking, roll a D10. On a roll above 2, the weapon overheats, and the user cannot use it during their next activation.',
  },
  {
    name: 'Overheat (3)',
    cost: -3,
    description:
      'After attacking, roll a D10. On a roll above 3, the weapon overheats, and the user cannot use it during their next activation.',
  },
  {
    name: 'Overheat (4)',
    cost: -4,
    description:
      'After attacking, roll a D10. On a roll above 4, the weapon overheats, and the user cannot use it during their next activation.',
  },
  {
    name: 'Overheat (5)',
    cost: -5,
    description:
      'After attacking, roll a D10. On a roll above 5, the weapon overheats, and the user cannot use it during their next activation.',
  },
  {
    name: 'EMP',
    cost: 3,
    description:
      'On a successful hit on a unit with the mechanized tag, the target must make a Competency check. On a failure, the unit can only either move or take an action on its next activation, not both',
  },
  {
    name: 'Lock',
    cost: 3,
    description:
      "When this weapon hits a mech, the target must make a Competency check. On a failure, the mech becomes 'Locked' and cannot move during its next activation. It can still perform other actions, such as attacking or using non-movement abilities",
  },
  {
    name: 'Beacon',
    cost: 1,
    description:
      "When this weapon hits a unit, place a 'Targeted' token on the target. While the target has this token, all attacks with the 'Guided' trait gain +1 CP against it. The 'Targeted' token remains until the target unit spends an action to remove it.",
  },
  {
    name: 'Guided',
    cost: 3,
    description: "Gain +1 CP against targets marked with a 'Targeted' token.",
  },
  {
    name: 'Anti-mechanized (AM)',
    cost: -3,
    description:
      'This weapon uses half its CP when attacking units with the [infantry] keyword.',
  },
  {
    name: 'Anti-Infantry (AIF)',
    cost: -3,
    description:
      'This weapon uses half its CP when attacking units with the [mechanical] keyword.',
  },
  {
    name: 'Melee',
    cost: -1,
    description:
      'This weapon is a melee weapon and can only be used in close combat',
  },
  {
    name: 'Non-Lethal',
    cost: -1,
    description:
      'Before rolling for the attack, the unit declares the use of Non-Lethal. Resolve the attack as normal. If the total wounds dealt would kill the target, the target is instead knocked unconscious.',
  },
  {
    name: 'Savage(1)',
    cost: 1,
    description: "Increase the weapon's critical range by 1.",
  },
  {
    name: 'Savage(2)',
    cost: 2,
    description: "Increase the weapon's critical range by 2.",
  },
  {
    name: 'Savage(3)',
    cost: 3,
    description: "Increase the weapon's critical range by 3.",
  },
  {
    name: 'Parry',
    cost: 3,
    description:
      'When using this weapon, gain +1 competency when defending reactively in melee',
  },
  {
    name: 'Reach',
    cost: 1,
    description:
      'This weapon can attack units within 2in instead of requiring base to base contact',
  },
  {
    name: 'Brutal',
    cost: 2,
    description: 'Gain +1 CP on melee, but suffer -1 competency in melee',
  },
  {
    name: 'Colossal',
    cost: 2,
    description:
      'Gain +1 CP in melee, but the unit is unable to take reactions using this weapon',
  },
  {
    name: 'Charge',
    cost: 3,
    description:
      'Gain +1 CP when this weapon is used in melee immediately after the unit performs a Move action.',
  },
  {
    name: 'Burn',
    cost: 3,
    description: 'Applies a Burn Token on the targeted unit.',
  },
  {
    name: 'Posion',
    cost: 3,
    description: 'Applies a poison token on the targeted unit',
  },
  {
    name: 'Spray(2)',
    cost: 1,
    description:
      'This weapon can split its CP across up to 2 targets within range. CP is allocated before rolling any attacks.',
  },
  {
    name: 'Spray(3)',
    cost: 2,
    description:
      'This weapon can split its CP across up to 3 targets within range. CP is allocated before rolling any attacks.',
  },
  {
    name: 'Spray(4)',
    cost: 3,
    description:
      'This weapon can split its CP across up to 4 targets within range. CP is allocated before rolling any attacks.',
  },
  {
    name: 'Two Handed',
    cost: -2,
    description: 'This weapon takes up two weapon slots',
  },
  {
    name: 'Riposte',
    cost: 6,
    description:
      'This weapon allows for a single free attack against a melee attacker that deals no damage.',
  },
  {
    name: 'Hooked',
    cost: 3,
    description:
      'If this weapon hits, the target must pass a Resilience check or be repositioned 2 inches.',
  },
  {
    name: 'Shockwave',
    cost: 3,
    description:
      'On a successful hit, all other melee combatants take a 1/2 weapon CP hit',
  },
  {
    name: 'Syphon',
    cost: 6,
    description: 'If this weapon kills an enemy, the wielder regains 1 wound',
  },
  {
    name: 'Swift',
    cost: 3,
    description:
      'After attacking, this weapon allows the wielder to move again.',
  },
  {
    name: 'Returning',
    cost: 3,
    description:
      'This melee weapon is able to be thrown 8in. Resolve the attack as a melee attack. The weapon returns back to the user.',
  },
  {
    name: 'Purge',
    cost: 6,
    description:
      'Ignores armor when attacking enemies with the Eldritch keyword.',
  },
  {
    name: 'Smite',
    cost: 3,
    description: 'Gain +1 CP when targeting units with the Eldritch keyword',
  },
  { name: 'Vorpal', cost: 9, description: 'Ignores all armor when attacking' },
  {
    name: 'Shove',
    cost: 1,
    description: 'After dealing damage, push the targeted unit back 2in',
  },
  {
    name: 'Bleed',
    cost: 3,
    description:
      'When this weapon deals damage, the target suffers 1 damage at the start of their next activation unless they take an action to stop the bleeding.',
  },
  {
    name: 'Cleave',
    cost: 3,
    description:
      'If this weapon kills a unit, the attacker may make a free melee attack on another adjacent target with half CP',
  },
  {
    name: 'Defensive',
    cost: 3,
    description: 'If the wielder has not moved, gain +1 armor in melee',
  },
  {
    name: 'Ritual',
    cost: 1,
    description: 'When this weapon deals damage, gain +1 ritual token',
  },
  {
    name: 'Non-Lethal',
    cost: 1,
    description:
      'When this weapon drops a target to 0 wounds, the target is unconscious not killed.',
  },
  {
    name: 'Knockback',
    cost: 1,
    description: 'On a hit, the target is pushed back 2 inches.',
  },
  {
    name: 'Backstab(1)',
    cost: 3,
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 1 point of armor',
  },
  {
    name: 'Backstab(2)',
    cost: 6,
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 2 point of armor',
  },
  {
    name: 'Backstab(3)',
    cost: 9,
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 3 point of armor',
  },
  {
    name: 'Carnage',
    cost: 1,
    description:
      'If this weapon kills a unit, all enemy units within 6 inches must make a Willpower check. On failure, they drop 1 Morale Level.',
  },
  {
    name: 'Terror (1)',
    cost: 1,
    description:
      'When this weapon hits, the target suffers -1 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
  },
  {
    name: 'Terror (2)',
    cost: 2,
    description:
      'When this weapon hits, the target suffers -2 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
  },
  {
    name: 'Terror (3)',
    cost: 3,
    description:
      'When this weapon hits, the target suffers -3 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
  },
  {
    name: 'Panic',
    cost: 6,
    description:
      'If this weapon causes a unit to drop to Broken, that unit immediately moves its full movement away from the attacker instead of just seeking cover.',
  },
]
