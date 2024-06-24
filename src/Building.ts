import { ElevatorController } from './ElevatorController';

export class Building {
  private controller: ElevatorController;

  constructor(numFloors: number, numElevators: number) {
    this.controller = new ElevatorController(numFloors, numElevators);
  }
}
