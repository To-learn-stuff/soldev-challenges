import * as web3 from "@solana/web3.js"
import "dotenv/config"
import {getKeypairFromEnvironment, airdropIfRequired} from "@solana-developers/helpers"

const key = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJto9")

console.log(key)

console.log("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod".length)