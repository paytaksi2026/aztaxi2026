
// server-driver-wallet.js

let wallets = {};

function addEarning(driverId, amount){

    if(!wallets[driverId]){
        wallets[driverId] = 0;
    }

    wallets[driverId] += amount;

}

function getBalance(driverId){
    return wallets[driverId] || 0;
}

function requestWithdraw(driverId, amount){

    if((wallets[driverId] || 0) < amount){
        return {success:false};
    }

    wallets[driverId] -= amount;

    return {success:true};

}

module.exports = {
    addEarning,
    getBalance,
    requestWithdraw
};
