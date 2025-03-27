import useWarbandStore from '@/store/warband-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function WarbandRoster() {
 const { warband, removeUnit, totalPoints } = useWarbandStore()

 return (
  <div className="p-6 text-white bg-gray-900">
   <h1 className="text-3xl font-bold mb-6">Warband Roster</h1>
   <p className="text-lg mb-4">Total Warband Cost: {totalPoints} pts</p>

   {warband.length === 0 ? (
    <p className="text-gray-400">No units added yet.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {warband.map((unit, index) => (
      <Card key={index} className="bg-gray-800 text-white">
       <CardHeader>
        <CardTitle>{unit.name}</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="mb-1 text-sm text-gray-300">
         <strong>Cost:</strong> {unit.totalCost} pts
        </p>
        <p className="mb-1">
         <strong>Weapons:</strong>{' '}
         {unit.weapons.map((w) => w.name).join(', ') || 'None'}
        </p>
        <p className="mb-1">
         <strong>Armor:</strong>{' '}
         {unit.armor.map((a) => a.name).join(', ') || 'None'}
        </p>
        <p className="mb-1">
         <strong>Equipment:</strong>{' '}
         {unit.equipment.map((e) => e.name).join(', ') || 'None'}
        </p>
        <p className="mb-1">
         <strong>Skills:</strong>{' '}
         {unit.skills.map((s) => s.name).join(', ') || 'None'}
        </p>
        <div className="flex justify-around items-center p-4 border-t border-gray-300">
         <Button
          variant="outline"
          className="text-black"
          onClick={() => removeUnit(index)}
         >
          Remove Unit
         </Button>
        </div>
        {/* <Button
         variant="outline"
         className="mt-4"
         onClick={() => removeUnit(index)}
        >
         Remove Unit
        </Button> */}
       </CardContent>
      </Card>
     ))}
    </div>
   )}
  </div>
 )
}
