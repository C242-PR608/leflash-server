module.exports = (app) => {
  const sets = require('../controllers/set.controller')
  const router = require('express').Router()

  router.get('/', sets.findAll)
  router.get('/user', sets.findUserSet)
  router.get('/:id', sets.findOne)
  router.post('/', sets.addSet)
  router.put('/:id', sets.updateSet)
  router.delete('/:id', sets.removeSet)

  app.use('/api/sets', router)
}