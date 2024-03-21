"use client";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";

export const ParallaxGrid = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  let { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end end"],
  });
  let smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  const translateFirst = useTransform(smoothScrollYProgress, [0, 1], [0, -350]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(smoothScrollYProgress, [0, 1], [0, -350]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-6xl mx-auto gap-10 pb-20 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10 relative isolate">
          {firstPart.map((el, idx) => (
            <div className="group" key={"grid-1" + idx}>
              <motion.div style={{ y: translateFirst }}>
                <p className="text-white pointer-events-none absolute text-justify text-md transition duration-300 delay-100 p-4 bottom-0 z-10 opacity-0 group-hover:opacity-100 bg-black/[0.5] backdrop-filter backdrop-blur-[3px] m-4 rounded-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati sed culpa minus ratione id accusantium. Voluptatem
                  cumque aut eaque, repellendus
                </p>
                <Image
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg z-0 gap-10 !m-0 !p-0 hover:saturate-0 border border-transparent hover:border-white/[0.75] transition duration-200"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </motion.div>
            </div>
          ))}
        </div>
        <div className="grid gap-10 relative isolate">
          {secondPart.map((el, idx) => (
            <div className="group" key={"grid-2" + idx}>
              <motion.div style={{ y: translateSecond }}>
                <p className="text-white pointer-events-none absolute text-justify text-md transition duration-300 delay-100 p-4 bottom-0 z-10 opacity-0 group-hover:opacity-100 bg-black/[0.5] border-white/[0.75] backdrop-filter backdrop-blur-[3px] m-4 rounded-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati sed culpa minus ratione id accusantium. Voluptatem
                  cumque aut eaque, repellendus
                </p>
                <Image
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg z-0 gap-10 !m-0 !p-0 hover:saturate-0 border border-transparent hover:border-white/[0.75] transition duration-200"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </motion.div>
            </div>
          ))}
        </div>
        <div className="grid gap-10 relative isolate">
          {thirdPart.map((el, idx) => (
            <div className="group" key={"grid-3" + idx}>
              <motion.div style={{ y: translateThird }}>
                <p className="text-white pointer-events-none absolute text-justify text-md transition duration-300 delay-100 p-4 bottom-0 z-10 opacity-0 group-hover:opacity-100 bg-black/[0.5] border-white/[0.75] backdrop-filter backdrop-blur-[3px] m-4 rounded-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati sed culpa minus ratione id accusantium. Voluptatem
                  cumque aut eaque, repellendus
                </p>
                <Image
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg z-0 gap-10 !m-0 !p-0 hover:saturate-0 border border-transparent hover:border-white/[0.75] transition duration-200"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
