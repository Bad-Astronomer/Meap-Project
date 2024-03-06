import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from "../../utils/cn";

interface ParallaxScrollProps {
  images: string[];
  className?: string;
}

export const Gallery: React.FC<ParallaxScrollProps> = ({
    images,
    className,
  }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      container: gridRef, // remove this if your container is not fixed height
      offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
      <div
        className={cn("h-[50rem] items-start overflow-y-auto no-scrollbar", className)}
        ref={gridRef}
      >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-10 py-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
