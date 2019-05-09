const { Produtos } = require('../models');
const { Categorias } = require('../models');

class produtoController {
    async store(req, res){
        try {
            const produto = await Produtos.create(req.body);
            return res.status(200).send(produto);
        }catch(err){
            return res.status(400).send({ error: err});
        }
    }

    async index(req, res){
        try {
            console.log(req.params.id);
            const produto = await Produtos.findAll();
            return res.status(200).send(produto);
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }
    
    async show(req, res){
        const id = req.params.id;
        try {
            const produto = await Produtos.findOne({ where :  { id }  });
            return res.status(200).send(produto);
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }

    async update(req, res){
        const id = req.params.id;
        try {
            const ProdutoExiste = await Produtos.findOne({ where: { id }})
            if(!ProdutoExiste){
                return res.status(400).json({ message: 'Não existe este produto'});
            }
            const produto = await Produtos.update(req.body, { where :  { id }  });
            return res.status(200).send(produto);

        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }
    async destroy(req, res){
        const id = req.params.id;
        try {
            await Produtos.destroy({ where :  { id }  });
            return res.send();
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }



}

module.exports = new produtoController();