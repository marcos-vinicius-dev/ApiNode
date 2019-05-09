const request = require('supertest');

const app = require('../../src/app')
const { Produtos } = require("../../src/app/models");
const { Categorias } = require("../../src/app/models");
const truncate = require('../../__utils/truncate');

describe("Criar Produto", () => {
    beforeEach(async () => {
        await truncate();
    });
    it("a rota /produtos deve cadastrar um novo produto caso os dados estejam preenchidos corretamente, com um idcategoria valido", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const response = await request(app)
            .post("/produtos")
            .send({
                "nome": "computador", 
                "descricao": "desktop",
                "valor": "1",
                "idcategoria" : "1"
            });
        expect(response.status).toBe(200);
    });
    it("a rota /produtos não deve cadastrar um novo produto caso o idcategoria não exista", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = {
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "100"
        };
        const response = await request(app)
            .post("/produtos")
            .send(produto);
        expect(response.status).toBe(400);
    });
    it("a rota /produtos não deve cadastrar um novo produto caso esteja algum campo vazio", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = {
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "",
            "idcategoria" : "100"
        };
        const response = await request(app)
            .post("/produtos")
            .send(produto);
        expect(response.status).toBe(400);
    });
    
});

describe("Editar Produto", () => {
    beforeEach(async () => {
        await truncate();
    });
    it("a rota put: /produtos/:id deve editar um produto caso os dados estejam preenchidos corretamente, com um idcategoria valido", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = await Produtos.create({
            "id": "10",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        const response = await request(app)
            .put("/produtos/10")
            .send({
                "nome": "computador", 
                "descricao": "desktop1",
                "valor": "1",
                "idcategoria" : "1"
            });
        expect(response.status).toBe(200);
    });
    it("a rota put: /produtos/:id não deve editar um produto caso, possuir um idcategoria inexistente", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = await Produtos.create({
            "id": "1",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        const response = await request(app)
            .put("/produtos/1")
            .send({
                "nome": "computador", 
                "descricao": "desktop1",
                "valor": "1",
                "idcategoria" : "100"
            });
        expect(response.status).toBe(400);
    });
    it("a rota put: /produtos/:id não deve editar um produto caso, possuir campos em branco", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = await Produtos.create({
            "id": "1",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        const response = await request(app)
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
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const produto = await Produtos.create({
            "id": "1",
            "nome": "computador", 
            "descricao": "desktop",
            "valor": "1",
            "idcategoria" : "1"
        });
        const response = await request(app)
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