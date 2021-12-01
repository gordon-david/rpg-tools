const DiceTypes = {
 Genesys: {
     ABILITY: 'genesys-dice-ability',
     BOOST: 'genesys-dice-boost',
     SETBACK: 'genesys-dice-setback',
     PROFICIENCY: 'genesys-dice-proficiency',
     DIFFICULTY: 'genesys-dice-difficulty',
     CHALLENGE: 'genesys-dice-challenge',
     FORCE: 'genesys-dice-force'
 },
 Polyhedral: {
     D20: 'polyhedral-dice-d20',
     D10: 'polyhedral-dice-d10',
     D8: 'polyhedral-dice-d8',
     D6: 'polyhedral-dice-d6',
     D4: 'polyhedral-dice-d4',
 }
}

const DiceTypeDisplay = {
 [DiceTypes.Polyhedral.D20]: "D20",
 [DiceTypes.Polyhedral.D10]: "D10",
 [DiceTypes.Polyhedral.D8]: "D8",
 [DiceTypes.Polyhedral.D6]: "D6",
 [DiceTypes.Polyhedral.D4]: "D4",
 [DiceTypes.Genesys.ABILITY]: "Ability"
}

const DiceFaces = {
 Genesys: {
     SUCCESS: 'genesys-face-success',
     ADVANTAGE: 'genesys-face-advantage',
     FAILURE: 'genesys-face-failure',
     TRIUMPH: 'genesys-face-triumph',
     THREAT: 'genesys-face-threat',
     DISPAIR: 'genesys-face-dispair',
     BLANK: 'genesys-face-blank',
     LIGHT: 'genesys-face-light',
     DARK: 'genesys-face-dark'
 },
 Polyhedral: {
     '1': 'polyhedral-face-1',
     '2': 'polyhedral-face-2',
     '3': 'polyhedral-face-3',
     '4': 'polyhedral-face-4',
     '5': 'polyhedral-face-5',
     '6': 'polyhedral-face-6',
     '7': 'polyhedral-face-7',
     '8': 'polyhedral-face-8',
     '9': 'polyhedral-face-9',
     '10': 'polyhedral-face-10',
     '20': 'polyhedral-face-20',
     '30': 'polyhedral-face-30',
     '40': 'polyhedral-face-40',
     '50': 'polyhedral-face-50',
     '60': 'polyhedral-face-60',
     '70': 'polyhedral-face-70',
     '80': 'polyhedral-face-80',
     '90': 'polyhedral-face-90',
     '00': 'polyhedral-face-00'
 }
}

const addPolyhedralDice = (diceResultArray) => {
 return diceResultArray.reduce((p, c) => p + c, 0)
}

const addGenesysDice = (diceResultArray) => {
 const resultConstants = {
     [DiceFaces.Genesys.SUCCESS]: 1,
     [DiceFaces.Genesys.FAILURE]: -1,
     [DiceFaces.Genesys.ADVANTAGE]: 1,
     [DiceFaces.Genesys.DISPAIR]: -1,
     [DiceFaces.Genesys.THREAT]: -1,
     [DiceFaces.Genesys.TRIUMPH]: 1
 }

 const resultDict = {
     successFailure: 0,
     advantageThreat: 0,
     triumphDispair: 0,
     light: 0,
     dark: 0
 }

 diceResultArray.forEach(e => {
     if (e === DiceFaces.Genesys.SUCCESS || e === DiceFaces.Genesys.FAILURE) {
         resultDict.successFailure += resultConstants[e]
     }
     if (e === DiceFaces.Genesys.ADVANTAGE || e === DiceFaces.Genesys.THREAT) {
         resultDict.advantageThreat += resultConstants[e]
     }
     if (e === DiceFaces.Genesys.TRIUMPH || e === DiceFaces.Genesys.DISPAIR) {
         resultDict.triumphDispair += resultConstants[e]
     }
     if (e === DiceFaces.Genesys.LIGHT){
         resultDict.light += 1
     }
     if (e === DiceFaces.Genesys.DARK) {
         resultDict.dark += 1
     }
 })

 const successFailure = Array(Math.abs(resultDict.successFailure)).fill((resultDict.successFailure >= 0) ? DiceFaces.Genesys.SUCCESS : DiceFaces.Genesys.FAILURE)
 const advantageThreat = Array(Math.abs(resultDict.advantageThreat)).fill((resultDict.advantageThreat >= 0) ? DiceFaces.Genesys.ADVANTAGE : DiceFaces.Genesys.THREAT)
 const triumphDispair = Array(Math.abs(resultDict.triumphDispair)).fill(resultDict.triumphDispair >= 0 ? DiceFaces.Genesys.TRIUMPH : DiceFaces.Genesys.DISPAIR)
 return advantageThreat.concat(
     successFailure,
     triumphDispair,
     Array(resultDict.light).fill(DiceFaces.Genesys.LIGHT),
     Array(resultDict.dark).fill(DiceFaces.Genesys.DARK)
 )
}

const Dice = (type, faces) => {
 return {

     // unique enum differentiating this dice type from any other type
     // used for maping icons, display, etc.
     type,

     // faces needs to be a dictionary indexiable with a number 0 -> number of faces - 1, or an array
     faces,

     /**
      * expects faces to be indexable 0 -> number of faces-1
      * @returns a random face selection from this dice
      */
     roll() {
         return faces[Math.floor(Math.random() * Math.floor(faces.length))]
     }
 }
}

const GenesysForceDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.FORCE,
     [
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.DARK, DiceFaces.Genesys.DARK],
         [DiceFaces.Genesys.LIGHT]

     ]
 )
}

const GenesysAbilityDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.ABILITY,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.SUCCESS, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.ADVANTAGE],
     ]
 )
}

const GenesyBoostDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.BOOST,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.ADVANTAGE],
     ]
 )
}

const GenesySetbackDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.BOOST,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT],
     ]
 )
}

const GenesysDifficultyDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.BOOST,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.FAILURE, DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.FAILURE]
     ]
 )
}

const GenesysProficiencyDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.PROFICIENCY,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.SUCCESS, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.SUCCESS, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.SUCCESS],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.ADVANTAGE],
         [DiceFaces.Genesys.TRIUMPH]
     ]
 )
}

const GenesysChallengeDiceFactory = () => {
 return Dice(
     DiceTypes.Genesys.CHALLENGE,
     [
         [DiceFaces.Genesys.BLANK],
         [DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.FAILURE, DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.FAILURE, DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.FAILURE],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.THREAT, DiceFaces.Genesys.THREAT],
         [DiceFaces.Genesys.DISPAIR]
     ]
 )
}

const PolyhedralD20DiceFactory = () => Dice(DiceTypes.Polyhedral.D20, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const PolyhedralD10DiceFactory = () => Dice(DiceTypes.Polyhedral.D10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const PolyhedralD8DiceFactory = () => Dice(DiceTypes.Polyhedral.D8, [1, 2, 3, 4, 5, 6, 7, 8])
const PolyhedralD6DiceFactory = () => Dice(DiceTypes.Polyhedral.D6, [1, 2, 3, 4, 5, 6])
const PolyhedralD4DiceFactory = () => Dice(DiceTypes.Polyhedral.D4, [1, 2, 3, 4])

const DiceFactory = (diceType) => {
 switch (diceType) {
     case DiceTypes.Genesys.ABILITY: { return GenesysAbilityDiceFactory() }
     case DiceTypes.Genesys.BOOST: { return GenesyBoostDiceFactory() }
     case DiceTypes.Genesys.SETBACK: { return GenesySetbackDiceFactory() }
     case DiceTypes.Genesys.PROFICIENCY: { return GenesysProficiencyDiceFactory() }
     case DiceTypes.Genesys.DIFFICULTY: { return GenesysDifficultyDiceFactory() }
     case DiceTypes.Genesys.CHALLENGE: { return GenesysChallengeDiceFactory() }
     case DiceTypes.Genesys.FORCE: { return GenesysForceDiceFactory() }
     case DiceTypes.Polyhedral.D20: { return PolyhedralD20DiceFactory() }
     case DiceTypes.Polyhedral.D10: { return PolyhedralD10DiceFactory() }
     case DiceTypes.Polyhedral.D8: { return PolyhedralD8DiceFactory() }
     case DiceTypes.Polyhedral.D6: { return PolyhedralD6DiceFactory() }
     case DiceTypes.Polyhedral.D4: { return PolyhedralD4DiceFactory() }
     default: {
         throw new Error('Illegal Argument Passed To DiceFactory')
     }
 }
}

/**
* 
* @param {DiceType[]} diceTypeArray is an array of dice types, defined in the Dice model module
*/
const DicePool = (diceTypeArray) => {
 const _diceTypeArray = diceTypeArray || []

 // Object of DiceType : Dice[]
 const currentSelection = (
     () => {
         let toReturn = {}
         _diceTypeArray.forEach(diceType => {
             toReturn[diceType] = []
         })
         return toReturn
     }
 )()

 const clearCurrentSelection = () => {
     Object.keys(currentSelection).forEach(diceType => currentSelection[diceType] = [])
 }

 return {
     addDice(diceType) {
         // console.log(currentSelection);

         currentSelection[diceType].push(DiceFactory(diceType))
     },

     removeDice(diceType) {
         currentSelection[diceType].pop()
     },

     /**
      * 
      * @param {DiceType} diceType 
      * @returns {Number} amount of dice in pool of diceType
      */
     currentAmount(diceType) {
         return currentSelection[diceType].length
     },

     diceTypesInPool() {
         return [..._diceTypeArray]
     },

     /**
      * @returns {Object{DiceType : Number}} Current amount of dice of each dice type in selection
      */
     diceInPool() {
         let toReturn = {}
         _diceTypeArray.forEach(diceType => {
             toReturn[diceType] = currentSelection[diceType].length
         })
         return toReturn
     },

     roll() {
         // console.log(currentSelection)
         let genesysPool = []
         let polyhedralPool = []
         const polyhedralTypes = Object.values(DiceTypes.Polyhedral)
         const genesysTypes = Object.values(DiceTypes.Genesys)

         Object.keys(currentSelection).forEach(diceType => {
             if (polyhedralTypes.map(value => value === diceType).length !== 0) {
                 console.log('---this shold not run --- ')
                 currentSelection[diceType].forEach(dice => polyhedralPool.push(dice))
             }
             if (genesysTypes.map(value => value === diceType).length !== 0) {
                 currentSelection[diceType].forEach(dice => genesysPool.push(dice))
             }
         })
         console.log(polyhedralTypes)
         const genesysResult = addGenesysDice(genesysPool.map(dice => dice.roll()))
         const polyhedralResult = addPolyhedralDice(polyhedralPool.map(dice => dice.roll()))
         clearCurrentSelection()
         return {
             polyhedralResult,
             genesysResult
         }
     },
 }
}

module.exports = {
 DiceTypes,
 DiceFaces,
 DiceFactory,
 addGenesysDice,
 addPolyhedralDice,
 DicePool,
 DiceTypeDisplay,
}