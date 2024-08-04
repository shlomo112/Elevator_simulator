Architecture and Algorithm Documentation for Elevator Simulation Project

System Architecture:

Overview -

The Elevator Simulation System is designed as a modular TypeScript application that simulates the operations of multiple elevators in a building. The system employs Object-Oriented Programming (OOP) principles to structure its functionality through several distinct classes each responsible for different aspects of the simulation.

Key Components -

Building: Manages the overall structure, including arrays of floors and elevators, and binding them to the building element as child element.
Responsible for finding the nearest elevator for a chosen floor.

Elevator: Handles the logic for elevator movement, calculate the arrival time to a chosen floor

Floor: Represents individual floors within the building, capable of sending elevator requests via call buttons.
responsible for showing a timer once elevator is called, and reset the timer when elevator arrive to floor.

CallButton: Integrated into floors and used to issue requests for elevators.

ElevatorFactory: Implements a factory pattern to create instances of Elevator, abstracting the creation logic and allowing for easy scaling and modification.

Main Algorithm: Finding the nearest elevator for the chosen floor.
Efficiency Considerations - The algorithm prioritizes the nearest(in time) elevator to reduce wait times.

Algorithm Description -

Event Trigger: When a user presses a call button on a floor, the CallButton class triggers an event.
The Building class receives this event and calls its findNearestAvailableElevator method which locates the nearest available elevator to respond to a floor's call using a systematic approach:

Arrival time calculation: Assess the current position and existing destinations of each elevator to compute the travel time based on distance and remaining tasks, the elevator with the minimum arrival time to the chosen floor will be called.
