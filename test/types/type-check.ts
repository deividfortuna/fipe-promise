// Compile-time only: verifies index.d.ts matches expected usage shapes.
// Run with: npx -p typescript tsc --noEmit --strict --esModuleInterop test/types/type-check.ts

import fipe = require('../../index')
import fipeDefault from '../../index'
import * as fipeNs from '../../index'

// default / namespace imports resolve to the same runtime value
const check1: typeof fipe = fipeDefault
const check2: typeof fipe = fipeNs
void check1
void check2

// vehicleType enum
const carsType: fipe.VehicleType = fipe.vehicleType.CARS
const motosType: fipe.VehicleType = fipe.vehicleType.MOTORCYCLES
const trucksType: fipe.VehicleType = fipe.vehicleType.TRUCKS
void carsType; void motosType; void trucksType

// each method returns the documented shape
const brands: Promise<fipe.VehicleBrand[]> = fipe.fetchBrands(fipe.vehicleType.CARS)
const models: Promise<fipe.VehicleModel[]> = fipe.fetchModels(fipe.vehicleType.CARS, 59)
const years: Promise<fipe.VehicleYear[]> = fipe.fetchYears(fipe.vehicleType.CARS, 59, 5940)
const detail: Promise<fipe.VehicleDetail> = fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940, '2014-3')
const refs: Promise<fipe.Reference[]> = fipe.fetchReferences()
const codeYears: Promise<fipe.VehicleYear[]> = fipe.fetchYearsByFipeCode(fipe.vehicleType.CARS, '004278-1')
const codeDetail: Promise<fipe.VehicleDetail> = fipe.fetchDetailByFipeCode(fipe.vehicleType.CARS, '004278-1', '2014-3')
const history: Promise<fipe.VehicleDetail> = fipe.fetchPriceHistory(fipe.vehicleType.CARS, '004278-1', '2014-3')

void brands; void models; void years; void detail
void refs; void codeYears; void codeDetail; void history

// options forwarding
fipe.fetchBrands(fipe.vehicleType.CARS, { reference: 278 })
fipe.fetchBrands(fipe.vehicleType.CARS, { token: 't' })
fipe.fetchBrands(fipe.vehicleType.CARS, { reference: 278, token: 't' })

// consumer-side usage of a result
detail.then((d) => {
  const price: string = d.price
  const codeFipe: string = d.codeFipe
  const history: fipe.PriceHistory[] | undefined = d.priceHistory
  void price; void codeFipe; void history
})
