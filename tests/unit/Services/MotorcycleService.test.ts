import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorService from '../../../src/Services/MotorsService';
// AUXÍLIO MIGUEL INÁCIO
describe('Ao tentar', function () {
  const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
  describe('Cria um carro no banco de dados', function () {
    it('retorna informações sobre o carro cadastrado', async function () {
      const bikeResultMock = {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const bikeInputMock = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'create').resolves(bikeResultMock);

      const service = new MotorService();
      const result = await service.create(bikeInputMock);

      expect(result).to.deep.equal(bikeResultMock);

      sinon.restore();
    });
  });
  describe('Consultar carros', function () {
    const allMotorsMock = [
      {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 650f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '6348513f34c397abcad040b3',
        model: 'Honda Cb 600f',
        year: 2006,
        color: 'Red',
        status: true,
        buyValue: 33.000,
        category: 'Street',
        engineCapacity: 620,
      },
    ];
    it('Retorna motos com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(allMotorsMock);

      const service = new MotorService();
      const result = await service.getAll();

      expect(result).to.deep.equal(allMotorsMock);

      sinon.restore();
    });

    it('Retorna moto através do ID', async function () {
      sinon.stub(Model, 'findOne').resolves(allMotorsMock[0]);

      const service = new MotorService();
      const result = await service.getById('634852326b35b59438fbea2f');

      expect(result).to.deep.equal(allMotorsMock[0]);

      sinon.restore();
    });

    it('Verifica se carro moto não exista, retorna NOT FOUND', async function () {
      sinon.stub(Model, 'findOne').resolves({});

      try {
        const service = new MotorService();
        await service.getById('634852326b35b59438fbea2f');
      } catch (error) {
        expect(error).to.be.equal(MOTORCYCLE_NOT_FOUND);
      }

      sinon.restore();
    });
  });
});
