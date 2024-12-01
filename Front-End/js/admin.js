import { getToken, logoutUser } from "./utils.js";

const botaoSalvar = document.getElementById("salvar");
//Função para criar um novo livro no BD
const postLivro = async function () {
	let url =
		"https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/books";

	//Receber os dados do formulário
	let titulo = document.getElementById("title");
	let author = document.getElementById("subtitle");
	let genre = document.getElementById("genre");
	let valor = document.getElementById("price");
	let estoque = document.getElementById("stock");
	let date = document.getElementById("date");

	//Cria um objeto do tipo JSON
	let livroJSON = {};

	//Criando os atributos do JSON e colocando os valores
	livroJSON.title = titulo.value;
	livroJSON.author = author.value;
	livroJSON.price = valor.value;
	livroJSON.genre = genre.value;
	livroJSON.stock = estoque.value;
	livroJSON.published_date = date.value;

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(livroJSON),
	});

	console.log("resposta: ", response);

	//Mensagem de interação com o usuário (201 - sucesso no cadastro)
	if (response.status == 201) {
		alert("Registro inserido com sucesso");
	} else {
		alert("Não foi possivel inserir o registro, verifique os dados enviados");
	}
};

//Função para atualizar um livro existente
const putLivro = async function () {
	//Recebe o ID do livro que foi armazenado na função getBuscarLivro
	let id = sessionStorage.getItem("idLivro");

	let url =
		"https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/atualizar/livro/" +
		id;

	//Receber os dados do formulário
	let titulo = document.getElementById("title");
	let descricao = document.getElementById("subtitle");
	let foto = document.getElementById("image");
	let valor = document.getElementById("price");

	//Cria um objeto do tipo JSON
	let livroJSON = {};

	//Criando os atributos do JSON e colocando os valores
	livroJSON.title = titulo.value;
	livroJSON.subtitle = descricao.value;
	livroJSON.image = foto.value;
	livroJSON.price = valor.value;

	let response = await fetch(url, {
		method: "PUT",
		mode: "cors",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(livroJSON),
	});

	//Mensagem de interação com o usuário (201 - sucesso no cadastro)
	if (response.status == 200) {
		alert("Registro atualizado com sucesso");
	} else {
		alert("Não foi possivel inserir o registro, verifique os dados enviados");
	}
};

botaoSalvar.addEventListener("click", function () {
	//Condição para validar se o sistema irá salvar um novo item
	//ou atualizar um item existente
	if (document.getElementById("salvar").innerText == "Salvar") {
		postLivro();
	} else if (document.getElementById("salvar").innerText == "Atualizar") {
		putLivro();
	}
});

document.addEventListener("DOMContentLoaded", function () {
	let token = getToken();

	if (!token) {
		window.location.href = "index.html";
	}
});

document.getElementById("btnLogout").addEventListener("click", logoutUser);
