import './style.css';

// Importa o JavaScript do Bootstrap para habilitar componentes como dropdowns, modais, etc.
import 'bootstrap';

// Seleciona o botão pelo ID
const meuBotao = document.querySelector<HTMLButtonElement>('#meuBotao');

// Adiciona um evento de clique
if (meuBotao) {
  meuBotao.addEventListener('click', () => {
    alert('Você clicou no botão! O TypeScript está funcionando!');
    meuBotao.innerText = 'Obrigado por clicar!';
  });
}

