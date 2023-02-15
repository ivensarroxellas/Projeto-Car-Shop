import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarsService';
// AUXÍLIO MIGUEL INÁCIO
describe('Ao tentar', function () {
  describe('criar um carro', function () {
    it('deve retornar informações do carro criado', async function () {
      const carResultMock = {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const carInputMock = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'create').resolves(carResultMock);

      const service = new CarService();
      const result = await service.create(carInputMock);

      expect(result).to.deep.equal(carResultMock);

      sinon.restore();
    });
  });
  describe('Acessa carros', function () {
    const allCarsMock = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.999,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 17.200,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    it('Retorna carros com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(allCarsMock);

      const service = new CarService();
      const result = await service.getAll();

      expect(result).to.deep.equal(allCarsMock);

      sinon.restore();
    });

    it('Retorna carro através do ID', async function () {
      sinon.stub(Model, 'findOne').resolves(allCarsMock[0]);

      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea2f');

      expect(result).to.deep.equal(allCarsMock[0]);

      sinon.restore();
    });

    it('Verifica se carro carro não exista, retorna NOT FOUND', async function () {
      sinon.stub(Model, 'findOne').resolves({});

      try {
        const service = new CarService();
        await service.getById('634852326b35b59438fbea2f');
      } catch (error) {
        expect(error).to.be.equal('Car not found');
      }

      sinon.restore();
    });
  });
});
