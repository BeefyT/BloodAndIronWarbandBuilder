import { useNavigate } from 'react-router-dom'
import { Faction, factions } from '@/data/factions'
import useWarbandStore, { WarbandState } from '@/store/warband-store'

export default function FactionSelection() {
 const navigate = useNavigate()
 const setFaction = useWarbandStore((state: WarbandState) => state.setFaction)

 const selectFaction = (faction: Faction) => {
  setFaction(faction)
  navigate('/creator') // Navigate to the unit selection page
 }

 return (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 md:p-10">
   <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
    Select Your Faction
   </h1>

   {/* Responsive Grid: 1 column on mobile, 2 on tablets, 4 on desktop */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
    {factions.map((faction, index) => (
     <div
      key={index}
      className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer transition transform hover:scale-105 duration-200"
      onClick={() => selectFaction(faction)}
     >
      <img
       src={faction.image}
       alt={faction.name}
       className="w-full h-32 md:h-40 object-cover rounded-md mb-3"
      />
      <h2 className="text-xl md:text-2xl font-semibold text-center">
       {faction.name}
      </h2>
      <p className="text-gray-400 mt-2 text-sm md:text-base text-center">
       {faction.description}
      </p>
     </div>
    ))}
   </div>
  </div>
 )
}
