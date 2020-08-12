import chai from 'chai'
import nock from 'nock'

import fipe from '../../src/fipe'

const expect = chai.expect

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipe.fetchBrands).to.be.a('function')
      expect(fipe.fetchModels).to.be.a('function')
      expect(fipe.fetchYears).to.be.a('function')
      expect(fipe.fetchDetail).to.be.a('function')
    })

    it('should have the right types', () => {
      expect(fipe.vehicleType.TRUCKS).to.be.eq('caminhoes')
      expect(fipe.vehicleType.CARS).to.be.eq('carros')
      expect(fipe.vehicleType.MOTORCYCLES).to.be.eq('motos')
    })
  })

  describe('when brands method is called for cars', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchBrands()).to.throw('vehicleType is required')
    })
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas')
        .reply(200, [])

      const brands = fipe.fetchBrands(fipe.vehicleType.CARS)

      expect(brands.then).to.be.a('function')
      expect(brands.catch).to.be.a('function')
    })
  })

  describe('when models method is called for a specific brand', () => {
    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/59/modelos')
        .reply(200, [])

      const modelsPromise = fipe.fetchModels(fipe.vehicleType.CARS, 59)

      expect(modelsPromise.then).to.be.a('function')
      expect(modelsPromise.catch).to.be.a('function')
    })

    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchModels()).to.throw('vehicleType is required')
    })

    it('should throw an exception if brand is missing', () => {
      expect(() => fipe.fetchModels(fipe.vehicleType.CARS)).to.throw('brandId is required')
    })
  })

  describe('when years method is called for a specific model', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchYears()).to.throw('vehicleType is required')
    })

    it('should throw an exception if brand is missing', () => {
      expect(() => fipe.fetchYears(fipe.vehicleType.CARS)).to.throw('brandId is required')
    })

    it('should throw an exception if model is missing', () => {
      expect(() => fipe.fetchYears(fipe.vehicleType.CARS, 59)).to.throw('modelId is required')
    })

    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/59/modelos/5940/anos')
        .reply(200, [])

      const yearsPromise = fipe.fetchYears(fipe.vehicleType.CARS, 59, 5940)

      expect(yearsPromise.then).to.be.a('function')
      expect(yearsPromise.catch).to.be.a('function')
    })
  })

  describe('when details method is called for a vehicleType', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchDetail()).to.throw('vehicleType is required')
    })

    it('should throw an exception if brand is missing', () => {
      expect(() => fipe.fetchDetail(fipe.vehicleType.CARS)).to.throw('brandId is required')
    })

    it('should throw an exception if model is missing', () => {
      expect(() => fipe.fetchDetail(fipe.vehicleType.CARS, 59)).to.throw('modelId is required')
    })

    it('should throw an exception if year is missing', () => {
      expect(() => fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940)).to.throw('yearId is required')
    })

    it('should return a promise', () => {
      nock('https://parallelum.com.br')
        .get('/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3')
        .reply(200, [])

      const yearsPromise = fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940, '2014-3')

      expect(yearsPromise.then).to.be.a('function')
      expect(yearsPromise.catch).to.be.a('function')
    })
  })
})
