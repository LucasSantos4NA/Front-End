async function register() {
    let url = "https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/auth/register";

    let nameElement = document.getElementById("name");
    let emailElement = document.getElementById("email");
    let passwordElement = document.getElementById("password");

    let name = nameElement.value;
    let email = emailElement.value; 
    let password = passwordElement.value;

    let registerJSON = {};

    registerJSON.name = name;
    registerJSON.email = email;
    registerJSON.password = password;   



    let request = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(registerJSON) 
    })

    let data = await request.json();

    if(request.ok){
        alert("Cadastro realizado com sucesso!")
    }else{
        alert(data.error)
    }
}


let registerButton = document.getElementById("signupBtn");

registerButton.addEventListener("click", async function(e) {
    e.preventDefault();

    await register();

    window.location.href = "index.html";
});
