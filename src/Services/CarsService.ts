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
    console.log('retorno da model getAll', getAll);
    
    const result = getAll.map((car) => this.createCar(car));

    return result;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    console.log('retorno da model getByID', this.getById);

    if (car === false) {
      return false;
    } 
    const carCreated = this.createCar(car as ICar);
    return carCreated;
  }
}

export default CarsService;