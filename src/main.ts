import './style.css';

// Importa o JavaScript do Bootstrap para habilitar componentes como dropdowns, modais, etc.
import 'bootstrap';

// --- CONFIGURAÇÃO ---
const SPREADSHEET_ID = '1O7FWd6-Pv53QJGArbKfSQjGpnlZVGdW_J_K-sUweBNs';
const CONCURSO_LIST_SHEET_NAME = 'lista-concurso';

import './style.css';
// Importa o JavaScript do Bootstrap para habilitar componentes como dropdowns, modais, etc.
import 'bootstrap';

// URL para embutir a planilha principal. O `&amp;rm=minimal` limpa a interface.
const SPREADSHEET_EMBED_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?usp=sharing&amp;rm=minimal`;

// URL para buscar a lista de concursos como um arquivo CSV.
const CONCURSO_LIST_CSV_URL = `https://docs.google.com/spreadsheets/d//gviz/tq?tqx=out:csv&sheet=`;

// --- SELETORES DO DOM ---
const concursoSelector = document.querySelector<HTMLSelectElement>('#concursoSelector');
const spreadsheetContainer = document.querySelector<HTMLDivElement>('#spreadsheet-container');

/**
 * Carrega a lista de concursos da planilha e popula o dropdown.
 */
async function popularConcursos() {
  if (!concursoSelector) return;

  try {
    const response = await fetch(CONCURSO_LIST_CSV_URL);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    // Limpa as opções existentes
    concursoSelector.innerHTML = '<option selected disabled>Selecione um concurso</option>';

    // Processa o CSV: remove aspas, divide por linhas, ignora o cabeçalho (A1)
    const concursos = csvText.replace(/"/g, '').split('\n').slice(1);

    concursos.forEach(nomeConcurso => {
      if (nomeConcurso.trim() !== '') {
        const option = document.createElement('option');
        option.value = nomeConcurso.trim();
        option.textContent = nomeConcurso.trim();
        concursoSelector.appendChild(option);
      }
    });

  } catch (error) {
    console.error('Falha ao carregar a lista de concursos:', error);
    concursoSelector.innerHTML = '<option selected disabled>Erro ao carregar lista</option>';
  }
}

/**
 * Exibe a planilha embutida na página.
 */
function exibirPlanilha() {
  if (!spreadsheetContainer) return;
  spreadsheetContainer.innerHTML = `<iframe src="" style="border:0; width: 100%; height: 100%;"></iframe>`;
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
  popularConcursos();
  exibirPlanilha();
});


