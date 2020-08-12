const fipe = require('./dist/fipe-promise');

fipe.fetchBrands(fipe.vehicleType.CARS).then(result => console.log(result));
fipe.fetchModels(fipe.vehicleType.CARS, 59).then(result => console.log(result));
fipe.fetchYears(fipe.vehicleType.CARS, 59, 5940).then(result => console.log(result));
fipe.fetchDetail(fipe.vehicleType.CARS, 59, 5940, '2014-3').then(result => console.log(result));
