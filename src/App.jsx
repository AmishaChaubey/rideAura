import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import About from './pages/about/About'
import ContactPage from './pages/contact/Contact'
import Package from './pages/packages/Package'





const App = () => {
  return (
    <div>
 
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/package' element={<Package/>}/>
      </Routes>
    </Router>
      
    </div>
  )
}

export default App
