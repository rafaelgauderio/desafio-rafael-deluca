import { objetoItensCardapio } from "./cardapio.js";

class CaixaDaLanchonete {
  itemQuantidade = 0;
  taxaAcrescimo = 0.03;
  taxaDesconto = 0.05;
  valorDoPedido = 0.0;

  vetorResultado = [];
  vetorFormasDePagamento = ["dinheiro", "debito", "credito"];

  constructor() {}

  validaItemExtraSemPrincipal(vetorResultado) {
    // condição não pode ter o item extra do café (chantily) sem comprar um café
    // condição não pode ter o item extra do sanduiche (queijo) sem comprar um sanduiche
    var extraSemPrincial = false;

    if (
      (vetorResultado.includes(objetoItensCardapio.chantily) === true &&
        vetorResultado.includes(objetoItensCardapio.cafe) === false) ||
      (vetorResultado.includes(objetoItensCardapio.queijo) === true &&
        vetorResultado.includes(objetoItensCardapio.sanduiche) === false)
    ) {
      extraSemPrincial = true;
    }
    return extraSemPrincial;
  }

  calculaValorFinalPedido(formaDePagamento) {
    // calcula os totais de acordo com a forma de pagamento
    if (formaDePagamento === "dinheiro") {
      this.valorDoPedido =
        this.valorDoPedido - this.valorDoPedido * this.taxaDesconto;
    } else if (formaDePagamento === "credito") {
      this.valorDoPedido =
        this.valorDoPedido + this.valorDoPedido * this.taxaAcrescimo;
    } else if (formaDePagamento === "debito") {
      this.valorDoPedido = this.valorDoPedido;
    }

    return this.valorDoPedido;
  }

  formataMoedaBrasil(valorDoPedido) {
    return "R$ " + valorDoPedido.toFixed(2).toString().replace(".", ",");
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (
      this.vetorFormasDePagamento.includes(formaDePagamento) === false ||
      formaDePagamento === undefined
    ) {
      return "Forma de pagamento inválida!";
    }
    if (itens === undefined || itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    for (let i = 0; i < itens.length; i++) {
      // converte a string separa por virgulas em vetor, index zero = codigoItem, index um = quantidadeItem
      let vetorItensPedido = itens[i].split(",");
      let codigoItem = objetoItensCardapio[vetorItensPedido[0]];
      this.quantidadeItem = parseInt(vetorItensPedido[1], 10);

      if (codigoItem === undefined) {
        return "Item inválido!";
      }

      if (this.quantidadeItem === 0) {
        return "Quantidade inválida!";
      }
      // adiciona no inicio do vetor resultante
      this.vetorResultado.unshift(codigoItem);
      this.valorDoPedido =
        this.valorDoPedido + codigoItem.preco * this.quantidadeItem;
    } // fecha o laço for

    if (this.validaItemExtraSemPrincipal(this.vetorResultado) === true) {
      return "Item extra não pode ser pedido sem o principal";
    }

    this.calculaValorFinalPedido(formaDePagamento);

    return this.formataMoedaBrasil(this.valorDoPedido);
  }
}

// alguns testes
console.log("\n\tPagamentos inválidos");
console.log(new CaixaDaLanchonete().calcularValorDaCompra());
new CaixaDaLanchonete().calcularValorDaCompra("bit_coin", []);

console.log("\n\tItens carinho vazio");
console.log(new CaixaDaLanchonete().calcularValorDaCompra("debito"));
console.log(new CaixaDaLanchonete().calcularValorDaCompra("debito", []));

console.log("\n\tCarrinho quantidade zerada");
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["cafe,0"])
);

console.log("\n\tItens unitários no débito");
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["cafe,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["chantily,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["suco,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["sanduiche,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["queijo,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["salgado,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["combo1,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["combo2,1"])
);

console.log("\n\tItens unitários com acréscimo ou desconto");
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", ["cafe,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("dinheiro", ["cafe,1"])
);

console.log("\n\tPedidos com mais de um item");
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", [
    "chantily,1",
    "cafe,1",
  ])
); // 4,50
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", [
    "combo1,1",
    "cafe,2",
  ])
); // 15,96

console.log("\n\tPedidos com item extra e sem o item principal");
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", [
    "chantily,1",
    "combo1,2",
  ])
);

console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", [
    "queijo,1",
    "combo1,2",
  ])
);

export { CaixaDaLanchonete };
