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
  getRandomProducts,
  getRandomTelevisionAndMonitor,
  getRandomNetworkingAndLaptop,
  getRandomDigitalCameraAndGPS,
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

//get random products
router.post("/product/random", getRandomProducts);
router.post("/product/random/TeleAndMoni", getRandomTelevisionAndMonitor);
router.post("/product/random/NetAndLap", getRandomNetworkingAndLaptop);
router.post("/product/random/DigitalAndGPS", getRandomDigitalCameraAndGPS);

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
