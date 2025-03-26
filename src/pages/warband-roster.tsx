import useWarbandStore from '../store/warband-store'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { weaponKeywords } from '../data/weapon-tags'
import { armorList } from '../data/armor'
import { skills } from '../data/skills'

// Generic tooltip component for items with descriptions
function ItemTooltip({
  name,
  description,
  cost,
}: {
  name: string
  description: string
  cost: number
}) {
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const updateTooltipPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (showTooltip) {
        updateTooltipPosition()
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [showTooltip])

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if ('ontouchstart' in window) {
      setShowTooltip(!showTooltip)
      if (!showTooltip) {
        updateTooltipPosition()
      }
    }
  }

  const tooltip =
    showTooltip &&
    createPortal(
      <div
        ref={tooltipRef}
        className={`fixed p-2 bg-black text-white text-xs rounded shadow-lg z-50 ${
          window.innerWidth <= 480
            ? 'w-[calc(100vw-16px)] bottom-4 left-2 right-2'
            : 'w-48'
        }`}
        style={{
          top: window.innerWidth <= 480 ? 'auto' : `${tooltipPosition.top}px`,
          left: window.innerWidth <= 480 ? '8px' : `${tooltipPosition.left}px`,
          transform:
            window.innerWidth <= 480 ? 'none' : 'translate(-50%, -100%)',
        }}
      >
        <div className="relative">
          {window.innerWidth <= 480 && (
            <button
              className="absolute -top-1 -right-1 w-5 h-5 bg-gray-600 rounded-full text-xs flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setShowTooltip(false)
              }}
            >
              ×
            </button>
          )}
          <div className="font-semibold">Cost: {cost}</div>
          <div className="mt-1">{description}</div>
        </div>
      </div>,
      document.body
    )

  return (
    <span
      ref={containerRef}
      className="bg-gray-700 px-2 py-1 rounded-full text-sm relative inline-block cursor-help select-none"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseEnter={() => {
        if (!('ontouchstart' in window)) {
          updateTooltipPosition()
          setShowTooltip(true)
        }
      }}
      onMouseLeave={() => {
        if (!('ontouchstart' in window)) {
          setShowTooltip(false)
        }
      }}
    >
      {name}
      {tooltip}
    </span>
  )
}

// KeywordTooltip component
function KeywordTooltip({ keyword }: { keyword: string }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const keywordInfo = weaponKeywords.find((k) => k.name === keyword)

  const updateTooltipPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (showTooltip) {
        updateTooltipPosition()
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [showTooltip])

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if ('ontouchstart' in window) {
      setShowTooltip(!showTooltip)
      if (!showTooltip) {
        updateTooltipPosition()
      }
    }
  }

  if (!keywordInfo) return null

  const tooltip =
    showTooltip &&
    createPortal(
      <div
        ref={tooltipRef}
        className={`fixed p-2 bg-black text-white text-xs rounded shadow-lg z-50 ${
          window.innerWidth <= 480
            ? 'w-[calc(100vw-16px)] bottom-4 left-2 right-2'
            : 'w-48'
        }`}
        style={{
          top: window.innerWidth <= 480 ? 'auto' : `${tooltipPosition.top}px`,
          left: window.innerWidth <= 480 ? '8px' : `${tooltipPosition.left}px`,
          transform:
            window.innerWidth <= 480 ? 'none' : 'translate(-50%, -100%)',
        }}
      >
        <div className="relative">
          {window.innerWidth <= 480 && (
            <button
              className="absolute -top-1 -right-1 w-5 h-5 bg-gray-600 rounded-full text-xs flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setShowTooltip(false)
              }}
            >
              ×
            </button>
          )}
          <div className="font-semibold">Cost: {keywordInfo.cost}</div>
          <div className="mt-1">{keywordInfo.description}</div>
        </div>
      </div>,
      document.body
    )

  return (
    <span
      ref={containerRef}
      className="bg-gray-700 px-2 py-1 rounded-full text-sm relative inline-block cursor-help select-none"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseEnter={() => {
        if (!('ontouchstart' in window)) {
          updateTooltipPosition()
          setShowTooltip(true)
        }
      }}
      onMouseLeave={() => {
        if (!('ontouchstart' in window)) {
          setShowTooltip(false)
        }
      }}
    >
      {keyword}
      {tooltip}
    </span>
  )
}

