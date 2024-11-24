async function buyBook(id){
    let url = `https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/books/${id}/buy`

    let response = await fetch(url, {
        method: 'POST',
    })

    let data = await response.json();

    //Mensagem de interação com o usuário (201 - sucesso no cadastro)
    if(response.ok){
        alert('Compra realizada com sucesso')
    }else{
        alert(`Não foi possivel completar a compra: ${data.message}`)
    }

}

async function getLivros() {
    
    //URL da API
    let url = 'https://3f62d4cd-141e-45ac-bf80-2f087fbbd6af-00-201adf2hmt7aq.worf.replit.dev/books'

    //Executa a URL através do fetch
    let response = await fetch(url);

    //Converte os dados em json
    let dados = await response.json();


    //Recebe a div principal onde será carregado a lista de dados
    let divListDados = document.getElementById('listDados')

    //Limpar a lista de dados antes de carregar uma nova lista
    divListDados.innerText = ''

    //Percorre o array de livros da API
    dados.forEach(function(livro){
        //Cria os elementos no HTML
        let divDados    = document.createElement('div')
        let divTitle    = document.createElement('div')
        let divSubTitle = document.createElement('div')
        let divStock    = document.createElement('div')
        let divPrice    = document.createElement('div')
        let buyBtn      = document.createElement('button')
        
        //Adiciona os atributos
        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')

        //Adiciona o conteudo do array nos elementos do HTML
        divTitle.innerText      = livro.title
        divSubTitle.innerText   = livro.author
        divStock.innerText      = livro.stock
        divPrice.innerText      = "R$ " + livro.price
        buyBtn.innerText = "Comprar"
        buyBtn.setAttribute('idLivro', livro.id)

        //Associa o elemento ao seu elemento pai
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divStock)
        divDados.appendChild(buyBtn)

        buyBtn.addEventListener ('click', async function(){
            let id = buyBtn.getAttribute('idLivro')
            await buyBook(id)

            location.reload()
        })
        
    })

    
    
}

window.addEventListener('load', function(){
    getLivros()
})