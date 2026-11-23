import { describe, expect, it } from "vitest";
import { POST } from "../app/api/enquiry/route";

const call = (body: unknown, ip = "1.1.1.1") =>
  POST(
    new Request("http://localhost/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

describe("POST /api/enquiry", () => {
  it("rejects invalid fields with per-field errors", async () => {
    const res = await call({ name: "A", phone: "12", email: "bad" }, "2.2.2.2");
    expect(res.status).toBe(422);
    const j = await res.json();
    expect(Object.keys(j.errors).sort()).toEqual(["email", "name", "phone"]);
  });

  it("accepts a valid enquiry and returns a WhatsApp link naming the puppy", async () => {
    const res = await call({ name: "Shaurya", phone: "+971 50 123 4567", puppy: "copper-male", area: "Marina" }, "3.3.3.3");
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.ok).toBe(true);
    expect(decodeURIComponent(j.wa)).toContain("Copper");
  });

  it("silently accepts honeypot hits without echoing a link", async () => {
    const res = await call({ website: "http://spam", name: "x" }, "4.4.4.4");
    expect(res.status).toBe(200);
    expect((await res.json()).wa).toBeUndefined();
  });

  it("rejects malformed JSON", async () => {
    expect((await call("not json", "5.5.5.5")).status).toBe(400);
  });

  it("rate limits after 5 requests from one IP", async () => {
    let last = 0;
    for (let i = 0; i < 7; i++) last = (await call({ name: "Tester", phone: "+971501234567" }, "9.9.9.9")).status;
    expect(last).toBe(429);
  });
});
