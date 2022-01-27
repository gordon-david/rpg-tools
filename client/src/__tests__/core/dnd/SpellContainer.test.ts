import { describe, test, expect } from "@jest/globals";
import { SpellsContainer } from "./SpellContainer";

describe("SpellContainer", () => {
  test("Constructor", () => {
    const container = new SpellsContainer()

    expect(container).not.toBeNull()
    expect(container).not.toBeUndefined()
  })
  test("all spells instantiated", () => {
    const c = new SpellsContainer().build()
  })
})