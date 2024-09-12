class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanhoTotal: 10,
        animais: ["macaco"],
        animaisExistentes: 3,
        espacoRestante: 7,
      },
      {
        numero: 2,
        bioma: "floresta",
        tamanhoTotal: 5,
        animais: [],
        animaisExistentes: 0,
        espacoRestante: 5,
      },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanhoTotal: 7,
        animais: ["gazela"],
        animaisExistentes: 1,
        espacoRestante: 5,
      },
      {
        numero: 4,
        bioma: "rio",
        tamanhoTotal: 8,
        animais: [],
        animaisExistentes: 0,
        espacoRestante: 8,
      },
      {
        numero: 5,
        bioma: "savana",
        tamanhoTotal: 9,
        animais: ["leao"],
        animaisExistentes: 1,
        espacoRestante: 6,
      },
    ];

    this.animais = {
      leao: { tamanho: 3, bioma: ["savana"], carnivoro: true },
      leopardo: { tamanho: 2, bioma: ["savana"], carnivoro: true },
      crocodilo: { tamanho: 3, bioma: ["rio"], carnivoro: true },
      macaco: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
      gazela: { tamanho: 2, bioma: ["savana"], carnivoro: false },
      hipopotamo: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal.toLowerCase()]) {
      return {
        erro: "Animal inválido",
      };
    }

    const numeroInteiro = Math.round(quantidade);

    if (numeroInteiro <= 0) {
      return { erro: "Quantidade inválida" };
    }

    let recintosViaveis = [];
    const animalAtual = this.animais[animal.toLowerCase()];

    for (let recinto of this.recintos) {
      if (!animalAtual.bioma.some((bioma) => recinto.bioma.includes(bioma))) {
        continue;
      }

      const tamanhoNecessario = animalAtual.tamanho * numeroInteiro;
      const outraEspecieNoRecinto =
        recinto.animais.length > 0 &&
        !recinto.animais.includes(animal.toLowerCase());
      const espacoExtra = outraEspecieNoRecinto ? 1 : 0;

      if (recinto.espacoRestante < tamanhoNecessario + espacoExtra) {
        continue;
      }

      if (
        animalAtual.carnivoro &&
        recinto.animais.length > 0 &&
        !recinto.animais.includes(animal.toLowerCase())
      ) {
        continue;
      }

      if (
        animal.toLowerCase() === "macaco" &&
        numeroInteiro === 1 &&
        recinto.animais.length === 0
      ) {
        continue;
      }

      if (
        animal.toLowerCase() === "macaco" &&
        numeroInteiro > 1 &&
        recinto.bioma === "rio"
      ) {
        continue;
      }

      if (
        animal.toLowerCase() === "macaco" &&
        numeroInteiro > 1 &&
        recinto.animais.includes("leao")
      ) {
        continue;
      }

      const espacoFinalRestante =
        recinto.espacoRestante - (tamanhoNecessario + espacoExtra);

      recintosViaveis.push(
        `Recinto ${recinto.numero} (espaço livre: ${espacoFinalRestante} total: ${recinto.tamanhoTotal})`
      );
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
