class Auth {

    login(email,password){

        const user = {
            email,
            plan:"free",
            loginDate:new Date()
        };

        localStorage.setItem(
            "rmp_user",
            JSON.stringify(user)
        );

        location.href="dashboard.html";
    }

    logout(){
        localStorage.removeItem("rmp_user");
        location.href="index.html";
    }

    currentUser(){
        return JSON.parse(
            localStorage.getItem("rmp_user")
        );
    }
}

window.auth = new Auth();
