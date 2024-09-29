import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  expressjs, // Add this
  python, // Add this
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  Application,
  Applewebsite,
  threejs,
  thumnail,
} from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Education",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Frondend Developer",
      icon: web,
    },
    {
      title: "Machine Learning",
      icon: mobile,
    },
    {
      title: "Mern Stack",
      icon: backend,
    },
    {
      title: "Copywriter",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Express JS",
      icon: expressjs, // Add this
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Git",
      icon: git,
    },
    {
      name: "Figma",
      icon: figma,
    },
  
    {
      name: "Python",
      icon: python, // Add this
    },
  ];
  
  
  const experiences = [
    {
      title: "Master Of Computer Applications",
      company_name: "MCA",
      // icon: starbucks,
      iconBg: "#383E56",
      date: "March 2023 - April 2025",
      points: [
      "School Of Technology And Applied Sciences University in Perumbaikad, Kerala"
      ],
    },
    {
      title: "Bachelor Of Computer Applications",
      company_name: "BCA",
      // icon: tesla,
      iconBg: "#E6DEDD",
      date: "Jan 2019 - Feb 2022",
      points: [
        "SREE SABAREESA College in Punchavayal, Kerala"
      ],
    },
   
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: " Mask face Detection System ",
      description:
        "Developed a Mask Detection System using OpenCV and Python to monitor real-time mask usage, enhancing facial recognition for public safety during the COVID-19 pandemic.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "opencv",
          color: "green-text-gradient",
        },
        {
          name: "Haarcascade",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/AxraMj/Machine-Learning-Projects.git",
    },
    {
      name: "OTT Application",
      description:
        "Our OTT application offers seamless streaming of a vast library of movies, TV shows, and exclusive content over the internet. Enjoy high-quality entertainment anytime, anywhere, on various devices—no traditional cable or satellite required.",
      tags: [
        {
          name: "ReactNative",
          color: "blue-text-gradient",
        },
        {
          name: "StyledComponent",
          color: "green-text-gradient",
        },
        {
          name: "Expo",
          color: "pink-text-gradient",
        },
      ],
      image: Application,
      source_code_link: "https://github.com/AxraMj/my-app.git",
    },
    {
      name: "OTT Streaming Plaform",
      description:
      "Developed an online OTT streaming platform using ReactJS, Firebase, Redux , and styled components.It enables users to stream content, manage subscriptions, and create watchlists, with secure authentication and responsive design.",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "redux",
          color: "green-text-gradient",
        },
        {
          name: "firebase",
          color: "pink-text-gradient",
        },
      ],
      image: thumnail,
      source_code_link: "https://github.com/AxraMj/my-project.git",
    },

    {
      name: "3D IPhone Website",
      description:
      "I built a website that looks like the iPhone 15 pro page from Apple. I used React,Threejs, and GSAP to make, it work smoothly on any device",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "Threejs",
          color: "green-text-gradient",
        },
        {
          name: "GSAP",
          color: "pink-text-gradient",
        },
      ],
      image: Applewebsite,
      source_code_link: "https://github.com/AxraMj/Apple-website.git",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };