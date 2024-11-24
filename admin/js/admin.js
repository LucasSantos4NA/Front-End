//Recebe do HTML o botão de salvar um novo livro
const botaoSalvar = document.getElementById('salvar')

//Função para criar um novo livro no BD
const postLivro = async function(){

    let url = 'https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/books'

    //Receber os dados do formulário
    let titulo      = document.getElementById('title')
    let author   = document.getElementById('subtitle')
    let genre        = document.getElementById('genre')
    let valor       = document.getElementById('price')
    let estoque     = document.getElementById('stock')
    let date        = document.getElementById('date')

    //Cria um objeto do tipo JSON
    let livroJSON = {}  

    //Criando os atributos do JSON e colocando os valores
    livroJSON.title     = titulo.value 
    livroJSON.author  = author.value
    livroJSON.price     = valor.value
    livroJSON.genre     = genre.value
    livroJSON.stock     = estoque.value
    livroJSON.published_date     = date.value


    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(livroJSON) 
    })

    console.log("resposta: ", response);

    //Mensagem de interação com o usuário (201 - sucesso no cadastro)
    if(response.status == 201){
        alert('Registro inserido com sucesso')
    }else{
        alert('Não foi possivel inserir o registro, verifique os dados enviados')
    }


}

//Função para atualizar um livro existente 
const putLivro = async function(){
    
    //Recebe o ID do livro que foi armazenado na função getBuscarLivro
    let id = sessionStorage.getItem('idLivro')

    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/atualizar/livro/' + id

    //Receber os dados do formulário
    let titulo      = document.getElementById('title')
    let descricao   = document.getElementById('subtitle')
    let foto        = document.getElementById('image')
    let valor       = document.getElementById('price')

    //Cria um objeto do tipo JSON
    let livroJSON = {}

    //Criando os atributos do JSON e colocando os valores
    livroJSON.title     = titulo.value 
    livroJSON.subtitle  = descricao.value
    livroJSON.image     = foto.value
    livroJSON.price     = valor.value

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(livroJSON) 
    })

    //Mensagem de interação com o usuário (201 - sucesso no cadastro)
    if(response.status == 200){
        alert('Registro atualizado com sucesso')
    }else{
        alert('Não foi possivel inserir o registro, verifique os dados enviados')
    }

}

//Função para excluir um livro
const deleteLivro = async function(idLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/'+idLivro

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if(response.status == 200){
        alert('Registro excluído com sucesso!')
        getLivros()
    }else{
        alert('Não foi possível realizar a exclusão do registro.')
    }

}

//Função para buscar um livro pelo ID
const getBuscarLivro = async function(idLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro/'+idLivro

    let response = await fetch(url)

    let dados = await response.json()

    if(response.status == 200){
        //Carregar os dados no formulário
        document.getElementById('title').value      = dados.books[0].title
        document.getElementById('subtitle').value   = dados.books[0].subtitle
        document.getElementById('image').value      = dados.books[0].image
        document.getElementById('price').value      = dados.books[0].price
        //Alterando o texto do botão de Salvar para Atualizar
        document.getElementById('salvar').innerText = 'Atualizar'

        //Guarda o valor do ID em uma variavel de escopo global, para ser utilizada
        //no click do botao Atualizar
        sessionStorage.setItem('idLivro', idLivro)

    }else{
        alert('Não foi possível localizar o registro.')
    }
}

botaoSalvar.addEventListener('click', function(){

    //Condição para validar se o sistema irá salvar um novo item 
    //ou atualizar um item existente
    if(document.getElementById('salvar').innerText == 'Salvar'){
        postLivro()
    }
    else if(document.getElementById('salvar').innerText == 'Atualizar') {
        putLivro()
    }
})