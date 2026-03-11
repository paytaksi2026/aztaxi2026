
let users = [];

function login(phone){
    let user = users.find(u=>u.phone===phone);

    if(!user){
        user = {id:Date.now(), phone};
        users.push(user);
    }

    return {success:true,user};
}

module.exports = {login};
