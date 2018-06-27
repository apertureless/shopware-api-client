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
        return handleError(ERROR.MISSING_ID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJyZXF1aXJlIiwiRVJST1IiLCJNSVNTSU5HX0lEIiwiY29kZSIsIm1lc3NhZ2UiLCJNSVNTSU5HX0JPRFkiLCJoYW5kbGVFcnJvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyIiwiU2hvcHdhcmUiLCJvcHRpb25zIiwiY29uc29sZSIsImVycm9yIiwiaG9zdCIsInVzZXIiLCJhcGlLZXkiLCJkZWZhdWx0cyIsImJhc2VVcmwiLCJ0aW1lb3V0IiwianNvbiIsImhlYWRlcnMiLCJhdXRoIiwicGFzcyIsInNlbmRJbW1lZGlhdGVseSIsImNvbmZpZyIsInNlbGVjdG9yIiwidGhlbiIsInJlc3BvbnNlRGF0YSIsInJlcyIsImNhdGNoIiwiaGFuZGxlUmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInBhcmFtcyIsInFzIiwiaWQiLCJvcmRlcm51bWJlciIsImlkcyIsImJvZHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxVQUFVQyxRQUFRLHdCQUFSLENBQWhCOztBQUVBLElBQU1DLFFBQVE7QUFDWkMsY0FBWTtBQUNWQyxVQUFNLFlBREk7QUFFVkMsYUFBUztBQUZDLEdBREE7QUFLWkMsZ0JBQWM7QUFDWkYsVUFBTSxjQURNO0FBRVpDLGFBQVM7QUFGRztBQUxGLENBQWQ7O0FBV0EsSUFBTUUsY0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsV0FBcUJBLE9BQU9DLEdBQVAsQ0FBckI7QUFBQSxHQUFaLENBQVA7QUFBQSxDQUFwQjs7SUFFTUMsUTtBQUNKLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFFBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1pDLGNBQVFDLEtBQVIsQ0FBYyxpQ0FBZDtBQUNEOztBQUVELFNBQUtDLElBQUwsR0FBWUgsUUFBUUcsSUFBcEI7QUFD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Q0gsRUFBTCxFQUFTO0FBQ1AsZUFBTy9CLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNzQyxJQUFMLEVBQVc7QUFDVCxlQUFPbEMsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLCtCQUFxQkksRUFERztBQUV4QkgsZ0JBQVEsS0FGZ0I7QUFHeEJNO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O3NDQUVpQkgsRSxFQUFJO0FBQ3BCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTy9CLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQywrQkFBcUJJLEVBREc7QUFFeEJILGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7Ozs7O0FBSUhPLE9BQU9DLE9BQVAsR0FBaUIvQixRQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJylcblxuY29uc3QgRVJST1IgPSB7XG4gIE1JU1NJTkdfSUQ6IHtcbiAgICBjb2RlOiAnbWlzc2luZ19pZCcsXG4gICAgbWVzc2FnZTogJ01pc3NpbmcgYGlkYCBwYXJhbWV0ZXInXG4gIH0sXG4gIE1JU1NJTkdfQk9EWToge1xuICAgIGNvZGU6ICdtaXNzaW5nX2JvZHknLFxuICAgIG1lc3NhZ2U6ICdNaXNzaW5nIGEgcHJvcGVyIGBib2R5YCBwYXJhbWV0ZXInXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRXJyb3IgPSBlcnIgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KGVycikpXG5cbmNsYXNzIFNob3B3YXJlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gaG9zdCwgdXNlciBvciBhcGkga2V5IGZvdW5kLicpXG4gICAgfVxuXG4gICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0XG4gICAgdGhpcy51c2VyID0gb3B0aW9ucy51c2VyXG4gICAgdGhpcy5hcGlLZXkgPSBvcHRpb25zLmFwaUtleVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdC5kZWZhdWx0cyh7XG4gICAgICBiYXNlVXJsOiB0aGlzLmhvc3QgKyAnL2FwaS8nLFxuICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICBqc29uOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnVXNlci1BZ2VudCc6ICdTaG9wd2FyZSBBUEkgQ2xpZW50JyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgfSxcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgICBwYXNzOiB0aGlzLmFwaUtleSxcbiAgICAgICAgc2VuZEltbWVkaWF0ZWx5OiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVSZXF1ZXN0KGNvbmZpZywgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZXF1ZXN0KGNvbmZpZylcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBzZWxlY3RvciA/IHJlc1tzZWxlY3Rvcl0gOiByZXNcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVyci5tZXNzYWdlKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB2ZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAndmVyc2lvbi8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEFydGljbGVzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0QXJ0aWNsZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEFydGljbGVCeU9yZGVybnVtYmVyKG9yZGVybnVtYmVyKSB7XG4gICAgaWYoIW9yZGVybnVtYmVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFydGljbGVzLyR7b3JkZXJudW1iZXJ9P3VzZU51bWJlckFzSWQ9dHJ1ZWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUFydGljbGUoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFydGljbGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQXJ0aWNsZXMoaWRzKSB7XG4gICAgaWYgKCFpZHMpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBpZHNcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlQXJ0aWNsZShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBcnRpY2xlKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQXJ0aWNsZXMoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FydGljbGVzLycsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBnZXRDYXRlZ29yaWVzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2F0ZWdvcmllcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDYXRlZ29yeShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2F0ZWdvcmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ2F0ZWdvcnkoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NhdGVnb3JpZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDYXRlZ29yeShpZCwgYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ2F0ZWdvcnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRWYXJpYW50cyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3ZhcmlhbnRzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFZhcmlhbnQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICB1cGRhdGVWYXJpYW50KGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlVmFyaWFudChpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVWYXJpYW50KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVZhcmlhbnRzKGlkcykge1xuICAgIGlmICghaWRzKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzL2AsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaWRzXG4gICAgfSlcbiAgfVxuXG4gIGdlbmVyYXRlQXJ0aWNsZUltYWdlcyhpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgZ2VuZXJhdGVBcnRpY2xlSW1hZ2VzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICB9KVxuICB9XG5cbiAgbGlzdE1lZGlhKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWVkaWEvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0TWVkaWEoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1lZGlhLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVNZWRpYShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWVkaWEvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVNZWRpYShpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1lZGlhLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZU1lZGlhKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtZWRpYS8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldE9yZGVycyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ29yZGVycy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRPcmRlcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgb3JkZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICB9XG5cbiAgZ2V0T3JkZXJCeU9yZGVybnVtYmVyKG9yZGVybnVtYmVyKSB7XG4gICAgaWYgKCFvcmRlcm51bWJlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBvcmRlcnMvJHtvcmRlcm51bWJlcn0/dXNlTnVtYmVyQXNJZD10cnVlYCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlT3JkZXIoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBvcmRlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlT3JkZXIoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG9yZGVycy9gLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGdldEFkZHJlc3NlcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FkZHJlc3Nlcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHFzOiBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVBZGRyZXNzKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhZGRyZXNzZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBZGRyZXNzKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYWRkcmVzc2VzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUFkZHJlc3MoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFkZHJlc3Nlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXJzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY3VzdG9tZXJzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUN1c3RvbWVyKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lcnMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDdXN0b21lcihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDdXN0b21lcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q2FjaGVzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2FjaGVzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldENhY2hlKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYWNoZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGRlbGV0ZUNhY2hlKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYWNoZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBkZWxldGVDYWNoZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjYWNoZXMvJyxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q291bnRyaWVzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY291bnRyaWVzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldENvdW50cnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNvdW50cmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ291bnRyeShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY291bnRyaWVzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ291bnRyeShpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNvdW50cmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDb3VudHJ5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRDdXN0b21lckdyb3VwcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVyR3JvdXBzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVyR3JvdXAoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVyR3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVDdXN0b21lckdyb3VwKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lckdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUN1c3RvbWVyR3JvdXAoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lckdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDdXN0b21lckdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lckdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldE1hbnVmYWN0dXJlcnMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdtYW51ZmFjdHVyZXJzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldE1hbnVmYWN0dXJlcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgbWFudWZhY3R1cmVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlTWFudWZhY3R1cmVyKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdtYW51ZmFjdHVyZXJzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTWFudWZhY3R1cmVyKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgbWFudWZhY3R1cmVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVNYW51ZmFjdHVyZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1hbnVmYWN0dXJlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRQcm9wZXJ0eUdyb3VwcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3Byb3BlcnR5R3JvdXBzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFByb3BlcnR5R3JvdXAoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHByb3BlcnR5R3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0eUdyb3VwKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdwcm9wZXJ0eUdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVByb3BlcnR5R3JvdXAoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVQcm9wZXJ0eUdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldFNob3BzKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnc2hvcHMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxczogcGFyYW1zXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0U2hvcChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgc2hvcHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZVNob3AoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3Nob3BzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlU2hvcChpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHNob3BzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVNob3AoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHNob3BzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0VHJhbnNsYXRpb25zKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAndHJhbnNsYXRpb25zLycsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXM6IHBhcmFtc1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFRyYW5zbGF0aW9uKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZVRyYW5zbGF0aW9uKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdHJhbnNsYXRpb25zLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVUcmFuc2xhdGlvbihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHRyYW5zbGF0aW9ucy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVUcmFuc2xhdGlvbihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdHJhbnNsYXRpb25zLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaG9wd2FyZVxuIl19