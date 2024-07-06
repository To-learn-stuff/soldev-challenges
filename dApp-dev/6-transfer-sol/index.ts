import * as web3 from "@solana/web3.js"
import "dotenv/config"
import {getKeypairFromEnvironment, airdropIfRequired} from "@solana-developers/helpers"

const sender = getKeypairFromEnvironment("SECRET_KEY")

const recipient = new web3.PublicKey("8arMAPKh8UJQJSAoxCTvsYhM6VXEErgkPa3VxFzRXEPP")
const LAMPORTS_PER_SOL = 1000000000; // 1 SOL
const amount = 0.01 * LAMPORTS_PER_SOL;

async function main(){
    const connection = new web3.Connection("https://api.devnet.solana.com")

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recipient,
            lamports: amount
        })
    )

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    )

    console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}
main()