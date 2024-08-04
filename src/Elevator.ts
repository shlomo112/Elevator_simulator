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

  // Returns the div element of the elevator
  public getElement(): HTMLElement {
    return this.element;
  }

  // Method to call elevator to chosen floor 
  public call(floor: Floor): void {
    this.targetFloors.push(floor);
    if(this.targetFloors.length > 0) {
      this.moveToFloor();
    }
  }

  // Moves the elevator to the next target floor, handle arrival and then continues to the next target floor.
  private moveToFloor(): void {
    if (this.targetFloors.length === 0) {
      return;
    }
    const nextFloor = this.targetFloors[0].floorNumber;
    const travelTime = Math.abs(this.currentFloor - nextFloor) * 500;
    this.animateMovement(nextFloor,travelTime);

    this.currentFloor = nextFloor;
    // Set time out for playing ding at arrival time and trigger another time out 
    setTimeout(() => {
      this.ding.play();
      // Set time out after arrival for 2 sec and call the move method again to next target
      setTimeout(() => {
        this.targetFloors.shift()!;
        this.moveToFloor();
      }, 2000);
    }, travelTime);
  }
  
  // Method to calculate the travel time of an elevator to a calling floor
  public calculateTravelTime(newFloor:Floor){
    let arrivalTime = 0;
    // Calculate when there is pre target floors by adding last destination time with new destination time
    if(this.targetFloors.length > 0){
      const remainingTime = this.targetFloors[this.targetFloors.length - 1].timer.remainingTime;
      arrivalTime += remainingTime + 2;
      arrivalTime += Math.abs(this.currentFloor - newFloor.floorNumber) * 0.5;
    } else {
      // Calculate time  when there is no target floors in target floors array
      arrivalTime = Math.abs(this.currentFloor - newFloor.floorNumber) * 0.5;
    }
    return arrivalTime;  
  }
  
  // Animates the elevator’s movement to the specified floor over the given travel time using CSS transitions
  private animateMovement(nextFloor:number, travelTime:number): void {
    this.element.style.transition = `${travelTime}ms linear`;
    this.element.style.transform = `translateY(-${nextFloor * 117}px)`;
  }
}