import chai from 'chai';
import nock from 'nock';

import fipe from '../../src/fipe';

const fipeCars = fipe();
const expect = chai.expect;

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipeCars.fetchBrands).to.be.a('function');
      expect(fipeCars.fetchModels).to.be.a('function');
      expect(fipeCars.fetchYears).to.be.a('function');
      expect(fipeCars.fetchDetail).to.be.a('function');
    });

    it('should have the right types', () => {
      expect(types.TRUCKS).to.be.eq('caminhoes');
      expect(types.CARS).to.be.eq('carros');
      expect(types.MOTORCYCLES).to.be.eq('motos');
    })
  });

  describe('when brands is called for cars', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas')
        .reply(200, []);

      const brands = fipeCars.fetchBrands();

      expect(brands.then).to.be.a('function');
      expect(brands.catch).to.be.a('function');
    });
  });

  describe('when mode is called for a specific brand', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/22/modelos')
        .reply(200, []);

      const brand = 22;
      const models = fipeCars.fetchModels(brand);

      expect(models.then).to.be.a('function');
      expect(models.catch).to.be.a('function');
    });
  });
});
