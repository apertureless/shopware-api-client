const request = require('request-promise-native')

const ERROR = {
  MISSING_ID: {
    code: 'missing_id',
    message: 'Missing `id` parameter'
  },
  MISSING_BODY: {
    code: 'missing_body',
    message: 'Missing a proper `body` parameter'
  }
}

const handleError = err => new Promise((resolve, reject) => reject(err))

class Shopware {
  constructor(options) {
    if (!options) {
      console.error('No host, user or api key found.')
    }

    this.host = options.host
    this.user = options.user
    this.apiKey = options.apiKey

    this.request = request.defaults({
      baseUrl: this.host + '/api/',
      timeout: 30000,
      json: true,
      headers: {
        'User-Agent': 'Shopware API Client',
        'Content-Type': 'application/json; charset=utf-8'
      },
      auth: {
        user: this.user,
        pass: this.apiKey,
        sendImmediately: false
      }
    })
  }

  handleRequest(config, selector) {
    return new Promise((resolve, reject) => {
      this.request(config)
        .then(res => {
          const responseData = selector ? res[selector] : res
          resolve(responseData)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  }

  version() {
    return this.handleRequest({
      url: 'version/',
      method: 'GET'
    }, 'data')
  }

  getArticles() {
    return this.handleRequest({
      url: 'articles/',
      method: 'GET'
    }, 'data')
  }

  getArticle(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `articles/${id}`,
      method: 'GET'
    }, 'data')
  }

  deleteArticle(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `articles/${id}`,
      method: 'DELETE'
    })
  }

  deleteArticles(ids) {
    if (!ids) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: 'articles/',
      method: 'DELETE',
      ids
    })
  }

  createArticle(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'articles/',
      method: 'POST',
      body
    })
  }

  updateArticle(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `articles/${id}`,
      method: 'PUT',
      body
    })
  }

  updateArticles(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'articles/',
      method: 'PUT',
      body
    })
  }

  getCategories() {
    return this.handleRequest({
      url: 'categories/',
      method: 'GET'
    }, 'data')
  }

  getCategory(id) {
    if (!id) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `categories/${id}`,
      method: 'GET'
    }, 'data')
  }

  createCategory(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'categories/',
      method: 'POST',
      body
    })
  }

  updateCategory(id, body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `categories/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteCategory(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `categories/${id}`,
      method: 'DELETE'
    })
  }

  getVariants() {
    return this.handleRequest({
      url: 'variants/',
      method: 'GET'
    }, 'data')
  }

  getVariant(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `variants/${id}`,
      method: 'GET'
    }, 'data')
  }

  updateVariant(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `variants/{id}`,
      method: 'PUT',
      body
    })
  }

  createVariant(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `variants/{id}`,
      method: 'POST',
      body
    })
  }

  deleteVariant(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `variants/{id}`,
      method: 'DELETE'
    })
  }

  deleteVariants(ids) {
    if (!ids) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `variants/`,
      method: 'DELETE',
      ids
    })
  }

  generateArticleImages(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `generateArticleImages/{id}`,
      method: 'PUT'
    })
  }

  listMedia() {
    return this.handleRequest({
      url: 'media/',
      method: 'GET'
    }, 'data')
  }

  getMedia(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `media/${id}`,
      method: 'GET'
    }, 'data')
  }

  createMedia(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'media/',
      method: 'POST'
    })
  }

  deleteMedia(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `media/${id}`,
      method: 'DELETE'
    })
  }

  getOrders() {
    return this.handleRequest({
      url: 'orders/',
      method: 'GET'
    }, 'data')
  }

  getOrder(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `orders/${id}`,
      method: 'GET'
    })
  }

  updateOrder(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `orders/${id}`,
      method: 'PUT',
      body
    })
  }

  getAddresses() {
    return this.handleRequest({
      url: 'addresses/',
      method: 'GET'
    }, 'data')
  }

  createAddress(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'addresses/',
      method: 'POST',
      body
    })
  }

  updateAddress(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `addresses/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteAddress(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `addresses/${id}`,
      method: 'DELETE'
    }, 'data')
  }

  getCustomers() {
    return this.handleRequest({
      url: 'customers/',
      method: 'GET'
    }, 'data')
  }

  getCustomer(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `customers/${id}`,
      method: 'GET'
    }, 'data')
  }

  createCustomer(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'customers/',
      method: 'POST',
      body
    })
  }

  updateCustomer(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `customers/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteCustomer(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `customers/${id}`,
      method: 'DELETE'
    })
  }

  getCaches() {
    return this.handleRequest({
      url: 'caches/',
      method: 'GET'
    }, 'data')
  }

  getCache(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `caches/${id}`,
      method: 'GET'
    }, 'data')
  }

  deleteCache(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `caches/${id}`,
      method: 'DELETE'
    })
  }

  deleteCaches() {
    return this.handleRequest({
      url: 'caches/',
      method: 'DELETE'
    })
  }

  getCountries() {
    return this.handleRequest({
      url: 'countries/',
      method: 'GET'
    }, 'data')
  }

  getCountry(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `countries/${id}`,
      method: 'GET'
    }, 'data')
  }

  createCountry(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'countries/',
      method: 'POST',
      body
    })
  }

  updateCountry(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `countries/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteCountry(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `countries/${id}`,
      method: 'DELETE'
    })
  }

  getCustomerGroups() {
    return this.handleRequest({
      url: 'customerGroups/',
      method: 'GET'
    }, 'data')
  }

  getCustomerGroup(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `customerGroups/${id}`,
      method: 'GET'
    }, 'data')
  }

  createCustomerGroup(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'customerGroups/',
      method: 'POST',
      body
    })
  }

  updateCustomerGroup(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `customerGroups/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteCustomerGroup(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `customerGroups/${id}`,
      method: 'DELETE'
    })
  }

  getManufacturers() {
    return this.handleRequest({
      url: 'manufacturers/',
      method: 'GET'
    }, 'data')
  }

  getManufacturer(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `manufacturers/${id}`,
      method: 'GET'
    }, 'data')
  }

  createManufacturer(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'manufacturers/',
      method: 'POST',
      body
    })
  }

  updateManufacturer(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `manufacturers/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteManufacturer(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `manufacturers/${id}`,
      method: 'DELETE'
    })
  }

  getPropertyGroups() {
    return this.handleRequest({
      url: 'propertyGroups/',
      method: 'GET'
    }, 'data')
  }

  getPropertyGroup(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `propertyGroups/${id}`,
      method: 'GET'
    }, 'data')
  }

  createPropertyGroup(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'propertyGroups/',
      method: 'POST',
      body
    })
  }

  updatePropertyGroup(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `propertyGroups/${id}`,
      method: 'PUT',
      body
    })
  }

  deletePropertyGroup(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `propertyGroups/${id}`,
      method: 'DELETE'
    })
  }

  getShops() {
    return this.handleRequest({
      url: 'shops/',
      method: 'GET'
    }, 'data')
  }

  getShop(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `shops/${id}`,
      method: 'GET'
    }, 'data')
  }

  createShop(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: 'shops/',
      method: 'POST',
      body
    })
  }

  updateShop(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `shops/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteShop(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `shops/${id}`,
      method: 'DELETE'
    })
  }

}

module.exports = Shopware
