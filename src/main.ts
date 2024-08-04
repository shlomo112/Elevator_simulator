import { BuildingSetup } from './BuildingSetup';
import buildingConfig from '../config/buildingConfig.json'

class InitializeSystem {
  buildingSetup: BuildingSetup;

  constructor() {
    this.buildingSetup = new BuildingSetup;
  }

  // Initialize elevator simulation system from config file and 'addButton' for new building
  initialize() {
    const addButton = document.getElementById('add-button');
    addButton?.addEventListener('click', this.buildingSetup.newBuildingConfig.bind(this.buildingSetup));
    this.addFirstBuilding();
  }

  // Add building from config file
  addFirstBuilding() {
    buildingConfig.buildings.forEach((buildingConfig: {floorsNumber:number, elevatorsNumber:number}) => {
      this.buildingSetup.addBuilding(buildingConfig.floorsNumber, buildingConfig.elevatorsNumber)
    })
  }
}

const initializeSystem =  new InitializeSystem();
initializeSystem.initialize();