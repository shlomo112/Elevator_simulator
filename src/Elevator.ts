
export class Elevator {
  public currentFloor: number = 0;
  private targetFloors: number[] = [];
  private moving: boolean = false;
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

  public moveToFloor(floor: number, callback: () => void): void {
    this.targetFloors.push(floor);
    if (!this.moving) {
      this.processNextFloor(callback);
    }
  }

  private processNextFloor(callback: () => void): void {
    if (this.targetFloors.length === 0) {
      this.moving = false;
      return;
    }
    
    this.moving = true;
    const nextFloor = this.targetFloors.shift()!;
    const distance = Math.abs(this.currentFloor - nextFloor);
    const travelTime = distance * 500; // 500ms per floor

    this.element.style.transform = `translateY(-${nextFloor * 117}px)`;
    setTimeout(() => {
      this.currentFloor = nextFloor;
      this.ding.play();
      setTimeout(() => {
        callback();
        this.processNextFloor(callback);
      }, 2000); // 2 seconds delay at the floor
    }, travelTime);
  }
}
