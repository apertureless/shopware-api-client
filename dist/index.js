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
    value: function getOrders() {
      return this.handleRequest({
        url: 'orders/',
        method: 'GET'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJyZXF1aXJlIiwiRVJST1IiLCJNSVNTSU5HX0lEIiwiY29kZSIsIm1lc3NhZ2UiLCJNSVNTSU5HX0JPRFkiLCJoYW5kbGVFcnJvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyIiwiU2hvcHdhcmUiLCJvcHRpb25zIiwiY29uc29sZSIsImVycm9yIiwiaG9zdCIsInVzZXIiLCJhcGlLZXkiLCJkZWZhdWx0cyIsImJhc2VVcmwiLCJ0aW1lb3V0IiwianNvbiIsImhlYWRlcnMiLCJhdXRoIiwicGFzcyIsInNlbmRJbW1lZGlhdGVseSIsImNvbmZpZyIsInNlbGVjdG9yIiwidGhlbiIsInJlc3BvbnNlRGF0YSIsInJlcyIsImNhdGNoIiwiaGFuZGxlUmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImlkIiwiaWRzIiwiYm9keSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLFVBQVVDLFFBQVEsd0JBQVIsQ0FBaEI7O0FBRUEsSUFBTUMsUUFBUTtBQUNaQyxjQUFZO0FBQ1ZDLFVBQU0sWUFESTtBQUVWQyxhQUFTO0FBRkMsR0FEQTtBQUtaQyxnQkFBYztBQUNaRixVQUFNLGNBRE07QUFFWkMsYUFBUztBQUZHO0FBTEYsQ0FBZDs7QUFXQSxJQUFNRSxjQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVY7QUFBQSxXQUFxQkEsT0FBT0MsR0FBUCxDQUFyQjtBQUFBLEdBQVosQ0FBUDtBQUFBLENBQXBCOztJQUVNQyxRO0FBQ0osb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsUUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWkMsY0FBUUMsS0FBUixDQUFjLGlDQUFkO0FBQ0Q7O0FBRUQsU0FBS0MsSUFBTCxHQUFZSCxRQUFRRyxJQUFwQjtBQUNBLFNBQUtDLElBQUwsR0FBWUosUUFBUUksSUFBcEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNMLFFBQVFLLE1BQXRCOztBQUVBLFNBQUtsQixPQUFMLEdBQWVBLFFBQVFtQixRQUFSLENBQWlCO0FBQzlCQyxlQUFTLEtBQUtKLElBQUwsR0FBWSxPQURTO0FBRTlCSyxlQUFTLEtBRnFCO0FBRzlCQyxZQUFNLElBSHdCO0FBSTlCQyxlQUFTO0FBQ1Asc0JBQWMscUJBRFA7QUFFUCx3QkFBZ0I7QUFGVCxPQUpxQjtBQVE5QkMsWUFBTTtBQUNKUCxjQUFNLEtBQUtBLElBRFA7QUFFSlEsY0FBTSxLQUFLUCxNQUZQO0FBR0pRLHlCQUFpQjtBQUhiO0FBUndCLEtBQWpCLENBQWY7QUFjRDs7OztrQ0FFYUMsTSxFQUFRQyxRLEVBQVU7QUFBQTs7QUFDOUIsYUFBTyxJQUFJcEIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxjQUFLVixPQUFMLENBQWEyQixNQUFiLEVBQ0dFLElBREgsQ0FDUSxlQUFPO0FBQ1gsY0FBTUMsZUFBZUYsV0FBV0csSUFBSUgsUUFBSixDQUFYLEdBQTJCRyxHQUFoRDtBQUNBdEIsa0JBQVFxQixZQUFSO0FBQ0QsU0FKSCxFQUtHRSxLQUxILENBS1MsZUFBTztBQUNadEIsaUJBQU9DLElBQUlOLE9BQVg7QUFDRCxTQVBIO0FBUUQsT0FUTSxDQUFQO0FBVUQ7Ozs4QkFFUztBQUNSLGFBQU8sS0FBSzRCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssVUFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztrQ0FFYTtBQUNaLGFBQU8sS0FBS0YsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxXQURtQjtBQUV4QkMsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7OytCQUVVQyxFLEVBQUk7QUFDYixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsMkJBQWlCRSxFQURPO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7a0NBRWFDLEUsRUFBSTtBQUNoQixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsMkJBQWlCRSxFQURPO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7OzttQ0FFY0UsRyxFQUFLO0FBQ2xCLFVBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ1IsZUFBTzlCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFdBRG1CO0FBRXhCQyxnQkFBUSxRQUZnQjtBQUd4QkU7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7a0NBRWFDLEksRUFBTTtBQUNsQixVQUFJLENBQUNBLElBQUwsRUFBVztBQUNULGVBQU8vQixZQUFZTCxNQUFNSSxZQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLMkIsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxXQURtQjtBQUV4QkMsZ0JBQVEsTUFGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O2tDQUVhRixFLEVBQUlFLEksRUFBTTtBQUN0QixVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQywyQkFBaUJFLEVBRE87QUFFeEJELGdCQUFRLEtBRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OzttQ0FFY0EsSSxFQUFNO0FBQ25CLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFdBRG1CO0FBRXhCQyxnQkFBUSxLQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7b0NBRWU7QUFDZCxhQUFPLEtBQUtMLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssYUFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztnQ0FFV0MsRSxFQUFJO0FBQ2QsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLDZCQUFtQkUsRUFESztBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7O21DQUVjRyxJLEVBQU07QUFDbkIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssYUFEbUI7QUFFeEJDLGdCQUFRLE1BRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OzttQ0FFY0YsRSxFQUFJRSxJLEVBQU07QUFDdkIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQzhCLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsNkJBQW1CRSxFQURLO0FBRXhCRCxnQkFBUSxLQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7bUNBRWNGLEUsRUFBSTtBQUNqQixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsNkJBQW1CRSxFQURLO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7OztrQ0FFYTtBQUNaLGFBQU8sS0FBS0YsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxXQURtQjtBQUV4QkMsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7OytCQUVVQyxFLEVBQUk7QUFDYixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsMkJBQWlCRSxFQURPO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7a0NBRWFDLEUsRUFBSUUsSSxFQUFNO0FBQ3RCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUR3QjtBQUV4QkMsZ0JBQVEsS0FGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O2tDQUVhRixFLEVBQUlFLEksRUFBTTtBQUN0QixVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyw0QkFEd0I7QUFFeEJDLGdCQUFRLE1BRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OztrQ0FFYUYsRSxFQUFJO0FBQ2hCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyw0QkFEd0I7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7O21DQUVjRSxHLEVBQUs7QUFDbEIsVUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDUixlQUFPOUIsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLHdCQUR3QjtBQUV4QkMsZ0JBQVEsUUFGZ0I7QUFHeEJFO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7OzBDQUVxQkQsRSxFQUFJO0FBQ3hCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyx5Q0FEd0I7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFFBRG1CO0FBRXhCQyxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7NkJBRVFDLEUsRUFBSTtBQUNYLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyx3QkFBY0UsRUFEVTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7O2dDQUVXRyxJLEVBQU07QUFDaEIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssUUFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7O2dDQUVXQyxFLEVBQUk7QUFDZCxVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsd0JBQWNFLEVBRFU7QUFFeEJELGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFNBRG1CO0FBRXhCQyxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7NkJBRVFDLEUsRUFBSTtBQUNYLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyx5QkFBZUUsRUFEUztBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsQ0FBUDtBQUlEOzs7Z0NBRVdDLEUsRUFBSUUsSSxFQUFNO0FBQ3BCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLHlCQUFlRSxFQURTO0FBRXhCRCxnQkFBUSxLQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7bUNBRWM7QUFDYixhQUFPLEtBQUtMLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssWUFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztrQ0FFYUcsSSxFQUFNO0FBQ2xCLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFlBRG1CO0FBRXhCQyxnQkFBUSxNQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7a0NBRWFGLEUsRUFBSUUsSSxFQUFNO0FBQ3RCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVEsS0FGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O2tDQUVhRixFLEVBQUk7QUFDaEIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7O21DQUVjO0FBQ2IsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFlBRG1CO0FBRXhCQyxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7Z0NBRVdDLEUsRUFBSTtBQUNkLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyw0QkFBa0JFLEVBRE07QUFFeEJELGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OzttQ0FFY0csSSxFQUFNO0FBQ25CLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFlBRG1CO0FBRXhCQyxnQkFBUSxNQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7bUNBRWNGLEUsRUFBSUUsSSxFQUFNO0FBQ3ZCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVEsS0FGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O21DQUVjRixFLEVBQUk7QUFDakIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsQ0FBUDtBQUlEOzs7Z0NBRVc7QUFDVixhQUFPLEtBQUtGLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssU0FEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7Ozs2QkFFUUMsRSxFQUFJO0FBQ1gsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLHlCQUFlRSxFQURTO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7Z0NBRVdDLEUsRUFBSTtBQUNkLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyx5QkFBZUUsRUFEUztBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsQ0FBUDtBQUlEOzs7bUNBRWM7QUFDYixhQUFPLEtBQUtGLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssU0FEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7O21DQUVjO0FBQ2IsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFlBRG1CO0FBRXhCQyxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7K0JBRVVDLEUsRUFBSTtBQUNiLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQyw0QkFBa0JFLEVBRE07QUFFeEJELGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztrQ0FFYUcsSSxFQUFNO0FBQ2xCLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLFlBRG1CO0FBRXhCQyxnQkFBUSxNQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7a0NBRWFGLEUsRUFBSUUsSSxFQUFNO0FBQ3RCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVEsS0FGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O2tDQUVhRixFLEVBQUk7QUFDaEIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLDRCQUFrQkUsRUFETTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsQ0FBUDtBQUlEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0YsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxpQkFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztxQ0FFZ0JDLEUsRUFBSTtBQUNuQixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsaUNBQXVCRSxFQURDO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7d0NBRW1CRyxJLEVBQU07QUFDeEIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssaUJBRG1CO0FBRXhCQyxnQkFBUSxNQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7d0NBRW1CRixFLEVBQUlFLEksRUFBTTtBQUM1QixVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxpQ0FBdUJFLEVBREM7QUFFeEJELGdCQUFRLEtBRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7Ozt3Q0FFbUJGLEUsRUFBSTtBQUN0QixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsaUNBQXVCRSxFQURDO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7Ozt1Q0FFa0I7QUFDakIsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLGdCQURtQjtBQUV4QkMsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7O29DQUVlQyxFLEVBQUk7QUFDbEIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLGdDQUFzQkUsRUFERTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7O3VDQUVrQkcsSSxFQUFNO0FBQ3ZCLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLGdCQURtQjtBQUV4QkMsZ0JBQVEsTUFGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O3VDQUVrQkYsRSxFQUFJRSxJLEVBQU07QUFDM0IsVUFBSSxDQUFDRixFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQ21DLElBQUwsRUFBVztBQUNULGVBQU8vQixZQUFZTCxNQUFNSSxZQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLMkIsYUFBTCxDQUFtQjtBQUN4QkMsZ0NBQXNCRSxFQURFO0FBRXhCRCxnQkFBUSxLQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7dUNBRWtCRixFLEVBQUk7QUFDckIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLGdDQUFzQkUsRUFERTtBQUV4QkQsZ0JBQVE7QUFGZ0IsT0FBbkIsQ0FBUDtBQUlEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0YsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxpQkFEbUI7QUFFeEJDLGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OztxQ0FFZ0JDLEUsRUFBSTtBQUNuQixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsaUNBQXVCRSxFQURDO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7d0NBRW1CRyxJLEVBQU07QUFDeEIsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssaUJBRG1CO0FBRXhCQyxnQkFBUSxNQUZnQjtBQUd4Qkc7QUFId0IsT0FBbkIsQ0FBUDtBQUtEOzs7d0NBRW1CRixFLEVBQUlFLEksRUFBTTtBQUM1QixVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQyxpQ0FBdUJFLEVBREM7QUFFeEJELGdCQUFRLEtBRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7Ozt3Q0FFbUJGLEUsRUFBSTtBQUN0QixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsaUNBQXVCRSxFQURDO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7OzsrQkFFVTtBQUNULGFBQU8sS0FBS0YsYUFBTCxDQUFtQjtBQUN4QkMsYUFBSyxRQURtQjtBQUV4QkMsZ0JBQVE7QUFGZ0IsT0FBbkIsRUFHSixNQUhJLENBQVA7QUFJRDs7OzRCQUVPQyxFLEVBQUk7QUFDVixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsd0JBQWNFLEVBRFU7QUFFeEJELGdCQUFRO0FBRmdCLE9BQW5CLEVBR0osTUFISSxDQUFQO0FBSUQ7OzsrQkFFVUcsSSxFQUFNO0FBQ2YsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLGFBQUssUUFEbUI7QUFFeEJDLGdCQUFRLE1BRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OzsrQkFFVUYsRSxFQUFJRSxJLEVBQU07QUFDbkIsVUFBSSxDQUFDRixFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQ21DLElBQUwsRUFBVztBQUNULGVBQU8vQixZQUFZTCxNQUFNSSxZQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLMkIsYUFBTCxDQUFtQjtBQUN4QkMsd0JBQWNFLEVBRFU7QUFFeEJELGdCQUFRLEtBRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OzsrQkFFVUYsRSxFQUFJO0FBQ2IsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDUCxlQUFPN0IsWUFBWUwsTUFBTUMsVUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzhCLGFBQUwsQ0FBbUI7QUFDeEJDLHdCQUFjRSxFQURVO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixDQUFQO0FBSUQ7OztzQ0FFaUI7QUFDaEIsYUFBTyxLQUFLRixhQUFMLENBQW1CO0FBQ3hCQyxhQUFLLGVBRG1CO0FBRXhCQyxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7bUNBRWNDLEUsRUFBSTtBQUNqQixVQUFJLENBQUNBLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLOEIsYUFBTCxDQUFtQjtBQUN4QkMsK0JBQXFCRSxFQURHO0FBRXhCRCxnQkFBUTtBQUZnQixPQUFuQixFQUdKLE1BSEksQ0FBUDtBQUlEOzs7c0NBRWlCQyxFLEVBQUlFLEksRUFBTTtBQUMxQixVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQLGVBQU83QixZQUFZTCxNQUFNQyxVQUFsQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1QsZUFBTy9CLFlBQVlMLE1BQU1JLFlBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUsyQixhQUFMLENBQW1CO0FBQ3hCQywrQkFBcUJFLEVBREc7QUFFeEJELGdCQUFRLE1BRmdCO0FBR3hCRztBQUh3QixPQUFuQixDQUFQO0FBS0Q7OztzQ0FFaUJGLEUsRUFBSUUsSSxFQUFNO0FBQzFCLFVBQUksQ0FBQ0YsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNtQyxJQUFMLEVBQVc7QUFDVCxlQUFPL0IsWUFBWUwsTUFBTUksWUFBbEIsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSzJCLGFBQUwsQ0FBbUI7QUFDeEJDLCtCQUFxQkUsRUFERztBQUV4QkQsZ0JBQVEsS0FGZ0I7QUFHeEJHO0FBSHdCLE9BQW5CLENBQVA7QUFLRDs7O3NDQUVpQkYsRSxFQUFJO0FBQ3BCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTO0FBQ1AsZUFBTzdCLFlBQVlMLE1BQU1DLFVBQWxCLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUs4QixhQUFMLENBQW1CO0FBQ3hCQywrQkFBcUJFLEVBREc7QUFFeEJELGdCQUFRO0FBRmdCLE9BQW5CLENBQVA7QUFJRDs7Ozs7O0FBSUhJLE9BQU9DLE9BQVAsR0FBaUI1QixRQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJylcblxuY29uc3QgRVJST1IgPSB7XG4gIE1JU1NJTkdfSUQ6IHtcbiAgICBjb2RlOiAnbWlzc2luZ19pZCcsXG4gICAgbWVzc2FnZTogJ01pc3NpbmcgYGlkYCBwYXJhbWV0ZXInXG4gIH0sXG4gIE1JU1NJTkdfQk9EWToge1xuICAgIGNvZGU6ICdtaXNzaW5nX2JvZHknLFxuICAgIG1lc3NhZ2U6ICdNaXNzaW5nIGEgcHJvcGVyIGBib2R5YCBwYXJhbWV0ZXInXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRXJyb3IgPSBlcnIgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KGVycikpXG5cbmNsYXNzIFNob3B3YXJlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gaG9zdCwgdXNlciBvciBhcGkga2V5IGZvdW5kLicpXG4gICAgfVxuXG4gICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0XG4gICAgdGhpcy51c2VyID0gb3B0aW9ucy51c2VyXG4gICAgdGhpcy5hcGlLZXkgPSBvcHRpb25zLmFwaUtleVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdC5kZWZhdWx0cyh7XG4gICAgICBiYXNlVXJsOiB0aGlzLmhvc3QgKyAnL2FwaS8nLFxuICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICBqc29uOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnVXNlci1BZ2VudCc6ICdTaG9wd2FyZSBBUEkgQ2xpZW50JyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgfSxcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgICBwYXNzOiB0aGlzLmFwaUtleSxcbiAgICAgICAgc2VuZEltbWVkaWF0ZWx5OiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVSZXF1ZXN0KGNvbmZpZywgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZXF1ZXN0KGNvbmZpZylcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBzZWxlY3RvciA/IHJlc1tzZWxlY3Rvcl0gOiByZXNcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVyci5tZXNzYWdlKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB2ZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAndmVyc2lvbi8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldEFydGljbGVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRBcnRpY2xlKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhcnRpY2xlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZGVsZXRlQXJ0aWNsZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYXJ0aWNsZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBkZWxldGVBcnRpY2xlcyhpZHMpIHtcbiAgICBpZiAoIWlkcykge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhcnRpY2xlcy8nLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGlkc1xuICAgIH0pXG4gIH1cblxuICBjcmVhdGVBcnRpY2xlKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhcnRpY2xlcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUFydGljbGUoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBhcnRpY2xlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBcnRpY2xlcyhib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGdldENhdGVnb3JpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjYXRlZ29yaWVzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q2F0ZWdvcnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2F0ZWdvcmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ2F0ZWdvcnkoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NhdGVnb3JpZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDYXRlZ29yeShpZCwgYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ2F0ZWdvcnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNhdGVnb3JpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRWYXJpYW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ3ZhcmlhbnRzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0VmFyaWFudChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIHVwZGF0ZVZhcmlhbnQoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy97aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVZhcmlhbnQoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy97aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVWYXJpYW50KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB2YXJpYW50cy97aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlVmFyaWFudHMoaWRzKSB7XG4gICAgaWYgKCFpZHMpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdmFyaWFudHMvYCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBpZHNcbiAgICB9KVxuICB9XG5cbiAgZ2VuZXJhdGVBcnRpY2xlSW1hZ2VzKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBnZW5lcmF0ZUFydGljbGVJbWFnZXMve2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnXG4gICAgfSlcbiAgfVxuXG4gIGxpc3RNZWRpYSgpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21lZGlhLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0TWVkaWEoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1lZGlhLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVNZWRpYShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWVkaWEvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZU1lZGlhKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtZWRpYS8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldE9yZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ29yZGVycy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldE9yZGVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBvcmRlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gIH1cblxuICB1cGRhdGVPcmRlcihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG9yZGVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhZGRyZXNzZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVBZGRyZXNzKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdhZGRyZXNzZXMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBZGRyZXNzKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgYWRkcmVzc2VzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUFkZHJlc3MoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGFkZHJlc3Nlcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY3VzdG9tZXJzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVycy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ3VzdG9tZXIoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVycy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUN1c3RvbWVyKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUN1c3RvbWVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjdXN0b21lcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRDYWNoZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdjYWNoZXMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRDYWNoZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2FjaGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBkZWxldGVDYWNoZShpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY2FjaGVzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ2FjaGVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY2FjaGVzLycsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldENvdW50cmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2NvdW50cmllcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldENvdW50cnkoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNvdW50cmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlQ291bnRyeShib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnY291bnRyaWVzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ291bnRyeShpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGNvdW50cmllcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDb3VudHJ5KGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBjb3VudHJpZXMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRDdXN0b21lckdyb3VwcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVyR3JvdXBzLycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgZ2V0Q3VzdG9tZXJHcm91cChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgY3VzdG9tZXJHcm91cHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZUN1c3RvbWVyR3JvdXAoYm9keSkge1xuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ2N1c3RvbWVyR3JvdXBzLycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ3VzdG9tZXJHcm91cChpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVyR3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUN1c3RvbWVyR3JvdXAoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYGN1c3RvbWVyR3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0TWFudWZhY3R1cmVycygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogJ21hbnVmYWN0dXJlcnMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRNYW51ZmFjdHVyZXIoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1hbnVmYWN0dXJlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGNyZWF0ZU1hbnVmYWN0dXJlcihib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnbWFudWZhY3R1cmVycy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZU1hbnVmYWN0dXJlcihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYG1hbnVmYWN0dXJlcnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlTWFudWZhY3R1cmVyKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBtYW51ZmFjdHVyZXJzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9KVxuICB9XG5cbiAgZ2V0UHJvcGVydHlHcm91cHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdwcm9wZXJ0eUdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0sICdkYXRhJylcbiAgfVxuXG4gIGdldFByb3BlcnR5R3JvdXAoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHByb3BlcnR5R3JvdXBzLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0eUdyb3VwKGJvZHkpIHtcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICdwcm9wZXJ0eUdyb3Vwcy8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVByb3BlcnR5R3JvdXAoaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVQcm9wZXJ0eUdyb3VwKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBwcm9wZXJ0eUdyb3Vwcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG4gIGdldFNob3BzKCkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnc2hvcHMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRTaG9wKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGBzaG9wcy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSwgJ2RhdGEnKVxuICB9XG5cbiAgY3JlYXRlU2hvcChib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiAnc2hvcHMvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVTaG9wKGlkLCBib2R5KSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfSUQpXG4gICAgfVxuXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19CT0RZKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgc2hvcHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlU2hvcChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgc2hvcHMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pXG4gIH1cblxuICBnZXRUcmFuc2xhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6ICd0cmFuc2xhdGlvbnMvJyxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBnZXRUcmFuc2xhdGlvbihpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBgdHJhbnNsYXRpb25zLyR7aWR9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9LCAnZGF0YScpXG4gIH1cblxuICBjcmVhdGVUcmFuc2xhdGlvbihpZCwgYm9keSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0lEKVxuICAgIH1cblxuICAgIGlmICghYm9keSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKEVSUk9SLk1JU1NJTkdfQk9EWSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHRyYW5zbGF0aW9ucy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlVHJhbnNsYXRpb24oaWQsIGJvZHkpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVFcnJvcihFUlJPUi5NSVNTSU5HX0JPRFkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdCh7XG4gICAgICB1cmw6IGB0cmFuc2xhdGlvbnMvJHtpZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlVHJhbnNsYXRpb24oaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gaGFuZGxlRXJyb3IoRVJST1IuTUlTU0lOR19JRClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYHRyYW5zbGF0aW9ucy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfSlcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hvcHdhcmVcbiJdfQ==