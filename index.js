import fipe from './src/fipe';
import { types } from './src/fipe';

const fipeCars = fipe(types.CARS)

// fipeCars.fetchBrands().then(result => console.log(result));
// fipeCars.fetchModels(59).then(result => console.log(result));
// fipeCars.fetchYears(59, 5940).then(result => console.log(result));
