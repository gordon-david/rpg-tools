import { Languages, Sizes } from "./Common";

interface IEntry {
  name: string
  type: string
  entries: string[]
}

export interface IRace {
  name: string
  abilityBonuses: {[ability: string]: number}[]
  size: Sizes
  speed: {[kind: string]: number} // i.e. "walk": 30, "fly": 60
  entries: IEntry[]
}

export class Race implements IRace {
  name: string = "";
  abilityBonuses: { [ability: string]: number; }[] = [];
  size: Sizes = Sizes.medium;
  speed: { [kind: string]: number; } = {};
  entries: IEntry[] = [];
  subraces: Race[] = [];

  static buildFromJson(data: any){

  }
}