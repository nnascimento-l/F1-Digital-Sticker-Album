# Importa a classe FastAPI (cria a aplicação web) e HTTPException
# (usada para devolver erros HTTP, como o 404)
from fastapi import FastAPI, HTTPException

# FileResponse envia um arquivo do disco como resposta da requisição
from fastapi.responses import FileResponse

# CORSMiddleware libera o acesso à API a partir de outras origens (portas/domínios)
from fastapi.middleware.cors import CORSMiddlew

from fastapi.staticfiles import StaticFiles

# O módulo os é usado para montar caminhos de pasta e ler variáveis de ambiente
import os

# O módulo glob procura arquivos no disco a partir de um padrão de nome
import glob

# Porta em que a API vai rodar. Lê da variável de ambiente PORT, se existir;
# senão usa 5300 como padrão. É a MESMA porta que o app.js deve usar em
# API_BASE_URL — mude aqui e mude lá também.
PORTA = int(os.getenv("PORT", 5300))

# Cria a instância da aplicação — é ela que o uvicorn executa
app = FastAPI()

# Configura o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Garante que a pasta de imagens seja servida via HTTP
caminho_imagens = os.path.join(os.path.dirname(__file__), "Figurinhas F1")
if os.path.exists(caminho_imagens):
   app.mount("/imagens", StaticFiles(directory=caminho_imagens), name="imagens")
   
# Caminho absoluto até a pasta onde este arquivo está

PASTA_BASE = os.path.dirname(os.path.abspath(__file__))

# Caminho absoluto da pasta com as imagens das figurinhas ("Figurinhas F1")

PASTA_IMAGENS = os.path.join(PASTA_BASE, "Figurinhas F1")

# Cria a pasta 'Figurinhas F1' automaticamente se ela não existir

if not os.path.exists(PASTA_IMAGENS):

    os.makedirs(PASTA_IMAGENS)

# Quantidade total de slots do álbum (30 slots distribuídos nas páginas)

TOTAL_ALBUM = 30

# Lista completa de figurinhas do álbum de F1

