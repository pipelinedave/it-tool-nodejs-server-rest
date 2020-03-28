const request = require("supertest");
const app = require("../main");

// */script GET endpoint test
describe("GET /script", () => {
  it("respond with json containing an object returned from pwsh", function(done) {
    request(app)
      .get("/script")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
