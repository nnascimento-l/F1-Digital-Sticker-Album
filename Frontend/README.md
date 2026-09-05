# Alura Album - Copa do Mundo Tech

Este projeto é um **álbum de figurinhas digital e interativo** que reúne grandes nomes, tecnologias e marcos da história da computação (como Pioneiros da IA, Linguagens de Programação e Sistemas Operacionais). Desenvolvido durante a **Imersão Alura**, o projeto combina uma interface rica com física de transição de páginas e integração com uma API de backend para carregar as figurinhas.

---

## 🎯 Objetivo do Projeto

O objetivo principal é construir uma aplicação web interativa que simula a experiência real de folhear um álbum de figurinhas físico. O álbum:
1. Apresenta curiosidades e fatos históricos sobre a evolução da tecnologia.
2. Integra-se com uma API local para carregar dinamicamente as figurinhas que o colecionador já possui.
3. Utiliza efeitos sonoros gerados em tempo real (via Web Audio API) e interações dinâmicas para engajar o usuário.

---

## 📁 Arquivos do Projeto e suas Funcionalidades

### 1. `index.html`
*   **Função**: Define o esqueleto semântico e estrutural do álbum.
*   **Detalhes**:
    *   Estrutura o livro/álbum dividindo-o em páginas (`.page`), incluindo a capa (`.page-cover`) e as páginas internas de categorias (IA, Linguagens de Programação, etc.).
    *   Define os slots específicos para cada figurinha (`.sticker-slot`), identificados por um ID numérico (ex: `#01`).
    *   Contém os botões de controle de navegação de páginas (anterior/próxima) e controle de áudio (mutar/desmutar).

### 2. `style.css`
*   **Função**: Responsável por toda a identidade visual, animações e layout responsivo do projeto.
*   **Detalhes**:
    *   Implementa variáveis CSS (`:root`) para gerenciar uma paleta de cores moderna inspirada no universo tecnológico (tons escuros e azuis profundos).
    *   Aplica estilos tridimensionais, efeito de vidro (*glassmorphism*), sombras realistas de dobra de papel e efeitos dinâmicos ao passar o mouse (*hover*).
    *   Garante a responsividade para diferentes tamanhos de tela.

### 3. `app.js`
*   **Função**: Gerencia todo o comportamento interativo e a comunicação com o servidor.
*   **Detalhes**:
    *   **Integração com API**: Conecta-se à API local (`http://localhost:8000/figurinhas`) para obter os dados das figurinhas e injetar as imagens correspondentes nos slots correspondentes (`.sticker-slot`) no HTML.
    *   **Navegação e Dobra**: Inicializa e configura a biblioteca `St.PageFlip`, gerenciando os eventos de clique, arraste de página e navegação.
    *   **Efeitos Sonoros**: Sintetiza em tempo real um som de papel sendo folheado usando a **Web Audio API** (gerando um ruído com envelope de volume dinâmico) ao virar cada página.

---

## 🚀 Como Executar o Projeto

1. **Frontend**:
   * Abra o arquivo `index.html` no seu navegador (recomenda-se utilizar a extensão *Live Server* no VS Code ou similar para evitar bloqueios de CORS ao carregar recursos locais).
   
2. **Backend**:
   * Para carregar as figurinhas reais a partir do servidor, certifique-se de iniciar o backend fornecido:
     ```bash
     cd backend/dia-3
     uvicorn main:app --reload
     ```
   * O frontend tentará se conectar em `http://localhost:8000`. Se o backend não estiver rodando, o álbum funcionará normalmente, exibindo os slots vazios ou de demonstração.
