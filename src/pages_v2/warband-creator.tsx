import { Button } from '@/components/ui/button'
import useWarbandStore, { WarbandState } from '@/store/warband-store'
import { useState } from 'react'
import WarbandRoster from './warband-roster'
import UnitSelect from './unit-select'

export default function WarbandCreator() {
  const selectedFaction = useWarbandStore(
    (state: WarbandState) => state.selectedFaction
  )
  const [viewMode, setViewMode] = useState<'selection' | 'roster'>('selection')

  if (!selectedFaction) {
    return (
      <div className="p-6 text-center text-lg text-red-600">
        Please select a faction
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full p-8 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {selectedFaction.name}
      </h1>
      <div className="border-b border-gray-300 mb-4" />
      <div className="flex-1 overflow-auto">
        {viewMode === 'selection' ? <UnitSelect /> : <WarbandRoster />}
      </div>
      <SubnavigationBar setViewMode={setViewMode} />
    </div>
  )
}

interface SubnavigationBarProps {
  setViewMode: (viewMode: 'selection' | 'roster') => void
}

function SubnavigationBar({ setViewMode }: SubnavigationBarProps) {
  return (
    <div className="flex justify-around items-center p-4 border-t border-gray-300">
      <Button variant="outline" onClick={() => setViewMode('selection')}>
        Unit List
      </Button>
      <Button variant="outline" onClick={() => setViewMode('roster')}>
        Roster
      </Button>
    </div>
  )
}
