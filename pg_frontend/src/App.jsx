import { useState } from 'react'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import CustomRouter from './router/CustomRouter'
import Navbar from './components/owner/Navbar'

function App() {
  

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <CustomRouter />
      </BrowserRouter>
    </div>
    
  )
}

export default App
