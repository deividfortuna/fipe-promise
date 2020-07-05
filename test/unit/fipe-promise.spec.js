const chai = require('chai');
const fipe = require('../../src/fipe');

const expect = chai.expect;

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipe.fetchMarcas).to.be.a('function');
    });
  });
});