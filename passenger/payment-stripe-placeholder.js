
// payment-stripe-placeholder.js
// placeholder for Stripe style card payment

async function payWithCard(amount){

    try{

        const res = await fetch("/api/payment/create-intent",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({amount})
        });

        const data = await res.json();

        alert("Payment intent created: " + data.clientSecret);

    }catch(e){
        console.log("payment error",e);
    }

}

window.AzTaxiPaymentCard = { payWithCard };
