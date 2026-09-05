## Grand Prix Album — Lendas, Grid Atual e Legado Brasileiro

Álbum de figurinhas digital e interativo sobre Fórmula 1, feito durante a Imersão Alura. Reúne 30 "figurinhas" — pilotos lendários, grid atual, escuderias, bastidores e homenagens — em um livro folheável no navegador com virada de página em 3D e som de papel sintetizado.
Clicar em um slot alterna a figurinha entre colada/descolada. O visual usa uma paleta laranja-racing sobre grafite, com alternância entre modo claro e escuro.

## Objetivo

Frontend estático que renderiza o álbum. Uma API FastAPI entra apenas como servidor de imagens: cada slot busca sua figurinha em `/figurinhas/{id}/imagem`. A navegação do livro, a colagem/descolagem e o tema funcionam inteiramente no navegador — o backend não guarda nem recebe nenhum desses estados.
> Isso é diferente de um álbum "completo" com contador: o `main.py` até tem uma lista com o campo `colada` e rotas `POST /colar` e `/descolar` prontas, mas o `app.js` nunca chama essas rotas. Colar uma figurinha hoje é só uma troca de classe CSS local, que **some ao dar F5**.

## Estrutura
```
Backend/
├── main.py            # API FastAPI: serve a lista e as imagens das figurinhas
├── requirements.txt   # dependências (fastapi, uvicorn) — cada PC cria seu próprio venv a partir daqui
└── Figurinhas F1/     # 30 imagens das figurinhas + imagem de fundo

Frontend/
├── index.html         # Estrutura do álbum: capa, 6 páginas, contracapa
├── style.css          # Paleta, animações, tema claro/escuro e responsividade
├── app.js             # PageFlip, arraste customizado, som e preenchimento das imagens
└── Figurinhas F1/      # cópia da pasta de imagens, usada pelo caminho relativo do style.css
```
> `style.css` referencia `Figurinhas F1/53-Fundo.png` como caminho relativo — por isso a pasta `Figurinhas F1/` precisa existir tanto dentro de `Backend/` (de onde a API serve as imagens) quanto dentro de `Frontend/` (de onde o navegador carrega o fundo).
>
> A pasta `venv/` **não** é versionada (está no `.gitignore`) — ela é criada localmente a partir do `requirements.txt`, então funciona em qualquer computador sem quebrar.

## O álbum

## O álbum

| Pág. | Categoria | # | Personagens/Times |
|---|---|---|---|
| 1 | Lendas | 01-05 | Ayrton Senna, Alain Prost, Michael Schumacher, Niki Lauda, Lewis Hamilton |
| 2 | Grid Atual | 06-10 | Max Verstappen, Charles Leclerc, Lando Norris, George Russell, Fernando Alonso |
| 3 | Escuderias | 11-15 | Scuderia Ferrari, Red Bull Racing, Mercedes-AMG F1, McLaren Formula 1, Aston Martin F1 |
| 4 | Bastidores | 16-20 | Adrian Newey, Colin Chapman, Enzo Ferrari, Toto Wolff, Christian Horner |
| 5 | Família | 21-25 | José Cícero, Severina Silva, Família Silva, Weslley Nascimento, Lucas & Ingrid |
| 6 | Brasil | 26-30 | Emerson Fittipaldi, Nelson Piquet, Rubens Barrichello, Felipe Massa, Interlagos |

Essa é a lista **do backend** (`main.py`). O `index.html`, porém, tem nomes e descrições fixos digitados diretamente no HTML, e alguns não batem com essa lista — por exemplo, os slots #02 a #05 da página 1 mostram Schumacher, Juan Manuel Fangio, Prost e "Lucas Nascimento" no HTML, enquanto o backend tem Prost, Schumacher, Lauda e Hamilton nessas posições. Vale decidir qual das duas listas é a "oficial" e alinhar as duas.

## Sobre as imagens
As imagens ficam em `Figurinhas F1/`, uma por figurinha, com o ID no início do nome do arquivo. A rota de imagem tenta, nessa ordem:
3 dígitos: `021-nome.jpg`
2 dígitos: `21-nome.jpg`
Apenas o ID: `21.jpg`
O primeiro padrão que encontrar um arquivo (via `glob`) é usado — o resto do nome e a extensão são livres. Se a pasta `Figurinhas F1/` não existir, o `main.py` a cria automaticamente (vazia) ao subir.
Fórmula 1 e as marcas das equipes são propriedade de seus respectivos detentores; use as imagens apenas para estudo/uso pessoal.
Como rodar o projeto
O projeto é dividido em Backend (servidor da API e imagens) e Frontend (a interface do álbum no navegador).

