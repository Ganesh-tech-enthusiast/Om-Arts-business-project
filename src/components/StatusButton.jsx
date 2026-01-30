import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Truck } from "lucide-react";
import { cn } from "../lib/utils";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function StatusButton({OrderedAlready , qty}) {
  const [status, setStatus] = useState("idle"); // Changed from undefined to "idle"
  const isEnabled = status === "idle" || status === "Order Now";

  const changeStatus = async () => {
    if (!isEnabled) return;

    setStatus("loading");
    await wait(400);

    setStatus("Ordered");
    await wait(3000);

    setStatus("Order Now");
    await wait(1000); // Small delay before resetting to idle
    setStatus("idle"); // Reset properly so it can be clicked again
  };

  const getButtonStyles = () => {
    if (status === "loading") {
      return "bg-slate-800 cursor-wait shadow-inner";
    }
    if (status === "Ordered") {
      return "bg-emerald-300 shadow-emerald-500/30 text-black";
    }
    return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5";
  };

  return (
    <button
      onClick={changeStatus}
      disabled={!isEnabled}
      className={cn(
        "group relative h-12 w-full overflow-hidden rounded-xl px-6 text-sm font-bold text-white transition-all duration-300 ease-out shadow-md shadow-blue-500/20  disabled:cursor-not-allowed disabled:hover:transform-none",
        getButtonStyles()
      )}
    >
      {/* Shimmer effect */}
      {isEnabled && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center justify-center gap-2"
        >
          {status === "Ordered" && (
            <motion.span
              className="flex items-center gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            >
              <div className="bg-white/20 p-1 rounded-full">
                <Check size={16} strokeWidth={3} />
              </div>
              <span>{qty == 1 ? `${qty} Unit Ordered` : `${qty} Units Ordered`}</span>
            </motion.span>
          )}

          {status === "loading" && (
            <span className="flex items-center gap-2 text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </span>
          )}

          {/* Fixed: Check for both "idle" and "Order Now" */}
          {(status === "idle" || status === "Order Now") && (
            <span className="flex items-center gap-2">
              <Truck size={18} className="opacity-80 group-hover:scale-110 transition-transform" />
              { OrderedAlready ? "Order More" : "Order Now"}
            </span>
          )}
        </motion.span>
      </AnimatePresence>

      {status === "loading" && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </button>
  );
}