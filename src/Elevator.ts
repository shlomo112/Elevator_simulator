import { Floor } from "./Floor";

export class Elevator {
  public currentFloor: number = 0;
  public targetFloors: Floor[] = [];
  private element: HTMLElement;
  private ding: HTMLAudioElement;

  constructor(public id: number) {
    this.element = document.createElement('div');
    this.element.classList.add('elevator');
    this.ding = new Audio('assets/ding.mp3');
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public call(floor: Floor): void {
    this.targetFloors.push(floor);
    if(this.targetFloors.length > 0) {
      this.moveToFloor();
    }
  }

  private moveToFloor(): void {
    if (this.targetFloors.length === 0) {
      return;
    }
    const nextFloor = this.targetFloors[0].floorNumber;
    const travelTime = Math.abs(this.currentFloor - nextFloor) * 500;
    this.animateMovement(nextFloor,travelTime);

    this.currentFloor = nextFloor;
    setTimeout(() => {
      this.targetFloors.shift()!;
      this.ding.play();
      
      setTimeout(() => {
        this.moveToFloor();
      }, 2000);
    }, travelTime);
  }
  
  public calculateTravelTime(newFloor:Floor){
    let arrivalTime = 0;
    if(this.targetFloors.length > 0){
      const remainingTime = this.targetFloors[this.targetFloors.length - 1].timer.remainingTime;
      arrivalTime += remainingTime + 2;
      arrivalTime += Math.abs(this.currentFloor - newFloor.floorNumber) * 0.5;
    } else {
      arrivalTime = Math.abs(this.currentFloor - newFloor.floorNumber) * 0.5;
    }
    return arrivalTime;  
  }
  
  private animateMovement(nextFloor:number, travelTime:number): void {
    this.element.style.transition = `${travelTime}ms linear`;
    this.element.style.transform = `translateY(-${nextFloor * 117}px)`;
  }
}