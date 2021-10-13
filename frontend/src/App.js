import React, { useState, useEffect } from 'react';
import Store from './Store.js';
import getBlockChain from './etherium.js';
import ExtensionNotFound from './nometamask.js';


function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockChain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);

  return (
    <div className="container-fluid">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img 
              src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" 
              alt="" 
              width="30" 
              height="24" 
              class="d-inline-block align-text-top" />
              <span style={{marginLeft: '5px', fontFamily: "Source Sans Pro"}}>Block.io</span>
          </a>
        </div>
      </nav>
      { window.ethereum ?
        <div className='col-sm-12' style={{marginTop: "10px"}}>
          <Store paymentProcessor={paymentProcessor} dai={dai}/>
        </div> : 
        <ExtensionNotFound />
      }
    </div>
  );
}

export default App;
