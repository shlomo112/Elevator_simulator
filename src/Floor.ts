import { CallButton } from './CallButton';
import { Timer } from './Timer';
import { Building } from './Building';

export class Floor {
  private number: number;
  private element: HTMLElement;
  private callButton: CallButton;
  private building: Building;
  public timer: Timer;

  constructor(public floorNumber: number, building:Building) {
    this.number = floorNumber;
    this.element = document.createElement('div');
    this.element.classList.add('floor');
    this.callButton = new CallButton(this);
    this.timer = new Timer();
    this.building = building;
    this.element.appendChild(this.callButton.getElement());
  }

  // Returns a div element representing the floor
  public getElement(): HTMLElement {
    return this.element;
  }

  // Requests the nearest elevator to this floor after validating tha no elevator in floor
  public callElevator(): void {
    if(this.elevatorIsrHere() || this.elevatorIsComing()){
      this.callButton.reset()
      return;
    }
    const elevator = this.building.findNearestAvailableElevator(this);
    if (elevator) {
      this.timer.remainingTime = elevator.calculateTravelTime(this);
      elevator.call(this);
      this.showTimer(this.timer.remainingTime);
    }
  }
  
  // Displaying the timer element after calling the elevator 
  private showTimer(time: number): void {
    this.element.appendChild(this.timer.getElement());
    this.timer.startCountdown(time, this.handleArrival.bind(this));
  }
  // Handle floor actions when elevator arrives
  private handleArrival(): void {
    this.callButton.reset();
    this.timer.reset();
  }
  
  // Check if elevator is already in floor
  private elevatorIsrHere(): boolean {
    for (const elevator of this.building.elevators) {
      if(elevator.currentFloor === this.number) {
        return true;
      }
    }
    return false;
  }
  
  // Check if there is any elevator coming to this floor 
  private elevatorIsComing(): boolean {
    for(const elevator of this.building.elevators) {
      for(const floor of elevator.targetFloors){
        if(floor.floorNumber === this.number) {
          return true;
        }
      }
    }
    return false;
  }
}
