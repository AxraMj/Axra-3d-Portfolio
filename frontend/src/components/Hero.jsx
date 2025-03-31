import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h1 className={`${styles.heroHeadText} text-white text-center sm:text-left`}>
            Hi, I'm <span className='text-[#915EFF]'>Axra</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-center sm:text-left`}>
            I am a Software Developer, who also
            <br className='sm:block hidden' />
            works as a Copywriter.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 sm:relative sm:h-[500px] h-[300px]">
        <ComputersCanvas />
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about' className="cursor-pointer">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;