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

  getArticles(params) {
    return this.handleRequest({
      url: 'articles/',
      method: 'GET',
      qs: params
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

  getCategories(params) {
    return this.handleRequest({
      url: 'categories/',
      method: 'GET',
      qs: params
    }, 'data')
  }

  getCategory(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
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

  getVariants(params) {
    return this.handleRequest({
      url: 'variants/',
      method: 'GET',
      qs: params
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
      url: `variants/${id}`,
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
      url: `variants/${id}`,
      method: 'POST',
      body
    })
  }

  deleteVariant(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `variants/${id}`,
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
      url: `generateArticleImages/${id}`,
      method: 'PUT'
    })
  }

  listMedia(params) {
    return this.handleRequest({
      url: 'media/',
      method: 'GET',
      qs: params
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
      method: 'POST',
      body
    })
  }

  updateMedia(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `media/${id}`,
      method: 'PUT',
      body
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

  getOrders(params) {
    return this.handleRequest({
      url: 'orders/',
      method: 'GET',
      qs: params
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
  
  createOrder(body) {
    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `orders/`,
      method: 'POST',
      body
    })
  }

  getAddresses(params) {
    return this.handleRequest({
      url: 'addresses/',
      method: 'GET',
      qs: params
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

  getCustomers(params) {
    return this.handleRequest({
      url: 'customers/',
      method: 'GET',
      qs: params
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

  getCaches(params) {
    return this.handleRequest({
      url: 'caches/',
      method: 'GET',
      qs: params
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

  getCountries(params) {
    return this.handleRequest({
      url: 'countries/',
      method: 'GET',
      qs: params
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

  getCustomerGroups(params) {
    return this.handleRequest({
      url: 'customerGroups/',
      method: 'GET',
      qs: params
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

  getManufacturers(params) {
    return this.handleRequest({
      url: 'manufacturers/',
      method: 'GET',
      qs: params
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

  getPropertyGroups(params) {
    return this.handleRequest({
      url: 'propertyGroups/',
      method: 'GET',
      qs: params
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

  getShops(params) {
    return this.handleRequest({
      url: 'shops/',
      method: 'GET',
      qs: params
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

  getTranslations(params) {
    return this.handleRequest({
      url: 'translations/',
      method: 'GET',
      qs: params
    }, 'data')
  }

  getTranslation(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `translations/${id}`,
      method: 'GET'
    }, 'data')
  }

  createTranslation(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `translations/${id}`,
      method: 'POST',
      body
    })
  }

  updateTranslation(id, body) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    if (!body) {
      return handleError(ERROR.MISSING_BODY)
    }

    return this.handleRequest({
      url: `translations/${id}`,
      method: 'PUT',
      body
    })
  }

  deleteTranslation(id) {
    if (!id) {
      return handleError(ERROR.MISSING_ID)
    }

    return this.handleRequest({
      url: `translations/${id}`,
      method: 'DELETE'
    })
  }

}

module.exports = Shopware
