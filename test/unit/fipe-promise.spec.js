import chai from 'chai';
import nock from 'nock';

import fipe from '../../src/fipe';
import { types } from '../../src/fipe';

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
    });
  });

  describe('when brands method is called for cars', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas')
        .reply(200, []);

      const brands = fipeCars.fetchBrands();

      expect(brands.then).to.be.a('function');
      expect(brands.catch).to.be.a('function');
    });
  });

  describe('when models method is called for a specific brand', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/59/modelos')
        .reply(200, []);

      const modelsPromise = fipeCars.fetchModels(59);

      expect(modelsPromise.then).to.be.a('function');
      expect(modelsPromise.catch).to.be.a('function');
    });

    it('should throw an exception if brand is missing', () => {
      expect(() => fipeCars.fetchModels()).to.throw('brandId is required');
    });
  });

  describe('when years method is called for a specific model', () => {
    it('should throw an exception if brand is missing', () => {
      expect(() => fipeCars.fetchYears()).to.throw('brandId is required');
    });

    it('should throw an exception if model is missing', () => {
      expect(() => fipeCars.fetchYears(59)).to.throw('modelId is required');
    });

    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/59/modelos/5940/anos')
        .reply(200, []);

      const yearsPromise = fipeCars.fetchYears(59, 5940);

      expect(yearsPromise.then).to.be.a('function');
      expect(yearsPromise.catch).to.be.a('function');
    });
  });
});
