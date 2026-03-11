
document.getElementById("form").onsubmit = async e=>{

e.preventDefault();

const form = new FormData(e.target);

await fetch("/api/driver-kyc",{
method:"POST",
body:form
});

alert("Document sent for verification");

}
