import { motion, stagger, useAnimate } from "motion/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const Home = () => {
  const heading = "Search your Favourite Destinations."
  const typingText = "Search with AI-venture"
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animating = async () => {
      await animate("h1", 
        { y: -10, opacity: 1, filter: "blur(0px)" },
        { duration: 1, delay: stagger(0.1) }
      )
      await animate(".desc", 
        { y: -10, opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: 0.2 }
      )
      await animate("button", 
        { y: -10, opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: 0.2 }
      )
      await animate(".dev", 
        { opacity: 1, scale: 1 },
        { duration: 1.5, ease: "easeInOut", }
      )
    }

    animating()
  }, [animate])

  return (
    <div ref={scope} className="flex gap-1 items-center justify-between h-screen bg-amber-200">

      <motion.div
        style={{ opacity: 0, scale: 0.7 }}
        className="w-full h-full hidden lg:flex relative dev">
        <img loading="lazy" className="w-30 h-40 object-cover rounded-xl absolute left-10 top-50 min-[1180px]:left-20 min-[1340px]:left-30 min-[1500px]:left-50 z-1 shadow-sm" src="https://images.pexels.com/photos/7412001/pexels-photo-7412001.jpeg" alt="IMAGE-1" />
        <img loading="lazy" className="w-40 h-60 object-cover absolute right-10 min-[1180px]:right-20 min-[1400px]:right-40 top-40 rounded-xl shadow-sm z-1" src="https://images.pexels.com/photos/1693543/pexels-photo-1693543.jpeg" alt="IMAGE-2" />
        <img loading="lazy" className="w-40 h-50 object-cover absolute right-15 min-[1400px]:right-40 top-120 rounded-xl shadow-sm z-1" src="https://images.pexels.com/photos/2041928/pexels-photo-2041928.jpeg" alt="IMAGE-3" />
        <img loading="lazy" className="w-70 h-100 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-10 rounded-xl shadow-sm" src="https://images.pexels.com/photos/7368307/pexels-photo-7368307.jpeg" alt="IMAGE-4" />

        <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] z-20">
          <div className="bg-white rounded-full p-5 text-sm font-light shadow-sm shadow-amber-200 text-shadow-2xs min-w-[250px]">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { delayChildren: 5, staggerChildren: 0.09 },
                },
              }}
              className="inline-block text-gray-700"
            >
              {typingText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 5, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SECTION - HEADING + DESCRIPTION + BUTTON */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex gap-2 flex-wrap justify-center">
          {heading.split(" ").map((word, i) => (
            <motion.h1
              key={i}
              className="md:text-4xl text-3xl blur-xl opacity-0 font-black text-center text-rose-700 selection:bg-black selection:text-white"
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <motion.p
          style={{ opacity: 0, filter: "blur(4px)" }}
          className="desc mt-4 md:text-lg text-sm text-gray-700 md:max-w-md max-w-xs text-center font-light selection:bg-black selection:text-white"
        >
          Discover amazing places with AI-powered recommendations tailored just for you. Find hidden gems and popular attractions that match your unique travel style.
        </motion.p>

        <motion.button 
          style={{ opacity: 0, filter: "blur(4px)" }}
          className="selection:bg-black selection:text-white py-3 px-5 mt-5 rounded-full bg-rose-700 text-amber-200 font-semibold cursor-pointer hover:scale-96 transition-transform duration-50 ease-in-out"
        >
          <Link to="/form">Explore</Link>
        </motion.button>
      </div>
    </div>
  )
}
