let request = require('supertest');

let app = require('../../src/app')
let { Produtos } = require("../../src/app/models");
let { Categorias } = require("../../src/app/models");
let truncate = require('../../__utils/truncate');

describe("Criar Produto", () => {
    beforeEach(async () => {
        await truncate();
        Categorias.destroy({
            where: {},
            truncate: true
        });
    });
    it("a rota /produtos deve cadastrar um novo produto caso os dados estejam preenchidos corretamente, com um idcategoria valido", async () => {
        let categoria = await Categorias.create({
            "id": "10000",
            "nome":"informatica",
            "juros":"10"
        });
        let response = await request(app)
            .post("/produtos")
            .send({
                "nome": "computador", 
                "descricao": "desktop",
                "valor": "1",
                "idcategoria" : "10000"
            });
        expect(response.status).toBe(200);
    });
    it("a rota /produtos não deve cadastrar um novo produto caso o idcategoria não exista", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let produto = {
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "100"
        };
        let response = await request(app)
            .post("/produtos")
            .send(produto);
        expect(response.status).toBe(400);
    });
    it("a rota /produtos não deve cadastrar um novo produto caso esteja algum campo vazio", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let produto = {
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "",
            "idcategoria" : "100"
        };
        let response = await request(app)
            .post("/produtos")
            .send(produto);
        expect(response.status).toBe(400);
    });
    
});

describe("Editar Produto", () => {
    beforeEach(async () => {
        await truncate();
        Produtos.destroy({
            where: {},
            truncate: true
        });
    });
    it("a rota put: /produtos/:id deve editar um produto caso os dados estejam preenchidos corretamente, com um idcategoria valido", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let produto = await Produtos.create({
            "id": "10",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : categoria.id
        });
        let response = await request(app)
            .put("/produtos/10")
            .send({
                "nome": "computador", 
                "descricao": "desktop1",
                "valor": "1",
                "idcategoria" : "1"
            });
        expect(response.status).toBe(200);
    });
        
    it("a rota put: /produtos/:id não deve editar um produto caso, possuir campos em branco", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let produto = await Produtos.create({
            "id": "1",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        let response = await request(app)
            .put("/produtos/1")
            .send({
                "nome": "computador", 
                "descricao": "",
                "valor": "1",
                "idcategoria" : "100"
            });
        expect(response.status).toBe(400);
    });
    it("a rota put: /produtos/:id não deve editar um produto caso o produto não existir", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let produto = await Produtos.create({
            "id": "1",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        let response = await request(app)
            .put("/produtos/10")
            .send({
                "nome": "computador", 
                "descricao": "desktop1",
                "valor": "1",
                "idcategoria" : "100"
            });
        expect(response.status).toBe(400);
    });
   
    
});