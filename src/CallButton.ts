import { Floor } from "./Floor";

export class CallButton {
    private buttonElement: HTMLButtonElement;
  
    constructor(private floor:Floor) {
      this.buttonElement = document.createElement('button');
      this.buttonElement.classList.add('metal', 'linear');
      this.buttonElement.textContent = floor.floorNumber.toString();
      this.buttonElement.addEventListener('click', this.handleClick.bind(this));
    };

    private handleClick(): void {
        this.buttonElement.style.color = 'green';
        this.floor.callElevator();
    };  
    
    public getElement(): HTMLButtonElement {
      return this.buttonElement;
    }
  
    public reset(): void {
      this.buttonElement.style.color = '';
    }
  }
  