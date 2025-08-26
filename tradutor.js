// Lista de idiomas suportados
const idiomas = {
  "Português": "pt",
  "Inglês": "en",
  "Espanhol": "es",
  "Francês": "fr",
  "Alemão": "de",
  "Italiano": "it",
  "Russo": "ru",
  "Chinês (Simplificado)": "zh-CN",
  "Japonês": "ja",
  "Coreano": "ko",
  "Árabe": "ar",
  "Holandês": "nl",
  "Grego": "el",
  "Hindi": "hi",
};

function preencherSelects() {
  const origem = document.getElementById("origem");
  const destino = document.getElementById("destino");

  for (const nome in idiomas) {
    const opt1 = document.createElement("option");
    opt1.value = idiomas[nome];
    opt1.textContent = nome;

    const opt2 = document.createElement("option");
    opt2.value = idiomas[nome];
    opt2.textContent = nome;

    origem.appendChild(opt1);
    destino.appendChild(opt2);
  }

  origem.value = "pt";
  destino.value = "en";
}

async function traduzirTexto(texto, origem, destino) {
  if (!texto.trim()) return "Digite algo para traduzir.";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${origem}|${destino}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.responseData.translatedText || "Não consegui traduzir.";
  } catch (e) {
    console.error("Erro:", e);
    return "Erro ao tentar traduzir.";
  }
}

async function traduzir() {
  const texto = document.getElementById("texto").value;
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  document.getElementById("status").innerText = "Traduzindo...";
  const resultado = await traduzirTexto(texto, origem, destino);
  document.getElementById("resultado").innerText = resultado;
  document.getElementById("btnAudio").style.display = "inline-block";
  document.getElementById("status").innerText = "Pronto para traduzir.";
}

function falar() {
  const texto = document.getElementById("resultado").innerText;
  const idiomaDestino = document.getElementById("destino").value;

  if (!texto.trim()) return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = idiomaDestino;

  speechSynthesis.speak(utterance);
}

window.onload = preencherSelects;
