export class Level {
  inputs;
  outputs;
  biases;
  weights;
  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];
    for (let i = 0; i < inputCount; i += 1) {
      this.weights[i] = new Array(outputCount);
    }

    Level.randomize(this);
  }

  private static randomize(level: Level) {
    for (let i = 0; i < level.inputs.length; i += 1) {
      for (let j = 0; j < level.outputs.length; j += 1) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < level.biases.length; i += 1) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(
    givenInputs: any[],
    level: {
      inputs: any[];
      outputs: any[];
      weights: number[][];
      biases: number[];
    }
  ) {
    for (let i = 0; i < level.inputs.length; i += 1) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i += 1) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j += 1) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }

    return level.outputs;
  }
}
