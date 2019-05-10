

class parcelasController {
    async store(req, res){
        try {
            const { valor , porcetagem, parcelas } = req.body;
            var pv = valor; //valor do produto
            var i = porcetagem / 100;//porcentagem do juros dividido por 100. (Ex. 10% = 10 / 100 = 0.1)
            var n = parcelas;//número de parcelas
            const valorParcelas = pv * i / (1 - Math.pow(1 + i, -n));
            console.log(valorParcelas);
            return res.status(200).send({
                Valor_Parcela: valorParcelas 
            });
        }catch(err){
            return res.status(400).send({ error: err});
        }
    }


}

module.exports = new parcelasController();