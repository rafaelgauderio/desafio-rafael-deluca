import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

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

console.log("\n\tInformando item que não tem no menu");
console.log(new CaixaDaLanchonete().calcularValorDaCompra("debito",["passoca,1"]));

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

console.log(
    new CaixaDaLanchonete().calcularValorDaCompra("debito", [
      "combo2,1",
      "cafe,10",
    ])
  ); // 37,50

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
