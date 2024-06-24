import { CallButton } from './CallButton';
import { Timer } from './Timer';

export class Floor {
  private element: HTMLElement;
  private callButton: CallButton;
  private timer: Timer;

  constructor(public floorNumber: number, callElevator: (floor: number) => void) {
    this.element = document.createElement('div');
    this.element.classList.add('floor');

    this.callButton = new CallButton(floorNumber, callElevator);
    this.timer = new Timer();

    this.element.appendChild(this.callButton.getElement());
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public showTimer(time: number): void {
    this.element.appendChild(this.timer.getElement());
    this.timer.startCountdown(time, () => this.callButton.reset());
}

  public hideTimer(): void {
    this.timer.reset();
    if (this.timer.getElement().parentNode) {
      this.element.removeChild(this.timer.getElement());
    }
  }
}
