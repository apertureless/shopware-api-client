import test from 'ava'
import Shopware from '../dist'

import {article, article2} from './_fixtures/article'

const HOST = process.env.TEST_SHOP_HOST
const USER = process.env.TEST_SHOP_USER
const API = process.env.TEST_SHOP_API

if (!HOST || !USER || !API) {
  throw new Error('Please provide credentials as env variable: Host, User, API Key')
}

const api = new Shopware({
  host: HOST,
  user: USER,
  apiKey: API
})

let articleId

test.serial('`createArticle()`', async t => {
  const res = await api.createArticle(article)
  t.is(res.success, true)
  articleId = res.data.id
})

test('`deleteArticle(id)`', async t => {
  const id = await api.createArticle(article2)
  const res = await api.deleteArticle(id.data.id)
  t.is(res.success, true)
})

test('`getArticles()`', async t => {
  const articles = await api.getArticles()
  t.is(articles.length, 1)
})

test('`getArticle(id)`', async t => {
  const article = await api.getArticles(articleId)
  t.is(article[0].id, articleId)
})

test.after.always('cleanup', async t => {
  const res = await api.deleteArticle(articleId)
  t.is(res.success, true)
  t.pass()
})
