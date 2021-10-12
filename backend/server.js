const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');
import { getPaymentId, getItemUrl } from './controllers';


const app = new Koa();
const router = new Router();

const items = {
    '1': {
        id: 1,
        url: 'https://test.com/item1.jpg'
    },
    '2': {
        id: 2,
        url: 'https://test.com/item2.jpg'
    }
}


router.get('/api/getPaymentId/:itemId', getPaymentId);
router.get('/api/getItemUrl/:paymentId', getItemUrl);


app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(4000, () => {
    console.log('Server running on port 4000');
});


const listenToEvents = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
    const networkId = '5777';

    const paymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    );

    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date) => {
        console.log(`
          from ${payer}
          amount ${amount}
          paymentId ${paymentId}
          date ${new Date(date.toNumber() * 1000).toLocaleString()}
        `);
        const payment = await Payment.findOne({id: paymentId});
        if(payment) {
            payment.paid = true;
            await payment.save();
        }
      }
    )
};

listenToEvents();