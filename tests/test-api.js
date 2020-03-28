const request = require("supertest");
const app = require("../main");

// */lab GET endpoint test
describe("GET /api", () => {
  it("respond with json containing a message", function(done) {
    request(app)
      .get("/api")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
