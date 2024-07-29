import { ElevatorFactory } from './ElevatorFactory';
import { Elevator } from './Elevator';
import { Floor } from './Floor';


export class Building {
  public elevators: Elevator[];
  private floors: Floor[];
  private buildingElement: HTMLElement;

  constructor(numFloors: number, numElevators: number) {
    this.buildingElement = document.getElementById('building')!;
    this.floors = [];
    this.elevators = [];
    
    this.initializeFloors(numFloors);
    this.initializeElevators(numElevators);
  }



  private initializeElevators(numElevators:number) {
    const elevatorsElement = document.createElement('div');
    elevatorsElement.classList.add('elevators-container');
    
    for (let i = 0; i < numElevators; i++) {
      const elevator = ElevatorFactory.createElevator();
      this.elevators.push(elevator);
      elevatorsElement.appendChild(elevator.getElement());
      this.buildingElement.appendChild(elevatorsElement);
    }
  }  

  private initializeFloors(numFloors:number) {
    const floorsElement = document.createElement('div');
    floorsElement.classList.add('floors-container');

    for (let i = 0; i < numFloors; i++) {
      const floor = new Floor(i, this);
      this.floors.push(floor);
      floorsElement.appendChild(floor.getElement());
      this.buildingElement.appendChild(floorsElement);

    }
  }
  
  
  public findNearestAvailableElevator(floor: Floor): Elevator | null {
    let nearestElevator: Elevator | null = null;
    let minTime = Infinity;

    for (const elevator of this.elevators) {
      const time = elevator.calculateTravelTime(floor);
      if (time < minTime) {
        nearestElevator = elevator;
        minTime = time;
      }
    } 
    
    return nearestElevator;
  }   
}
  
