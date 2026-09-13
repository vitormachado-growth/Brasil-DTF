/**
 * O conteúdo das páginas de detalhe: destaques, o que vem no kit e a ficha
 * técnica completa de cada máquina.
 *
 * Gerado a partir das páginas /maquinas/<slug> que já estão no ar em
 * brasildtfimpressoras.com.br, não escrito aqui. O cliente pediu esta seção
 * em 10/09/2026 apontando aquele site como espelho, então o texto é o dele.
 *
 * A L8050 é a exceção: ela é posterior àquele site e não tem página lá. O kit
 * abaixo é o que ele mandou por mensagem em 04/09/2026, palavra por palavra.
 * Ela ainda não tem destaques nem ficha completa, e isso está marcado.
 */

export interface SpecRow {
  label: string;
  value: string;
}

export interface MachineDetail {
  /** Frases curtas de diferencial, no topo da página. */
  destaques: string[];
  /** O que vem na caixa. */
  kit: string[];
  /** Ficha técnica completa, bem maior que a do card. */
  specs: SpecRow[];
  /** Quantas fotos existem na galeria desta máquina. */
  fotos: number;
}

/** Ressalva do próprio cliente, embaixo da ficha técnica. */
export const SPECS_RESSALVA =
  "Especificações conforme o fabricante; sujeitas a alteração sem aviso. Imagens ilustrativas.";

