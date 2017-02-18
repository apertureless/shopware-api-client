import chai from 'chai'
import {describe} from 'ava-spec'
import test from 'ava'
import Shopware from '../dist'

import {article, article2} from './_fixtures/article'

const should = chai.should()

const HOST = process.env.TEST_SHOP_HOST
const USER = process.env.TEST_SHOP_USER
const API = process.env.TEST_SHOP_API

if (!HOST || !USER || !API) {
  throw new Errow('Please provide credentials as env variable: Host, User, API Key')
}

const api = new Shopware({
  host: HOST,
  user: USER,
  apiKey: API
})

let articleId

test.serial('`createArticle()`', async t => {
  let res = await api.createArticle(article)
  t.is(res.success, true)
  articleId = res.data.id
})

test('`deleteArticle(id)`', async t => {
  let id = await api.createArticle(article2)
  let res = await api.deleteArticle(id.data.id)
  t.is(res.success, true)
})

test('`getArticles()`', async t => {
  let articles = await api.getArticles()
  articles.should.be.an('array')
})

test('`getArticle(id)`', async t => {
  let article = await api.getArticles(articleId)
  t.is(article[0].id, articleId)
})

test.after.always('cleanup', async t => {
  let res = await api.deleteArticle(articleId)
  t.is(res.success, true)
  t.pass()
})
