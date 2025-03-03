import ContestsList from "@/components/contests-list"

export default function Contests() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">FairplayXI Cricket Contests</h1>
      <p className="mb-4">Join an available contest to build your dream team!</p>
      <ContestsList />
    </main>
  )
}

