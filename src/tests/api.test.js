const app = require('../app')
const request = require('supertest')
import 'regenerator-runtime/runtime'
/**
 * Testing get all plants endpoint
 */
describe("GET /listPlants", () => {
    it("respond with json containing a list of all plants", (done) => {
      request(app)
        .get("/listPlants")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

/**
 * Testing POST plants endpoint
 */
describe("POST /createPlants", () => {
    it("respond with 201 created", (done) => {
      const data = {
        name: "TomatoTest",
        type: "PlantaeTest",
        scientific_name: "Solanum lycopersicumTest",
        order: "SolanalesTest",
        img_url: "https://blog.nurserylive.com/wp-content/uploads/2016/10/step0002-7.jpg"
      };
      request(app)
        .post("/createPlants")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it("respond with 400 on bad request", (done) => {
        const data = {
          // no username and password
        };
        request(app)
          .post("/createPlants")
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
});
