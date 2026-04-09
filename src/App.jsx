import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import About from './pages/about/About'
import ContactPage from './pages/contact/Contact'
import Service from './pages/services/Service'
import FleetPage from './pages/fleet/Fleet'
import Footer from './components/Footer'





const App = () => {
  return (
    <div>
 
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        {/* <Route path='/package' element={<Package/>}/> */}
        <Route path='/service' element={<Service/>}/>
        <Route path='/fleet' element={<FleetPage/>}/>
      </Routes>

      <Footer/>
    </Router>
      
    </div>
  )
}

export default App
