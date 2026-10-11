import { describe, it, expect } from "vitest";
import { compile } from "./index.js";

describe("compile non-empty string params", () => {
  const msg = 'Expected "test" to be a non-empty string';

  it("rejects an empty string", () => {
    expect(() => compile("/:test")({ test: "" })).toThrow(new TypeError(msg));
  });

  it("rejects non-strings", () => {
    const toPath = compile("/:test");
    expect(() => toPath({ test: 1 as any })).toThrow(new TypeError(msg));
    expect(() => toPath({ test: [] })).toThrow(new TypeError(msg));
  });

  it("rejects an empty string in a later param", () => {
    expect(() => compile("/:a/:test")({ a: "x", test: "" })).toThrow(
      new TypeError(msg),
    );
  });

  it("accepts a single character and still reports missing", () => {
    expect(compile("/:test")({ test: "a" })).toBe("/a");
    expect(() => compile("/:test")({})).toThrow("Missing parameters: test");
  });
});