## 1️ Ativando e rodando o Backend
Abra o terminal e siga os comandos para entrar na pasta do backend, criar o ambiente virtual, instalar os pacotes e subir a API:
PowerShell
```bash
# 1. Entre na pasta do Backend
cd Backend

# 2. Crie o ambiente virtual (somente na primeira vez)
python -m venv venv

# 3. Ative o ambiente virtual
.\venv\Scripts\Activate.ps1

# 4. Instale as dependências do projeto
pip install -r requirements.txt

# 5. Inicie o servidor
python main.py
```
💡 Dica de erro no PowerShell: Se aparecer uma mensagem vermelha de erro ao ativar a venv (`UnauthorizedAccess`), execute o comando `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` uma vez no terminal e tente ativar novamente.
Servidor rodando: O backend estará ativo em `http://127.0.0.1:5300`.
Documentação Swagger (FastAPI): Para visualizar e testar todas as rotas da API, acesse `http://127.0.0.1:5300/docs` no seu navegador.

## 2️ Rodando o Frontend
Abra um segundo terminal (mantenha o terminal do Backend rodando) e execute:
PowerShell
```bash
# 1. Entre na pasta do Frontend
cd Frontend

# 2. Suba o servidor do frontend
python -m http.server 5500
```
Acessar o álbum: Abra o seu navegador e acesse `http://localhost:5500`.
> **Atenção à porta:** o `app.js` centraliza a URL da API numa única constante: `const API_BASE_URL = "http://localhost:5300";`. Ela precisa bater exatamente com a porta do backend — se mudar uma, muda a outra.
Sem o backend no ar, o álbum ainda folheia normalmente; só as imagens dos slots não carregam (o `console.warn` avisa qual figurinha falhou).
main.py
A porta é lida da variável de ambiente `PORT`, com `5300` como padrão, e o arquivo já sobe o próprio servidor ao ser executado com `python main.py`:
```python
PORTA = int(os.getenv("PORT", 5300))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=PORTA, reload=True)
```
Isso permite trocar a porta sem editar código: `PORT=8080 python main.py`. Rodar com `uvicorn main:app --reload` continua funcionando, mas nesse caso ignora `PORTA` e sobe na porta padrão do Uvicorn (8000) — por isso a recomendação é sempre `python main.py`.
Mantém as 30 figurinhas em uma lista em memória (reiniciar o servidor zera qualquer `colada = True`, embora hoje nada grave esse campo de qualquer forma):
```python
{"id": 1, "nome": "Ayrton Senna", "categoria": "Lendas",
 "descricao": "Tricampeão mundial e ícone absoluto de velocidade",
 "colada": False, "imagem_url": "/figurinhas/1/imagem"}
```
| Rota | O que faz |
|---|---|
| `GET /` | Mensagem de status da API |
| `GET /figurinhas` | Todas as 30, com o campo `colada` |
| `GET /figurinhas/total` | `{total_album, coladas, faltam}` |
| `GET /figurinhas/{id}` | Uma figurinha, ou 404 |
| `GET /figurinhas/{id}/imagem` | O arquivo de imagem |
| `POST /figurinhas/{id}/colar` | `colada = True` |
| `POST /figurinhas/{id}/descolar` | `colada = False` |

**Dois detalhes que valem atenção:**

**Ordem das rotas.** `/figurinhas/total` precisa vir antes de `/figurinhas/{id}` no arquivo — o FastAPI testa na ordem de registro, e a rota dinâmica tentaria converter `"total"` para `int`, respondendo 422.

**`_encontrar()`**. A busca por ID é usada por três rotas, então mora numa função só, que já levanta o 404.

**CORS liberado para tudo** (`allow_origins=["*"]`), o que é conveniente em desenvolvimento mas deve ser restringido antes de qualquer deploy público.
Rotas de `colar`/`total`/`descolar` estão implementadas e funcionam via Swagger (`/docs`) ou `curl`, mas — vale repetir — o frontend atual não as consome.

## index.html
Cada `div.page` é uma folha carregada pela lib `St.PageFlip`; capa e contracapa usam `data-density="hard"` para simular papelão. Cada página tem um `.page-header` com categoria/título e uma `.stickers-grid` com 5 slots:
```html
<div class="sticker-slot">
  <div class="slot-number">#01</div>
  <div class="slot-name">Ayrton Senna</div>
  <div class="slot-role">Tricampeão mundial e ícone absoluto de velocidade</div>
</div>
```
Diferente de um slot com botões dedicados, aqui o `<div class="sticker-slot">` inteiro é clicável via JS (`slot.style.cursor = "pointer"` + listener de `click`) — não há um botão separado para "descolar", é o mesmo clique que alterna os dois estados.

