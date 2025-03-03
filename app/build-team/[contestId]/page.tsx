import TeamBuilder from "@/components/team-builder"

export default function BuildTeam({ params }: { params: { contestId: string } }) {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">FairplayXI - Build Your Team</h1>
      <p className="mb-4">Contest ID: {params.contestId}</p>
      <TeamBuilder contestId={params.contestId} />
    </main>
  )
}

