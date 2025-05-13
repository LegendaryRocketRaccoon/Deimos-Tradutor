
async function traduzirTexto(texto, idiomaAlvo) {
  const langCode = {
    inglês: "en",
    espanhol: "es",
    francês: "fr",
    alemão: "de",
    italiano: "it",
    português: "pt",
  }[idiomaAlvo.toLowerCase()];

  if (!langCode) return `Desculpe, não conheço o idioma "${idiomaAlvo}".`;

  const origem = "pt";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${origem}|${langCode}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const traducao = dados.responseData.translatedText;

    if (traducao && traducao.toLowerCase() !== texto.toLowerCase()) {
      return `A tradução de "${texto}" para ${idiomaAlvo} é: ${traducao}`;
    } else {
      return `Não consegui traduzir "${texto}" para ${idiomaAlvo}.`;
    }
  } catch (e) {
    console.error("Erro:", e);
    return "Ocorreu um erro ao tentar traduzir.";
  }
}

async function traduzir() {
  const texto = document.getElementById("texto").value;
  const idioma = document.getElementById("idioma").value;
  const resultado = await traduzirTexto(texto, idioma);
  document.getElementById("resultado").innerText = resultado;
}
