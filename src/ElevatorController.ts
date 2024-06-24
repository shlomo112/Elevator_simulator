import { ElevatorFactory } from './ElevatorFactory';
import { Elevator } from './Elevator';
import { Floor } from './Floor';

export class ElevatorController {
  private elevators: Elevator[];
  private floors: Floor[];
  private buildingElement: HTMLElement;

  constructor(numFloors: number, numElevators: number) {
    this.buildingElement = document.getElementById('building')!;

    this.elevators = [];
    for (let i = 0; i < numElevators; i++) {
      const elevator = ElevatorFactory.createElevator();
      this.elevators.push(elevator);
      this.buildingElement.appendChild(elevator.getElement());
    }

    this.floors = [];
    for (let i = 0; i < numFloors; i++) {
      const floor = new Floor(i, this.callElevator.bind(this));
      this.floors.push(floor);
      this.buildingElement.appendChild(floor.getElement());
    }
  }

  private callElevator(floorNumber: number): void {
    const elevator = this.findNearestAvailableElevator(floorNumber);
    if (elevator) {
      const travelTime = Math.abs(elevator.currentFloor - floorNumber) * 0.5;
      this.floors[floorNumber].showTimer(travelTime);
      elevator.moveToFloor(floorNumber, () => {
        this.floors[floorNumber].hideTimer();
      });
    }
  }

  private findNearestAvailableElevator(floorNumber: number): Elevator | null {
    let nearestElevator: Elevator | null = null;
    let minDistance = Infinity;

    for (const elevator of this.elevators) {
      const distance = Math.abs(elevator.currentFloor - floorNumber);
      if (distance < minDistance) {
        nearestElevator = elevator;
        minDistance = distance;
      }
    }

    return nearestElevator;
  }
}
