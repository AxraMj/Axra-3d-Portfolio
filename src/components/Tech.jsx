import React from "react";
import { SectionWrapper } from "../hoc"; // Higher-order component
import { FaReact } from 'react-icons/fa'; // Import React icon
import { SiRedux, SiMongodb, SiTailwindcss, SiTypescript, SiMeta, SiPython } from 'react-icons/si'; // Import package icons
import { DiNodejs } from 'react-icons/di'; // Import Node.js icon
import { AiFillFileText } from 'react-icons/ai'; // You can use a generic file icon for Express if no specific icon is available

// Define the technologies array with name and corresponding icons
const technologies = [
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500 w-full h-full" />, // MongoDB icon
  },
  {
    name: "Node.js",
    icon: <DiNodejs className="text-green-600 w-full h-full" />, // Node.js icon
  },
  {
    name: "React.js",
    icon: <FaReact className="text-blue-500 w-full h-full" />, // React.js icon
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500 w-full h-full" />, // Tailwind CSS icon
  },
  {
    name: "Express",
    icon: <AiFillFileText className="text-gray-700 w-full h-full" />, // Express icon (using a generic icon)
  },
  {
    name: "Python",
    icon: <SiPython className="text-blue-500 w-full h-full" />, // Python icon
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
