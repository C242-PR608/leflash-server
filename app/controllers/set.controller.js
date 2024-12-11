const db = require('../models')
const Set = db.sets

exports.findAll = (req, res) => {
  Set.find()
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving Set"
      })
    })

}

exports.findUserSet = (req, res) => {
  const id = req.body

  Set.find(id)
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving Set"
      })
    })

}

exports.findOne = (req, res) => {
  Set.findOne({
    _id: req.params.id
  })
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving Set"
      })
    })
}

exports.addSet = (req, res) => {
  const set = new Set(req.body);
  set.save()
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })

},

  exports.updateSet = (req, res) => {
    const id = String(req.params.id)
    req.body.updated = Date.now()
    Set.updateOne({
      _id: id
    }, {
      $set: req.body
    })
      .then((result) => {
        res.send(result)
      }).catch((err) => {
        res.status(409).send({
          message: err.message
        })
      })
  }

exports.removeSet = (req, res) => {
  const id = String(req.params.id)
  Set.findByIdAndDelete(id)
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })
}