import { describe, it, expect } from "vitest";
import { compile } from "./index.js";

describe("compile param value errors", () => {
  it("should throw when param is an empty string", () => {
    expect(() => compile("/:test")({ test: "" })).toThrow(
      new TypeError('Expected "test" to be a non-empty string'),
    );
  });

  it("should throw with the new wording when param is not a string", () => {
    expect(() => compile("/:test")({ test: [] })).toThrow(
      new TypeError('Expected "test" to be a non-empty string'),
    );
  });
});
