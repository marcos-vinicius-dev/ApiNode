module.exports = () => {
    const Parcela = (valorProduto , porcetagem, numeroParcelas) => {
          let i = porcetagem / 100;
          return parseFloat(valorProduto * i / (1 - Math.pow(1 + i, -numeroParcelas))).toFixed(2);
    }
    return Parcela;
};

