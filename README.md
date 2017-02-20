# 🛍 Shopware API Client

[![npm version](https://badge.fury.io/js/shopware-api-client.svg)](https://badge.fury.io/js/shopware-api-client)
[![Build Status](https://travis-ci.org/apertureless/shopware-api-client.svg?branch=master)](https://travis-ci.org/apertureless/shopware-api-client)
[![codecov](https://codecov.io/gh/apertureless/shopware-api-client/branch/master/graph/badge.svg)](https://codecov.io/gh/apertureless/shopware-api-client)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Node.js module to interact with the [Shopware REST API](https://shopware.com/).

```bash
yarn add shopware-api-client -S
```

## Examples
Examples how to use the package

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
const shop = new Shopwarware({
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

<a name="new_shopware"></a>

### new Shopware([credentials])
Initializes the API. With given credentials.
Host, User and API Key


| Param | Type | Description |
| --- | --- | --- |
| [credentials] | <code>Object</code> | Host, User, API Key. |

<a name="version"></a>

### shop.version([callback])
Returns shopware version and revision

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Callback will be called with `(err, version)` |

<a name="getArticles"></a>

### shop.getArticles([callback]) ⇒ <code>Promise</code>
Returns an array with all articles.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Callback will be called with `(err, articles)` |

<a name="getArticle"></a>

### shop.getArticle(id, [callback]) ⇒ <code>Promise</code>
Returns an object with article data.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Article id |
| [callback] | <code>function</code> | Callback will be called with `(err, articles)` |

<a name="deleteArticle"></a>

### shop.deleteArticle(id, [callback]) ⇒ <code>Promise</code>
Deletes an article and returns it's data.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Article id |
| [callback] | <code>function</code> | Callback will be called with `(err, success)` |

<a name="deleteArticles"></a>

### shop.deleteArticles(ids, [callback]) ⇒ <code>Promise</code>
Deletes a batch of articles and returns it's data.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| id | <code>array</code> | Article ids |
| [callback] | <code>function</code> | Callback will be called with `(err, success)` |

<a name="createArticle"></a>

### shop.createArticles(article, [callback]) ⇒ <code>Promise</code>
Creates an article and returns its data.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| article | <code>object</code> | Shopware article model |
| [callback] | <code>function</code> | Callback will be called with `(err, article)` |

<a name="updateArticle"></a>

### shop.updateArticles(id, article, [callback]) ⇒ <code>Promise</code>
Updates data of an article.

**See**: https://developers.shopware.com/developers-guide/rest-api/api-resource-article/

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Target article id |
| article | <code>object</code> | Shopware article model |
| [callback] | <code>function</code> | Callback will be called with `(err, article)` |
