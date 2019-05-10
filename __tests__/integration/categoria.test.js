const { sequelize } = require("../../src/app/models");
const request = require('supertest');

const app = require('../../src/app')
const { Categorias } = require("../../src/app/models");
const { Produtos } = require("../../src/app/models");
const truncate = require('../../__utils/truncate');

describe("Criar Categoria", () => {
    beforeEach(async () => {
        await truncate();
      });
    it("a rota /categorias deve retornar um status 200, caso cadastrada com sucesso", async () => {
        const response = await request(app)
            .post("/categorias")
            .send({
                nome: 'teste4', 
                juros : '10'
            });
        expect(response.status).toBe(200);
    });
    it("a rota /categorias não deve permitir cadastro caso tenha campos em branco", async () => {
        const response = await request(app)
            .post("/categorias")
            .send({
                nome: 'teste4', 
                juros : ''
            });
        expect(response.status).toBe(400);
    });
    it("a rota /categorias não deve permitir cadastro caso tenha já exista uma categoria com o mesmo nome no banco de dados", async () => {
        const categoria = await Categorias.create({
            "nome":"informatica",
            "juros":"10"
        });
        const response = await request(app)
            .post("/categorias")
            .send({
                nome: 'informatica', 
                juros : ''
            });
        expect(response.status).toBe(400);
    });

});

   
    describe("Editar categoria", () => {
        beforeEach(async () => {
            await truncate();
        });
    it("a rota put: /categorias/:id deve editar uma categoria caso os dados estejam preenchidos corretamente", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const response = await request(app)
            .put("/categorias/1")
            .send({
                "nome":"informatica",
                "juros": categoria.id
            });
        expect(response.status).toBe(200);
    });
 
    it("a rota put: /categorias/:id não deve editar uma categoria caso possuir campos em branco", async () => {
        const categoria = await Categorias.create({
            "id": "1",
            "nome":"informatica",
            "juros":"10"
        });
        const response = await request(app)
            .put("/categorias/1")
            .send({
                "nome":"",
                "juros":"10"
            });
        expect(response.status).toBe(400);
    });
});
