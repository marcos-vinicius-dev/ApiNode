const { Parcela } = require("../models");

class parcelasController {
    async store(req, res){
        try {
            const { valor , porcetagem, parcelas } = req.body;
            return res.status(200).send({
                Valor_Parcela: Parcela(valor, porcetagem, parcelas)
            });
        }catch(err){
            return res.status(400).send({ error: err});
        }
    }


}

module.exports = new parcelasController();