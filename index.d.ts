declare namespace fipe {
  type VehicleType = 'cars' | 'motorcycles' | 'trucks'

  interface VehicleTypeEnum {
    CARS: 'cars'
    MOTORCYCLES: 'motorcycles'
    TRUCKS: 'trucks'
  }

  interface FipeOptions {
    /** Reference month code (see `fetchReferences`). Defaults to the latest table on the server. */
    reference?: number
    /** Subscription token sent as `X-Subscription-Token` to raise the rate limit. */
    token?: string
  }

  interface Reference {
    code: string
    month: string
  }

  interface VehicleBrand {
    code: string
    name: string
  }

  interface VehicleModel {
    code: string
    name: string
  }

  interface VehicleYear {
    code: string
    name: string
  }

  interface PriceHistory {
    month: string
    price: string
    reference: string
  }

  interface VehicleDetail {
    brand: string
    model: string
    codeFipe: string
    fuel: string
    fuelAcronym: string
    modelYear: number
    price: string
    referenceMonth: string
    vehicleType: number
    priceHistory?: PriceHistory[]
  }

  interface FipePromiseError {
    name: 'FipePromiseError'
    message?: string
    type?: string
    errors?: unknown[]
  }
}

declare const fipe: {
  vehicleType: fipe.VehicleTypeEnum

  fetchBrands(type: fipe.VehicleType, options?: fipe.FipeOptions): Promise<fipe.VehicleBrand[]>
  fetchModels(type: fipe.VehicleType, brandId: number | string, options?: fipe.FipeOptions): Promise<fipe.VehicleModel[]>
  fetchYears(type: fipe.VehicleType, brandId: number | string, modelId: number | string, options?: fipe.FipeOptions): Promise<fipe.VehicleYear[]>
  fetchDetail(type: fipe.VehicleType, brandId: number | string, modelId: number | string, yearId: string, options?: fipe.FipeOptions): Promise<fipe.VehicleDetail>

  fetchReferences(options?: fipe.FipeOptions): Promise<fipe.Reference[]>
  fetchYearsByFipeCode(type: fipe.VehicleType, fipeCode: string, options?: fipe.FipeOptions): Promise<fipe.VehicleYear[]>
  fetchDetailByFipeCode(type: fipe.VehicleType, fipeCode: string, yearId: string, options?: fipe.FipeOptions): Promise<fipe.VehicleDetail>
  fetchPriceHistory(type: fipe.VehicleType, fipeCode: string, yearId: string, options?: fipe.FipeOptions): Promise<fipe.VehicleDetail>
}

export = fipe
