/* Recurso de hardware que escolhi foi vibrar quando é sorteado uma carta

Foi integrada a Vibration API (navigator.vibrate). 
Quando o usuário clica para sortear, o celular emite um padrão de vibração tátil (simulando o peso de uma carta caindo na arena), usando um recurso nativo do hardware do dispositivo.
 */
const API_URL = 'https://royaleapi.github.io/cr-api-data/json/cards.json';
let todasAsCartas = [];

async function carregarCartas() {
    try {
        const resposta = await fetch(API_URL);
        todasAsCartas = await resposta.json();
        console.log("Cartas carregadas com sucesso!");
    } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
        document.getElementById('card-name').innerText = "Erro na Arena";
    }
}

async function sortearCarta() {
    if (todasAsCartas.length === 0) {
        alert("Aguarde o carregamento das cartas...");
        return;
    }

    // --- RECURSO DE HARDWARE: Vibration API ---
    // Vibra o celular por 100ms, pausa 50ms e vibra mais 100ms
    if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
    // ------------------------------------------

    const imgElement = document.getElementById('card-img');
    const indiceAleatorio = Math.floor(Math.random() * todasAsCartas.length);
    const cartaSorteada = todasAsCartas[indiceAleatorio];

    document.getElementById('card-name').innerText = cartaSorteada.name;
    document.getElementById('card-elixir').innerText = "ELIXIR: " + (cartaSorteada.elixir || "?");
    
    imgElement.src = `https://cdn.royaleapi.com/static/img/cards-150/${cartaSorteada.key}.png`;
    imgElement.style.display = "block";
    
    console.log("Sorteada:", cartaSorteada.name);
}

carregarCartas();