export const machineDetails: Record<string, MachineDetail> = {
  "l8050-xp600-pro": {
    destaques: [],
    kit: [
      "Mesa a vácuo",
      "Seringa de sucção",
      "Agitador de tinta branca",
      "Kit com 100ml de cada cor",
      "100ml de solução de limpeza",
      "5 cotonetes de limpeza",
      "30 folhas A4",
      "200g de poliamida",
      "Software Acrorip 11.2 + driver",
      "Suporte técnico",
      "Treinamento para operação",
    ],
    specs: [],
    fotos: 1,
  },
  "l8180-xp600": {
    destaques: [
      "Kit turnkey: forno de poliamida e mesa a vácuo inclusos, pronto pra produzir no dia 1.",
      "Acompanha tintas (100 ml por cor), 30 folhas de filme A3, 200 g de pó de poliamida e o RIP Acrorip 11.2.",
      "Garantia de 3 meses e treinamento incluso.",
      "Suporte em português pelo WhatsApp.",
    ],
    kit: [
      "Forno de Poliamida Manual",
      "Mesa a vácuo",
      "Reset do Chip",
      "Seringa de Sucção",
      "Agitador de tinta Branca",
      "Kit com 100 ml de cada cor",
      "100 ml de Solução de Limpeza",
      "5 Cotonetes de Limpeza",
      "30 Folhas A3",
      "200 g de Poliamida",
      "Acrorip 11.2 + Driver",
      "Garantia de 3 meses",
      "Suporte e Treinamento",
    ],
    specs: [
      { label: "Cabeça de impressão", value: "1× Epson XP600" },
      { label: "Largura de impressão", value: "Somente folha A3 (área útil 28×38 cm)" },
      { label: "Velocidade", value: "1 folha a cada 7 min" },
      { label: "Cores", value: "CMYK + Branco" },
      { label: "Forno", value: "Poliamida (manual) incluso" },
      { label: "Mesa a vácuo", value: "Inclusa" },
      { label: "Insumos inclusos", value: "Tintas, filme A3, pó de poliamida, Acrorip 11.2" },
      { label: "Garantia", value: "3 meses + treinamento" },
    ],
    fotos: 4,
  },
  "xf-450s-uv": {
    destaques: [
      "Imprime e lamina crystal labels em uma única passada.",
      "Aderência durável em vidro, metal, plástico, acrílico, madeira e superfícies revestidas.",
      "Cura UV rápida com lâmpadas a ar e movimento linear de alta precisão.",
      "Anti-colisão da cabeça e alarme de tinta baixa. Garantia de 1 ano + suporte vitalício.",
    ],
    kit: [
      "Impressora industrial com 3 cabeças Epson i1600",
      "Circulação de Tintas / Laminadora / Rebobinador",
      "1000 ml de tinta DTF de cada cor + Verniz",
      "100 metros de filme DTF UV 30 cm",
      "Software Riin",
    ],
    specs: [
      { label: "Modelo", value: "DTF UV XF-450S" },
      { label: "Cabeças de impressão", value: "3× Epson i1600" },
      { label: "Largura de impressão", value: "30 cm" },
      { label: "Velocidade", value: "10 m/h (qualidade) · 10 m/h (produtividade)" },
      { label: "Resolução", value: "720 / 1080 / 1440 dpi" },
      { label: "Sistema de tinta", value: "Circulação e agitação automática do branco" },
      { label: "Temperatura de trabalho", value: "16–27 °C" },
      { label: "Tinta", value: "UV (CMYK + Branco + Verniz)" },
      { label: "Consumo", value: "1 kW · 220V/110V" },
      { label: "Peso", value: "120 kg" },
      { label: "Dimensões", value: "L1300 × P1000 × A1450 mm" },
    ],
    fotos: 4,
  },
  "xf-400pro-a2": {
    destaques: [
      "Impressão, aplicação de pó e cura integradas: solução all-in-one num corpo compacto.",
      "Circulação de tinta branca: menos entupimento, menos manutenção.",
      "Túneis de secagem em dois estágios com pré-aquecimento.",
      "Cabeça dupla F1080-A1 para cores vivas e bordas nítidas.",
    ],
    kit: [
      "Impressora industrial com 2 cabeças F1080",
      "Batedor / Forno de poliamida / Rebobinador",
      "1000 ml de tinta DTF de cada cor",
      "100 metros de filme DTF 42 cm",
      "1 kg de poliamida",
      "Software Flex Print",
    ],
    specs: [
      { label: "Modelo", value: "XF-400Pro-F1080" },
      { label: "Cabeças de impressão", value: "2× Epson F1080-A1" },
      { label: "Largura de impressão", value: "42 cm" },
      { label: "Velocidade", value: "Até 10 m lineares/h" },
      { label: "Cores", value: "CMYK + Branco" },
      { label: "Software RIP", value: "Flex Print" },
      { label: "Alimentação", value: "220V/110V · 50/60 Hz" },
      { label: "Potência", value: "3,5 kW" },
      { label: "Sistema operacional", value: "Windows 10 / 11 (32 e 64 bits)" },
      { label: "Dimensões da máquina", value: "1735 × 1080 × 1330 mm (C × L × A)" },
      { label: "Dimensões da embalagem", value: "1130 × 1330 × 1510 mm (C × L × A)" },
      { label: "Peso líquido", value: "170 kg" },
      { label: "Peso bruto", value: "200 kg" },
    ],
    fotos: 2,
  },
  "702e-c650sc": {
    destaques: [
      "Cabeça dupla i3200-A1 com circulação automática de tinta branca.",
      "Agitador de pó integrado com take-up por sensor.",
      "Sistema térmico infravermelho + resfriamento para cura estável.",
      "Trilho HIWIN importado e placa de controle Hoson para precisão e estabilidade.",
    ],
    kit: [
      "Impressora industrial com 2 cabeças Epson i3200",
      "Batedor / Forno de poliamida / Rebobinador",
      "1000 ml de tinta DTF de cada cor",
      "100 metros de filme DTF 60 cm",
      "1 kg de poliamida",
      "Software Riin",
    ],
    specs: [
      { label: "Modelo", value: "DTF XF-702E" },
      { label: "Cabeças de impressão", value: "2× Epson i3200" },
      { label: "Largura de impressão", value: "60 cm" },
      { label: "Velocidade", value: "6 m/h (qualidade) · 10 m/h (produtividade)" },
      { label: "Resolução", value: "720 / 1080 / 1440 dpi" },
      { label: "Sistema de tinta", value: "Circulação e agitação automática do branco" },
      { label: "Temperatura de trabalho", value: "16–27 °C" },
      { label: "Cores", value: "CMYK + Branco (base água)" },
      { label: "Consumo", value: "0,8 kW · 220V/110V" },
      { label: "Peso", value: "158 kg" },
      { label: "Dimensões", value: "L1700 × P850 × A1350 mm" },
    ],
    fotos: 4,
  },
  "xf-420s": {
    destaques: [
      "Híbrida UV-DTF + bordado 3D em um só corpo.",
      "Laminação por rolo de borracha de alta aderência, com acabamento de alto brilho.",
      "Tela touch de 7\", descolamento automático do filme e mesa a vácuo.",
      "Lâmpadas UV com resfriamento a ar, aquecimento inteligente da base e anti-colisão.",
    ],
    kit: [
      "Impressora industrial com 4 cabeças Epson i1600",
      "Circulação de Tintas / Laminadora / Rebobinador",
      "1000 ml de tinta DTF de cada cor + Verniz",
      "100 metros de filme DTF UV 42 cm",
      "Software Riin",
    ],
    specs: [
      { label: "Modelo", value: "DTF UV XF-420S" },
      { label: "Cabeças de impressão", value: "4× Epson i1600" },
      { label: "Largura de impressão", value: "42 cm" },
      { label: "Velocidade", value: "15 m/h (qualidade) · 16 m/h (produtividade)" },
      { label: "Resolução", value: "720 / 1080 / 1440 dpi" },
      { label: "Sistema de tinta", value: "Circulação e agitação automática do branco" },
      { label: "Temperatura de trabalho", value: "16–27 °C" },
      { label: "Tinta", value: "UV (CMYK + Branco + Verniz)" },
      { label: "Consumo", value: "2,5 kW · 220V/110V" },
      { label: "Peso", value: "160 kg" },
      { label: "Dimensões", value: "L1460 × P850 × A1320 mm" },
    ],
    fotos: 4,
  },
  "702e-z650-2": {
    destaques: [
      "Até 12 m lineares/h com branco estável, feita para produção contínua.",
      "Levantamento elétrico do rolo de pressão para ajuste fino.",
      "Agitador de pó inteligente + esteira mesh + take-up por sensor.",
      "Circulação e agitação de tinta branca com alarmes de tinta/resíduo.",
    ],
    kit: [
      "Impressora industrial com 2 cabeças Epson i3200",
      "Batedor / Forno de poliamida / Rebobinador",
      "1000 ml de tinta DTF de cada cor",
      "100 metros de filme DTF 60 cm",
      "1 kg de poliamida",
      "Software Riin",
    ],
    specs: [
      { label: "Modelo", value: "DTF XF-702E + Z650" },
      { label: "Cabeças de impressão", value: "2× Epson i3200" },
      { label: "Largura de impressão", value: "60 cm" },
      { label: "Velocidade", value: "8 m/h (qualidade) · 12 m/h (produtividade)" },
      { label: "Resolução", value: "720 / 1080 / 1440 dpi" },
      { label: "Sistema de tinta", value: "Circulação e agitação automática do branco" },
      { label: "Temperatura de trabalho", value: "16–27 °C" },
      { label: "Cores", value: "CMYK + Branco (base água)" },
      { label: "Consumo", value: "0,8 kW · 220V/110V" },
      { label: "Peso", value: "158 kg" },
      { label: "Dimensões", value: "L1700 × P850 × A1350 mm" },
    ],
    fotos: 4,
  },
  "c605-h6502": {
    destaques: [
      "Cinco cabeças i3200-A1: produção de alto volume em formato largo.",
      "Pó, cura, reciclagem e resfriamento totalmente automáticos.",
      "Grau industrial: trilho prata, anti-colisão e alimentação/take-up tensionados.",
      "Proteção contra superaquecimento, alarmes e garantia de 1 ano + suporte vitalício.",
    ],
    kit: [
      "Impressora industrial com 5 cabeças Epson i3200",
      "Batedor / Forno de poliamida / Rebobinador",
      "1000 ml de tinta DTF de cada cor",
      "100 metros de filme DTF 60 cm",
      "1 kg de poliamida",
      "Software Riin",
    ],
    specs: [
      { label: "Modelo", value: "C605 + H6502" },
      { label: "Cabeças de impressão", value: "5× Epson i3200" },
      { label: "Largura de impressão", value: "60 cm" },
      { label: "Velocidade", value: "35 m/h (qualidade) · 50 m/h (produtividade)" },
      { label: "Resolução", value: "720 / 1080 / 1440 dpi" },
      { label: "Sistema de tinta", value: "Circulação e agitação automática do branco" },
      { label: "Temperatura de trabalho", value: "16–27 °C" },
      { label: "Consumo", value: "1,6 kW" },
      { label: "Peso", value: "223 kg" },
      { label: "Dimensões", value: "L1670 × P815 × A1600 mm" },
      { label: "Garantia", value: "1 ano + suporte técnico vitalício" },
    ],
    fotos: 4,
  },
};
