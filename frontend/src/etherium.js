import { ethers, Contract } from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

const getBlockChain = () =>
  new Promise((resolve, rej)=>{
      window.addEventListener('load', async () => {
          if(window.etherium) {
              await window.etherium.enable();
              const provider = new ethers.providers.Web3Provider(window.etherium);
              const signer = provider.getSigner();

              const paymentProcessor = new Contract(
                PaymentProcessor.networks[window.etherium.networkVersion].address,
                PaymentProcessor.abi,
                signer
              );

              const dai = new Contract(
                Dai.networks[window.etherium.networkVersion].address,
                Dai.abi,
                signer
              );
              resolve({provider, paymentProcessor, dai})
          }
          resolve({provider: undefined, paymentProcessor: undefined, dai: undefined})
      })
  })

export default getBlockChain;