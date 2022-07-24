import { Level } from "./Level";

export class Network {
  levels: Level[];

  constructor(neuronCounts: string | any[]) {
    this.levels = [];

    for (let i = 0; i < neuronCounts.length - 1; i += 1) {
      this.levels.push(
        new Level(neuronCounts[i], neuronCounts[i + 1]) as Level
      );
    }
  }

  static feedForward(givenInputs: any, network: { levels: string | any[] }) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);

    for (let i = 1; i < network.levels.length; i += 1) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }
}
