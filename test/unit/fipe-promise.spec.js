const chai = require('chai');
const nock = require('nock');

const fipe = require('../../src/fipe');

const expect = chai.expect;

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipe.fetchBrands).to.be.a('function');
      expect(fipe.fetchModels).to.be.a('function');
      expect(fipe.fetchYears).to.be.a('function');
      expect(fipe.fetchDetail).to.be.a('function');
    });

    it('should have the right types', () => {
      expect(fipe.types.TRUCKS).to.be.eq('caminhoes');
      expect(fipe.types.CARS).to.be.eq('carros');
      expect(fipe.types.MOTORCYCLES).to.be.eq('motos');
    })
  });

  describe('when brands called with a default type', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas')
        .reply(200, []);

      const marcas = fipe.fetchBrands()

      expect(marcas.then).to.be.a('function');
      expect(marcas.catch).to.be.a('function');
    });
  });
});