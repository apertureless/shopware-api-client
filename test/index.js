import test from 'ava'
import Shopware from '../dist'

import {article, article2} from './_fixtures/article'
import category from './_fixtures/category'

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
let categoryId

test.serial('`createArticle(body)`', async t => {
  const res = await api.createArticle(article)
  t.is(res.success, true)
  articleId = res.data.id
})

test.serial('`updateArticle(id, article)`', async t => {
  const updatedArticle = article
  updatedArticle.mainDetail.inStock = 100
  const updated = await api.updateArticle(articleId, updatedArticle)
  const updatedData = await api.getArticle(updated.data.id)
  t.is(updatedData.mainDetail.inStock, updatedArticle.mainDetail.inStock)
})

test.serial('`deleteArticle(id)`', async t => {
  const id = await api.createArticle(article2)
  const res = await api.deleteArticle(id.data.id)
  t.is(res.success, true)
})

test('`getArticles()`', async t => {
  const articles = await api.getArticles()
  t.is(articles.length, 1)
})

test('`getArticle(id)`', async t => {
  const article = await api.getArticle(articleId)
  t.is(article.id, articleId)
})

test.serial('`createCategory(body)`', async t => {
  const res = await api.createCategory(category)
  categoryId = res.data.id
  t.is(res.success, true)
})

test.serial('`updateCategory(id, body)`', async t => {
  const newCategory = category
  newCategory.id = categoryId
  newCategory.name = 'Updated'

  const res = await api.updateCategory(categoryId, newCategory)
  t.is(res.success, true)

  const updatedCategory = await api.getCategory(categoryId)
  t.is(updatedCategory.name, newCategory.name)
})

test.serial('`deleteCategory(id)`', async t => {
  const res = await api.deleteCategory(categoryId)
  t.is(res.success, true)
})

test('`getCategories()`', async t => {
  const categories = await api.getCategories()
  t.is(categories[0].id, 1)
})

test('`getCategory(id)`', async t => {
  const category = await api.getCategory(638)
  t.is(category.id, 638)
})

test.after.always('cleanup', async t => {
  const res = await api.deleteArticle(articleId)
  t.is(res.success, true)
  t.pass()
})
