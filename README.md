# 🛍 Shopware API Client

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Node.js module to interact with the Shopware REST API.

```bash
yarn add shopware-api-client -S
```

## Examples
Examples how to use the package

### ES2015

```javascript
import Shopware from 'shopware-api-client'

const api = new Shopware({
    host: 'YOUR HOST',
    user: 'YOUR USER',
    apiKey: 'YOUR APIKEY'
})

let articles

try {
  articles = await api.getArticles()
} catch (err) {
  console.log(error)
}

console.log(articles)
```

### Older ES 😔

```javascript
const Shopware = require('shopware-api-client')
const api = new Shopwarware({
  host: 'YOUR HOST',
  user: 'YOUR USER',
  apiKey: 'YOUR APIKEY'
})

shop.getArticles()
  .then(articles => console.log(articles))
  .catch(err => console.log(err))

```

## API Reference

- Shopware
  - new Shopware([object])
  - .getArticles([callback]) 🔀 `Promise`
  - .getArticle(id, [callback]) 🔀 `Promise`
  - .deleteArticle(id, [callback]) 🔀 `Promise`
  - .deleteArticles(ids, [callback]) 🔀 `Promise`
  - .createArticle(article, [callback]) 🔀 `Promise`
  - .updateArticles(article, [callback]) 🔀 `Promise`
