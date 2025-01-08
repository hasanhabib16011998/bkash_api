import React from 'react';
import axios from 'axios';

function Home() {

    const pay = async() => {
        try{
            const {data} = await axios.post('http://localhost:3000/api/bkash/payment/create',{amount:50,orderID:1,userID:'aeluojnljwrJLJWFHloWJF'},{withCredentials:true});
            console.log(data);

            window.location.href = data.bkashURL;
        }
        catch(error){
            console.log(error.response.data);
        }
    }
  return (
    <div>
        <button onClick={pay}>
            Pay with Bkash
        </button>
    </div>
  )
}

export default Home;