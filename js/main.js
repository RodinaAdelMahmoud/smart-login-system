const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpName =document.getElementById('signUpName');
const signUpEmail =document.getElementById('signUpEmail');
const signUpPass =document.getElementById('signUpPass');
const loginEmail =document.getElementById('loginEmail');
const loginPass =document.getElementById('loginPass');
var pass;
var email;
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




// Check if inputs is empty
function isEmpty(){
if(signUpName.value == "" || signUpEmail.value == "" || signUpPass.value == ""  ){
    return false
}
else{
    return true
}}

function loginEmpty() {
    if (loginEmail.value == "" || loginPass.value == ""){
        return false
    } else {
        return true
    }
  }

  var signUpArr =[]
  if (localStorage.getItem('users')== null){
    signUpArr = []

  }else{
    signUpArr =JSON.parse(localStorage.getItem('users') )
  }



  function emailExist() {
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() === signUpEmail.value.toLowerCase()) {
            return false; 
        }
    }
    return true; 
}








// signup btn

function signBtn(event) {
    
    event.preventDefault();


    if (isEmpty() == false) {
        document.getElementById('comment').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var signBtn = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPass.value,
    }

    if (signUpArr.length == 0) {
        signUpArr.push(signBtn);
        localStorage.setItem('users', JSON.stringify(signUpArr));
        document.getElementById('comment').innerHTML = '<span class="text-success m-3"> Success </span>'
        return true
    } 
    if (emailExist() == false) {
        document.getElementById('comment').innerHTML = '<span class="text-danger m-3"> Email already exists</span>';
        return false 
    } else {
        signUpArr.push(signBtn);
        localStorage.setItem('users', JSON.stringify(signUpArr));
        document.getElementById('comment').innerHTML = '<span class="text-success m-3">Success</span>';
    }
}








// LOGIN btn

function login(event) {
    if (loginEmpty() == false) {
        document.getElementById('req').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    pass = loginPass.value;
    email = loginEmail.value;

    var userFound = false;

    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == email.toLowerCase() && signUpArr[i].password.toLowerCase() == pass.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArr[i].name);
            userFound = true;
            break;
        }
    }

    if (userFound) {
        document.getElementById('main').innerHTML = ` 
        <div class="row justify-content-center">
        <div class="col-md-5">
        <div class="d-flex justify-content-center align-items-center text-center title">
        <h1 class="mt-4 text-white mb-4">Welcome  ${signUpArr[i].name} </h1>
        </div>
        <button class="btn btn-outline-seconadry" onclick="logout()">logOut </button>
        </div>
    </div>`;
    main.style.backgroundColor ="rgb(71 99 132)";
    main.style.minHeight ='100px';
main.style.borderRadius ='50px';    
        return true;
    } else {
        document.getElementById('req').innerHTML = '<span class="text-danger m-3">Invalid email or password</span>';
        return false;
    }
}



function logout(){
    localStorage.removeItem('sessionUsername')
    window.location.href = 'index.html';

}

