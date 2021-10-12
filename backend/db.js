const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://teepy:teepy@teepycluster.ircf4.mongodb.net/blockCommerceDb?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const itemSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number
})

const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid: Boolean
});

const Payment = mongoose.model('Payment', paymentSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
    Payment,
    Item
}