import { describe, it, expect } from "vitest";
import { compile } from "./index.js";

describe("compile empty string param", () => {
  const msg = 'Expected "test" to be a non-empty string';
  it("rejects empty string", () => {
    expect(() => compile("/:test")({ test: "" })).toThrow(new TypeError(msg));
  });
  it("rejects non-strings", () => {
    for (const v of [1, {}, true, []]) {
      expect(() => compile("/:test")({ test: v as any })).toThrow(
        new TypeError(msg),
      );
    }
  });
  it("accepts non-empty strings", () => {
    expect(compile("/:test")({ test: "a" })).toBe("/a");
    expect(compile("/:test")({ test: " " })).toBe("/%20");
  });
});
