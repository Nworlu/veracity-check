// import { Link } from "react-router-dom";
import Web3WalletButton from "../components/Web3WalletButton";

const featureList = [
  {
    title: "On-Chain Authenticity",
    desc: "All documents are registered and can be validated through decentralized networks.",
    icon: "🔗",
  },
  {
    title: "Secure Verification",
    desc: "Your documents are verified locally—no files are uploaded to a server.",
    icon: "🔒",
  },
  {
    title: "User-Friendly",
    desc: "Simple, beautiful UI for easy uploading and checking of documents.",
    icon: "✨",
  },
];

const heroImage =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80";
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#E5DEFF] via-[#9b87f5] to-[#403E43] px-4 relative">
      <div className="relative w-full flex flex-col items-center pt-14 pb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-transparent bg-clip-text mb-2 text-center drop-shadow-lg">
          Veracity Check
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 max-w-xl mx-auto mb-6 text-center">
          Securely verify documents on-chain. Start by connecting your wallet to
          begin your journey, or jump straight to our Document Verifier.
        </p>
        <Web3WalletButton />
        {/* <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl justify-center mt-6 mb-3">
          <Link to="/auth" className="flex-1">
            <button className="bg-[#33C3F0] hover:bg-[#7E69AB] text-white font-bold py-2 px-5 rounded-lg shadow-md text-base w-full transition">
              Login / Sign Up
            </button>
          </Link>
          <Link to="/verify" className="flex-1">
            <button className="bg-[#7E69AB] hover:bg-[#9b87f5] text-white font-bold py-2 px-5 rounded-lg shadow-md text-base w-full transition">
              Go to Document Verifier
            </button>
          </Link>
        </div> */}
        <img
          src={heroImage}
          alt="Laptop workspace"
          className="w-full max-w-lg rounded-xl shadow-xl mt-8 mb-4 hidden md:block"
        />
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-xl shadow-xl p-8 mb-14 mt-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 glass-morphism">
        {featureList.map((feat) => (
          <div
            key={feat.title}
            className="flex flex-col items-center gap-2 py-2 px-3 text-center"
          >
            <span className="text-3xl mb-2">{feat.icon}</span>
            <span className="font-bold text-lg text-[#7E69AB]">
              {feat.title}
            </span>
            <span className="text-gray-700 text-sm">{feat.desc}</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-300 text-base mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#7e69ab]">
          How it works
        </h2>
        <ol className="list-decimal pl-7 text-left max-w-xl mx-auto space-y-2 text-lg">
          <li>Connect your wallet (optional for demo)</li>
          <li>Upload your document(s) for verification</li>
          <li>See instant results—your privacy is protected!</li>
        </ol>
        <div className="mt-7 text-sm opacity-70">
          <span className="font-semibold">Powered by:</span> Supabase, Web3, and
          open-source magic.
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-2 pb-2 flex justify-center animate-fade-in">
        <span className="text-xs text-gray-500">
          © {new Date().getFullYear()} Veracity Check. Made with 💜
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
