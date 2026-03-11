
const socket = io();
const room = "ride1";

socket.emit("join", room);

socket.on("chat-message", data => {
const div = document.getElementById("chat");
div.innerHTML += "<p><b>"+data.from+":</b> "+data.msg+"</p>";
});

function send(){
const msg = document.getElementById("msg").value;

socket.emit("chat-message",{
room:room,
from:"Driver",
msg:msg
});

}
