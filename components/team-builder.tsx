"use client"

import { useState } from "react"
import { X, Lock } from "lucide-react"
import Image from "next/image"

// Player types
type PlayerRole = "WK" | "Bat" | "Bowl"

interface Player {
  id: string
  name: string
  role: PlayerRole
  team: string
  image: string
}

// Sample player data
const samplePlayers: Player[] = [
  { id: "1", name: "Wriddhiman Saha", role: "WK", team: "Team A", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/302300/302390.jpg" },
  { id: "2", name: "David Warner", role: "Bat", team: "Team B", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/356800/356825.1.png" },
  { id: "3", name: "Prithvi Shaw", role: "Bat", team: "Team A", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/302400/302499.jpg" },
  { id: "4", name: "Shubman Gill", role: "Bat", team: "Team B", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/302500/302569.jpg" },
  { id: "5", name: "Hardik Pandya", role: "Bat", team: "Team A", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/304300/304324.jpg" },
  { id: "6", name: "David Miller", role: "Bat", team: "Team B", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/317900/317961.jpg" },
  { id: "7", name: "Mohammed Shami", role: "Bowl", team: "Team A", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/302400/302404.jpg" },
  { id: "8", name: "Alzarri Joseph", role: "Bowl", team: "Team B", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/203000/203077.1.jpg" },
  { id: "9", name: "Rashid Khan", role: "Bowl", team: "Team A", image:"https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/295200/295261.1.jpg" },
  { id: "10", name: "Kuldeep Yadav", role: "Bowl", team: "Team B", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/370900/370934.1.jpg" },
  { id: "11", name: "Khaleel Ahmed", role: "Bowl", team: "Team A", image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/329300/329344.4.jpg" },
]

interface TeamBuilderProps {
  contestId: string
}

export default function TeamBuilder({ contestId }: TeamBuilderProps) {
  const [selectedWK, setSelectedWK] = useState<Player | null>(null)
  const [selectedBatsmen, setSelectedBatsmen] = useState<Player[]>([])
  const [selectedBowlers, setSelectedBowlers] = useState<Player[]>([])
  const [captain, setCaptain] = useState<Player | null>(null)

  // Dropdown states
  const [wkDropdownOpen, setWkDropdownOpen] = useState(false)
  const [batsmenDropdownOpen, setBatsmenDropdownOpen] = useState(false)
  const [bowlersDropdownOpen, setBowlersDropdownOpen] = useState(false)
  const [captainDropdownOpen, setCaptainDropdownOpen] = useState(false)

  // Filter players by role
  const wicketKeepers = samplePlayers.filter((player) => player.role === "WK")
  const batsmen = samplePlayers.filter((player) => player.role === "Bat")
  const bowlers = samplePlayers.filter((player) => player.role === "Bowl")

  // Get all selected players
  const allSelectedPlayers = [...(selectedWK ? [selectedWK] : []), ...selectedBatsmen, ...selectedBowlers]

  // Handle player selection
  const selectWK = (player: Player) => {
    setSelectedWK(player)
    setWkDropdownOpen(false)
  }

  const selectBatsman = (player: Player) => {
    if (selectedBatsmen.length < 5 && !selectedBatsmen.some((p) => p.id === player.id)) {
      setSelectedBatsmen([...selectedBatsmen, player])
      setBatsmenDropdownOpen(false)
    }
  }

  const selectBowler = (player: Player) => {
    if (selectedBowlers.length < 5 && !selectedBowlers.some((p) => p.id === player.id)) {
      setSelectedBowlers([...selectedBowlers, player])
      setBowlersDropdownOpen(false)
    }
  }

  const selectCaptain = (player: Player) => {
    if (allSelectedPlayers.some((p) => p.id === player.id)) {
      setCaptain(player)
      setCaptainDropdownOpen(false)
    }
  }

  // Handle player removal
  const removeWK = () => {
    if (captain?.id === selectedWK?.id) {
      setCaptain(null)
    }
    setSelectedWK(null)
  }

  const removeBatsman = (playerId: string) => {
    if (captain?.id === playerId) {
      setCaptain(null)
    }
    setSelectedBatsmen(selectedBatsmen.filter((player) => player.id !== playerId))
  }

  const removeBowler = (playerId: string) => {
    if (captain?.id === playerId) {
      setCaptain(null)
    }
    setSelectedBowlers(selectedBowlers.filter((player) => player.id !== playerId))
  }

  const removeCaptain = () => {
    setCaptain(null)
  }

  // Lock team function
  const lockTeam = () => {
    const isTeamComplete = selectedWK && selectedBatsmen.length === 5 && selectedBowlers.length === 5 && captain

    if (isTeamComplete) {
      alert(`Team locked successfully for contest ${contestId}!`)
    } else {
      alert("Please complete your team selection before locking.")
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Build Your FairplayXI Squad for Contest #{contestId}</h2>
          <p className="text-gray-300 mb-4">The rules for building a squad are as follows</p>
          <p className="mb-2">
            You have to build a team with{" "}
            <span className="font-semibold">exactly 1 Wicket Keeper, 5 Batsmen and 5 Bowlers</span> from any of the 2
            competing teams. You can choose <span className="font-semibold">any one</span> of these 11 selected players
            as your <span className="font-semibold">Captain</span>.
          </p>
        </div>

        {/* Wicket Keeper Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select WK</h2>
          <div className="relative">
            <div
              className="border border-gray-600 rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
              onClick={() => setWkDropdownOpen(!wkDropdownOpen)}
            >
              {selectedWK && (
                <div className="bg-gray-800 rounded px-2 py-1 flex items-center gap-1">
                  {selectedWK.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeWK()
                    }}
                    className="ml-1 text-gray-300 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="absolute right-2 top-2 flex">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setWkDropdownOpen(!wkDropdownOpen)
                }}
                className="text-gray-400 ml-2"
              >
                ▼
              </button>
            </div>

            {/* Dropdown menu */}
            {wkDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {wicketKeepers
                  .filter((wk) => !selectedWK || wk.id !== selectedWK.id)
                  .map((wk) => (
                    <div
                      key={wk.id}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => selectWK(wk)}
                    >
                      <div className="font-medium">{wk.name}</div>
                      <div className="text-sm text-gray-400">{wk.team}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Batsmen Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select Batsmen</h2>
          <div className="relative">
            <div
              className="border border-gray-600 rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
              onClick={() => setBatsmenDropdownOpen(!batsmenDropdownOpen)}
            >
              {selectedBatsmen.map((batsman) => (
                <div key={batsman.id} className="bg-gray-800 rounded px-2 py-1 flex items-center gap-1">
                  {batsman.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeBatsman(batsman.id)
                    }}
                    className="ml-1 text-gray-300 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="absolute right-2 top-2 flex">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setBatsmenDropdownOpen(!batsmenDropdownOpen)
                }}
                className="text-gray-400 ml-2"
              >
                ▼
              </button>
            </div>

            {/* Dropdown menu */}
            {batsmenDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {batsmen
                  .filter((bat) => !selectedBatsmen.some((selected) => selected.id === bat.id))
                  .map((bat) => (
                    <div
                      key={bat.id}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => selectBatsman(bat)}
                    >
                      <div className="font-medium">{bat.name}</div>
                      <div className="text-sm text-gray-400">{bat.team}</div>
                    </div>
                  ))}
                {batsmen.filter((bat) => !selectedBatsmen.some((selected) => selected.id === bat.id)).length === 0 && (
                  <div className="px-4 py-2 text-gray-400">No more batsmen available</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bowlers Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select Bowlers</h2>
          <div className="relative">
            <div
              className="border border-gray-600 rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
              onClick={() => setBowlersDropdownOpen(!bowlersDropdownOpen)}
            >
              {selectedBowlers.map((bowler) => (
                <div key={bowler.id} className="bg-gray-800 rounded px-2 py-1 flex items-center gap-1">
                  {bowler.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeBowler(bowler.id)
                    }}
                    className="ml-1 text-gray-300 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="absolute right-2 top-2 flex">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setBowlersDropdownOpen(!bowlersDropdownOpen)
                }}
                className="text-gray-400 ml-2"
              >
                ▼
              </button>
            </div>

            {/* Dropdown menu */}
            {bowlersDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {bowlers
                  .filter((bowl) => !selectedBowlers.some((selected) => selected.id === bowl.id))
                  .map((bowl) => (
                    <div
                      key={bowl.id}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => selectBowler(bowl)}
                    >
                      <div className="font-medium">{bowl.name}</div>
                      <div className="text-sm text-gray-400">{bowl.team}</div>
                    </div>
                  ))}
                {bowlers.filter((bowl) => !selectedBowlers.some((selected) => selected.id === bowl.id)).length ===
                  0 && <div className="px-4 py-2 text-gray-400">No more bowlers available</div>}
              </div>
            )}
          </div>
        </div>

        {/* Captain Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select Captain</h2>
          <div className="relative">
            <div
              className="border border-gray-600 rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
              onClick={() => setCaptainDropdownOpen(!captainDropdownOpen)}
            >
              {captain && (
                <div className="bg-gray-800 rounded px-2 py-1 flex items-center gap-1">
                  {captain.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeCaptain()
                    }}
                    className="ml-1 text-gray-300 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="absolute right-2 top-2 flex">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCaptainDropdownOpen(!captainDropdownOpen)
                }}
                className="text-gray-400 ml-2"
              >
                ▼
              </button>
            </div>

            {/* Dropdown menu */}
            {captainDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {allSelectedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => selectCaptain(player)}
                  >
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-400">
                      {player.role} - {player.team}
                    </div>
                  </div>
                ))}
                {allSelectedPlayers.length === 0 && <div className="px-4 py-2 text-gray-400">Select players first</div>}
              </div>
            )}
          </div>
        </div>

        {/* Lock Team Button */}
        <div>
          <button
            onClick={lockTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full flex items-center transition duration-300"
          >
            <Lock className="mr-2 h-5 w-5" /> Lock Team
          </button>
        </div>
      </div>

      {/* Cricket Field Visualization */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          {/* Cricket field (circular green background) */}
          <div className="absolute inset-0 rounded-full bg-green-700 border-4 border-green-800">
            {/* Inner circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border-2 border-green-800"></div>

            {/* Player positions */}
            {selectedWK && (
              <div className="absolute top-[15%] right-[15%] text-center">
                <div className="bg-green-600/70 rounded-full p-1">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={selectedWK.image || "/placeholder.svg"}
                      alt={selectedWK.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-1 font-semibold">{selectedWK.name}</div>
                <div className="text-sm">WK</div>
              </div>
            )}

            {/* Batsmen positions */}
            {selectedBatsmen.map((batsman, index) => {
              const positions = [
                { top: "25%", left: "25%" },
                { top: "15%", left: "50%", transform: "translateX(-50%)" },
                { top: "25%", right: "25%" },
                { top: "50%", left: "15%", transform: "translateY(-50%)" },
                { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
              ]
              const pos = positions[index]
              return (
                <div key={batsman.id} className="absolute text-center" style={pos}>
                  <div className="bg-green-600/70 rounded-full p-1">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={batsman.image || "/placeholder.svg"}
                        alt={batsman.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-1 font-semibold">{batsman.name}</div>
                  <div className="text-sm">Bat</div>
                </div>
              )
            })}

            {/* Bowlers positions */}
            {selectedBowlers.map((bowler, index) => {
              const positions = [
                { top: "50%", right: "15%", transform: "translateY(-50%)" },
                { bottom: "25%", left: "25%" },
                { bottom: "15%", left: "50%", transform: "translateX(-50%)" },
                { bottom: "25%", right: "25%" },
                { top: "85%", left: "50%", transform: "translateX(-50%)" },
              ]
              const pos = positions[index]
              return (
                <div key={bowler.id} className="absolute text-center" style={pos}>
                  <div className="bg-green-600/70 rounded-full p-1">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <Image src={bowler.image || "/placeholder.svg"} alt={bowler.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="mt-1 font-semibold">{bowler.name}</div>
                  <div className="text-sm">Bowl</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

