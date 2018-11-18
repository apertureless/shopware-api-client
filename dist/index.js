'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise-native');

var ERROR = {
  MISSING_ID: {
    code: 'missing_id',
    message: 'Missing `id` parameter'
  },
  MISSING_BODY: {
    code: 'missing_body',
    message: 'Missing a proper `body` parameter'
  },
  MISSING_ORDERNUMBER: {
    code: 'missing_ordernumber',
    message: 'Missing `ordernumber` parameter'
  }
};

var handleError = function handleError(err) {
  return new Promise(function (resolve, reject) {
    return reject(err);
  });
};

var Shopware = function () {
  function Shopware(options) {
    _classCallCheck(this, Shopware);

    if (!options) {
      console.error('No host, user or api key found.');
    }

    this.host = options.host;
    this.user = options.user;
    this.apiKey = options.apiKey;

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
    });
  }

  _createClass(Shopware, [{
    key: 'handleRequest',
    value: function handleRequest(config, selector) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.request(config).then(function (res) {
          var responseData = selector ? res[selector] : res;
          resolve(responseData);
        }).catch(function (err) {
          reject(err.message);
        });
      });
    }
  }, {
    key: 'version',
    value: function version() {
      return this.handleRequest({
        url: 'version/',
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'getArticles',
    value: function getArticles(params) {
      return this.handleRequest({
        url: 'articles/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getArticle',
    value: function getArticle(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'articles/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'getArticleByOrdernumber',
    value: function getArticleByOrdernumber(ordernumber) {
      if (!ordernumber) {
        return handleError(ERROR.MISSING_ORDERNUMBER);
      }

      return this.handleRequest({
        url: 'articles/' + ordernumber + '?useNumberAsId=true',
        method: 'GET'
      });
    }
  }, {
    key: 'deleteArticle',
    value: function deleteArticle(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'articles/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'deleteArticles',
    value: function deleteArticles(ids) {
      if (!ids) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'articles/',
        method: 'DELETE',
        ids: ids
      });
    }
  }, {
    key: 'createArticle',
    value: function createArticle(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'articles/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateArticle',
    value: function updateArticle(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'articles/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'updateArticles',
    value: function updateArticles(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'articles/',
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'getCategories',
    value: function getCategories(params) {
      return this.handleRequest({
        url: 'categories/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getCategory',
    value: function getCategory(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'categories/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createCategory',
    value: function createCategory(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'categories/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateCategory',
    value: function updateCategory(id, body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'categories/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteCategory',
    value: function deleteCategory(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'categories/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getVariants',
    value: function getVariants(params) {
      return this.handleRequest({
        url: 'variants/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getVariant',
    value: function getVariant(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'variants/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'updateVariant',
    value: function updateVariant(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'variants/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'createVariant',
    value: function createVariant(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'variants/' + id,
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'deleteVariant',
    value: function deleteVariant(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'variants/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'deleteVariants',
    value: function deleteVariants(ids) {
      if (!ids) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'variants/',
        method: 'DELETE',
        ids: ids
      });
    }
  }, {
    key: 'generateArticleImages',
    value: function generateArticleImages(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'generateArticleImages/' + id,
        method: 'PUT'
      });
    }
  }, {
    key: 'listMedia',
    value: function listMedia(params) {
      return this.handleRequest({
        url: 'media/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getMedia',
    value: function getMedia(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'media/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createMedia',
    value: function createMedia(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'media/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateMedia',
    value: function updateMedia(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'media/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteMedia',
    value: function deleteMedia(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'media/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getOrders',
    value: function getOrders(params) {
      return this.handleRequest({
        url: 'orders/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getOrder',
    value: function getOrder(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'orders/' + id,
        method: 'GET'
      });
    }
  }, {
    key: 'getOrderByOrdernumber',
    value: function getOrderByOrdernumber(ordernumber) {
      if (!ordernumber) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'orders/' + ordernumber + '?useNumberAsId=true',
        method: 'GET'
      });
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'orders/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'createOrder',
    value: function createOrder(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'orders/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'getAddresses',
    value: function getAddresses(params) {
      return this.handleRequest({
        url: 'addresses/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'createAddress',
    value: function createAddress(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'addresses/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateAddress',
    value: function updateAddress(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'addresses/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteAddress',
    value: function deleteAddress(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'addresses/' + id,
        method: 'DELETE'
      }, 'data');
    }
  }, {
    key: 'getCustomers',
    value: function getCustomers(params) {
      return this.handleRequest({
        url: 'customers/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getCustomer',
    value: function getCustomer(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'customers/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createCustomer',
    value: function createCustomer(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'customers/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateCustomer',
    value: function updateCustomer(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'customers/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteCustomer',
    value: function deleteCustomer(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'customers/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getCaches',
    value: function getCaches(params) {
      return this.handleRequest({
        url: 'caches/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getCache',
    value: function getCache(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'caches/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'deleteCache',
    value: function deleteCache(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'caches/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'deleteCaches',
    value: function deleteCaches() {
      return this.handleRequest({
        url: 'caches/',
        method: 'DELETE'
      });
    }
  }, {
    key: 'getCountries',
    value: function getCountries(params) {
      return this.handleRequest({
        url: 'countries/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getCountry',
    value: function getCountry(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'countries/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createCountry',
    value: function createCountry(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'countries/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateCountry',
    value: function updateCountry(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'countries/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteCountry',
    value: function deleteCountry(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'countries/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getCustomerGroups',
    value: function getCustomerGroups(params) {
      return this.handleRequest({
        url: 'customerGroups/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getCustomerGroup',
    value: function getCustomerGroup(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'customerGroups/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createCustomerGroup',
    value: function createCustomerGroup(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'customerGroups/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateCustomerGroup',
    value: function updateCustomerGroup(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'customerGroups/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteCustomerGroup',
    value: function deleteCustomerGroup(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'customerGroups/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getManufacturers',
    value: function getManufacturers(params) {
      return this.handleRequest({
        url: 'manufacturers/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getManufacturer',
    value: function getManufacturer(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'manufacturers/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createManufacturer',
    value: function createManufacturer(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'manufacturers/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateManufacturer',
    value: function updateManufacturer(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'manufacturers/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteManufacturer',
    value: function deleteManufacturer(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'manufacturers/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getPropertyGroups',
    value: function getPropertyGroups(params) {
      return this.handleRequest({
        url: 'propertyGroups/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getPropertyGroup',
    value: function getPropertyGroup(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'propertyGroups/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createPropertyGroup',
    value: function createPropertyGroup(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'propertyGroups/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updatePropertyGroup',
    value: function updatePropertyGroup(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'propertyGroups/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deletePropertyGroup',
    value: function deletePropertyGroup(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'propertyGroups/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getShops',
    value: function getShops(params) {
      return this.handleRequest({
        url: 'shops/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getShop',
    value: function getShop(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'shops/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createShop',
    value: function createShop(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'shops/',
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateShop',
    value: function updateShop(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'shops/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteShop',
    value: function deleteShop(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'shops/' + id,
        method: 'DELETE'
      });
    }
  }, {
    key: 'getTranslations',
    value: function getTranslations(params) {
      return this.handleRequest({
        url: 'translations/',
        method: 'GET',
        qs: params
      }, 'data');
    }
  }, {
    key: 'getTranslation',
    value: function getTranslation(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'translations/' + id,
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'createTranslation',
    value: function createTranslation(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'translations/' + id,
        method: 'POST',
        body: body
      });
    }
  }, {
    key: 'updateTranslation',
    value: function updateTranslation(id, body) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'translations/' + id,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'updateTranslations',
    value: function updateTranslations(body) {
      if (!body) {
        return handleError(ERROR.MISSING_BODY);
      }

      return this.handleRequest({
        url: 'translations/',
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: 'deleteTranslation',
    value: function deleteTranslation(id) {
      if (!id) {
        return handleError(ERROR.MISSING_ID);
      }

      return this.handleRequest({
        url: 'translations/' + id,
        method: 'DELETE'
      });
    }
  }]);

  return Shopware;
}();

module.exports = Shopware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJyZXF1aXJlIiwiRVJST1IiLCJNSVNTSU5HX0lEIiwiY29kZSIsIm1lc3NhZ2UiLCJNSVNTSU5HX0JPRFkiLCJNSVNTSU5HX09SREVSTlVNQkVSIiwiaGFuZGxlRXJyb3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsIlNob3B3YXJlIiwib3B0aW9ucyIsImNvbnNvbGUiLCJlcnJvciIsImhvc3QiLCJ1c2VyIiwiYXBpS2V5IiwiZGVmYXVsdHMiLCJiYXNlVXJsIiwidGltZW91dCIsImpzb24iLCJoZWFkZXJzIiwiYXV0aCIsInBhc3MiLCJzZW5kSW1tZWRpYXRlbHkiLCJjb25maWciLCJzZWxlY3RvciIsInRoZW4iLCJyZXNwb25zZURhdGEiLCJyZXMiLCJjYXRjaCIsImhhbmRsZVJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJwYXJhbXMiLCJxcyIsImlkIiwib3JkZXJudW1iZXIiLCJpZHMiLCJib2R5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsVUFBVUMsUUFBUSx3QkFBUixDQUFoQjs7QUFFQSxJQUFNQyxRQUFRO0FBQ1pDLGNBQVk7QUFDVkMsVUFBTSxZQURJO0FBRVZDLGFBQVM7QUFGQyxHQURBO0FBS1pDLGdCQUFjO0FBQ1pGLFVBQU0sY0FETTtBQUVaQyxhQUFTO0FBRkcsR0FMRjtBQVNaRSx1QkFBcUI7QUFDbkJILFVBQU0scUJBRGE7QUFFbkJDLGFBQVM7QUFGVTtBQVRULENBQWQ7O0FBZUEsSUFBTUcsY0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsV0FBcUJBLE9BQU9DLEdBQVAsQ0FBckI7QUFBQSxHQUFaLENBQVA7QUFBQSxDQUFwQjs7SUFFTUMsUTtBQUNKLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFFBQUksQ0FBQ0EsT0FBTCxF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QVEsTUFGZ0I7QUFHeEJNO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O3NDQUVpQkgsRSxFQUFJRyxJLEVBQU07QUFDMUIsVUFBSSxDQUFDSCxFQUFMLEVBQVM7QUFDUCxlQUFPL0IsWUFBWU4sTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQ3VDLElBQUwsRUFBVztBQUNULGVBQU9sQyxZQUFZTixNQUFNSSxZQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLNEIsYUFBTCxDQUFtQjtBQUN4QkMsK0JBQXFCSSxFQURHO0FBRXhCSCxnQkFBUSxLQUZnQjtBQUd4Qk07QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7dUNBRWtCQSxJLEVBQU07QUFDdkIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPbEMsWUFBWU4sTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzRCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUR3QjtBQUV4QkMsZ0JBQVEsS0FGZ0I7QUFHeEJNO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O3NDQUVpQkgsRSxFQUFJO0FBQ3BCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTy9CLFlBQVlOLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsrQixhQUFMLENBQW1CO0FBQ3hCQywrQkFBcUJJLEVBREc7QUFFeEJILGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7Ozs7O0FBSUhPLE9BQU9DLE9BQVAsR0FBaUIvQixRQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJylcblxuY29uc3QgRVJST1IgPSB7XG4gIE1JU1NJTkdfSUQ6IHtcbiAgICBjb2RlOiAnbWlzc2luZ19pZCcsXG4gICAgbWVzc2FnZTogJ01pc3NpbmcgYGlkYCBwYXJhbWV0ZXInXG4gIH0sXG4gIE1JU1NJTkdfQk9EWToge1xuICAgIGNvZGU6ICdtaXNzaW5nX2JvZHknLFxuICAgIG1lc3NhZ2U6ICdNaXNzaW5nIGEgcHJvcGVyIGBib2R5YCBwYXJhbWV0ZXInXG4gIH0sXG4gIE1JU1NJTkdfT1JERVJOVU1CRVI6IHtcbiAgICBjb2RlOiAnbWlzc2luZ19vcmRlcm51bWJlcicsXG4gICAgbWVzc2FnZTogJ01pc3NpbmcgYG9yZGVybnVtYmVyYCBwYXJhbWV0ZXInXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRXJyb3IgPSBlcnIgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KGVycikpXG5cbmNsYXNzIFNob3B3YXJlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gaG9zdCwgdXNlciBvciBhcGkga2V5IGZvdW5kLicpXG4gICAgfVxuXG4gICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0XG4gICAgdGhpcy51c2VyID0gb3B0aW9ucy51c2VyXG4gICAgdGhpcy5hcGlLZXkgPSBvcHRpb25zLmFwaUtleVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdC5kZWZhdWx0cyh7XG4gICAgICBiYXNlVXJsOiB0aGlzLmhvc3QgKyAnL2FwaS8nLFxuICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICBqc29uOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnVXNlci1BZ2VudCc6ICdTaG9wd2FyZSBBUEkgQ2xpZW50JyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgfSxcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgICBwYXNzOiB0aGlzLmFwaUtleSxcbiAgICAgICAgc2VuZEltbWVkaWF0ZWx5OiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVSZXF1ZXN0KGNvbmZpZywgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZXF1ZXN0KGNvbmZpZylcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBzZWxlY3RvciA/IHJlc1tzZWxlY3Rvcl0gOiByZXNcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVyci5tZXNzYWdlKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB2ZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAndmVyc2lvbi8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEFydGljbGVzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0QXJ0aWNsZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEFydGljbGVCeU9yZGVybnVtYmVyKG9yZGVybnVtYmVyKSB7XG4gICAgaWYgKCFvcmRlcm51bWJlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfT1JERVJOVU1CRVIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhcnRpY2xlcy8ke29yZGVybnVtYmVyfT91c2VOdW1iZXJBc0lkPXRydWVgLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gIH1cblxuICBkZWxldGVBcnRpY2xlKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhcnRpY2xlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUFydGljbGVzKGlkcykge1xuICAgIGlmICghaWRzKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FydGljbGVzLycsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaWRzXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUFydGljbGUoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FydGljbGVzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQXJ0aWNsZShpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFydGljbGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUFydGljbGVzKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhcnRpY2xlcy8nLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q2F0ZWdvcmllcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NhdGVnb3JpZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q2F0ZWdvcnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUNhdGVnb3J5KGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjYXRlZ29yaWVzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ2F0ZWdvcnkoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYXRlZ29yaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhdGVnb3J5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYXRlZ29yaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0VmFyaWFudHMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICd2YXJpYW50cy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRWYXJpYW50KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgdXBkYXRlVmFyaWFudChpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVZhcmlhbnQoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlVmFyaWFudChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBkZWxldGVWYXJpYW50cyhpZHMpIHtcbiAgICBpZiAoIWlkcykge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy9gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGlkc1xuICAgIH0pXG4gIH1cblxuICBnZW5lcmF0ZUFydGljbGVJbWFnZXMoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGdlbmVyYXRlQXJ0aWNsZUltYWdlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnXG4gICAgfSlcbiAgfVxuXG4gIGxpc3RNZWRpYShwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21lZGlhLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldE1lZGlhKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtZWRpYS8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlTWVkaWEoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21lZGlhLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTWVkaWEoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtZWRpYS8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVNZWRpYShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgbWVkaWEvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRPcmRlcnMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdvcmRlcnMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0T3JkZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG9yZGVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgfVxuXG4gIGdldE9yZGVyQnlPcmRlcm51bWJlcihvcmRlcm51bWJlcikge1xuICAgIGlmICghb3JkZXJudW1iZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgb3JkZXJzLyR7b3JkZXJudW1iZXJ9P3VzZU51bWJlckFzSWQ9dHJ1ZWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZU9yZGVyKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgb3JkZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZU9yZGVyKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBvcmRlcnMvYCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBnZXRBZGRyZXNzZXMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhZGRyZXNzZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQWRkcmVzcyhib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYWRkcmVzc2VzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQWRkcmVzcyhpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFkZHJlc3Nlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVBZGRyZXNzKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhZGRyZXNzZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVycyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVycy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDdXN0b21lcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVDdXN0b21lcihib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY3VzdG9tZXJzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ3VzdG9tZXIoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ3VzdG9tZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldENhY2hlcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NhY2hlcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDYWNoZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2FjaGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBkZWxldGVDYWNoZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2FjaGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ2FjaGVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2FjaGVzLycsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldENvdW50cmllcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NvdW50cmllcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDb3VudHJ5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUNvdW50cnkoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NvdW50cmllcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUNvdW50cnkoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ291bnRyeShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY291bnRyaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXJHcm91cHMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lckdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDdXN0b21lckdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lckdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ3VzdG9tZXJHcm91cChib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY3VzdG9tZXJHcm91cHMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDdXN0b21lckdyb3VwKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ3VzdG9tZXJHcm91cChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRNYW51ZmFjdHVyZXJzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWFudWZhY3R1cmVycy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRNYW51ZmFjdHVyZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1hbnVmYWN0dXJlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZU1hbnVmYWN0dXJlcihib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWFudWZhY3R1cmVycy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZU1hbnVmYWN0dXJlcihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1hbnVmYWN0dXJlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlTWFudWZhY3R1cmVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtYW51ZmFjdHVyZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0UHJvcGVydHlHcm91cHMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdwcm9wZXJ0eUdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRQcm9wZXJ0eUdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlUHJvcGVydHlHcm91cChib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAncHJvcGVydHlHcm91cHMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVQcm9wZXJ0eUdyb3VwKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgcHJvcGVydHlHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlUHJvcGVydHlHcm91cChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgcHJvcGVydHlHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRTaG9wcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3Nob3BzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFNob3AoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHNob3BzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVTaG9wKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdzaG9wcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVNob3AoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBzaG9wcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVTaG9wKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBzaG9wcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldFRyYW5zbGF0aW9ucyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3RyYW5zbGF0aW9ucy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRUcmFuc2xhdGlvbihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdHJhbnNsYXRpb25zLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVUcmFuc2xhdGlvbihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHRyYW5zbGF0aW9ucy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlVHJhbnNsYXRpb24oaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlVHJhbnNsYXRpb25zKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvYCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVRyYW5zbGF0aW9uKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNob3B3YXJlXG4iXX0=