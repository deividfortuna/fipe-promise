import chai from 'chai'
import nock from 'nock'

import fipe from '../../src/fipe'

const expect = chai.expect

const API_HOST = 'https://fipe.parallelum.com.br'
const API_BASE = '/api/v2'

describe('fipe', () => {
  describe('when imported', () => {
    it('should have the basic functions', () => {
      expect(fipe.fetchBrands).to.be.a('function')
      expect(fipe.fetchModels).to.be.a('function')
      expect(fipe.fetchYears).to.be.a('function')
      expect(fipe.fetchDetail).to.be.a('function')
      expect(fipe.fetchReferences).to.be.a('function')
      expect(fipe.fetchYearsByFipeCode).to.be.a('function')
      expect(fipe.fetchDetailByFipeCode).to.be.a('function')
      expect(fipe.fetchPriceHistory).to.be.a('function')
    })

    it('should have the right types', () => {
      expect(fipe.vehicleType.TRUCKS).to.be.eq('trucks')
      expect(fipe.vehicleType.CARS).to.be.eq('cars')
      expect(fipe.vehicleType.MOTORCYCLES).to.be.eq('motorcycles')
    })
  })

  describe('when brands method is called for cars', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchBrands()).to.throw('vehicleType is required')
    })
    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/cars/brands`)
        .reply(200, [])

      const brands = fipe.fetchBrands(fipe.vehicleType.CARS)

      expect(brands.then).to.be.a('function')
      expect(brands.catch).to.be.a('function')
    })
  })

  describe('when models method is called for a specific brand', () => {
    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/cars/brands/59/models`)
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

    it('should resolve with the flat array returned by v2', () => {
      const payload = [{ code: '1', name: 'Model A' }]
      nock(API_HOST)
        .get(`${API_BASE}/cars/brands/59/models`)
        .reply(200, payload)

      return fipe.fetchModels(fipe.vehicleType.CARS, 59).then((models) => {
        expect(models).to.deep.equal(payload)
      })
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
      nock(API_HOST)
        .get(`${API_BASE}/cars/brands/59/models/5940/years`)
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
      nock(API_HOST)
        .get(`${API_BASE}/cars/brands/59/models/5940/years/2014-3`)
        .reply(200, {})

      const detailPromise = fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940, '2014-3')

      expect(detailPromise.then).to.be.a('function')
      expect(detailPromise.catch).to.be.a('function')
    })
  })

  describe('when fetchReferences is called', () => {
    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/references`)
        .reply(200, [])

      const referencesPromise = fipe.fetchReferences()

      expect(referencesPromise.then).to.be.a('function')
      expect(referencesPromise.catch).to.be.a('function')
    })

    it('should resolve with the reference list', () => {
      const payload = [{ code: '278', month: 'abril de 2024' }]
      nock(API_HOST)
        .get(`${API_BASE}/references`)
        .reply(200, payload)

      return fipe.fetchReferences().then((references) => {
        expect(references).to.deep.equal(payload)
      })
    })
  })

  describe('when fetchYearsByFipeCode is called', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchYearsByFipeCode()).to.throw('vehicleType is required')
    })

    it('should throw an exception if fipeCode is missing', () => {
      expect(() => fipe.fetchYearsByFipeCode(fipe.vehicleType.CARS)).to.throw('fipeCode is required')
    })

    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/cars/004278-1/years`)
        .reply(200, [])

      const yearsPromise = fipe.fetchYearsByFipeCode(fipe.vehicleType.CARS, '004278-1')

      expect(yearsPromise.then).to.be.a('function')
      expect(yearsPromise.catch).to.be.a('function')
    })
  })

  describe('when fetchDetailByFipeCode is called', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchDetailByFipeCode()).to.throw('vehicleType is required')
    })

    it('should throw an exception if fipeCode is missing', () => {
      expect(() => fipe.fetchDetailByFipeCode(fipe.vehicleType.CARS)).to.throw('fipeCode is required')
    })

    it('should throw an exception if year is missing', () => {
      expect(() => fipe.fetchDetailByFipeCode(fipe.vehicleType.CARS, '004278-1')).to.throw('yearId is required')
    })

    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/cars/004278-1/years/2014-3`)
        .reply(200, {})

      const detailPromise = fipe.fetchDetailByFipeCode(fipe.vehicleType.CARS, '004278-1', '2014-3')

      expect(detailPromise.then).to.be.a('function')
      expect(detailPromise.catch).to.be.a('function')
    })
  })

  describe('when fetchPriceHistory is called', () => {
    it('should throw an exception if type is missing', () => {
      expect(() => fipe.fetchPriceHistory()).to.throw('vehicleType is required')
    })

    it('should throw an exception if fipeCode is missing', () => {
      expect(() => fipe.fetchPriceHistory(fipe.vehicleType.CARS)).to.throw('fipeCode is required')
    })

    it('should throw an exception if year is missing', () => {
      expect(() => fipe.fetchPriceHistory(fipe.vehicleType.CARS, '004278-1')).to.throw('yearId is required')
    })

    it('should return a promise', () => {
      nock(API_HOST)
        .get(`${API_BASE}/cars/004278-1/years/2014-3/history`)
        .reply(200, { priceHistory: [] })

      const historyPromise = fipe.fetchPriceHistory(fipe.vehicleType.CARS, '004278-1', '2014-3')

      expect(historyPromise.then).to.be.a('function')
      expect(historyPromise.catch).to.be.a('function')
    })
  })

  describe('when options are provided', () => {
    it('should append the reference query parameter', () => {
      const scope = nock(API_HOST)
        .get(`${API_BASE}/cars/brands`)
        .query({ reference: 280 })
        .reply(200, [])

      return fipe.fetchBrands(fipe.vehicleType.CARS, { reference: 280 }).then(() => {
        expect(scope.isDone()).to.equal(true)
      })
    })

    it('should send the X-Subscription-Token header', () => {
      const scope = nock(API_HOST, {
        reqheaders: { 'X-Subscription-Token': 'my-token' }
      })
        .get(`${API_BASE}/cars/brands`)
        .reply(200, [])

      return fipe.fetchBrands(fipe.vehicleType.CARS, { token: 'my-token' }).then(() => {
        expect(scope.isDone()).to.equal(true)
      })
    })
  })
})
