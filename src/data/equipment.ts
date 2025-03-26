import { AllowedTags } from './units'

export interface Equipment {
 name: string
 effect: string
 uses: number | 'Unlimited'
 cost: number
 allowedTags: AllowedTags[]
 factionSpecific?: string
}

export const equipment: Equipment[] = [
 // Grenades & Explosives (Single-Use)
 {
  name: 'Frag Grenade',
  effect: 'Deals CP 2 to all units in range.',
  uses: 3,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Melee Specialist',
   'Operative',
  ],
 },
 {
  name: 'EMP Grenade Stun',
  effect: 'Disables Diesel armor & mechs for 1 turn.',
  uses: 3,
  cost: 3,
  allowedTags: ['Shock Trooper', 'Operative', 'Melee Specialist'],
 },
 {
  name: 'Flashbang',
  effect: 'All units in template suffer 1 Competency for 1 round.',
  uses: 3,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Melee Specialist',
  ],
 },
 {
  name: 'Bloodchoke Gas Poison',
  effect: 'Target suffers 1 CP damage per turn unless treated.',
  uses: 3,
  cost: 3,
  allowedTags: ['Shock Trooper', 'Operative', 'Melee Specialist'],
 },
 {
  name: 'Hellflame Satchel',
  effect:
   'Ignites all units in blast radius, causing CP 2 fire damage over time.',
  uses: 3,
  cost: 3,
  allowedTags: ['Shock Trooper', 'Operative', 'Melee Specialist'],
 },
 {
  name: 'Rattler Knockback',
  effect: 'Pushes enemies 2 inches away on detonation.',
  uses: 3,
  cost: 2,
  allowedTags: ['Shock Trooper', 'Operative', 'Melee Specialist'],
 },
 {
  name: 'Smoke Canister',
  effect: 'Creates a 6-inch cloud that blocks line of sight.',
  uses: 3,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Melee Specialist',
   'Support',
  ],
 },
 {
  name: 'Wire Nest',
  effect:
   'Creates a 6-inch area of difficult terrain, that when entered causes Bleed 1.',
  uses: 2,
  cost: 2,
  allowedTags: [
   'Gunner',
   'Support',
   'Skirmisher',
   'Shock Trooper',
   'Operative',
  ],
 },
 {
  name: 'Choke Smoke',
  effect: 'Creates a 6-inch cloud of Stun Organic.',
  uses: 3,
  cost: 3,
  allowedTags: ['Shock Trooper', 'Operative', 'Melee Specialist'],
 },
 // Deployables & Traps (Single-Use)
 {
  name: 'Trophy',
  effect:
   'Deploys a 3-inch radius shield that grants 1 Armor against ranged attacks to allies inside.',
  uses: 1,
  cost: 3,
  allowedTags: ['Gunner', 'Support'],
 },
 {
  name: 'Bouncing Reaper',
  effect: 'Explodes when an enemy moves into its radius, dealing CP 3.',
  uses: 2,
  cost: 3,
  allowedTags: [
   'Gunner',
   'Support',
   'Skirmisher',
   'Shock Trooper',
   'Operative',
  ],
 },
 {
  name: 'Trenchwork',
  effect: 'Deploys a 6-inch piece of hard cover.',
  uses: 2,
  cost: 2,
  allowedTags: ['Gunner', 'Support', 'Line Infantry'],
 },
 {
  name: "Watcher's Eye",
  effect: 'Reveals stealth units within 8 inches.',
  uses: 1,
  cost: 3,
  allowedTags: [
   'Gunner',
   'Support',
   'Skirmisher',
   'Shock Trooper',
   'Operative',
  ],
 },
 // Tactical Gear (Multi-Use but Limited Charges)
 {
  name: 'Strider Pack',
  effect: 'Unit may perform a free 6-inch jump.',
  uses: 3,
  cost: 2,
  allowedTags: ['Skirmisher', 'Operative', 'Melee Specialist', 'Shock Trooper'],
 },
 {
  name: 'Deadeye Visor',
  effect: 'Grants 1 CP when attacking designated targets.',
  uses: 'Unlimited',
  cost: 3,
  allowedTags: ['Gunner', 'Marksmen', 'Operative'],
 },
 {
  name: 'Blindspot Cloak',
  effect: 'Gain Stealth for 1 round if not in line of sight.',
  uses: 1,
  cost: 3,
  allowedTags: ['Skirmisher', 'Operative', 'Melee Specialist', 'Shock Trooper'],
 },
 {
  name: 'Kickstarter',
  effect:
   'If this unit is reduced to 0 Wounds, they automatically regain 1 Wound.',
  uses: 1,
  cost: 3,
  allowedTags: ['Skirmisher', 'Operative', 'Melee Specialist', 'Shock Trooper'],
 },
 {
  name: 'Accelerator',
  effect:
   'Once per game, may make a free attack action or reaction without spending Vigor.',
  uses: 1,
  cost: 3,
  allowedTags: ['Operative', 'Melee Specialist', 'Shock Trooper'],
 },
 {
  name: 'Resurge',
  effect:
   'Makes the target immune to stun (mechanical) for one turn or disables the stun (mechanical) state.',
  uses: 1,
  cost: 3,
  allowedTags: ['Ironclad'],
 },
 {
  name: 'Noct-Lens',
  effect: 'Ignore Concealment penalties and see through smoke.',
  uses: 'Unlimited',
  cost: 3,
  allowedTags: ['Gunner', 'Marksmen', 'Operative'],
 },
 // Medical & Support (Limited Healing Uses)
 {
  name: "Medic's Satchel",
  effect: 'Restores 1 Wound to a unit.',
  uses: 2,
  cost: 2,
  allowedTags: ['Support'],
 },
 {
  name: 'Stimpack',
  effect: 'Grants 1 Vigor for 1 turn, then suffer 1 Competency next turn.',
  uses: 2,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
 {
  name: 'Ironspanner Kit',
  effect: 'Restores 1 Wound to a mechanical unit (Diesel/Ironclad).',
  uses: 2,
  cost: 2,
  allowedTags: ['Ironclad', 'Support'],
 },
 {
  name: 'Fleshstitch Serum',
  effect: 'Unit regenerates 1 Wound at the start of its next activation.',
  uses: 1,
  cost: 3,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
 // Equipment 2
 {
  name: 'Numb Tonic',
  effect: 'Reduce incoming damage by 1 for 1 round.',
  uses: 1,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
 {
  name: 'Coagulant',
  effect: 'Removes bleed.',
  uses: 1,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
 {
  name: 'Venopurge',
  effect: 'Removes Poison.',
  uses: 1,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
 {
  name: 'Hollowpoint Serum',
  effect: 'Removes fear debuffs.',
  uses: 1,
  cost: 2,
  allowedTags: [
   'Line Infantry',
   'Shock Trooper',
   'Skirmisher',
   'Marksmen',
   'Gunner',
   'Support',
   'Operative',
   'Melee Specialist',
  ],
 },
]