export default function WarbandRoster() {
  const { warband, totalPoints, removeUnit } = useWarbandStore()
  const navigate = useNavigate()

  // Force re-render on mount
  useEffect(() => {
    console.log('WarbandRoster mounted')
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      {/* MAJOR TEST CHANGES */}
      <div className="bg-red-600 text-white p-8 rounded-lg mb-8 text-2xl font-bold">
        🚨 TESTING UPDATES - V3 🚨
      </div>

      <h1 className="text-4xl font-bold mb-6">
        Your Warband - Updated Version
      </h1>

      {/* Debug info always visible */}
      <div className="mb-4 p-4 bg-purple-800 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-2">Always Visible Debug:</h2>
        <pre className="whitespace-pre-wrap text-xs">
          {JSON.stringify({ warband, totalPoints }, null, 2)}
        </pre>
      </div>

      {/* Show total warband cost */}
      <p className="text-xl font-semibold mb-4">
        Total Warband Cost: {totalPoints} pts
      </p>

      {/* Display list of added units */}
      {warband.length > 0 ? (
        <div className="w-full max-w-3xl">
          {warband.map((unit, index) => {
            console.log(`Unit ${index} weapons:`, unit.weapons)
            if (unit.weapons.length > 0) {
              console.log(`Unit ${index} first weapon:`, unit.weapons[0])
              console.log(
                `Unit ${index} weapon keywords:`,
                unit.weapons[0].keywords
              )
            }
            return (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center"
              >
                <div>
                  <div>
                    <h3 className="text-lg font-bold">{unit.name}</h3>
                    <p className="text-gray-400">Cost: {unit.totalCost} pts</p>
                    <div className="text-gray-400">
                      Weapon:{' '}
                      {unit.weapons.length > 0 ? (
                        <div className="inline-flex flex-wrap gap-1 items-center">
                          <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                            {unit.weapons[0].name}
                          </span>
                          {unit.weapons[0].keywords.map((keyword, kidx) => (
                            <KeywordTooltip key={kidx} keyword={keyword} />
                          ))}
                        </div>
                      ) : (
                        'None'
                      )}
                    </div>
                    <div className="text-gray-400">
                      Armor:{' '}
                      {unit.armor.length > 0 ? (
                        <div className="inline-flex flex-wrap gap-1 items-center">
                          {unit.armor.map((item, idx) => {
                            const armorDetails = armorList.find(
                              (a) => a.name === item.name
                            )
                            return armorDetails ? (
                              <ItemTooltip
                                key={idx}
                                name={item.name}
                                description={armorDetails.description}
                                cost={armorDetails.cost}
                              />
                            ) : (
                              <span key={idx} className="mr-1">
                                {item.name}
                              </span>
                            )
                          })}
                        </div>
                      ) : (
                        'None'
                      )}
                    </div>
                    <div className="text-gray-400">
                      Skills:{' '}
                      {unit.skills.length > 0 ? (
                        <div className="inline-flex flex-wrap gap-1 items-center">
                          {unit.skills.map((skill, idx) => {
                            const skillDetails = skills.find(
                              (s) => s.name === skill.name
                            )
                            return skillDetails ? (
                              <ItemTooltip
                                key={idx}
                                name={skill.name}
                                description={skillDetails.description}
                                cost={skillDetails.cost}
                              />
                            ) : (
                              <span key={idx} className="mr-1">
                                {skill.name}
                              </span>
                            )
                          })}
                        </div>
                      ) : (
                        'None'
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeUnit(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-400">No units added yet.</p>
      )}

      {/* Buttons for navigation */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/units')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold mr-4"
        >
          Add More Units
        </button>
      </div>
    </div>
  )
}