figurinhas = [

    # --- PÁGINA 1: HALL DA FAMA (Lendas do Asfalto) ---

    {"id": 1, "nome": "Ayrton Senna", "categoria": "Lendas", "descricao": "Tricampeão mundial e ícone absoluto de velocidade", "colada": False, "imagem_url": "/figurinhas/1/imagem"},

    {"id": 2, "nome": "Alain Prost", "categoria": "Lendas", "descricao": "O Professor, tetracampeão de precisão cirúrgica", "colada": False, "imagem_url": "/figurinhas/2/imagem"},

    {"id": 3, "nome": "Michael Schumacher", "categoria": "Lendas", "descricao": "Heptacampeão e lenda dominante da Ferrari", "colada": False, "imagem_url": "/figurinhas/3/imagem"},

    {"id": 4, "nome": "Niki Lauda", "categoria": "Lendas", "descricao": "Tricampeão mundial e exemplo máximo de resiliência", "colada": False, "imagem_url": "/figurinhas/4/imagem"},

    {"id": 5, "nome": "Lewis Hamilton", "categoria": "Lendas", "descricao": "Heptacampeão mundial e detentor dos recordes de poles e vitórias", "colada": False, "imagem_url": "/figurinhas/5/imagem"},

    # --- PÁGINA 2: GRID ATUAL (Temporada 2026) ---

    {"id": 6, "nome": "Max Verstappen", "categoria": "Grid Atual", "descricao": "Multicampeão com ritmo de corrida e agressividade impecáveis", "colada": False, "imagem_url": "/figurinhas/6/imagem"},

    {"id": 7, "nome": "Charles Leclerc", "categoria": "Grid Atual", "descricao": "O prodígio da Ferrari e mestre das voltas voadoras na classificação", "colada": False, "imagem_url": "/figurinhas/7/imagem"},

    {"id": 8, "nome": "Lando Norris", "categoria": "Grid Atual", "descricao": "Velocidade pura e liderança da nova era da McLaren", "colada": False, "imagem_url": "/figurinhas/8/imagem"},

    {"id": 9, "nome": "George Russell", "categoria": "Grid Atual", "descricao": "Consistência e ritmo forte comandando o cockpit da Mercedes", "colada": False, "imagem_url": "/figurinhas/9/imagem"},

    {"id": 10, "nome": "Fernando Alonso", "categoria": "Grid Atual", "descricao": "Bicampeão mundial e o piloto mais experiente em atividade", "colada": False, "imagem_url": "/figurinhas/10/imagem"},

    # --- PÁGINA 3: ESCUDERIAS (Os Boxes) ---

    {"id": 11, "nome": "Scuderia Ferrari", "categoria": "Escuderias", "descricao": "A equipe mais tradicional e vitoriosa da história da Fórmula 1", "colada": False, "imagem_url": "/figurinhas/11/imagem"},

    {"id": 12, "nome": "Red Bull Racing", "categoria": "Escuderias", "descricao": "Referência em aerodinâmica e estratégia de corrida rápida", "colada": False, "imagem_url": "/figurinhas/12/imagem"},

    {"id": 13, "nome": "Mercedes-AMG F1", "categoria": "Escuderias", "descricao": "A era de ouro da engenharia híbrida e dominância técnica", "colada": False, "imagem_url": "/figurinhas/13/imagem"},

    {"id": 14, "nome": "McLaren Formula 1", "categoria": "Escuderias", "descricao": "Tradição em inovação e garra no automobilismo mundial", "colada": False, "imagem_url": "/figurinhas/14/imagem"},

    {"id": 15, "nome": "Aston Martin F1", "categoria": "Escuderias", "descricao": "Elegância e ambição em busca do topo do grid mundial", "colada": False, "imagem_url": "/figurinhas/15/imagem"},

    # --- PÁGINA 4: BASTIDORES (Mentes por Trás das Máquinas) ---

    {"id": 16, "nome": "Adrian Newey", "categoria": "Bastidores", "descricao": "O maior projetista e gênio da aerodinâmica da F1", "colada": False, "imagem_url": "/figurinhas/16/imagem"},

    {"id": 17, "nome": "Colin Chapman", "categoria": "Bastidores", "descricao": "Fundador da Lotus e inventor do efeito solo", "colada": False, "imagem_url": "/figurinhas/17/imagem"},

    {"id": 18, "nome": "Enzo Ferrari", "categoria": "Bastidores", "descricao": "O lendário Criador da escuderia italiana", "colada": False, "imagem_url": "/figurinhas/18/imagem"},

    {"id": 19, "nome": "Toto Wolff", "categoria": "Bastidores", "descricao": "Líder da era de maior dominância da Mercedes", "colada": False, "imagem_url": "/figurinhas/19/imagem"},

    {"id": 20, "nome": "Christian Horner", "categoria": "Bastidores", "descricao": "O comando irreverente e vitorioso da Red Bull", "colada": False, "imagem_url": "/figurinhas/20/imagem"},

    # --- PÁGINA 5: NOSSA BASE (O boxe da família) ---

    {"id": 21, "nome": "José Cícero", "categoria": "Família", "descricao": "Engenheiro-Chefe e mestre da estabilidade nos bastidores", "colada": False, "imagem_url": "/figurinhas/21/imagem"},

    {"id": 22, "nome": "Severina Silva", "categoria": "Família", "descricao": "Team Principal e a liderança que mantém a equipe em sintonia", "colada": False, "imagem_url": "/figurinhas/22/imagem"},

    {"id": 23, "nome": "Família Silva", "categoria": "Família", "descricao": "A base sólida e a torcida oficial de todas as conquistas", "colada": False, "imagem_url": "/figurinhas/23/imagem"},

    {"id": 24, "nome": "Weslley Nascimento", "categoria": "Família", "descricao": "Piloto titular da Ferrari e destaque em pista", "colada": False, "imagem_url": "/figurinhas/24/imagem"},

    {"id": 25, "nome": "Lucas & Ingrid", "categoria": "Família", "descricao": "Paixão em alta velocidade e sintonia perfeita no grid", "colada": False, "imagem_url": "/figurinhas/25/imagem"},

     # --- PÁGINA 6: BRASIL (O Legado Verde e Amarelo) ---

    {"id": 26, "nome": "Emerson Fittipaldi", "categoria": "Brasil", "descricao": "Pioneiro e primeiro brasileiro a conquistar o título de F1", "colada": False, "imagem_url": "/figurinhas/26/imagem"},

    {"id": 27, "nome": "Nelson Piquet", "categoria": "Brasil", "descricao": "Tricampeão mundial mestre em acerto técnico do carro", "colada": False, "imagem_url": "/figurinhas/27/imagem"},

    {"id": 28, "nome": "Rubens Barrichello", "categoria": "Brasil", "descricao": "Anos de dedicação, vitórias históricas e carinho do público", "colada": False, "imagem_url": "/figurinhas/28/imagem"},

    {"id": 29, "nome": "Felipe Massa", "categoria": "Brasil", "descricao": "Guerreiro do asfalto e vice-campeão em temporada memorável", "colada": False, "imagem_url": "/figurinhas/29/imagem"},

    {"id": 30, "nome": "Interlagos", "categoria": "Brasil", "descricao": "O templo do automobilismo brasileiro e palco de finais históricas", "colada": False, "imagem_url": "/figurinhas/30/imagem"},

]

