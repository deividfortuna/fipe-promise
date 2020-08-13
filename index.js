const fipe = require('./dist/fipe-promise')

fipe.fetchBrands(fipe.vehicleType.CARS).then(console.log)
fipe.fetchModels(fipe.vehicleType.CARS, 59).then(console.log)
fipe.fetchYears(fipe.vehicleType.CARS, 59, 5940).then(console.log)
fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940, '2014-3').then(console.log)
