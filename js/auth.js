function login(){

    const code = document.getElementById("code").value;

    const allowed = ["FREE", "PRO", "RANCH26"];

    if(!allowed.includes(code)){
        document.getElementById("status").innerText = "Invalid Code";
        return;
    }

    localStorage.setItem("tier", code);

    window.location.href = "dashboard.html";
}
