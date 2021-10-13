import React from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import ItemCard from './ItemCard';

const API_URL = 'http://localhost:4000';

const ITEMS = [
    {
        id: 1,
        name: 'First Item',
        description: 'This is The First Test Item',
        price: ethers.utils.parseEther('100')
    },
    {
        id: 2,
        name: 'Second Item',
        description: 'This is The Second Test Item',
        price: ethers.utils.parseEther('200')
    }
];

function Store({ paymentProcessor, dai }) {

    const buy = async item => {
        const res1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
        const txn1 = await dai.approve(paymentProcessor.address, item.price);
        await txn1.wait();

        const txn2 = await paymentProcessor.pay(item.price, res1.data.paymentId);
        await txn2.wait()

        await new Promise(resolve => setTimeout(resolve, 5000));

        const res2 = await axios.get(`${API_URL}/api/getItemUrl/${res1.data.paymentId}`);
        console.log(res2)
    }

    return (
        <div className="row">
            {ITEMS.map(item => 
                <ItemCard  
                    item={{...item, buy}}
                />
            )}
        </div>
    )
}

export default Store;