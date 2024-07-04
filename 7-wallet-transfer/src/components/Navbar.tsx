import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-24 w-full flex items-center justify-between px-5' style={{"backgroundColor":"#141313  "}} >
        <div>SOL TRANFER</div>
        <WalletMultiButton />
    </div>
  )
}

export default Navbar