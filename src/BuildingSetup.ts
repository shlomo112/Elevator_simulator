import { Building } from "./Building";

export class BuildingSetup {
    buildings:Building[] = [];

    newBuildingConfig() {
        const floorsNumber = parseInt(prompt('Enter floors number:') || '0')
        const elevatorsNumber = parseInt(prompt('Enter elevators number:') || '0')
        if(floorsNumber > 0 && elevatorsNumber > 0) {
            this.addBuilding(floorsNumber, elevatorsNumber)
        } else {
            alert('Both inputs should be greater then zero')
        }
    }
    addBuilding(floorsNumber:number, elevatorsNumber:number) {
        const building = new Building(floorsNumber, elevatorsNumber);
        this.buildings.push(building);
    }
}