const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsByCategoryCount,
  productsCount,
  productStar,
  listRelated,
  listBrands,
  listAllByCategory,
  searchFilters,
  listByPage,
  listAllInShop,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);

// get all product of count
router.get("/products/total", productsCount);
// get count by each Category type
router.get("/products/totalByCategory/:slug", productsByCategoryCount);

router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);
router.post("/products/shop", listAllInShop);
router.post("/products/:slug", listByPage);

listAllInShop;

// rating
router.put("/product/star/:productId", authCheck, productStar);
// related
router.get("/product/related/:productId", listRelated);
router.get("/product/related", listAllByCategory);

//get brands
router.post("/product/brands/:_id", listBrands);
//search
router.post("/search/filters", searchFilters);

module.exports = router;
