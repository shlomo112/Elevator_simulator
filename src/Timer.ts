export class Timer {
    private countdownElement: HTMLElement;
  
    constructor() {
      this.countdownElement = document.createElement('label');
    }
  
    public getElement(): HTMLElement {
      return this.countdownElement;
    }
  
    public startCountdown(time: number, onComplete: () => void): void {
      let remainingTime = time;
      this.countdownElement.textContent = remainingTime.toString();
  
      const interval = setInterval(() => {
        remainingTime--;
        this.countdownElement.textContent = remainingTime.toString();
        if (remainingTime <= 0) {
          clearInterval(interval);
          this.reset();
          onComplete();
        }
      }, 1000);
    }
  
    public reset(): void {
      this.countdownElement.textContent = '';
    }
  }
  