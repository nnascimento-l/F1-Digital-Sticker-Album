// ===================================================
// CONFIGURAÇÃO DA API
// Quando o frontend for servido pelo FastAPI (Dia 3), a API está
// no mesmo servidor — usamos uma URL relativa ou o endereço completo.
// ===================================================
const API_BASE_URL = "https://f1-digital-sticker-album.onrender.com";

// ===================================================
// FUNÇÃO: Preenche os slots do álbum com imagens da API
// Esta função é chamada após o álbum ser inicializado.
// ===================================================
async function preencherFigurinhas() {
    try {
       const figurinhas_locais = [
    // --- PÁGINA 1: HALL DA FAMA ---
    { id: 1, nome: "Ayrton Senna", imagem_url: "http://127.0.0.1:5300/figurinhas/1/imagem" },
    { id: 2, nome: "Alain Prost", imagem_url: "http://127.0.0.1:5300/figurinhas/2/imagem" },
    { id: 3, nome: "Michael Schumacher", imagem_url: "http://127.0.0.1:5300/figurinhas/3/imagem" },
    { id: 4, nome: "Niki Lauda", imagem_url: "http://127.0.0.1:5300/figurinhas/4/imagem" },
    { id: 5, nome: "Lewis Hamilton", imagem_url: "http://127.0.0.1:5300/figurinhas/5/imagem" },

    // --- PÁGINA 2: GRID ATUAL ---
    { id: 6, nome: "Max Verstappen", imagem_url: "http://127.0.0.1:5300/figurinhas/6/imagem" },
    { id: 7, nome: "Charles Leclerc", imagem_url: "http://127.0.0.1:5300/figurinhas/7/imagem" },
    { id: 8, nome: "Lando Norris", imagem_url: "http://127.0.0.1:5300/figurinhas/8/imagem" },
    { id: 9, nome: "George Russell", imagem_url: "http://127.0.0.1:5300/figurinhas/9/imagem" },
    { id: 10, nome: "Fernando Alonso", imagem_url: "http://127.0.0.1:5300/figurinhas/10/imagem" },

    // --- PÁGINA 3: ESCUDERIAS ---
    { id: 11, nome: "Scuderia Ferrari", imagem_url: "http://127.0.0.1:5300/figurinhas/11/imagem" },
    { id: 12, nome: "Red Bull Racing", imagem_url: "http://127.0.0.1:5300/figurinhas/12/imagem" },
    { id: 13, nome: "Mercedes-AMG F1", imagem_url: "http://127.0.0.1:5300/figurinhas/13/imagem" },
    { id: 14, nome: "McLaren Formula 1", imagem_url: "http://127.0.0.1:5300/figurinhas/14/imagem" },
    { id: 15, nome: "Alpine F1", imagem_url: "http://127.0.0.1:5300/figurinhas/15/imagem" },

    // --- PÁGINA 4: BASTIDORES ---
    { id: 16, nome: "Adrian Newey", imagem_url: "http://127.0.0.1:5300/figurinhas/16/imagem" },
    { id: 17, nome: "Colin Chapman", imagem_url: "http://127.0.0.1:5300/figurinhas/17/imagem" },
    { id: 18, nome: "Enzo Ferrari", imagem_url: "http://127.0.0.1:5300/figurinhas/18/imagem" },
    { id: 19, nome: "Toto Wolff", imagem_url: "http://127.0.0.1:5300/figurinhas/19/imagem" },
    { id: 20, nome: "Christian Horner", imagem_url: "http://127.0.0.1:5300/figurinhas/20/imagem" },

    // --- PÁGINA 5: FAMÍLIA (NOSSA BASE) ---
    { id: 21, nome: "José Cícero", imagem_url: "http://127.0.0.1:5300/figurinhas/21/imagem" },
    { id: 22, nome: "Severina Silva", imagem_url: "http://127.0.0.1:5300/figurinhas/22/imagem" },
    { id: 23, nome: "Família Silva", imagem_url: "http://127.0.0.1:5300/figurinhas/23/imagem" },
    { id: 24, nome: "Weslley Nascimento", imagem_url: "http://127.0.0.1:5300/figurinhas/24/imagem" },
    { id: 25, nome: "Lucas & Ingrid", imagem_url: "http://127.0.0.1:5300/figurinhas/25/imagem" },

    // --- PÁGINA 6: BRASIL ---
    { id: 26, nome: "Emerson Fittipaldi", imagem_url: "http://127.0.0.1:5300/figurinhas/26/imagem" },
    { id: 27, nome: "Nelson Piquet", imagem_url: "http://127.0.0.1:5300/figurinhas/27/imagem" },
    { id: 28, nome: "Rubens Barrichello", imagem_url: "http://127.0.0.1:5300/figurinhas/28/imagem" },
    { id: 29, nome: "Felipe Massa", imagem_url: "http://127.0.0.1:5300/figurinhas/29/imagem" },
    { id: 30, nome: "Interlagos", imagem_url: "http://127.0.0.1:5300/figurinhas/30/imagem" }
];

        const porId = new Map(figurinhas_locais.map(f => [f.id, f]));
        const slots = document.querySelectorAll(".sticker-slot");

        for (const slot of slots) {
            const slotNumeroEl = slot.querySelector(".slot-number");
            if (!slotNumeroEl) continue;

            const id = parseInt(slotNumeroEl.textContent.replace("#", ""), 10);
            if (!porId.has(id)) continue;

            const figurinha = porId.get(id);
            if (!figurinha.imagem_url) continue; // Pula se não houver imagem configurada

            const img = document.createElement("img");
            // Adicionando um fallback caso a imagem falhe ao carregar
            img.src = figurinha.imagem_url;
            img.alt = figurinha.nome;
            img.className = "sticker-img";
            // Exibir a imagem condicionalmente caso a classe slot-preenchido não esteja configurada no HTML base,
            // mas o comportamento de clique no álbum assume img.style.display "none" ou "block"
            img.style.display = "none";

            img.onload = () => {
                // Ao carregar, mantemos o comportamento do clique que precisa de display flex ou oculto para alternar
                // slot.classList.add("slot-preenchido"); // o toggle fará isso no clique
            };
            img.onerror = () => {
                console.warn(`Imagem não encontrada: ${figurinha.nome}`);
                // Remove a <img> quebrada do slot: assim o clique cai no modo
                // "simulado" (sem foto real) em vez de tentar mostrar uma
                // imagem que nunca vai carregar
                img.remove();
            };

            slot.insertBefore(img, slot.firstChild);
        }

        console.log(`✅ Figurinhas locais carregadas com sucesso!`);

    } catch (erro) {
        console.error("Erro ao carregar figurinhas locais:", erro.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Theme Logic ---
    const themeToggle = document.getElementById("theme-toggle");
    const iconDark = themeToggle.querySelector(".theme-icon-dark");
    const iconLight = themeToggle.querySelector(".theme-icon-light");

    // Verifica tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        iconDark.classList.add("hidden");
        iconLight.classList.remove("hidden");
    }

    themeToggle.addEventListener("click", () => {
        const isLightMode = document.body.classList.toggle("light-mode");
        if (isLightMode) {
            localStorage.setItem("theme", "light");
            iconDark.classList.add("hidden");
            iconLight.classList.remove("hidden");
        } else {
            localStorage.setItem("theme", "dark");
            iconDark.classList.remove("hidden");
            iconLight.classList.add("hidden");
        }
    });
    // -------------------

    const bookElement = document.getElementById("book");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const soundToggle = document.getElementById("sound-toggle");
    const iconOn = soundToggle.querySelector(".sound-icon-on");
    const iconOff = soundToggle.querySelector(".sound-icon-off");

    let isMuted = false;
    let pageFlip = null;

    // 1. Initialize St.PageFlip
    try {
        pageFlip = new St.PageFlip(bookElement, {
            width: 550, // Base page width
            height: 800, // Base page height
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,
            drawShadow: true,
            maxShadowOpacity: 0.4, // Aumenta levemente contraste da sombra
            showCover: true,
            mobileScrollSupport: true,
            useMouseEvents: false, // Desativa gestos padrão do StPageFlip para evitar cliques indesejados nas bordas/páginas
            showPageCorners: false, // Remove dobras dos cantos no hover
            disableFlipByClick: true, // Garante que a virada por cliques simples esteja desativada
            flippingTime: 800 // Transição mais ágil e snappier (800ms em vez de 1000ms)
        });

        // Load pages from HTML
        pageFlip.loadFromHTML(document.querySelectorAll(".page"));

        // Estado de arraste personalizado
        let activeDragPage = null;
        let isClicking = false;
        let startX = 0;
        let startY = 0;
        let dragStarted = false;

        // Monitora o mousedown/touchstart em cada página para iniciar a intenção de arraste
        document.querySelectorAll(".page").forEach((page, index) => {
            page.addEventListener("mousedown", (e) => {
                if (e.target.closest("button") || e.target.closest("a")) return;
                isClicking = true;
                startX = e.clientX;
                startY = e.clientY;
                dragStarted = false;
                activeDragPage = { page, index };
            });

            page.addEventListener("touchstart", (e) => {
                if (e.target.closest("button") || e.target.closest("a")) return;
                const touch = e.touches[0];
                isClicking = true;
                startX = touch.clientX;
                startY = touch.clientY;
                dragStarted = false;
                activeDragPage = { page, index };
            });
        });

        // Executa o movimento de dobra apenas se o mouse/dedo se mover além de um limiar (threshold)
        const handleMove = (clientX, clientY, isTouch = false) => {
            if (!isClicking || !activeDragPage) return;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const bookRect = bookElement.getBoundingClientRect();
            const SCALE = 1; // Escala definida no CSS (.album-viewport)

            // Só ativa o flip se mover mais de 10px (evita disparar ao clicar e soltar estático)
            if (distance > 10 && !dragStarted) {
                dragStarted = true;
                let cornerX, cornerY;
                const unscaledBookWidth = bookRect.width / SCALE;
                const unscaledBookHeight = bookRect.height / SCALE;

                // Determina canto vertical (topo vs base) em coordenadas relativas ao livro
                const centerY = bookRect.top + bookRect.height / 2;
                if (startY < centerY) {
                    cornerY = 0; // Canto superior
                } else {
                    cornerY = unscaledBookHeight; // Canto inferior
                }

                // Determina canto horizontal (direita vs esquerda) em coordenadas relativas ao livro
                if (activeDragPage.index % 2 === 0) {
                    cornerX = unscaledBookWidth; // Canto direito
                } else {
                    cornerX = 0; // Canto esquerdo
                }

                document.body.classList.add("dragging");
                pageFlip.startUserTouch({ x: cornerX, y: cornerY });
            }

            if (dragStarted) {
                const relX = (clientX - bookRect.left) / SCALE;
                const relY = (clientY - bookRect.top) / SCALE;
                pageFlip.userMove({ x: relX, y: relY }, isTouch);
            }
        };

        const handleRelease = (clientX, clientY, isTouch = false) => {
            if (dragStarted) {
                const SCALE = 1;
                const bookRect = bookElement.getBoundingClientRect();
                const relX = (clientX - bookRect.left) / SCALE;
                const relY = (clientY - bookRect.top) / SCALE;
                pageFlip.userStop({ x: relX, y: relY }, isTouch);
            }
            isClicking = false;
            dragStarted = false;
            activeDragPage = null;
            document.body.classList.remove("dragging");
        };

        window.addEventListener("mousemove", (e) => {
            handleMove(e.clientX, e.clientY, false);
        });

        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY, true);
            }
        });

        window.addEventListener("mouseup", (e) => {
            handleRelease(e.clientX, e.clientY, false);
        });

        window.addEventListener("touchend", (e) => {
            const touch = e.changedTouches[0] || e.touches[0];
            if (touch) {
                handleRelease(touch.clientX, touch.clientY, true);
            } else {
                handleRelease(startX, startY, true);
            }
        });

        // Show book after successful initialization
        bookElement.style.display = "block";

        // Dia 3: Busca as figurinhas da API e preenche o álbum
        // A função é async, chamamos sem await para não bloquear a inicialização do álbum
        preencherFigurinhas();

        // Adiciona evento de clique para colar e descolar as figurinhas
        document.querySelectorAll(".sticker-slot").forEach(slot => {
            slot.style.cursor = "pointer"; // Indica visualmente que é clicável

            slot.addEventListener("click", () => {
                const img = slot.querySelector(".sticker-img");

                if (img) {
                    // Comportamento com imagem da API
                    if (img.style.display === "none") {
                        img.style.display = "block";
                        slot.classList.add("slot-preenchido");
                    } else {
                        img.style.display = "none";
                        slot.classList.remove("slot-preenchido");
                    }
                } else {
                    // Comportamento simulado (sem API rodando)
                    slot.classList.toggle("simulated-pasted");
                    if (slot.classList.contains("simulated-pasted")) {
                        slot.classList.add("slot-preenchido");
                    } else {
                        slot.classList.remove("slot-preenchido");
                    }
                }
            });
        });

    } catch (error) {
        console.error("Erro ao inicializar a biblioteca PageFlip:", error);
    }

    // 2. Sound Effect Generator (Web Audio API)
    function playPaperTurnSound() {
        if (isMuted) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const audioCtx = new AudioContext();
            const duration = 0.45; // seconds
            const sampleRate = audioCtx.sampleRate;
            const bufferSize = sampleRate * duration;
            const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
            const data = buffer.getChannelData(0);

            // Synthesize white noise with a custom page-flip volume envelope
            for (let i = 0; i < bufferSize; i++) {
                const progress = i / bufferSize;
                // Noise value between -1 and 1
                const noise = Math.random() * 2 - 1;

                // Volume envelope: smooth curve that peaks around 30% of the duration
                let envelope = 0;
                if (progress < 0.3) {
                    envelope = progress / 0.3; // Rapid ramp up
                } else {
                    envelope = (1 - progress) / 0.7; // Smooth decay
                }

                // Add minor irregular spikes to simulate paper friction/crackle
                const paperCrackle = Math.random() > 0.985 ? (Math.random() * 2 - 1) * 0.35 : 0;

                data[i] = (noise * 0.65 + paperCrackle) * envelope * 0.12;
            }

            // Create nodes
            const noiseNode = audioCtx.createBufferSource();
            noiseNode.buffer = buffer;

            // Bandpass filter to extract the "whoosh" sound of paper shuffling
            const bandpassFilter = audioCtx.createBiquadFilter();
            bandpassFilter.type = "bandpass";
            bandpassFilter.Q.value = 2.0;

            // Dynamic frequency sweep: starts at 1500Hz, sweeps down to 350Hz (sound of page moving away)
            bandpassFilter.frequency.setValueAtTime(1500, audioCtx.currentTime);
            bandpassFilter.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + duration);

            // Lowpass filter to remove harsh high-frequency digital artifacts
            const lowpassFilter = audioCtx.createBiquadFilter();
            lowpassFilter.type = "lowpass";
            lowpassFilter.frequency.setValueAtTime(3800, audioCtx.currentTime);

            // Connect graph: Source -> Bandpass -> Lowpass -> Destination
            noiseNode.connect(bandpassFilter);
            bandpassFilter.connect(lowpassFilter);
            lowpassFilter.connect(audioCtx.destination);

            noiseNode.start();
        } catch (e) {
            console.warn("Falha ao tocar som de virada de página:", e);
        }
    }

    // 3. Audio State Controls
    soundToggle.addEventListener("click", () => {
        isMuted = !isMuted;
        if (isMuted) {
            iconOn.classList.add("hidden");
            iconOff.classList.remove("hidden");
        } else {
            iconOn.classList.remove("hidden");
            iconOff.classList.add("hidden");
        }
    });

    // 4. Navigation controls and events
    if (pageFlip) {
        // Play turn sound when page starts flipping
        pageFlip.on("changeState", (e) => {
            if (e.data === "flipping") {
                playPaperTurnSound();
            }
        });

        // Discrete arrow toggle depending on current page
        pageFlip.on("flip", (e) => {
            const currentPage = e.data;
            const totalPages = pageFlip.getPageCount();

            // Hide left button on cover page
            if (currentPage === 0) {
                btnPrev.classList.add("hidden");
            } else {
                btnPrev.classList.remove("hidden");
            }

            // Hide right button on back cover
            if (currentPage === totalPages - 1) {
                btnNext.classList.add("hidden");
            } else {
                btnNext.classList.remove("hidden");
            }
        });

        // Click events for navigational arrows
        btnPrev.addEventListener("click", () => {
            pageFlip.flipPrev();
        });

        btnNext.addEventListener("click", () => {
            pageFlip.flipNext();
        });

        // Keyboard events for navigational arrows
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                pageFlip.flipPrev();
            } else if (e.key === "ArrowRight") {
                pageFlip.flipNext();
            }
        });

        // Hide left button initially since start page is 0
        btnPrev.classList.add("hidden");
    }
});