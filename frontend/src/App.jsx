import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Footer } from "./components";
import { Login, Dashboard, ProjectForm } from "./components/admin";

const MainLayout = () => (
  <div className='relative z-0 bg-primary'>
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech />
    <Works />
    {/* <Feedbacks /> */}
    <div className='relative z-0'>
      <Contact />
      <StarsCanvas />
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main portfolio routes */}
        <Route path="/" element={<MainLayout />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/projects/new" element={<ProjectForm />} />
        <Route path="/admin/projects/edit/:id" element={<ProjectForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
