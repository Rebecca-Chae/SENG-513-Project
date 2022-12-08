let username ="";
let password ="";
let confirmPassword ="";

async function createAccount(usr, pass, confirmPass) {
    let url = 'http://localhost:3000/users/sign-up';
    let body_js = {"username": usr, "password": pass, "confirmPass": confirmPass}
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(body_js),
    })
        // .then(response => response.json())
        // .then(response => console.log(JSON.stringify(response)))
    if(response.status == 200) {
        console.log(response)
        console.log(JSON.stringify(response.json()))
        console.log("Account created")
    }
    else{
        console.log("Account did not get created")
        console.log(response.status)
        if(response.status == 400){
            alert("The account already exists. Please try logging in instead.")
        }
    }


}

function checkPasswordIsSame(pass, confirmPass) {
    if(pass == confirmPass){
        return true;
    }
    else{
        return false;
    }
}

function checkInfoFilled(usr, pass, confirmPass) {
    if(usr==""){
        alert("ERROR: Please enter the username")
    }
    else if(pass==""){
        alert("ERROR: Please enter the password")
    }
    else if(confirmPass==""){
        alert("ERROR: Please enter the password in confirm password field")
    }
}

function getInfo(){
    username = document.getElementById("username");
    password = document.getElementById("password");
    confirmPassword = document.getElementById("confirmPassword");
    checkInfoFilled(username.value, password.value, confirmPassword.value);
    let checkPass = checkPasswordIsSame(password.value, confirmPassword.value);
    if(checkPass == false){
        alert("ERROR: Re-enter the password, it doesn't match")



    }
    createAccount(username.value, password.value, confirmPassword.value)


}