const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((findCategories) => res.json(findCategories))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!getCategory) {
      res.status(404).json({ message: 'Not Found!' });
      return;
    }

    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((createCategory) => res.status(200).json(createCategory))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const putCategory = await Category.update(req.body, { 
      where: {
        id: req.params.id
      }
    });

    if (!putCategory) {
      res.status(404).json({ message: 'Not Found!' });
      return;
    }

    res.status(200).json(putCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'Not Found!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;