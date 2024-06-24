export class CallButton {
    private buttonElement: HTMLButtonElement;
  
    constructor(private floorNumber: number, private callElevator: (floor: number) => void) {
      this.buttonElement = document.createElement('button');
      this.buttonElement.classList.add('metal', 'linear');
      this.buttonElement.textContent = floorNumber.toString();
      this.buttonElement.onclick = () => {
        this.buttonElement.style.color = 'green';
        this.callElevator(this.floorNumber);
      };
    }
  
    public getElement(): HTMLButtonElement {
      return this.buttonElement;
    }
  
    public reset(): void {
      this.buttonElement.style.color = '';
    }
  }
  