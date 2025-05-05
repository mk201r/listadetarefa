const inputTarefa = document.getElementById("input-tarefa");
const btnAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");

// Carrega tarefas do localStorage ao iniciar
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);
    tarefas.forEach((texto) => criarTarefa(texto));
  }
  atualizarMensagem();
}

// Atualiza o localStorage com a lista atual
function salvarTarefas() {
  const itens = document.querySelectorAll("#lista-tarefas li");
  const tarefas = Array.from(itens).map((li) => li.firstChild.textContent.trim());
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cria uma tarefa na interface
function criarTarefa(texto) {
  const li = document.createElement("li");
  li.textContent = texto;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", () => {
    li.remove();
    salvarTarefas();
    atualizarMensagem();
  });

  li.appendChild(btnRemover);
  listaTarefas.appendChild(li);
  atualizarMensagem();
}

function atualizarMensagem() {
  mensagemVazia.style.display = listaTarefas.children.length === 0 ? "block" : "none";
}

// Ao clicar no botão "Adicionar"
btnAdicionar.addEventListener("click", () => {
  const texto = inputTarefa.value.trim();

  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  criarTarefa(texto);
  salvarTarefas();
  inputTarefa.value = "";
});

// Carrega as tarefas ao abrir a página
carregarTarefas();
