const { Payment, Item } = require('./db.js');

async function getItems(context){
    await Item
}

async function getPaymentId(context){
    const paymentId = (Math.random() * 10000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: context.params.itemId,
        paid: false
    });
    context.body = {
        paymentId
    }
}

async function getItemUrl(context){
    const payment = await Payment.findOne({id: context.params.paymentId});
    if (payment && payment.paid === true){
        context.body = {
            url: items[payment.itemId].url
        }
    } else {
        context.body = {
            url: ''
        }
    }
}

module.exports = {
    getPaymentId,
    getItemUrl
}