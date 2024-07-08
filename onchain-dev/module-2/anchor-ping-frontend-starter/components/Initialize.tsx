import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useEffect, useState } from "react"
import idl from "../idl.json"
import { Button } from "@chakra-ui/react"

const PROGRAM_ID = new anchor.web3.PublicKey(
  `EgCaBygodL3dmne8enY71wSGefW3nLGnw8y2esTXvP4o`
)

export interface Props {
  setCounter
  setTransactionUrl
}

export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
  const [program, setProgram] = useState<anchor.Program>()

  const { connection } = useConnection()
  const wallet = useAnchorWallet()


  const onClick = async () => {
    const newAccount = anchor.web3.Keypair.generate()
    const sig = await program.methods
    .initialize()
    .accounts({
      counter: newAccount.publicKey,
      user: wallet.publicKey,
      systemAccount: anchor.web3.SystemProgram.programId,
    })
    .signers([newAccount])
    .rpc()

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
    setCounter(newAccount.publicKey)
  }

  useEffect(() => {
    let provider: anchor.Provider ;
    try {
      provider = anchor.getProvider()
    } catch (error) {
      provider = new anchor.AnchorProvider(connection, wallet,{})
      anchor.setProvider(provider)
    }
  
    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID)
    setProgram(program)
  }, [])
  

  return <Button onClick={onClick}>Initialize Counter</Button>
}
