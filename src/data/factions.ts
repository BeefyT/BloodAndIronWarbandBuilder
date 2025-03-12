export interface Faction {
  name: string
  description: string
  image: string
}

export const factions: Faction[] = [
  {
    name: 'Church of the Martyr',
    description: 'Elite warriors empowered by faith and divine relics.',
    image: '/images/church.jpg',
  },
  {
    name: 'Xiuhcoatl Theocracy',
    description: 'A cult of eldritch summoners, thriving on sacrifice.',
    image: '/images/xiuhcoatl.jpg',
  },
  {
    name: 'Cragenhelm Empire',
    description: 'A mechanized superpower with heavily armored soldiers.',
    image: '/images/cragenhelm.jpg',
  },
  {
    name: "Lords' Alliance",
    description: 'A feudal kingdom relying on levies and knightly orders.',
    image: '/images/lords-alliance.jpg',
  },
]
