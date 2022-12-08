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

    if(response.status === 200) {
        console.log(response)
        console.log(JSON.stringify(response.json()))
        console.log("Account created")
    }
    else{
        console.log("Account did not get created")
        console.log(response.status)
        if(response.status === 400 && usr!="" && pass!="" && confirmPass!="" ){
            let registerError = document.getElementById("register-error").innerText = "The account already exists. Please try logging in instead."
        }
        else if(response.status === 500){
            let registerError = document.getElementById("register-error").innerText = "An unexpected error has occurred. Please try again later."

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
       let error_usr = document.getElementById("username-error").innerText = "Please enter a username."
    }
    else if(pass==""){
        let error_password = document.getElementById("password-error").innerText ="Please enter a password"
    }
    else if(confirmPass==""){
        let error_re_enter_password = document.getElementById("password-re-enter-error").innerText ="Please enter a password"
    }
}

function getInfo(){
    username = document.getElementById("username");
    password = document.getElementById("password");
    confirmPassword = document.getElementById("confirmPassword");
    checkInfoFilled(username.value, password.value, confirmPassword.value);
    let checkPass = checkPasswordIsSame(password.value, confirmPassword.value);
    if(checkPass == false){
        let error_password = document.getElementById("password-error").innerText ="The password doesn't match. Please re-enter the password"
        let error_re_enter_password = document.getElementById("password-re-enter-error").innerText ="The password doesn't match. Please re-enter the password"



    }
    createAccount(username.value, password.value, confirmPassword.value)


}