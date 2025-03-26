import { ArmorKeywords } from './armor-tags';
import { AllowedTags } from './units'

export interface Armor {
  name: string;
  allowedTags: AllowedTags[]; // Which unit types can wear this armor
  cost: number;
  description: string;
  armorValue: number;
  aegisValue: number;
  armorKeywords?: ArmorKeywords[]
  factionSpecific?: string;
}

export const armorList: Armor[] = [
  {
    name:'Trench Coat',
    allowedTags:["Line Infantry" , "Shock Trooper" , "Skirmisher" , "Marksmen" , "Support" , "Gunner" , "Summoner" , "Eldritch" , "Hallowed" , "Operative" , "Melee Specialist" , "Ironclad" , "Vyled"],
    cost: 2,
    description: 'A long coat that provides some protection from the elements.',
    armorValue: 1,
    aegisValue: 0,
  },
  {
    name:'Plate Armor',
    allowedTags:['Gunner','Shock Trooper','Melee Specialist'],
    cost: 6,
    description: 'A suit of heavy armor that provides excellent protection.',
    armorValue: 3,
    aegisValue: 0,
    armorKeywords:["Heavy"]
  },
  {
    name:'Bulwark Rig',
    allowedTags:['Ironclad','Gunner'],
    cost: 4,
    description: 'A heavy suit of armor that provides excellent protection.',
    armorValue: 2,
    aegisValue: 0,
    armorKeywords:["Heavy","Reinforced Frame","Ballistic Resistant","Plate (2)","Mechanical"]
  }
]

export function getArmorByKeyword(keyword: AllowedTags): Armor[] {
  return armorList.filter((armor) => armor.allowedTags.includes(keyword))
}
