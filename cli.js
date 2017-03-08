#!/usr/bin/env node
'use strict'

const Shopware = require('./dist/index.js')

const shop = new Shopware({
  host: 'http://tierzimmer.staging.nextindex.de',
  user: 'demo',
  apiKey: 've9QTAP9kwT5W3CRvvt0XXA8aqi3MORo6fiG0H6o'
})

const filter = {
    'property': 'status',
    'value': 0
  }

shop.getOrders(filter)
  .then(orders => console.log(orders))
  .catch(err => console.log(err))
