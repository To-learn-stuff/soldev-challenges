import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FormEvent, useEffect, useState } from 'react'
import * as web3 from "@solana/web3.js"
import { Link } from 'react-router-dom';

const Home = () => {
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState("")
    const [recipient, setRecipient] = useState("")
    const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
    const [signature, setSignature] = useState<string | null>()

    const handleTransfer = async (e:FormEvent) => {
        e.preventDefault()
try {
    console.log(connection)

        if(!publicKey || !connection) return

        if(!amount || !recipient) {
            alert('Please fill all the fields')
            return
        }
        if(isNaN(Number(amount))) {
            alert('Please enter a valid amount')
            return
        }

        if(Number(amount) >= balance/1000000000) {
            alert('Insufficient balance')
            return
        }
        let toPubkey ;

        try {
            toPubkey = new web3.PublicKey(recipient)
        } catch (error) {
             alert('Invalid recipient address')
             return
        }
        
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey:toPubkey,
                lamports: Number(amount)*100000000
            })
        )
    
        const sig = await sendTransaction(transaction, connection);
        setSignature(sig);


    } catch (error) {
        alert('Something went wrong, please try again later')
        return 
    }
    
    }


    useEffect(() => {
        if(!publicKey || !connection) return
        connection.getBalance(publicKey).then(balance => {
            setBalance(balance)
        })
    
     
    }, [
        publicKey,
        connection
    ])
    

  return (
    <div className='h-full w-full flex items-start justify-center pt-24' >
       {!publicKey || !connection ?<div className='text-2xl font-bold'>Please select the wallet !</div> :
       <div className='flex flex-col w-1/4 h-full'>
        <div className='w-full flex items-center justify-center'>
            <div className='text-2xl mb-5 font-semibold'>Balance : {balance/1000000000} SOL</div>

       </div>
        <form onSubmit={handleTransfer} className='w-full flex flex-col  rounded-lg border-2 border-gray-800 p-5' style={{"backgroundColor":"#141313 ", "height":"320px"}}>
            <label htmlFor="amount" className='mt-5'>Amount</label>
            <input type="text"  name='amount' placeholder='Enter the amount (in SOL)' value={amount} onChange={(e)=>setAmount(e.target.value)} className='h-10 bg-red-200 mt-2 p-3' style={{"backgroundColor":"#1d1c1c "}}/>

            <label htmlFor="to" className='mt-5'>Recipient address</label>
            <input type="text" name='to' placeholder='Enter the recipient address' value={recipient} onChange={(e)=>setRecipient(e.target.value)} className='h-10 mt-2 p-3' style={{"backgroundColor":"#1d1c1c "}}/>
            <button type="submit" className=' m-2 rounded-lg mt-10' style={{"backgroundColor":"#1d1c1c "}}>submit</button>
        </form>

     {signature && <Link to={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} className='w-full flex items-center justify-center mt-5 h-10 rounded-lg'   style={{"backgroundColor":"#141313"}} >click here to see the tranaction in the chain</Link> }

     {signature && <button className='w-full flex items-center justify-center mt-5 h-10 rounded-lg' style={{"backgroundColor":"#141313"}}>reset</button>}

        </div>}
    </div>
  )
}

export default Home