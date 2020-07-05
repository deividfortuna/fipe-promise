const chai = require('chai');
const nock = require('nock');

const fipe = require('../../src/fipe');

const expect = chai.expect;

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipe.fetchMarcas).to.be.a('function');
      expect(fipe.fetchModelos).to.be.a('function');
      expect(fipe.fetchAnos).to.be.a('function');
      expect(fipe.fetchDetalhes).to.be.a('function');
    });

    it('should have the right types', () => {
      expect(fipe.types.CAMINHOES).to.be.eq('caminhoes');
      expect(fipe.types.CARROS).to.be.eq('carros');
      expect(fipe.types.MOTOS).to.be.eq('motos');
    })
  });

  describe('when marcas called with a default type', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas')
        .reply(200, []);

      const marcas = fipe.fetchMarcas()

      expect(marcas.then).to.be.a('function');
      expect(marcas.catch).to.be.a('function');
    });
  });
});