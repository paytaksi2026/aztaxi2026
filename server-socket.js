
// server-socket.js
// basic WebSocket server for realtime ride updates

const WebSocket = require("ws");

let drivers = {};
let passengers = {};

function startSocket(server){

    const wss = new WebSocket.Server({ server });

    wss.on("connection",(ws)=>{

        ws.on("message",(msg)=>{

            try{
                const data = JSON.parse(msg);

                if(data.type === "driver_connect"){
                    drivers[data.driverId] = ws;
                }

                if(data.type === "passenger_connect"){
                    passengers[data.passengerId] = ws;
                }

                if(data.type === "driver_location"){
                    Object.values(passengers).forEach(p=>{
                        p.send(JSON.stringify({
                            type:"driver_location",
                            lat:data.lat,
                            lng:data.lng
                        }));
                    });
                }

            }catch(e){
                console.log("socket error",e);
            }

        });

    });

}

module.exports = { startSocket };
