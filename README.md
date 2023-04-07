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

## Instalação

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

## Uso

#### Consultar marcas

Para consultar as marcas disponíveis para um determinado tipo de veículo, utilize o método fetchBrands. O método recebe um parâmetro obrigatório: o tipo de veículo (carros, motos ou caminhões). Exemplo:

```js
fipe
  .fetchBrands(fipe.vehicleType.CARS)
  .then((brands) => {
    // Faça algo com o array de marcas retornado
  })
  .catch((error) => {
    // Lide com o erro aqui
  });
```

#### Consultar modelos

Para consultar os modelos disponíveis para uma determinada marca, utilize o método fetchModels. O método recebe dois parâmetros obrigatórios: o tipo de veículo e o identificador da marca. Exemplo:

```js
fipe
  .fetchModels(fipe.vehicleType.CARS, 21)
  .then((models) => {
    // Faça algo com o array de modelos retornado
  })
  .catch((error) => {
    // Lide com o erro aqui
  });
```

#### Consultar anos pelos modelos

Para consultar os anos pelos modelos disponíveis, utilize o método fetchYears. O método recebe três parâmetros obrigatórios: o tipo de veículo, o identificador da marca e o identificador do modelo. Exemplo:

```js
fipe
  .fetchYears(fipe.vehicleType.CARS, 21, 4828)
  .then((years) => {
    // Faça algo com o array de anos/modelos retornado
  })
  .catch((error) => {
    // Lide com o erro aqui
  });
```

#### Consultar detalhes

Para consultar os detalhes de um determinado veículo (preço médio, código FIPE, marca, modelo e ano/modelo), utilize o método fetchDetail. O método recebe quatro parâmetros obrigatórios: o tipo de veículo, o identificador da marca, o identificador do modelo e o ano/modelo no formato "yyyy-X". Exemplo:

```js
fipe
  .fetchDetail(fipe.vehicleType.CARS, 21, 4828, "2015-1")
  .then((detail) => {
    // Faça algo com o objeto de detalhes retornado
  })
  .catch((error) => {
    // Lide com o erro aqui
  });
```

#### Exemplo Angular 2+

```ts
import * as fipe from "fipe-promise";

fipe.fetchBrands(fipe.vehicleType.CARS).then(console.log);
```

## Contribuição

Contribuições são sempre bem-vindas! Se você encontrar um bug ou tiver uma ideia para uma nova funcionalidade, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT.
