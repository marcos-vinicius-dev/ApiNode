const { Categorias } = require('../models');

class CategoriaController {
    async store(req, res){
        try {
            const { nome , juros } = req.body;
            if(await Categorias.findOne({ where: { nome }})){
                return res.status(400).json({ message: 'Categoria já existe'});
            }
            const categoria = await Categorias.create(req.body);
            return res.status(200).send(categoria);
        }catch(err){
            return res.status(400).send({ error: err});
        }
    }

    async index(req, res){
        try {
            console.log(req.params.id);
            const categoria = await Categorias.findAll();
            return res.status(200).send(categoria);
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }
    
    async show(req, res){
        const id = req.params.id;
        try {
            const categoria = await Categorias.findOne({ where :  { id }  });
            return res.status(200).send(categoria);
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }

    async update(req, res){
        const id = req.params.id;
        try {
            const CategoriaExiste = await Categorias.findOne({ where: { id }});
            if(!CategoriaExiste){
                return res.status(400).json({ message: 'Não existe esta categoria'});
            }
            const categoria = await Categorias.update(req.body, { where :  { id }  });
            return res.status(200).send(categoria);
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }
    async destroy(req, res){
        const id = req.params.id;
        try {
            await Categorias.destroy({ where :  { id }  });
            return res.send();
        }catch( err ){
            return res.status(400).send({ error: err});
        }
    }



}

module.exports = new CategoriaController();