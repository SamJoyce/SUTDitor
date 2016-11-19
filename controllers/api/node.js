const router = require('express').Router(); //eslint-disable-line

const Node = require('../../models/node');
const Tree = require('../../models/tree');

router.get('/', (req, res) => {
  Node.findById(req.body.id, (err, doc) => {
    if (err) return res.status(500).send('Server Error!');
    res.json(doc);
  });
});

router.post('/', (req, res) => {
  let { name, date, src, parents, sourceTree } = req.body;

  let newNode = new Node({
    name,
    date,
    src,
    parents
  });

  newNode.save( (err, node) => {
    if (err) return res.status(500).send('Server Error!');
    Tree.findById(sourceTree, (err, tree) => {
      if (err) return res.status(500).send('Server Error!');
      let childrenArray = tree[parents[0]].children;
      parents.forEach( (p, index) => {
        if ( index > 0 ) childrenArray = childrenArray[p].children;
      });
      childrenArray.push({
        [node._id]: {
          image: node.src,
          children: {}
        }
      });
    });
  });
});

module.exports = router;
