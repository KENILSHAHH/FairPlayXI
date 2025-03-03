"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"

interface Player {
  id: string
  name: string
  role: string
  team: string
}

interface PlayerDropdownProps {
  players: Player[]
  selectedPlayers: Player[]
  maxSelections: number
  onSelect: (player: Player) => void
  onRemove: (playerId: string) => void
}

export default function PlayerDropdown({
  players,
  selectedPlayers,
  maxSelections,
  onSelect,
  onRemove,
}: PlayerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter out already selected players
  const availablePlayers = players.filter((player) => !selectedPlayers.some((selected) => selected.id === player.id))

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="border rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-gray-200 rounded px-2 py-1 flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {player.name}
            <button onClick={() => onRemove(player.id)} className="ml-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="absolute right-2 top-2 flex">
        {selectedPlayers.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              selectedPlayers.forEach((player) => onRemove(player.id))
            }}
            className="text-gray-400"
          >
            ×
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="text-gray-400 ml-2"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {availablePlayers.length > 0 ? (
            availablePlayers.map((player) => (
              <div
                key={player.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (selectedPlayers.length < maxSelections) {
                    onSelect(player)
                    setIsOpen(false)
                  }
                }}
              >
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-500">{player.team}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No more players available</div>
          )}
        </div>
      )}
    </div>
  )
}

