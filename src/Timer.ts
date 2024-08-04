export class Timer {
    private countdownElement: HTMLElement;
    public remainingTime: number = 0;
  
    constructor() {
      this.countdownElement = document.createElement('div');
      this.countdownElement.classList.add('timer')
    }
  
    // Returns the div element used to display the countdown.
    public getElement(): HTMLElement {
      return this.countdownElement;
    }
  
    // Updates the countdown display to show the remaining time and adjusts visibility
    private updateDisplay():void {
      this.countdownElement.textContent = this.remainingTime.toFixed(1);
      this.countdownElement.style.display = this.remainingTime > 0 ? 'block' : 'none';
    }
  
    // Starting countdown with a given time, updating display and handle time complete
    public startCountdown(time: number, onComplete: () => void): void {
      if(time > 0){ 
      this.remainingTime = time;
      this.updateDisplay();
      
      const interval = setInterval(() => {
        if (this.remainingTime <= 0.5) {
          clearInterval(interval);  
          onComplete();
        }
        this.remainingTime -= 0.5;
        this.countdownElement.textContent = this.remainingTime.toString();
      }, 500);
    }
  }
  
  // Clear timer and hide timer element from floor
    public reset(): void {
      this.countdownElement.textContent = '';
      this.getElement().style.display = 'none';
    }
  }
  