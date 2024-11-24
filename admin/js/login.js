async function login() {
    let url = "https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/auth/login";

    let emailElement = document.getElementById("email");
    let passwordElement = document.getElementById("password");

    let email = emailElement.value; 
    let password = passwordElement.value;

    let loginJSON = {};

    loginJSON.email = email;
    loginJSON.password = password;   



    let request = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(loginJSON) 
    })

    let data = await request.json();

    if(request.ok){
        alert("Login realizado com sucesso!")
        return true;
    }else{
        alert(data.error)
        return false;
    }
}


let loginButton = document.getElementById("loginBtn");

loginButton.addEventListener("click", async function(e) {
    e.preventDefault();

    let logged = await login();

    if (logged) {
        window.location.href = "list.html";
    }
});
