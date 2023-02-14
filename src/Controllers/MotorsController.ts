import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorsService from '../Services/MotorsService';

class MotorsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorsService();
  }

  public async create() {
    if (!this.req.body.status) this.req.body.status = false;
    const motor: IMotorcycle = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotor = await this.service.create(motor);
      return this.res.status(201).json(newMotor);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motors = await this.service.getAll();
      return this.res.status(200).json(motors);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const motor = await this.service.getById(id);
      if (motor === false) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      if (!motor) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motor);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorsController;