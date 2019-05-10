const { Parcela } = require("../../src/app/models");

describe('Valor Parcela', function() {
    it('o valor de uma parcela com os seguintes dados: produto=100, juros=1.0, quantidadeparcelas=2 deve ser 50.75 ', function() {
      expect( Parcela(100, 1.0 , 2)).toBe("50.75");
    });
  });