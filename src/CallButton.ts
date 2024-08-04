import { Floor } from "./Floor";

export class CallButton {
    private buttonElement: HTMLButtonElement;
  
    constructor(private floor:Floor) {
      this.buttonElement = document.createElement('button');
      this.buttonElement.classList.add('metal', 'linear');
      this.buttonElement.textContent = floor.floorNumber.toString();
      this.buttonElement.addEventListener('click', this.handleClick.bind(this));
    };
    
    // Handle the 'click' Event when a floor calling an elevator
    private handleClick(): void {
      this.buttonElement.style.color = 'green';
      this.floor.callElevator();
    };  
    
    // Returns the div element used to display call button 
    public getElement(): HTMLButtonElement {
      return this.buttonElement;
    }
    
    // Reset the text content color 
    public reset(): void {
      this.buttonElement.style.color = '';
    }
  }
  