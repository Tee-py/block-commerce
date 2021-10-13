import React from 'react';


function ItemCard({ item }){
  console.log(`This is the item name ${item.name}`)
  return (
    <div class="col-md-3 col-sm-6" style={{marginTop: "10px"}}>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.description}.</p>
                <button
                  type='button'
                  className='btn btn-primary float-right'
                  onClick={() => item.buy(item)}
                >
                  Purchase - <span className='front-weight-bold'>{item.price} DAI</span>
                </button>
            </div>
        </div>
  </div>
)};

export default ItemCard;