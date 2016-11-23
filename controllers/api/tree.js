const router = require('express').Router(); //eslint-disable-line

const Tree = require('../../models/tree');
const Node = require('../../models/node');

router.get('/', (req, res) => {
  Tree.find({
    _id: req.query.id
  }, (err, docs) => {
    if (err) return res.status(500).send('Server Error!');
    res.json(docs);
  });
});

router.get('/all', (req, res) => {
  Tree.find({}, (err, docs) => {
    if (err) return res.status(500).send('Server Error!');
    res.json(docs);
  });
});

router.post('/', (req, res) => {
  let { name, date, src } = req.body;
  let newNode = new Node({
    name,
    date,
    src
  });
  newNode.save( (err, node) => {
    if (err) return res.status(500).send('Server Error!');

    let newTree = new Tree ({
      [node._id]: {
        image: node.src,
        children: {}
      }
    });

    newTree.save( (err, tree) => {
      if (err) return res.status(500).send('Server Error!');
      res.json(tree);
    });
  });
});

module.exports = router;
