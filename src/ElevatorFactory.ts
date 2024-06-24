import { Elevator } from './Elevator';

export class ElevatorFactory {
  private static idCounter = 0;

  public static createElevator(): Elevator {
    return new Elevator(ElevatorFactory.idCounter++);
  }
}
