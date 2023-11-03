import { describe, it, expect, vi } from "vitest";
import { isTokenExpired } from "../src/authHelper";

describe("isTokenExpired", () => {
  it("returns false for a non-expired token", () => {
    const futureTime = Math.floor(Date.now() / 1000) + 1000;
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ exp: futureTime })
    )}.signature`;
    expect(isTokenExpired(token)).toBe(false);
  });

  it("returns true for an expired token", () => {
    const pastTime = Math.floor(Date.now() / 1000) - 1000;
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ exp: pastTime })
    )}.signature`;
    expect(isTokenExpired(token)).toBe(true);
  });

  it("throws an error for an invalid token", () => {
    const token = "invalid.token.string";
    expect(() => isTokenExpired(token)).toThrow();
  });
});
