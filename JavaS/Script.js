//VARIAVEIS//
function pedir() {
    alert("Pedido adicionado ao carrinho!");
}
let carrinho = [
    {
        nome: "Sr-Bacon",
        preco: 22.90,
        quantidade: 0,
    }
];
let total = 0;

//ADICIONAR PRODUTO //
function adicionarProduto(nome, preco) {

    let produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();
    salvarCarrinho();

}
//ATUALIZAR O CARRINHO //
function atualizarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

     if (!lista) {
        return;
    }

    lista.innerHTML = "";

    total = 0;

    let quantidadeItens = 0;

    for(let item of carrinho){

        total += item.preco * item.quantidade;

        quantidadeItens += item.quantidade;

        lista.innerHTML += `
        <li>

            <strong>${item.nome}</strong>

            <button
                onclick="removerProduto('${item.nome}')"
                class="btn-remover">
                🗑️
            </button>

            <br><br>

            <button onclick="diminuirQuantidade('${item.nome}')">
                ➖
            </button>

            ${item.quantidade}

            <button onclick="aumentarQuantidade('${item.nome}')">
                ➕
            </button>

            <br><br>

            Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}

        </li>`;
    }

    document.getElementById("contador").innerHTML =
        "Itens: " + quantidadeItens;

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2);
}

// AUMENTAR E DIMINUIR QUANTIDADES //
    function aumentarQuantidade(nome){

    let produto = carrinho.find(
        item => item.nome === nome
    );

    produto.quantidade++;


    atualizarCarrinho();
    salvarCarrinho();
}
    function diminuirQuantidade(nome) {

    let produto = carrinho.find(
        item => item.nome === nome
    );

    produto.quantidade--;

    if(produto.quantidade <= 0){

        carrinho = carrinho.filter(
            item => item.nome !== nome
        );

    }

    atualizarCarrinho();
    salvarCarrinho();
}
    

    function removerProduto(nome) {

    carrinho = carrinho.filter(
        item => item.nome !== nome);

    atualizarCarrinho();
    salvarCarrinho();
}

//LIMPAR CARRINHO//
function limparCarrinho() {
    carrinho = [];
    quantidade = 0;
    total = 0;

    document.getElementById("contador").innerHTML =
        "Itens: 0";

    document.getElementById("lista-carrinho").innerHTML =
        "";

    document.getElementById("total").innerHTML =
        "Total: R$ 0,00";
}

// SALVAR CARRINHO //
    function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

    function carregarCarrinho() {

    let dados = localStorage.getItem("carrinho");

    if(dados){

        carrinho = JSON.parse(dados);

        atualizarCarrinho();
    }
}
//FINALIZAR PEDIDO// 
function finalizarPedido() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    let agora = new Date();

    let dataHora =
    agora.toLocaleString("pt-BR");

    let numeroPedido =
    Math.floor(Math.random() * 9000) + 1000;

    let nomeCliente =
        document.getElementById("nomeCliente").value;

    let endereco =
        document.getElementById("endereco").value;

    let pagamento =
        document.getElementById("pagamento").value;

    let mensagem = `🍔 *PEDIDO #${numeroPedido} -SR. BURGUER*
📅 Data/Hora: ${dataHora}

👤 Cliente: ${nomeCliente}

📍 Endereço: ${endereco}

💳 Pagamento: ${pagamento}

--------------------
`;

    for (let item of carrinho) {

        mensagem +=
            `🍔 ${item.nome} x${item.quantidade}\n`;

    }

    mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

    window.open(
        `https://wa.me/5516988483222?text=${encodeURIComponent(mensagem)}`
    );
        limparCarrinho();

    document.getElementById("nomeCliente").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("pagamento").selectedIndex = 0;
    alert("Pedido enviado com sucesso!");
}
carregarCarrinho();

const temaBtn = document.getElementById("tema-btn");

if (temaBtn) {
    temaBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            temaBtn.textContent = "☀️";
        } else {
            temaBtn.textContent = "🌙";
        }
    });
}