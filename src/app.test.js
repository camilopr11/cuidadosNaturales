const app = require('./app')
const request = require('supertest');
import { ObjectID } from 'bson';
import 'regenerator-runtime/runtime'
/**
 * Testing get all plants endpoint
 */
describe("Plants API", () => {
    it("GET /plants --> array plants", () => {
        return request(app)
            .get("/plants")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            type: expect.any(String),
                            scientific_name: expect.any(String),
                            order: expect.any(String),
                            img_url: expect.any(String),
                        }),
                    ])
                )
            })
    });
});

/**
 * Testing get specific plant endpoint
 */
it("GET /plants/:id --> specific plant by ID", () => {
    return request(app)
        .get("/plants/5fb6ee21fd323d0017146113")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.anything([{
                        _id: expect.any(ObjectID),
                        img_url: expect.any(String),
                        name: expect.any(String),
                        order: expect.any(String),
                        scientific_name: expect.any(String),
                        type: expect.any(String),  
                }])                                              
            )
        })
});

/**
 * Testing specific plant not found
 */
it("GET /plants/:id --> {} not found", () => {
    return request(app)
        .get("/plants/1")
        .then((response) => {
            expect(response.body).toEqual({})                                              
        })
});

/**
 * Testing POST plants endpoint
 */
it("POST /plants/ --> created plant", () => {
    const data = {
        name: "TomatoTest",
        type: "PlantaeTest",
        scientific_name: "Solanum lycopersicumTest",
        order: "SolanalesTest",
        img_url: "https://blog.nurserylive.com/wp-content/uploads/2016/10/step0002-7.jpg"
    };
    return request(app)
        .post("/plants")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
});

it("POST /plants/ --> 400 on bad request", (done) => {
    const data = {
        // no data
    };
    request(app)
        .post("/plants")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('"plant not created"')
        .end((err) => {
            if (err) return done(err);
            done();
        });
});