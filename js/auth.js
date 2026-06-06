class Auth {

login(email){
localStorage.setItem("user", email);
location.href="dashboard.html";
}

logout(){
localStorage.removeItem("user");
location.href="index.html";
}

}

window.auth = new Auth();
