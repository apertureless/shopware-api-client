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
    value: function getArticles() {
      return this.handleRequest({
        url: 'articles/',
        method: 'GET'
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
    value: function getCategories() {
      return this.handleRequest({
        url: 'categories/',
        method: 'GET'
      }, 'data');
    }
  }, {
    key: 'getCategory',
    value: function getCategory(id) {
      if (!id) {
        return handleError(ERROR.MISSING_BODY);
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
    value: function getVariants() {
      return this.handleRequest({
        url: 'variants/',
        method: 'GET'
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
        url: 'variants/{id}',
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
        url: 'variants/{id}',
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
        url: 'variants/{id}',
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
        url: 'generateArticleImages/{id}',
        method: 'PUT'
      });
    }
  }, {
    key: 'listMedia',
    value: function listMedia() {
      return this.handleRequest({
        url: 'media/',
        method: 'GET'
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
        method: 'POST'
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
        params: params
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
    key: 'getAddresses',
    value: function getAddresses() {
      return this.handleRequest({
        url: 'addresses/',
        method: 'GET'
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
    value: function getCustomers() {
      return this.handleRequest({
        url: 'customers/',
        method: 'GET'
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
    value: function getCaches() {
      return this.handleRequest({
        url: 'caches/',
        method: 'GET'
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
    value: function getCountries() {
      return this.handleRequest({
        url: 'countries/',
        method: 'GET'
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
    value: function getCustomerGroups() {
      return this.handleRequest({
        url: 'customerGroups/',
        method: 'GET'
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
    value: function getManufacturers() {
      return this.handleRequest({
        url: 'manufacturers/',
        method: 'GET'
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
    value: function getPropertyGroups() {
      return this.handleRequest({
        url: 'propertyGroups/',
        method: 'GET'
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
    value: function getShops() {
      return this.handleRequest({
        url: 'shops/',
        method: 'GET'
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
    value: function getTranslations() {
      return this.handleRequest({
        url: 'translations/',
        method: 'GET'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJyZXF1aXJlIiwiRVJST1IiLCJNSVNTSU5HX0lEIiwiY29kZSIsIm1lc3NhZ2UiLCJNSVNTSU5HX0JPRFkiLCJoYW5kbGVFcnJvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyIiwiU2hvcHdhcmUiLCJvcHRpb25zIiwiY29uc29sZSIsImVycm9yIiwiaG9zdCIsInVzZXIiLCJhcGlLZXkiLCJkZWZhdWx0cyIsImJhc2VVcmwiLCJ0aW1lb3V0IiwianNvbiIsImhlYWRlcnMiLCJhdXRoIiwicGFzcyIsInNlbmRJbW1lZGlhdGVseSIsImNvbmZpZyIsInNlbGVjdG9yIiwidGhlbiIsInJlc3BvbnNlRGF0YSIsInJlcyIsImNhdGNoIiwiaGFuZGxlUmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImlkIiwiaWRzIiwiYm9keSIsInBhcmFtcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLFVBQVVDLFFBQVEsd0JBQVIsQ0FBaEI7O0FBRUEsSUFBTUMsUUFBUTtBQUNaQyxjQUFZO0FBQ1ZDLFVBQU0sWUFESTtBQUVWQyxhQUFTO0FBRkMsR0FEQTtBQUtaQyxnQkFBYztBQUNaRixVQUFNLGNBRE07QUFFWkMsYUFBUztBQUZHO0FBTEYsQ0FBZDs7QUFXQSxJQUFNRSxjQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVY7QUFBQSxXQUFxQkEsT0FBT0MsR0FBUCxDQUFyQjtBQUFBLEdBQVosQ0FBUDtBQUFBLENBQXBCOztJQUVNQyxRO0FBQ0osb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsUUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWkMsY0FBUUMsS0FBUixDQUFjLGlDQUFkO0FBQ0Q7O0FBRUQsU0FBS0MsSUFBTCxHQUFZSCxRQUFRRyxJQUFwQjtBQUNBLFNBQUtDLElBQUwsR0FBWUos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O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsK0JBQXFCRSxFQURHO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7Ozs7OztBQUlISyxPQUFPQyxPQUFQLEdBQWlCN0IsUUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZXF1ZXN0ID0gcmVxdWlyZSgncmVxdWVzdC1wcm9taXNlLW5hdGl2ZScpXG5cbmNvbnN0IEVSUk9SID0ge1xuICBNSVNTSU5HX0lEOiB7XG4gICAgY29kZTogJ21pc3NpbmdfaWQnLFxuICAgIG1lc3NhZ2U6ICdNaXNzaW5nIGBpZGAgcGFyYW1ldGVyJ1xuICB9LFxuICBNSVNTSU5HX0JPRFk6IHtcbiAgICBjb2RlOiAnbWlzc2luZ19ib2R5JyxcbiAgICBtZXNzYWdlOiAnTWlzc2luZyBhIHByb3BlciBgYm9keWAgcGFyYW1ldGVyJ1xuICB9XG59XG5cbmNvbnN0IGhhbmRsZUVycm9yID0gZXJyID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHJlamVjdChlcnIpKVxuXG5jbGFzcyBTaG9wd2FyZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGhvc3QsIHVzZXIgb3IgYXBpIGtleSBmb3VuZC4nKVxuICAgIH1cblxuICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdFxuICAgIHRoaXMudXNlciA9IG9wdGlvbnMudXNlclxuICAgIHRoaXMuYXBpS2V5ID0gb3B0aW9ucy5hcGlLZXlcblxuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3QuZGVmYXVsdHMoe1xuICAgICAgYmFzZVVybDogdGhpcy5ob3N0ICsgJy9hcGkvJyxcbiAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAganNvbjogdHJ1ZSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnU2hvcHdhcmUgQVBJIENsaWVudCcsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgIH0sXG4gICAgICBhdXRoOiB7XG4gICAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgICAgcGFzczogdGhpcy5hcGlLZXksXG4gICAgICAgIHNlbmRJbW1lZGlhdGVseTogZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlUmVxdWVzdChjb25maWcsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdChjb25maWcpXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gc2VsZWN0b3IgPyByZXNbc2VsZWN0b3JdIDogcmVzXG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZURhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIubWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgdmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3ZlcnNpb24vJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRBcnRpY2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FydGljbGVzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0QXJ0aWNsZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGRlbGV0ZUFydGljbGUoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFydGljbGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQXJ0aWNsZXMoaWRzKSB7XG4gICAgaWYgKCFpZHMpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBpZHNcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlQXJ0aWNsZShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBcnRpY2xlKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQXJ0aWNsZXMoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2FydGljbGVzLycsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBnZXRDYXRlZ29yaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2F0ZWdvcmllcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldENhdGVnb3J5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUNhdGVnb3J5KGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjYXRlZ29yaWVzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ2F0ZWdvcnkoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYXRlZ29yaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhdGVnb3J5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjYXRlZ29yaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0VmFyaWFudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICd2YXJpYW50cy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFZhcmlhbnQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICB1cGRhdGVWYXJpYW50KGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMve2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVWYXJpYW50KGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMve2lkfWAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlVmFyaWFudChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMve2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVZhcmlhbnRzKGlkcykge1xuICAgIGlmICghaWRzKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHZhcmlhbnRzL2AsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaWRzXG4gICAgfSlcbiAgfVxuXG4gIGdlbmVyYXRlQXJ0aWNsZUltYWdlcyhpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgZ2VuZXJhdGVBcnRpY2xlSW1hZ2VzL3tpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgIH0pXG4gIH1cblxuICBsaXN0TWVkaWEoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdtZWRpYS8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldE1lZGlhKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtZWRpYS8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlTWVkaWEoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21lZGlhLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0pXG4gIH1cblxuICBkZWxldGVNZWRpYShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgbWVkaWEvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRPcmRlcnMocGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdvcmRlcnMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXNcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRPcmRlcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgb3JkZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlT3JkZXIoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBvcmRlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZ2V0QWRkcmVzc2VzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYWRkcmVzc2VzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQWRkcmVzcyhib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYWRkcmVzc2VzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQWRkcmVzcyhpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFkZHJlc3Nlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVBZGRyZXNzKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhZGRyZXNzZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVycygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVycy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUN1c3RvbWVyKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lcnMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDdXN0b21lcihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDdXN0b21lcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q2FjaGVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2FjaGVzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q2FjaGUoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhY2hlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZGVsZXRlQ2FjaGUoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhY2hlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhY2hlcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NhY2hlcy8nLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRDb3VudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjb3VudHJpZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDb3VudHJ5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUNvdW50cnkoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NvdW50cmllcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUNvdW50cnkoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ291bnRyeShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY291bnRyaWVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXJHcm91cHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lckdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEN1c3RvbWVyR3JvdXAoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVyR3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVDdXN0b21lckdyb3VwKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjdXN0b21lckdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUN1c3RvbWVyR3JvdXAoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lckdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDdXN0b21lckdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lckdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldE1hbnVmYWN0dXJlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdtYW51ZmFjdHVyZXJzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0TWFudWZhY3R1cmVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtYW51ZmFjdHVyZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVNYW51ZmFjdHVyZXIoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21hbnVmYWN0dXJlcnMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVNYW51ZmFjdHVyZXIoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtYW51ZmFjdHVyZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZU1hbnVmYWN0dXJlcihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgbWFudWZhY3R1cmVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldFByb3BlcnR5R3JvdXBzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAncHJvcGVydHlHcm91cHMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRQcm9wZXJ0eUdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlUHJvcGVydHlHcm91cChib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAncHJvcGVydHlHcm91cHMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVQcm9wZXJ0eUdyb3VwKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgcHJvcGVydHlHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlUHJvcGVydHlHcm91cChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgcHJvcGVydHlHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRTaG9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3Nob3BzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0U2hvcChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgc2hvcHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZVNob3AoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3Nob3BzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlU2hvcChpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHNob3BzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVNob3AoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHNob3BzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0VHJhbnNsYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAndHJhbnNsYXRpb25zLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0VHJhbnNsYXRpb24oaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHRyYW5zbGF0aW9ucy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlVHJhbnNsYXRpb24oaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVRyYW5zbGF0aW9uKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdHJhbnNsYXRpb25zLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVRyYW5zbGF0aW9uKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNob3B3YXJlXG4iXX0=