import { AllowedTags } from './units'
import { WeaponKeywordName, weaponKeywords } from './weapon-tags'

// Base weapon cost modifiers
const COST_PER_CP = 3

export interface Weapon {
  name: string
  slotCost: number
  combatPower: number
  keywords: WeaponKeywordName[]
  allowedTags: AllowedTags[]
  factionSpecific?: string
}

// Calculate the cost of a weapon based on its stats and keywords
export function calculateWeaponCost(weapon: Weapon): number {
  // Base cost from Combat Power
  const cost = Math.ceil(weapon.combatPower * COST_PER_CP)

  // Add costs from keywords (both positive and negative)
  const keywordCost = weapon.keywords.reduce((total, keyword) => {
    const keywordDef = weaponKeywords.find((k) => k.name === keyword)
    return total + (keywordDef?.cost || 0)
  }, 0)

  // Ensure minimum cost of 1
  return Math.max(1, Math.ceil(cost + keywordCost))
}

// Helper function to get total cost of a weapon
export function getWeaponCost(weapon: Weapon): number {
  return calculateWeaponCost(weapon)
}

export const weapons: Weapon[] = [
  {
    name: 'Bolt Rifle',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Steady', 'Anti-Infantry (AIF)', 'Long Range'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Support',
      'Gunner',
      'Summoner',
      'Ironclad',
      'Eldritch',
      'Hallowed',
      'Operative',
    ],
  },
  {
    name: 'Assault Pistol',
    combatPower: 2.0,
    slotCost:1,
    keywords: [
      'Rapid Rife',
      'Close Range',
      'Supressive',
      'Anti-Infantry (AIF)',
    ],
    allowedTags: ['Shock Trooper', 'Skirmisher', 'Operative'],
  },
  {
    name: 'Heavy Machine Gun',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Rapid Rife',
      'Deployed',
      'Supressive',
      'Spray(2)',
    ],
    allowedTags: ['Gunner', 'Ironclad'],
  },
  {
    name: 'Submachine Gun',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Rapid Rife', 'Close Range', 'Anti-Infantry (AIF)', 'Spray(2)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Gunner',
      'Support',
      'Operative',
      'Summoner',
    ],
  },
  {
    name: 'Long Rifle',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Long Range', 'Steady', 'AP(1)', 'Anti-Infantry (AIF)'],
    allowedTags: ['Marksmen', 'Operative'],
  },
  {
    name: 'Revolver',
    combatPower: 3.0,
    slotCost:1,
    keywords: ['AP(1)', 'Close Range', 'Savage(1)', 'Anti-Infantry (AIF)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Gunner',
      'Support',
      'Operative',
      'Summoner',
      'Ironclad',
    ],
  },
  {
    name: 'Pistol',
    combatPower: 2.0,
    slotCost:1,
    keywords: ['Close Range', 'Anti-Infantry (AIF)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Gunner',
      'Support',
      'Operative',
      'Summoner',
      'Ironclad',
    ],
  },
  {
    name: 'Storm Rifle',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Rapid Rife',
      'Supressive',
      'Spray(2)',
      'Anti-Infantry (AIF)',
      'Unwieldy',
    ],
    allowedTags: ['Shock Trooper', 'Gunner', 'Operative', 'Ironclad'],
  },
  {
    name: 'Autocannon',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Deployed',
      'Anti-Infantry (AIF)',
      'Explosive',
      'AP(1)',
    ],
    allowedTags: ['Gunner', 'Ironclad'],
  },
  {
    name: 'Trenchgun',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Close Range',
      'Template (Cone)',
      'Anti-Infantry (AIF)',
      'Knockback',
    ],
    allowedTags: ['Shock Trooper', 'Skirmisher', 'Operative'],
  },
  {
    name: 'Flamethrower',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Close Range',
      'Template (Cone)',
      'Anti-Infantry (AIF)',
      'Burn',
      'Overheat (2)',
    ],
    allowedTags: ['Shock Trooper', 'Gunner', 'Ironclad'],
  },
  {
    name: 'Light Rocket Launcher',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Explosive',
      'Template (Circle)',
      'Reload',
      'Anti-mechanized (AM)',
      'AP(2)',
    ],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Gunner',
      'Ironclad',
    ],
  },
  {
    name: 'Heavy Rocket Launcher',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'AP(3)',
      'Long Range',
      'Explosive',
      'Template (Circle)',
      'Reload',
      'Anti-mechanized (AM)',
    ],
    allowedTags: ['Gunner', 'Ironclad'],
  },
  {
    name: 'Grenade Launcher (Explosive)',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Unwieldy',
      'Explosive',
      'Targetless',
      'Template (Circle)',
      'Reload',
      'Anti-Infantry (AIF)',
    ],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Gunner',
      'Ironclad',
    ],
  },
  {
    name: 'Grenade Launcher (Toxic)',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Unwieldy',
      'Explosive',
      'Targetless',
      'Template (Circle)',
      'Stun(Organic)',
      'Reload',
      'Anti-Infantry (AIF)',
      'Non-Lethal',
    ],
    allowedTags: [
      'Shock Trooper',
      'Line Infantry',
      'Skirmisher',
      'Gunner',
      'Ironclad',
    ],
  },
  {
    name: 'Grenade Launcher (Poison)',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Unwieldy',
      'Explosive',
      'Targetless',
      'Template (Circle)',
      'Reload',
      'Anti-Infantry (AIF)',
      'Posion',
    ],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Gunner',
      'Ironclad',
    ],
  },
  {
    name: 'Bayonet',
    combatPower: 3.0,
    slotCost:1,
    keywords: ['Melee', 'Reach', 'Charge'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Operative',
      'Melee Specialist',
    ],
  },
  {
    name: 'Greatsword',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Colossal',
      'Brutal',
      'Reach',
      'Savage(1)',
      'Melee',
      'Two Handed',
    ],
    allowedTags: ['Melee Specialist', 'Ironclad'],
  },
  {
    name: 'Longsword',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Melee', 'Parry'],
    allowedTags: ['Line Infantry'],
  },
  {
    name: 'Gauss Rifle',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['AP(2)', 'Steady', 'Lock'],
    allowedTags: ['Marksmen', 'Gunner', 'Ironclad'],
  },
  {
    name: 'Arc Rifle',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Close Range', 'Stun(Organic)', 'Arc (2)', 'Overheat (3)'],
    allowedTags: ['Support', 'Ironclad', 'Shock Trooper'],
  },
  {
    name: 'Trench Club',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Melee', 'Brutal', 'Stun(Organic)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Gunner',
      'Support',
      'Operative',
      'Summoner',
      'Melee Specialist',
    ],
  },
  {
    name: 'Entrenching Tool',
    combatPower: 3.0,
    slotCost:1,
    keywords: ['Melee', 'Parry', 'Bleed', 'Shove'],
    allowedTags: ['Line Infantry', 'Shock Trooper', 'Skirmisher', 'Gunner'],
  },
  {
    name: 'Bowie Knife',
    combatPower: 2.0,
    slotCost:1,
    keywords: ['Melee', 'Silenced', 'Savage(1)', 'Backstab(1)'],
    allowedTags: ['Shock Trooper', 'Operative'],
  },
  {
    name: 'Knuckle Dusters',
    combatPower: 3.0,
    slotCost:1,
    keywords: ['Shove', 'Charge', 'Brutal', 'Melee'],
    allowedTags: ['Line Infantry', 'Shock Trooper'],
  },
  {
    name: 'Pickaxe',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Two Handed', 'Brutal', 'AP(2)', 'Unwieldy', 'Melee'],
    allowedTags: ['Line Infantry', 'Gunner', 'Support'],
  },
  {
    name: 'Barbwire Whip',
    slotCost:1,
    combatPower: 2.0,
    keywords: ['Bleed', 'Hooked', 'Reach', 'Melee'],
    allowedTags: ['Skirmisher', 'Operative', 'Support'],
  },
  {
    name: 'Axe',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['AP(1)', 'Two Handed', 'Melee', 'Cleave'],
    allowedTags: ['Shock Trooper', 'Skirmisher'],
  },
  {
    name: 'Trench Pike',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Two Handed', 'Colossal', 'Reach', 'Melee'],
    allowedTags: ['Line Infantry'],
  },
  {
    name: 'Poleaxe',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Two Handed', 'Reach', 'AP(2)', 'Brutal', 'Melee'],
    allowedTags: ['Melee Specialist'],
  },
  {
    name: 'Halberd',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Cleave', 'Two Handed', 'Reach', 'Melee'],
    allowedTags: ['Melee Specialist'],
  },
  {
    name: 'Macuahuitl',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Bleed', 'Brutal', 'Savage(1)', 'Melee'],
    allowedTags: ['Melee Specialist'],
  },
  {
    name: 'Serpents Fang',
    combatPower: 2.0,
    slotCost:1,
    keywords: ['Ritual', 'Swift', 'Posion', 'Savage(1)', 'Bleed'],
    allowedTags: ['Operative', 'Summoner', 'Melee Specialist', 'Eldritch'],
  },
  {
    name: 'Spineblade',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Melee', 'Syphon', 'Purge'],
    allowedTags: ['Eldritch', 'Hallowed', 'Melee Specialist'],
  },
  {
    name: 'Soulsplint Chakrams',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Returning', 'Swift', 'Bleed', 'Arc (2)'],
    allowedTags: ['Eldritch', 'Melee Specialist'],
  },
  {
    name: 'Trench Spear',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Reach', 'Shove', 'Melee', 'AP(1)'],
    allowedTags: ['Line Infantry', 'Shock Trooper', 'Skirmisher'],
  },
  {
    name: 'Trench Sweeper',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Close Range', 'Anti-Infantry (AIF)', 'Spray(3)'],
    allowedTags: ['Gunner', 'Ironclad'],
  },
  {
    name: 'Ripper Sawblade',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Brutal', 'Bleed', 'Two Handed', 'Melee'],
    allowedTags: ['Melee Specialist', 'Ironclad'],
  },
  {
    name: 'Gilded Bolt Rifle',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Steady', 'Long Range', 'Anti-Infantry (AIF)', 'Smite'],
    allowedTags: ['Marksmen', 'Operative'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Sanctified Autocannon',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Long Range',
      'Deployed',
      'AP(1)',
      'Anti-Infantry (AIF)',
      'Smite',
    ],
    allowedTags: ['Gunner', 'Ironclad'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Spear of Saint Varro',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Melee', 'Reach', 'Smite', 'AP(2)', 'Purge'],
    allowedTags: ['Hallowed', 'Melee Specialist'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Saints Blood Maul',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Melee', 'Smite', 'Brutal', 'Stun(Eldritch)'],
    allowedTags: ['Hallowed', 'Melee Specialist'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Purifyer',
    combatPower: 3.0,
    slotCost:2,
    keywords: [
      'Close Range',
      'Template (Cone)',
      'Burn',
      'Overheat (3)',
      'Smite',
    ],
    allowedTags: ['Shock Trooper', 'Gunner', 'Ironclad'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Martyrs Blade',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Melee', 'Savage(2)', 'Syphon'],
    allowedTags: ['Melee Specialist', 'Hallowed'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Judges Pistol',
    combatPower: 3.0,
    slotCost:1,
    keywords: ['Close Range', 'AP(2)', 'Purge'],
    allowedTags: ['Shock Trooper', 'Operative', 'Hallowed'],
    factionSpecific: 'Church of the Martyr',
  },
  {
    name: 'Xotecs Twin Fangs',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Melee', 'Swift', 'Syphon', 'Posion'],
    allowedTags: ['Operative', 'Summoner', 'Melee Specialist'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Sun Eater Maw',
    combatPower: 4.0,
    slotCost:2,
    keywords: ['Long Range', 'Beam', 'Burn', 'Overheat (4)', 'Ritual'],
    allowedTags: ['Gunner', 'Ironclad', 'Eldritch'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Tezcatlipocas Gaze',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Close Range', 'Arc (2)', 'Stun(Organic)', 'Ritual'],
    allowedTags: ['Summoner', 'Eldritch', 'Vyled', 'Shock Trooper'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Soulshard Caster',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Arc (2)', 'Ritual', 'Syphon'],
    allowedTags: ['Summoner', 'Eldritch', 'Operative'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Chained Wraithstone',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Returning', 'Stun(Organic)'],
    allowedTags: ['Summoner', 'Eldritch', 'Operative'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Blacksun Crystal',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Beam', 'Burn', 'Overheat (3)', 'Ritual'],
    allowedTags: ['Gunner', 'Eldritch'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Soulshard Splinter',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Arc (2)', 'Ritual', 'Close Range'],
    allowedTags: ['Line Infantry', 'Shock Trooper', 'Skirmisher', 'Summoner'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Soulpyre Spout',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Burn', 'Template (Cone)', 'Ritual'],
    allowedTags: ['Line Infantry', 'Shock Trooper'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Tzitzimimes Claws',
    combatPower: 2.0,
    slotCost:2,
    keywords: ['Returning', 'Stun(Organic)', 'Savage(2)', 'Bleed'],
    allowedTags: ['Skirmisher', 'Summoner', 'Support'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Spirit Bow',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Steady', 'AP(1)', 'Ritual'],
    allowedTags: ['Line Infantry', 'Marksmen'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Crones Bone',
    combatPower: 2.0,
    slotCost:2,
    keywords: ['Bleed', 'Melee', 'Ritual', 'Silenced', 'AP(1)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Marksmen',
      'Gunner',
      'Support',
      'Operative',
      'Summoner',
      'Melee Specialist',
    ],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Ocelotls Claws',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Swift', 'Melee', 'Silenced', 'Savage(2)', 'Bleed'],
    allowedTags: ['Shock Trooper', 'Melee Specialist', 'Skirmisher'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Grand Itztli',
    combatPower: 4.0,
    slotCost:2,
    keywords: [
      'Melee',
      'Colossal',
      'Two Handed',
      'Cleave',
      'Reach',
      'Savage(3)',
    ],
    allowedTags: ['Melee Specialist', 'Eldritch'],
    factionSpecific: 'Xiuhcoatl',
  },
  {
    name: 'Itzli',
    combatPower: 3.0,
    slotCost:2,
    keywords: ['Melee', 'Parry', 'Savage(1)'],
    allowedTags: [
      'Line Infantry',
      'Shock Trooper',
      'Skirmisher',
      'Support',
      'Operative',
      'Summoner',
      'Melee Specialist',
    ],
    factionSpecific: 'Xiuhcoatl',
  },
]

// Helper function to get a weapon by name
export function getWeaponByName(name: string): Weapon | undefined {
  return weapons.find((weapon) => weapon.name === name)
}

// Helper function to get all weapons with a specific keyword
export function getWeaponsByKeyword(keyword: WeaponKeywordName): Weapon[] {
  return weapons.filter((weapon) => weapon.keywords.includes(keyword))
}

// Helper function to get all melee weapons
export function getMeleeWeapons(): Weapon[] {
  return getWeaponsByKeyword('Melee')
}

// Get weapons by cost range using calculated costs
export function getWeaponsByBaseCostRange(
  minCost: number,
  maxCost: number
): Weapon[] {
  return weapons.filter((weapon) => {
    const totalCost = calculateWeaponCost(weapon)
    return totalCost >= minCost && totalCost <= maxCost
  })
}

// Helper function to get weapons by faction
export function getWeaponsByFaction(faction: string): Weapon[] {
  return weapons.filter((weapon) => weapon.factionSpecific === faction)
}

// Helper function to get generic weapons (non-faction specific)
export function getGenericWeapons(): Weapon[] {
  return weapons.filter((weapon) => !weapon.factionSpecific)
}
