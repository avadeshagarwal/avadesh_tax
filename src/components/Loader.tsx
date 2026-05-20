import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-navy-950 flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-gold-500/20"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-400 animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold-500/40">
                <span className="font-display text-navy-950 text-3xl font-black">A</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <div className="font-display text-white text-lg font-semibold">Avadesh Agarwal</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-400 mt-1">Tax Consultancy</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
