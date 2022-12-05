let username ="";
let password ="";
let confirmPassword ="";

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


}