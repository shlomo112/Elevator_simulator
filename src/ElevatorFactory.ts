import { Elevator } from './Elevator';

export class ElevatorFactory {
  // A static counter to generate unique IDs for each elevator instance.
  private static idCounter = 0;

  // Creates and returns a new Elevator instance with a unique ID, incrementing the idCounter.
  public static createElevator(): Elevator {
    return new Elevator(ElevatorFactory.idCounter++);
  }
}
