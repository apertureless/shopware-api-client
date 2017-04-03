# 🛍 Shopware API Client

[![npm version](https://badge.fury.io/js/shopware-api-client.svg)](https://badge.fury.io/js/shopware-api-client)
[![Build Status](https://travis-ci.org/apertureless/shopware-api-client.svg?branch=master)](https://travis-ci.org/apertureless/shopware-api-client)
[![codecov](https://codecov.io/gh/apertureless/shopware-api-client/branch/master/graph/badge.svg)](https://codecov.io/gh/apertureless/shopware-api-client)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/apertureless/shopware-api-client/blob/master/LICENSE.txt)

Node.js module to interact with the [Shopware REST API](https://shopware.com/).

```bash
yarn add shopware-api-client
```

## Examples
Examples how to use the package:

### ES2015

```javascript
import Shopware from 'shopware-api-client'

const shop = new Shopware({
    host: 'YOUR HOST',
    user: 'YOUR USER',
    apiKey: 'YOUR APIKEY'
})

let articles

try {
  articles = await shop.getArticles()
} catch (err) {
  console.log(error)
}

console.log(articles)
```

### Older ES 😔

```javascript
const Shopware = require('shopware-api-client')
const shop = new Shopware({
  host: 'YOUR HOST',
  user: 'YOUR USER',
  apiKey: 'YOUR APIKEY'
})

shop.getArticles()
  .then(articles => console.log(articles))
  .catch(err => console.log(err))

```

## Docs
Find the [docs here](https://apertureless.github.io/shopware-api-client/#/) *contributions welcome*

## Implemented API Resources

- [x] `/api/addresses`
- [x] `/api/articles`
- [x] `/api/caches`
- [x] `/api/categories`
- [x] `/api/countries`
- [x] `/api/customerGroups`
- [x] `/api/customers`
- [x] `/api/generateArticleImages`
- [x] `/api/media`
- [x] `/api/manufacturers`
- [x] `/api/orders`
- [x] `/api/propertyGroups`
- [x] `/api/shops`
- [x] `/api/translations`
- [x] `/api/variants`
- [x] `/api/version`


## API Reference

- Shopware
  - [new Shopware([object])](#new_shopware)
  - [.version([callback])](#version) 🔀 `Promise`
  - [.getArticles([callback])](#getArticles) 🔀 `Promise`
  - [.getArticle(id, [callback])](#getArticle) 🔀 `Promise`
  - [.deleteArticle(id, [callback])](#deleteArticle) 🔀 `Promise`
  - [.deleteArticles(ids, [callback])](#deleteArticles) 🔀 `Promise`
  - [.createArticle(article, [callback])](#createArticle) 🔀 `Promise`
  - [.updateArticle(id, article, [callback])](#updateArticle) 🔀 `Promise`
  - .updateArticles(articles, [callback]) 🔀 `Promise`
  - .getCategories([callback]) 🔀 `Promise`
  - .getCategory(id, [callback]) 🔀 `Promise`
  - .createCategory(category, [callback]) 🔀 `Promise`
  - .updateCategory(id, category, [callback]) 🔀 `Promise`
  - .deleteCategory(id, [callback]) 🔀 `Promise`
  - .getVariants([callback]) 🔀 `Promise`
  - .getVariants([callback]) 🔀 `Promise`
  - .getVariant(id, [callback]) 🔀 `Promise`
  - .updateVariant(id, body, [callback]) 🔀 `Promise`
  - .createVariant(body, [callback]) 🔀 `Promise`
  - .deleteVariant(id, [callback]) 🔀 `Promise`
  - .deleteVariants(ids, [callback]) 🔀 `Promise`
  - .generateArticleImages(articleId, [callback]) 🔀 `Promise`
  - .listMedia([callback]) 🔀 `Promise`
  - .getMedia(id, [callback]) 🔀 `Promise`
  - .createMedia(body, [callback]) 🔀 `Promise`
  - .deleteMedia(id, [callback]) 🔀 `Promise`
  - .getOrders([callback]) 🔀 `Promise`
  - .getOrder(id, [callback]) 🔀 `Promise`
  - .updateOrder(id, body, [callback]) 🔀 `Promise`
  - .getAddresses([callback]) 🔀 `Promise`
  - .getAddress(id, [callback]) 🔀 `Promise`
  - .createAddress(body, [callback]) 🔀 `Promise`
  - .updateAddress(id, body, [callback]) 🔀 `Promise`
  - .deleteAddress(id, [callback]) 🔀 `Promise`
  - .getCustomers([callback]) 🔀 `Promise`
  - .getCustomer(id, [callback]) 🔀 `Promise`
  - .createCustomer(body, [callback]) 🔀 `Promise`
  - .updateCustomer(id, body, [callback]) 🔀 `Promise`
  - .deleteCustomer(id, [callback]) 🔀 `Promise`
  - .getCaches([callback]) 🔀 `Promise`
  - .getCache(id, [callback]) 🔀 `Promise`
  - .deleteCache(id, [callback]) 🔀 `Promise`
  - .deleteCaches([callback]) 🔀 `Promise`
  - .getCountries([callback]) 🔀 `Promise`
  - .getCountry(id, [callback]) 🔀 `Promise`
  - .updateCountry(id, body, [callback]) 🔀 `Promise`
  - .createCountry(body, [callback]) 🔀 `Promise`
  - .deleteCountry(id, [callback]) 🔀 `Promise`
  - .getCustomerGroups([callback]) 🔀 `Promise`
  - .getCustomerGroup(id, [callback]) 🔀 `Promise`
  - .createCustomerGroup(body, [callback]) 🔀 `Promise`
  - .updateCustomerGroup(id, body, [callback]) 🔀 `Promise`
  - .deleteCustomerGroup(id, [callback]) 🔀 `Promise`
  - .getManufacturers([callback]) 🔀 `Promise`
  - .getManufacturer(id, [callback]) 🔀 `Promise`
  - .createManufacturer(body, [callback]) 🔀 `Promise`
  - .updateManufacturer(id, body, [callback]) 🔀 `Promise`
  - .deleteManufacturer(id, [callback]) 🔀 `Promise`
  - .getPropertyGroups([callback]) 🔀 `Promise`
  - .getPropertyGroup(id, [callback]) 🔀 `Promise`
  - .createPropertyGroup(body, [callback]) 🔀 `Promise`
  - .updatePropertyGroup(id, body, [callback]) 🔀 `Promise`
  - .deletePropertyGroup(id, [callback]) 🔀 `Promise`
  - .getShops([callback]) 🔀 `Promise`
  - .getShop(id, [callback]) 🔀 `Promise`
  - .createShop(body, [callback]) 🔀 `Promise`
  - .updateShop(id, body, [callback]) 🔀 `Promise`
  - .deleteShop(id, [callback]) 🔀 `Promise`
  - .getTranslations([callback]) 🔀 `Promise`
  - .getTranslation(id, [callback]) 🔀 `Promise`
  - .createTranslation(id, body, [callback]) 🔀 `Promise`
  - .updateTranslation(id, body, [callback]) 🔀 `Promise`
  - .deleteTranslation(id, [callback]) 🔀 `Promise`

## Contributing

1. Fork it ( https://github.com/apertureless/shopware-api-client/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

This software is distributed under [MIT license](LICENSE.txt).
