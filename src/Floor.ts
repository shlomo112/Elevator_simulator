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

  public getElement(): HTMLElement {
    return this.element;
  }

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
  
  private showTimer(time: number): void {
    this.element.appendChild(this.timer.getElement());
    this.timer.startCountdown(time, this.handleArrival.bind(this));
  }

  private handleArrival(): void {
    this.callButton.reset();
    this.timer.reset();
  }

  private elevatorIsrHere(): boolean {
    for (const elevator of this.building.elevators) {
      if(elevator.currentFloor === this.number) {
        return true;
      }
    }
    return false;
  }

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
