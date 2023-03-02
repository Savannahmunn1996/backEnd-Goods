const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/ctgs', async (req, res) => {
  try {
    const CData = await Category.findAll({
      include:[{ model: Product }] ,
    });
    res.status(200).json(CData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cateData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!cateData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