## style.css
Uma única paleta ("Laranja Racing & Grafite"), não uma por página como em álbuns com facções. As variáveis de tema moram em dois blocos:
`:root` — modo escuro (padrão): fundo quase preto, texto branco, borda de slot laranja translúcida.
`body.light-mode` — sobrescreve as mesmas variáveis para fundo claro e texto escuro.
```css
--bg-gradient: url('Figurinhas F1/53-Fundo.png');
```
Esse background de fundo é a imagem #31, por assim dizer: fica na mesma pasta das figurinhas, mas é referenciada diretamente pelo CSS como caminho relativo, não pela API.
O visual de "colada"/"descolada" é controlado pela classe `.slot-preenchido`, adicionada e removida via JS apenas no clique. Isso é proposital: uma `<img>` pode existir no DOM (escondida, `display:none`, esperando o clique) sem que o slot mude de aparência — o CSS não reage à simples presença da imagem, só à classe.

## app.js
1. **Tema claro/escuro** — lê/escreve `localStorage["theme"]` e alterna a classe `light-mode` no `<body>` (não em `<html>` via atributo `data-mode`). Como as variáveis CSS são herdadas, isso já basta para repintar o álbum inteiro.
2. **Preenchimento das figurinhas** — `preencherFigurinhas()` roda no `DOMContentLoaded` e injeta uma `<img>` (inicialmente `display: none`) em cada `.sticker-slot`, casando pelo número do slot com uma lista de 30 URLs hardcoded no próprio arquivo (não vem de um `fetch` à API `/figurinhas`). Erros de carregamento de imagem só geram um aviso no console — o álbum continua navegável.
3. **Colar/descolar** — um listener de `click` por slot alterna `img.style.display` entre `none`/`block` e adiciona/remove a classe `slot-preenchido`. Sem imagem carregada, cai num modo simulado (`classList.toggle("simulated-pasted")`). Nada disso chama a API.
4. **Inicialização do PageFlip** — `size: "stretch"`, páginas via `loadFromHTML()`. Os gestos nativos são desligados de propósito (`useMouseEvents: false`, `disableFlipByClick: true`) para dar lugar ao arraste customizado.
5. **Arraste customizado** — reimplementado à mão via `mousedown`/`mousemove`/`mouseup` (e equivalentes touch). A virada só dispara depois de mover mais de 10px — abaixo disso é clique, não arraste. O canto da dobra é calculado pela posição vertical do ponteiro e pela paridade do índice da página.
6. **Som de virada** — `playPaperTurnSound()` sintetiza ruído branco em tempo real com a Web Audio API: envelope que sobe em 30% da duração e decai, com estalos aleatórios simulando atrito, passando por um filtro bandpass varrendo 1500Hz → 350Hz e um lowpass em 3800Hz.
7. **Navegação** — botões de seta, teclas `←`/`→`, e os botões prev/next somem automaticamente na capa e na contracapa via o evento `flip` do PageFlip.

## Controles
| Ação | Como |
|---|---|
| Virar página | Arrastar a página, setas laterais ou `←` / `→` |
| Colar/descolar figurinha | Clicar em qualquer parte do slot |
| Modo claro/escuro | Botão 🌙 / ☀️ no topo |
| Ligar/desligar som | Botão de alto-falante no canto |
Ligar/desligar som	Botão de alto-falante no canto

## Pontos de atenção para evoluir o projeto
Ligar o clique dos slots às rotas `POST /colar` e `/descolar` do backend, para o progresso persistir entre recarregamentos (e fazer sentido usar `GET /figurinhas/total` para um contador).
Restringir `allow_origins` no CORS antes de qualquer deploy fora do `localhost`.

## 👨‍💻 Autor

Desenvolvido por **Lucas Nascimento**

* **LinkedIn:** www.linkedin.com/in/lucasnascimentoosilva

<img width="1917" height="1076" alt="Captura de tela 2026-09-04 231620" src="https://github.com/user-attachments/assets/6ee408e5-c47f-4895-a12e-d60add5e4b12" />

<img width="1917" height="1076" alt="Captura de tela 2026-09-04 231713" src="https://github.com/user-attachments/assets/c18b32cf-992c-4dea-a6dd-d36fb6847312" />
