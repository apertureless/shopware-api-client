# Shopware API Docs

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


## Article
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

## Categories
yip

## Variants
