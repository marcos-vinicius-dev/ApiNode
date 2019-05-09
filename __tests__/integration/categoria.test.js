let request = require('supertest');

let app = require('../../src/app')
let { Categorias } = require("../../src/app/models");
let truncate = require('../../__utils/truncate');

describe("Criar Categoria", () => {
    beforeEach(async () => {
        await truncate();
        Categorias.destroy({
            where: {},
            truncate: true
        });
    });
    it("a rota /categorias deve retornar um status 200, caso cadastrada com sucesso", async () => {
        let response = await request(app)
            .post("/categorias")
            .send({
                nome: 'teste4', 
                juros : '10'
            });
        expect(response.status).toBe(200);
    });
    it("a rota /categorias não deve permitir cadastro caso tenha campos em branco", async () => {
        let response = await request(app)
            .post("/categorias")
            .send({
                nome: 'teste4', 
                juros : ''
            });
        expect(response.status).toBe(400);
    });
    it("a rota /categorias não deve permitir cadastro caso tenha já exista uma categoria com o mesmo nome no banco de dados", async () => {
        let categoria = await Categorias.create({
            "nome":"informatica",
            "juros":"10"
        });
        let response = await request(app)
            .post("/categorias")
            .send({
                nome: 'informatica', 
                juros : ''
            });
        expect(response.status).toBe(400);
    });
});

describe("Editar Categoria", () => {
    beforeEach(async () => {
        await truncate();
        Categorias.destroy({
            where: {},
            truncate: true
        });
    });
    it("a rota put: /categorias/:id deve editar uma categoria caso os dados estejam preenchidos corretamente", async () => {
        let categoria = await Categorias.create({
            "id": "01",
            "nome":"informatica",
            "juros":"10"
        });
        let response = await request(app)
            .put("/categorias/01")
            .send({
                "nome":"informatica",
                "juros": categoria.id
            });
        expect(response.status).toBe(200);
    });
    it("a rota put: /categorias/:id não deve editar uma categoria caso possuir campos em branco", async () => {
        let categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        let response = await request(app)
            .put("/categorias/" + categoria.id + "")
            .send({
                "nome":"",
                "juros":"10"
            });
        expect(response.status).toBe(400);
    });
    it("a rota put: /categorias/:id não deve editar uma categoria caso a categoria não existir", async () => {
        let response = await request(app)
            .put("/categorias/1000")
            .send({
                "nome":"informatica",
                "juros":"10"
            });
        expect(response.status).toBe(400);
    });
});
