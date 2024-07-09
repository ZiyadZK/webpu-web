'use client'

import Image from "next/image";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="loading loading-spinner loading-lg scale-125 md:scale-150 opacity-50"></div>
        <hr className="my-3 opacity-0" />
        <h1 className="text-center text-3xl opacity-50">
          Sedang dalam Perbaikan
        </h1>
      </motion.div>
    </AuroraBackground>
  );
}
