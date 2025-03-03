import Link from "next/link"
import { Shield, Lock, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="text-5xl font-bold mb-4 flex justify-center items-center">
            <span className="text-blue-500 mr-2">Fair</span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">playXI</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Privacy-Preserving Fantasy Cricket Platform</h1>
          <p className="text-xl mb-8">
            Experience the thrill of fantasy cricket with unparalleled privacy and security.
          </p>
          <Link
            href="/contests"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Explore Contests
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FairplayXI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p>
                Your team selections and strategies remain completely private, powered by Aleo blockchain technology.
              </p>
            </div>
            <div className="text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Secure Smart Contracts</h3>
              <p>
                Leo smart contracts ensure fair play and transparent reward distribution without compromising privacy.
              </p>
            </div>
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p>
                Experience rapid transactions and real-time updates, making your fantasy cricket experience seamless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-lg">Create an account or log in securely.</li>
                <li className="text-lg">Browse available contests and choose your favorite.</li>
                <li className="text-lg">Build your dream team while keeping your selections private.</li>
                <li className="text-lg">Watch the matches and track your team's performance.</li>
                <li className="text-lg">
                  Win prizes based on your team's performance, all managed by secure smart contracts.
                </li>
              </ol>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Powered by Aleo Blockchain</h3>
              <p className="mb-4">
                FairplayXI leverages Aleo, a next-generation blockchain platform that enables fully private,
                programmable applications. It uses zero-knowledge proofs to ensure that all transactions and smart
                contract executions are private by default.
              </p>
              <p>
                Our platform leverages Leo, Aleo's smart contract programming language, to create a secure and private
                environment for fantasy cricket enthusiasts. This ensures that your team selections, strategies, and
                transactions remain confidential while still allowing for fair and transparent gameplay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-xl mb-8">Join the revolution in privacy-preserving fantasy cricket today!</p>
          <Link
            href="/contests"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            View Available Contests
          </Link>
        </div>
      </section>
    </div>
  )
}

