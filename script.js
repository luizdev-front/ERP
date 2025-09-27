let funcionarios = [{ usuario: "admin", senha: "1234" }];
let produtos = [];
let vendaAtual = [];
let historico = [];

function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const valido = funcionarios.find(f => f.usuario === usuario && f.senha === senha);
  if (valido) {
    document.getElementById("erp").style.display = "block";
  } else {
    alert("Usuário ou senha inválidos.");
  }
}

function cadastrarProduto() {
  const nome = document.getElementById("nome-produto").value;
  const preco = parseFloat(document.getElementById("preco-produto").value);
  const estoque = parseInt(document.getElementById("estoque-produto").value);

  if (nome && !isNaN(preco) && !isNaN(estoque)) {
    produtos.push({ nome, preco, estoque });
    atualizarSelecao();
    alert("Produto cadastrado!");
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function atualizarSelecao() {
  const select = document.getElementById("selecao-produto");
  select.innerHTML = "";
  produtos.forEach((p, i) => {
    select.innerHTML += `<option value="${i}">${p.nome} (Estoque: ${p.estoque})</option>`;
  });
}

function adicionarVenda() {
  const index = parseInt(document.getElementById("selecao-produto").value);
  const qtd = parseInt(document.getElementById("quantidade-venda").value);
  const produto = produtos[index];

  if (produto.estoque >= qtd) {
    produto.estoque -= qtd;
    vendaAtual.push({ nome: produto.nome, preco: produto.preco, qtd });
    atualizarVenda();
    atualizarSelecao();
  } else {
    alert("Estoque insuficiente.");
  }
}

function atualizarVenda() {
  const lista = document.getElementById("lista-venda");
  lista.innerHTML = "";
  let total = 0;

  vendaAtual.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;
    lista.innerHTML += `<tr><td>${item.nome}</td><td>${item.qtd}</td><td>R$ ${subtotal.toFixed(2)}</td></tr>`;
  });

  document.getElementById("total-venda").textContent = total.toFixed(2);
}

function finalizarVenda() {
  if (vendaAtual.length === 0) {
    alert("Nenhum item na venda.");
    return;
  }

  const total = parseFloat(document.getElementById("total-venda").textContent);
  const recibo = vendaAtual.map(item => `${item.qtd}x ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2)}`).join("\n");
  alert(`🧾 Recibo:\n${recibo}\n\nTotal: R$ ${total.toFixed(2)}`);

  historico.push({ itens: [...vendaAtual], total });
  vendaAtual = [];
  atualizarVenda();
  atualizarHistorico();
}

function atualizarHistorico() {
  const lista = document.getElementById("historico-vendas");
  lista.innerHTML = "";
  historico.forEach((venda, i) => {
    const itens = venda.itens.map(item => `${item.qtd}x ${item.nome}`).join(", ");
    lista.innerHTML += `<li>Venda ${i + 1}: ${itens} - Total: R$ ${venda.total.toFixed(2)}</li>`;
  });
}
