//library manage wallet(generate address, sign transaction)and rpc provider connect
const ethers = require('ethers');
//seed 12 or 24 words
const mnemonic = "fill_your_seed";

//or your can fill only privateKey i.e. export privateKey in single address from metamask will can take only one address control from that privateKey
// const pk = "";


//this is setup provider like setup network on metamask i.e.mainnet, polygon, arbitrum, optimism the url for setup rpc can take in alchemy is free plan to use a little bit
const provider = new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/api_key");

//this is target contract address with us interact
const contractAddr = "";
main();

async function main() {
    //this is looping round 
    for(let i=0;i<100;i++) {
   
   
        //this is bip39 derivation path is access wallet from seed wallet can generate infinity can your change m/44'/60'/0'/0/1 to m/44'/60'/0'/0/2 ...m/44'/60'/0'/0/n
        //in example m/44'/60'/0'/0/1 meaning you will access first address from seed
        let path = "m/44'/60'/0'/0/1";


        //this is decrypt seed 12 or 24 word and bip39 to access your wallet include publicKey, address, privateKey
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);

        //this line if you use privateKey use this line for decrypt wallet to signer control
     // const signer = new ethers.Wallet(px, provider);

        //this line is connect wallet to provider and signer can sign anything like we use metamask
        const signer = wallet.connect(provider);
 
        //this line will show your address of signer
        // console.log(signer.address);

        //set up max fee per gas this use eip1559 standard each blockchain will have this different can you see on etherscan in your transactions used
        let maxFeePerGas = ethers.BigNumber.from(100000000) // fallback to 0.1 gwei
        //set up priority fee for burn tip to miner eip1559 standard each blockchain will have this different
        let maxPriorityFeePerGas = ethers.BigNumber.from(100000000) // fallback to 0.1 gwei


        //this section i want to swap Odos and i create transaction on metamask and swap USDC to aArbUSDC
        const txSwap1 =  await signer.sendTransaction({
            //to is contract to interact this is contract Odos
            to: contractAddr,
            maxFeePerGas,
            maxPriorityFeePerGas,
            //value is native coin this swap not use native coin set up 0
            value: 0,
            //first time is easy way to fill data you must create swap using metamask on Odos or other platform and you must success transaction and see in etherscan will found 
            //i.e https://etherscan.io/tx/0xa782b52501745237147bb136f838c2edbcc7dc73c37d2a2075176e77ae44e663
            //slide down and click "Click to see more"
            //you will see field "Input Data" and click "View Input As"
            //choose origin
            //you will see 0x.... longer and copy to replace in data below
            data: "0x....",
            // gasPrice: "0xDC898500",
            //gas limit up to you can pay 
            gasLimit: 800000
        });  
        console.log('round '+ i +' swap USDC to aArbUSDC');
        console.log(txSwap1.hash);
        console.log('=====================================');


        //this is i swap aArbUSDC to USDC repeat the step above and fill in data
        const txSwap2 =  await signer.sendTransaction({
            to: contractAddr,
            maxFeePerGas,
            maxPriorityFeePerGas,
            value: 0,
            data: "",
            // gasPrice: "0xDC898500",
            gasLimit: 800000
        });  
        console.log('round '+ i +' swap aArbUSDC to USDC');
        console.log(txSwap2.hash);
        console.log('=====================================');


        

    }
}