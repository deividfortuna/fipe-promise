import fipe from './src/fipe';
import types from './src/vehicle-types';


const fipeCars = fipe(types.CARS)

// fipeCars.fetchBrands().then(result => console.log(result));
// fipeCars.fetchModels(59).then(result => console.log(result));
// fipeCars.fetchYears(59, 5940).then(result => console.log(result));
fipeCars.fetchDetail(59, 5940, '2014-3').then(result => console.log(result));
