
function notifyDriver(){

if(Notification.permission !== "granted"){
Notification.requestPermission();
}

new Notification("New Ride Request",{
body:"Passenger is waiting for pickup"
});

}
