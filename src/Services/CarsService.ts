import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

class CarsService {
  private createCar(car: ICar): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCar(newCar);
  }

  public async getAll(): Promise<(Car | null)[]> {
    const carODM = new CarODM();
    const getAll = await carODM.getAll();
    
    return getAll.map((car) => this.createCar(car));
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const carById = await carODM.getById(id);

    if (carById === false) {
      return false;
    } 
    return this.createCar(carById as ICar);
  }

  public async updatebyId(id:string, car:ICar) {
    const carODM = new CarODM();
    const carUpdated = await carODM.updateById(id, car);
    if (carUpdated === false) {
      return false;
    } 
    if (carUpdated === null) {
      return null;
    }
    return this.createCar(carUpdated as ICar);
  }
}

export default CarsService;