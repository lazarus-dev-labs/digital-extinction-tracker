import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, RotateCcw, Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10); 

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfaf8] text-[#3e2723] px-4 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 border-4 border-[#8b4513] w-40 h-40 rounded-full" />
        <div className="absolute bottom-10 right-10 border-2 border-[#8b4513] w-64 h-64 rotate-45" />
      </div>

      {/* Main Content Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Compass size={80} className="text-[#8b4513] opacity-80" />
        </motion.div>

        <h1 className="text-9xl font-serif font-bold text-[#8b4513] leading-none mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-serif font-semibold mb-6 tracking-widest uppercase italic">
          Lost Legacy
        </h2>

        <div className="max-w-md mx-auto mb-10">
          <p className="text-[#5d4037] text-lg font-serif mb-4">
            "Like a language with no speakers, this page has faded from existence."
          </p>
          <p className="text-amber-800/70 text-sm">
            You have wandered off the marked path. Guided return in <span className="font-bold text-xl">{seconds}</span> seconds...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#3e2723] hover:bg-[#5d4037] text-[#fcfaf8] px-8 py-3 rounded-full font-serif font-semibold transition-all shadow-lg hover:scale-105"
          >
            <Home size={18} />
            Return to Sanctuary
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border-2 border-[#8b4513] text-[#8b4513] px-8 py-3 rounded-full font-serif font-semibold hover:bg-amber-50 transition-all"
          >
            <RotateCcw size={18} />
            Trace Back Steps
          </button>
        </div>
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 w-full text-center opacity-30">
        <p className="font-serif italic text-xs tracking-[0.2em]">
          Digital Extinction Tracker &bull; Preservation Protocol 404
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;