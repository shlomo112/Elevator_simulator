import { BuildingSetup } from './BuildingSetup';
import buildingConfig from '../config/buildingConfig.json'

class InitializeSystem {
  buildingSetup: BuildingSetup;

  constructor() {
    this.buildingSetup = new BuildingSetup;
  }

  initialize() {
    const addButton = document.getElementById('add-button');
    addButton?.addEventListener('click', this.buildingSetup.newBuildingConfig.bind(this.buildingSetup));
    this.addFirstBuilding();
  }

  addFirstBuilding() {
    buildingConfig.buildings.forEach((buildingConfig: {floorsNumber:number, elevatorsNumber:number}) => {
      this.buildingSetup.addBuilding(buildingConfig.floorsNumber, buildingConfig.elevatorsNumber)
    })
  }
}

const initializeSystem =  new InitializeSystem();
initializeSystem.initialize();







// document.addEventListener('DOMContentLoaded', () => {
//   config.forEach((buildingConfig) => {
//     new Building(buildingConfig.numberOfFloors, buildingConfig.numberOfElevator);
// });
// });
