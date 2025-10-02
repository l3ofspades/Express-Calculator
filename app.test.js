const request = require("supertest");
const app = require("./app");

describe("Mean Route", () => {
    test("calculates the mean of given numbers", async () => {
        const res = await request(app).get("/mean").query({ nums: "1,2,3,4,5" });
        expect(res.body.response.value).toBe(3);
    });

    test("handles invalid input", async () => {
        const res = await request(app).get("/mean").query({ nums: "1,2,foo" });
        expect(res.status).toBe(400);
        expect(res.body.error.message).toBe("Invalid input.");
    });
});

describe("Median Route", () => {
    test("calculates the median of given numbers", async () => {
        const res = await request(app).get("/median").query({ nums: "1,3,3,6,7,8,9" });
        expect(res.body.response.value).toBe(6);
    });
});

describe("All Route", () => {
    test("calculates mean, median, and mode of given numbers", async () => {
        const res = await request(app).get("/all").query({ nums: "1,2,2,3,4" });
        expect(res.body.response.mean).toBe(2.4);
        expect(res.body.response.median).toBe(2);
        expect(res.body.response.mode).toBe(2);
    });
});