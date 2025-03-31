import React from "react";
import { SectionWrapper } from "../hoc"; // Higher-order component
import { FaReact } from 'react-icons/fa'; // Import React icon
import { SiRedux, SiMongodb, SiTailwindcss, SiTypescript, SiMeta, SiPython } from 'react-icons/si'; // Import package icons
import { DiNodejs } from 'react-icons/di'; // Import Node.js icon

// Import the Express and GSAP images
import expressIcon from "../assets/Expressjs.png"; // Adjust path if necessary
import GSAP from "../assets/GSAP-GIF.gif"; // Adjust path if necessary

// Define the technologies array with name and corresponding icons
const technologies = [
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500 w-full h-full" />, // MongoDB icon
  },
  {
    name: "Express",
    icon: <img src={expressIcon} alt="Express Icon" className="w-32 h-full object-cover" />, // Adjusted size for the Express image
  },
  {
    name: "React.js",
    icon: <FaReact className="text-blue-500 w-full h-full" />, // React.js icon
  },
  {
    name: "Node.js",
    icon: <DiNodejs className="text-green-600 w-full h-full" />, // Node.js icon
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500 w-full h-full" />, // Tailwind CSS icon
  },
  {
    name: "Python",
    icon: <SiPython className="text-blue-500 w-full h-full" />, // Python icon
  },
  {
    name: "GSAP",
    icon: <img src={GSAP} alt="GSAP Icon" className="w-32 h-full object-cover" />, // Adjusted size for the GSAP image
  },
];

// Tech component to display technology icons
const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28 flex justify-center items-center' key={technology.name}>
          {technology.icon} {/* Render the icon directly here */}
        </div>
      ))}
    </div>
  );
};

// Export the Tech component wrapped in the SectionWrapper HOC
export default SectionWrapper(Tech, "");
