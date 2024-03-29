import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

// GET RANDOM PRODUCTS
export const getRandomProducts = async () =>
  await axios.post(`${process.env.REACT_APP_API}/product/random`);

export const getRandomTelevisionAndMonitor = async () =>
  await axios.post(`${process.env.REACT_APP_API}/product/random/TeleAndMoni`);

export const getRandomNetworkingAndLaptop = async () =>
  await axios.post(`${process.env.REACT_APP_API}/product/random/NetAndLap`);

export const getRandomDigitalCameraAndGPS = async () =>
  await axios.post(`${process.env.REACT_APP_API}/product/random/DigitalAndGPS`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

//Home Page
export const getProductsByPage = async (sort, order, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    limit,
  });

//Shop
export const getProductsInShopByPage = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products/shop`, {
    sort,
    order,
    page,
  });

//Category page
export const getProducts = async (sort, order, page, slug) =>
  await axios.post(`${process.env.REACT_APP_API}/products/${slug}`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getCategoryProductByCount = async (slug) =>
  await axios.get(
    `${process.env.REACT_APP_API}/products/totalByCategory/${slug}`
  );

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const getAllByCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related`, { slug });

export const getBrands = async (_id) =>
  await axios.post(`${process.env.REACT_APP_API}/product/brands/${_id}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
