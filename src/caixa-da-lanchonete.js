import { objetoItensCardapio } from "./cardapio.js";

class CaixaDaLanchonete {
  itemQuantidade = 0;
  taxaCredito = 0.03;
  taxaDinheiro = 0.05;
  valorDoPedido = 0.0;

  vetorResultado = [];
  vetorFormasDePagamento = ["dinheiro", "debito", "credito"];

  constructor() {}

  validaItemExtraSemPrincipal(vetorResultado) {
    // condição não pode ter o item extra do café (chantily) sem comprar um café
    // condição não pode ter o item extra do sanduiche (queijo) sem comprar um sanduiche
    let extraSemPrincial = false;

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
        this.valorDoPedido - this.valorDoPedido * this.taxaDinheiro;
    } else if (formaDePagamento === "credito") {
      this.valorDoPedido =
        this.valorDoPedido + this.valorDoPedido * this.taxaCredito;
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

export { CaixaDaLanchonete };
