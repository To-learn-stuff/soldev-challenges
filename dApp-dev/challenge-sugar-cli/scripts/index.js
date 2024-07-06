
import * as fs from "fs"

// let imageUris =[
//     https://github.com/learn-solana-dev/sugar-cli/blob/main/assets/0.png?raw=true,
//     https://github.com/learn-solana-dev/sugar-cli/blob/main/assets/1.png?raw=true
// ]
let symbols=[
    "ZERO", "ONE", "TWO", "THREE"
]


async function main(){
    for (let i = 0; i < 4; i++) {
        let data = {
            "name": `Iam ${symbols[i]}`,
            "symbol" : `${symbols[i]}`,
            "description" : `NFT number ${i.toString()}`,
            "image":`${i.toString()}.png`,
            "attributes": [
                {
                    "trait_type": "Number",
                    "value": `${i.toString()}`
                },
               
            ],
            "properties": {
                "files": [
                    {
                        "uri": `${i.toString()}.png`,
                        "type": "image/png"
                    }
                ]
            }
        }
        fs.writeFileSync(`../assets/${i}.json`, JSON.stringify(data, null, 2)); // Convert object to JSON string
    }
}

main();