# Função auxiliar interna para buscar figurinha por ID

def _encontrar(figurinha_id: int):

    for figurinha in figurinhas:

        if figurinha["id"] == figurinha_id:

            return figurinha

    raise HTTPException(status_code=404, detail="Figurinha não encontrada")

# Rota raiz

@app.get("/")

def universal_greeting():

    return {"mensagem": "F1 Legends Album API — Server Running Successfully"}

# Rota que devolve todas as 30 figurinhas

@app.get("/figurinhas")

def listar_figurinhas():

    return figurinhas

# Rota com estatísticas do álbum

@app.get("/figurinhas/total")

def estatisticas_album():

    coladas = sum(1 for figurinha in figurinhas if figurinha["colada"])

    return {

        "total_album": TOTAL_ALBUM,

        "coladas": coladas,

        "faltam": TOTAL_ALBUM - coladas,

    }

# Rota para buscar dados de uma figurinha

@app.get("/figurinhas/{figurinha_id}")

def buscar_figurinha(figurinha_id: int):

    return _encontrar(figurinha_id)

# Rota POST para colar figurinha

@app.post("/figurinhas/{figurinha_id}/colar")

def colar_figurinha(figurinha_id: int):

    figurinha = _encontrar(figurinha_id)

    figurinha["colada"] = True

    return figurinha

# Rota POST para descolar figurinha

@app.post("/figurinhas/{figurinha_id}/descolar")

def descolar_figurinha(figurinha_id: int):

    figurinha = _encontrar(figurinha_id)

    figurinha["colada"] = False

    return figurinha

# Rota que busca e serve a imagem do disco

@app.get("/figurinhas/{figurinha_id}/imagem")

def imagem_figurinha(figurinha_id: int):

    # 1. Tenta buscar no formato com 3 dígitos (ex: 021, 022... ou 001, 002...)

    padrao = os.path.join(PASTA_IMAGENS, f"{figurinha_id:03d}[!0-9]*")

    arquivos = glob.glob(padrao)

    # 2. Se não achar, tenta com 2 dígitos (ex: 21, 22... ou 01, 02...)

    if not arquivos:

        padrao = os.path.join(PASTA_IMAGENS, f"{figurinha_id:02d}[!0-9]*")

        arquivos = glob.glob(padrao)

    # 3. Se não achar, tenta apenas o ID direto (ex: 21.*, 1.*)

    if not arquivos:

        padrao = os.path.join(PASTA_IMAGENS, f"{figurinha_id}.*")

        arquivos = glob.glob(padrao)

    if not arquivos:

        raise HTTPException(status_code=404, detail="Imagem não encontrada")

    return FileResponse(arquivos[0], headers={"Cache-Control": "no-cache"})

# Ponto de entrada: permite rodar com "python main.py" (recomendado) além
# de "uvicorn main:app --reload" (esse último ignora a variável PORTA e
# sempre sobe na porta padrão do Uvicorn, 8000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=5300, reload=True)