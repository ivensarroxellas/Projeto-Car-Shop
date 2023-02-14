import { Router } from 'express';
import MotorController from '../Controllers/MotorsController';

const routes = Router();

routes.post('/', (req, res, next) => new MotorController(req, res, next).create());

export default routes;