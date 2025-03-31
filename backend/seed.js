const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projects = [
  {
    name: "Mask Face Detection System",
    description: "Developed a Mask Detection System using OpenCV and Python to monitor real-time mask usage, enhancing facial recognition for public safety during the COVID-19 pandemic.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient"
      },
      {
        name: "opencv",
        color: "green-text-gradient"
      },
      {
        name: "Haarcascade",
        color: "pink-text-gradient"
      }
    ],
    image: "/MaskedFace.png",
    source_code_link: "https://github.com/AxraMj/Machine-Learning-Projects.git"
  },
  {
    name: "OTT Application",
    description: "Our OTT application offers seamless streaming of a vast library of movies, TV shows, and exclusive content over the internet. Enjoy high-quality entertainment anytime, anywhere, on various devices—no traditional cable or satellite required.",
    tags: [
      {
        name: "ReactNative",
        color: "blue-text-gradient"
      },
      {
        name: "StyledComponent",
        color: "green-text-gradient"
      },
      {
        name: "Expo",
        color: "pink-text-gradient"
      }
    ],
    image: "/Application.png",
    source_code_link: "https://github.com/AxraMj/my-app.git"
  },
  {
    name: "OTT Streaming Platform",
    description: "Developed an online OTT streaming platform using ReactJS, Firebase, Redux, and styled components. It enables users to stream content, manage subscriptions, and create watchlists, with secure authentication and responsive design.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient"
      },
      {
        name: "redux",
        color: "green-text-gradient"
      },
      {
        name: "firebase",
        color: "pink-text-gradient"
      }
    ],
    image: "/thumnail.png",
    source_code_link: "https://github.com/AxraMj/my-project.git"
  },
  {
    name: "3D iPhone Website",
    description: "I built a website that looks like the iPhone 15 pro page from Apple. I used React, Threejs, and GSAP to make it work smoothly on any device",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient"
      },
      {
        name: "Threejs",
        color: "green-text-gradient"
      },
      {
        name: "GSAP",
        color: "pink-text-gradient"
      }
    ],
    image: "/Applewebsite.png",
    source_code_link: "https://github.com/AxraMj/Apple-website.git"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing projects
    await Project.deleteMany({});
    console.log('Deleted existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('Added new projects');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 