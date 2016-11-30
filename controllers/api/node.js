const router = require('express').Router(); //eslint-disable-line
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const Node = require('../../models/node');

router.get('/', (req, res) => {
  Node.find({
    _id: req.query.id
  }, (err, doc) => {
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
    mongoClient.connect('mongodb://stanley:stanley123@ds157187.mlab.com:57187/sutditor', (err, db) => {
      if (err) return res.status(500).send('Server Error!');
      db.collection('trees').find(ObjectId(sourceTree)).toArray( (err, tree) => {
        if (err) return res.status(500).send('Server Error!');
        tree = tree[0];
        let childrenObj = tree[parents[0]];
        if ( childrenObj.children ) {
          childrenObj = childrenObj.children;
          parents.forEach( (item, index) => {
            if ( index === parents.length - 1 ) childrenObj = childrenObj[item];
            else if ( index > 0 ) childrenObj = childrenObj[item].children;
          });
          if ( childrenObj.children ) {
            childrenObj.children[node._id] = { img: node.src };
          } else {
            childrenObj.children = { [node._id]: {img: node.src} };
          }
        } else {
          childrenObj.children = { [node._id]: {img: node.src} };
        }

        db.collection('trees').save(tree);
      });
    });
  });
});

module.exports = router;
