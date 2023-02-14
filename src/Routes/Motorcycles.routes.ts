import { Router } from 'express';
import MotorController from '../Controllers/MotorsController';

const routes = Router();

routes.post('/', (req, res, next) => new MotorController(req, res, next).create());
routes.get('/', (req, res, next) => new MotorController(req, res, next).getAll());
routes.get('/:id', (req, res, next) => new MotorController(req, res, next).getById());

export default routes;