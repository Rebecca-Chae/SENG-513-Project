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

    console.log(response)

    if(response.status === 200) {
        console.log(response)
        console.log(JSON.stringify(response.json()))
        console.log("Account created")
        let registerError = document.getElementById("register-error").innerText = ""
        let registerSuccess = document.getElementById("register-success").innerText = "The account has been created successfully. Please try logging in."
    }
    else{
        console.log("Account did not get created")
        console.log(response.status)
            let registerError = document.getElementById("register-error").innerText = "The account was not created. Please check your credentials or use different credentials."
            let registerSuccess = document.getElementById("register-success").innerText = ""

    }


}

function checkPasswordIsSame(pass, confirmPass) {
    return pass === confirmPass;
}

function checkInfoFilled(usr, pass, confirmPass) {
    if(usr===""){
       let error_usr = document.getElementById("username-error").innerText = "Please enter a username."
    }
    if(pass===""){
        let error_password = document.getElementById("password-error").innerText ="Please enter a password"
    }
    if(confirmPass===""){
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

async function getAcc(usr, pass) {
    let loginError = document.getElementById("loginError")
    let url = 'http://localhost:3000/users/login';
    let body_js = {"username": usr, "password": pass}
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body_js),
    })
    console.log(response)
    if (response.status === 200) {
        localStorage.setItem("username", usr);
        window.location.href = 'list.html';
        console.log(response)
        console.log(JSON.stringify(response.json()))
    }
    else if(response.statusText==="Not Found"){
        loginError.innerText="This account does not exist. Please enter a valid username/password or try signing up"
    }

}

function checkAcc() {
    username = document.getElementById("usrLogin");
    password = document.getElementById("passLogin")
    if (username.value === "") {
        let error_usr = document.getElementById("username-error-login-label").innerText = "Please enter a username"

    }
    if (password.value === "") {
        let error_pass = document.getElementById("password-error-login-label").innerText = "Please enter a password"
    }
    getAcc(username.value, password.value)

    }

    function loadSignup(){
        window.location.href = 'login/singnup.html';
    }