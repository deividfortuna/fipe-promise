<p align="center">
  <img src="https://raw.githubusercontent.com/deividfortuna/fipe-promise/feature/readme/content/icon.svg" width="400">
</p>

<h1 align="center">FIPE Promise</h1>

<p align="center">
  <a href="https://npm-stat.com/charts.html?package=fipe-promise">
    <img src="https://img.shields.io/npm/dm/fipe-promise.svg">
  </a>
  <a href="https://coveralls.io/github/deividfortuna/fipe-promise?branch=master">
    <img src="https://coveralls.io/repos/github/deividfortuna/fipe-promise/badge.svg?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/fipe-promise">
    <img src="https://badge.fury.io/js/fipe-promise.svg">
  </a>
  <a href="http://standardjs.com/">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
  </a>
  <a href="https://snyk.io/test/github/deividfortuna/fipe-promise">
    <img src="https://snyk.io/test/github/deividfortuna/fipe-promise/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/deividfortuna/fipe-promise" style="max-width:100%;">
  </a>
</p>

<p align="center">
  Busca por preços médios de veículos no mercado nacional utizando a Tabela Fipe disponíveis no site oficial. (Node.js e Browser)
</p>

### Instalação

#### Browser usando CDN
```
<script src="https://cdn.jsdelivr.net/npm/fipe-promise/dist/fipe-promise.min.js"></script>
```

#### npm

```
$ npm install --save fipe-promise
```

#### Bower

```
$ bower install --save deividfortuna/fipe-promise
```
#### yarn

```
$ yarn add fipe-promise
```

#### Angular 2+

``` ts
import * as fipe from 'fipe-promise'

fipe.fetchBrands(fipe.vehicleType.CARS)
  .then(console.log)
```

