const STYLE_ID = "rele-labels-component-style";

function injetarEstilos() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .rele-labels-container {
      position: relative;
      display: inline-block;
    }

    .rele-labels-container img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .overlay-label {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      padding: 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      box-sizing: border-box;
      white-space: nowrap;
      z-index: 2;
      pointer-events: none;
    }

    .overlay-label.check-ativo {
      background-color: #1565c0;
      border: 1px solid #0d47a1;
      color: #ffffff;
      font-weight: bold;
    }
  `;

  document.head.appendChild(style);
}

function ehVermelho(r, g, b, a, limiares) {
  return a > limiares.alpha && r >= limiares.redMin && (r - g) >= limiares.deltaMin && (r - b) >= limiares.deltaMin;
}

function detectarAreasVermelhas(imageElement, limiares, filtrosArea) {
  const canvas = document.createElement("canvas");
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(imageElement, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;
  const visitado = new Uint8Array(width * height);
  const areas = [];

  function floodFill(inicioX, inicioY) {
    const pilha = [[inicioX, inicioY]];
    let minX = inicioX;
    let minY = inicioY;
    let maxX = inicioX;
    let maxY = inicioY;
    let pixels = 0;

    while (pilha.length) {
      const [x, y] = pilha.pop();
      if (x < 0 || y < 0 || x >= width || y >= height) continue;

      const index = y * width + x;
      if (visitado[index]) continue;
      visitado[index] = 1;

      const i4 = index * 4;
      if (!ehVermelho(data[i4], data[i4 + 1], data[i4 + 2], data[i4 + 3], limiares)) {
        continue;
      }

      pixels += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;

      pilha.push([x + 1, y]);
      pilha.push([x - 1, y]);
      pilha.push([x, y + 1]);
      pilha.push([x, y - 1]);
    }

    const largura = maxX - minX + 1;
    const altura = maxY - minY + 1;

    if (pixels >= filtrosArea.minPixels && largura >= filtrosArea.minLargura && altura >= filtrosArea.minAltura) {
      areas.push({ x: minX, y: minY, w: largura, h: altura });
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      if (visitado[index]) continue;

      const i4 = index * 4;
      if (ehVermelho(data[i4], data[i4 + 1], data[i4 + 2], data[i4 + 3], limiares)) {
        floodFill(x, y);
      } else {
        visitado[index] = 1;
      }
    }
  }

  areas.sort(function (a, b) {
    if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
    return a.x - b.x;
  });

  return areas;
}

export function mountReleLabelsComponent(options) {
  const {
    container,
    imageElement,
    textosPorClasse = {},
    labelClassPrefix = "classeVermelho",
    labelIdPrefix = "labelVermelho",
    limiares = { alpha: 120, redMin: 140, deltaMin: 60 },
    filtrosArea = { minPixels: 80, minLargura: 12, minAltura: 10 }
  } = options || {};

  const containerEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!(containerEl instanceof HTMLElement)) {
    throw new Error("Container inválido para o componente de labels.");
  }

  const imageEl =
    imageElement instanceof HTMLImageElement
      ? imageElement
      : containerEl.querySelector("img");

  if (!(imageEl instanceof HTMLImageElement)) {
    throw new Error("Imagem não encontrada no container do componente.");
  }

  injetarEstilos();
  containerEl.classList.add("rele-labels-container");

  let mapaTextos = { ...textosPorClasse };

  function renderizarLabels() {
    if (!imageEl.naturalWidth || !imageEl.naturalHeight) return;

    containerEl.querySelectorAll(".overlay-label").forEach(function (el) {
      el.remove();
    });

    let areas = [];
    try {
      areas = detectarAreasVermelhas(imageEl, limiares, filtrosArea);
    } catch (erro) {
      console.error("Falha ao detectar áreas vermelhas:", erro);
      return;
    }

    const escalaX = imageEl.clientWidth / imageEl.naturalWidth;
    const escalaY = imageEl.clientHeight / imageEl.naturalHeight;

    areas.forEach(function (area, indice) {
      const numero = indice + 1;
      const classeUnica = `${labelClassPrefix}${numero}`;
      const textoLabel = mapaTextos[classeUnica] || "";

      const label = document.createElement("label");
      label.className = `overlay-label ${classeUnica}`;
      label.id = `${labelIdPrefix}${numero}`;
      label.textContent = textoLabel;

      if (/✓|✅/.test(textoLabel)) {
        label.classList.add("check-ativo");
        if (textoLabel.trim() === "✅") {
          label.textContent = "✓";
        }
      }

      label.style.left = `${area.x * escalaX}px`;
      label.style.top = `${area.y * escalaY}px`;
      label.style.width = `${area.w * escalaX}px`;
      label.style.height = `${area.h * escalaY}px`;
      containerEl.appendChild(label);
    });
  }

  function atualizarTextos(novosTextos) {
    mapaTextos = { ...mapaTextos, ...(novosTextos || {}) };
    renderizarLabels();
  }

  function obterTextos() {
    return { ...mapaTextos };
  }

  function destruir() {
    window.removeEventListener("resize", renderizarLabels);
    imageEl.removeEventListener("load", renderizarLabels);
    containerEl.querySelectorAll(".overlay-label").forEach(function (el) {
      el.remove();
    });
  }

  if (imageEl.complete) {
    renderizarLabels();
  } else {
    imageEl.addEventListener("load", renderizarLabels);
  }
  window.addEventListener("resize", renderizarLabels);

  return {
    renderizar: renderizarLabels,
    atualizarTextos,
    obterTextos,
    destruir
  };
}
