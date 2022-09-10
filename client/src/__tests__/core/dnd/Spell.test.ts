import { expect, describe, test } from "@jest/globals";
import { Spell } from "./Spell";

describe("Spell", () => {
  test("Build from json data", () => {
    const actual = testData.spells[0].actual;
    const expected = testData.spells[0].expected;

    let spell = Spell.fromJSON(actual);

    expect(spell).not.toBeUndefined();
    expect(spell).not.toBeNull();
    expect(spell.name).toEqual(expected.name);
    expect(spell.level).toEqual(expected.level);
    expect(spell.school).toEqual(expected.school);
    expect(spell.classes).toEqual(expected.classes);
    expect(spell.components).toEqual(expected.components);
    expect(spell.castingTime).toEqual(expected.castingTime);
    expect(spell.range).toEqual(expected.range);
    expect(spell.duration).toEqual(expected.duration);
    expect(spell.entries).toEqual(expected.entries);
  });
});

const testData = {
  spells: [
    {
      actual: {
        name: "Dominate Monster",
        source: "PHB",
        page: 235,
        srd: true,
        level: 8,
        school: "E",
        time: [
          {
            number: 1,
            unit: "action",
          },
        ],
        range: {
          type: "point",
          distance: {
            type: "feet",
            amount: 60,
          },
        },
        components: {
          v: true,
          s: true,
        },
        duration: [
          {
            type: "timed",
            duration: {
              type: "hour",
              amount: 1,
            },
            concentration: true,
          },
        ],
        entries: [
          "You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be {@condition charmed} by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
          'While the creature is {@condition charmed}, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as "Attack that creature," "Run over there," or "Fetch that object." If the creature completes the order and doesn\'t receive further direction from you, it defends and preserves itself to the best of its ability.',
          "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.",
          "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.",
        ],
        entriesHigherLevel: [
          {
            type: "entries",
            name: "At Higher Levels",
            entries: [
              "When you cast this spell with a 9th-level spell slot, the duration is concentration, up to 8 hours.",
            ],
          },
        ],
        conditionInflict: ["charmed"],
        savingThrow: ["wisdom"],
        miscTags: ["SGT"],
        areaTags: ["ST"],
        classes: {
          fromClassList: [
            {
              name: "Bard",
              source: "PHB",
            },
            {
              name: "Sorcerer",
              source: "PHB",
            },
            {
              name: "Warlock",
              source: "PHB",
            },
            {
              name: "Wizard",
              source: "PHB",
            },
          ],
        },
      },
      expected: {
        name: "Dominate Monster",
        level: 8,
        school: "Enchantment",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
        components: ["v", "s"],
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 1 hour",
        entries: [
          "You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be {@condition charmed} by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
          'While the creature is {@condition charmed}, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as "Attack that creature," "Run over there," or "Fetch that object." If the creature completes the order and doesn\'t receive further direction from you, it defends and preserves itself to the best of its ability.',
          "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.",
          "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.",
        ],
      },
    },
  ],
};
