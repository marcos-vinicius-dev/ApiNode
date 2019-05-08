const request = require('supertest');

const app = require('../../src/app')
const { Categorias } = require("../../src/app/models");
const truncate = require('../../__utils/truncate');

describe("Nova categoria", () => {
    beforeEach(async () => {
        await truncate();
    });
    it("a rota /newcategoria deve retornar um status 200, caso cadastrada com sucesso", async () => {
        const response = await request(app)
            .post("/newcategoria")
            .send({
                nome: 'teste4', 
                juros : '10'
            });
        expect(response.status).toBe(200);
    });
});
