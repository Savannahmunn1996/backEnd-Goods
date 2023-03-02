const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const CData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cateData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!cateData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedname) => {
      res.json(updatedname);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const theData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!theData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(theData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
