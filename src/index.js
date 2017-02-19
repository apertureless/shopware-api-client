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
  },

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
}

module.exports = Shopware
