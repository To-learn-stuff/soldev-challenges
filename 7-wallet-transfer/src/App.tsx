import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import WalletContextProvider from './components/WalletContextProvider'

function App() {

  return (
    <WalletContextProvider>

    <div className='h-screen w-screen'>
      
      <Navbar/>
      <Home/>
    
    </div>

    </WalletContextProvider>
  )
}

export default App

// 