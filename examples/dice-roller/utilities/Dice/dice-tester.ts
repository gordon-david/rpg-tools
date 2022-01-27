// const Dice = require(".");

// function Polyhedral1() {
//   diceFace.call(this);
//   this.value = 1;
// }
// Polyhedral1.prototype = Object.create(diceFace.prototype);

// function Polyhedral2() {
//   diceFace.call(this);
//   this.value = 2;
// }
// Polyhedral2.prototype = Object.create(diceFace.prototype);

// abstract class Dice {
//   faces: Array<string> | Array<number>
//   classname: string
//   constructor(faces: Array<string> | Array<number>) {
//     this.faces = faces
//   }
//   roll(): string | number | null {
//    return this.faces.length > 0
//     ? this.faces[Math.floor(Math.random() * this.faces.length)]
//     : null;
//   }
//   abstract add(dice: Dice): string | Array<string> | number | null

// }

// class DiceRollStrategies {

// }

// abstract class PolyhedralDice extends Dice {
//          roll()
//          add(dice)
// }

// abstract class GenesysDice extends Dice {
//          roll()
//          add(dice)
// }


// class D4 extends PolyhedralDice {
//   constructor(){
//    super([1, 2, 3, 4])
//   }
// }

// class Advantage extends GenesysDice {
//       constructor(){
//       super(["sucess", "success", ])
//       }
// }


/*
requirements:

each dice type should not be equal under equality test:
  (diceBuilder().makeD6() === diceBuilder().makeD12()) => false

each dice face should not be equal under equality test:
  (diceFace1 === diceFace2) => false

each dice instance is 'instanceof' dice

dice subtypes are instancesof dice but not siblings
*/

export function DiceBuilder() { }
