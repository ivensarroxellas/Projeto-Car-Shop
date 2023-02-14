import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';

class MotorsService {
  private createMotor(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    
    return this.createMotor(newMotorcycle);
  }

  public async getAll(): Promise<(Motorcycle | null)[]> {
    const motorODM = new MotorcycleODM();
    const getAll = await motorODM.getAll();
    
    return getAll.map((motor) => this.createMotor(motor));
  }

  public async getById(id: string) {
    const motorODM = new MotorcycleODM();
    const motorById = await motorODM.getById(id);

    if (motorById === false) {
      return false;
    } 
    return this.createMotor(motorById as IMotorcycle);
  }
}

export default MotorsService;