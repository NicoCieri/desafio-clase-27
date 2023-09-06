import Services from "./class.services.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();

export default class ProductServices extends Services {
  constructor() {
    super(productDao);
  }

  async getAllPaginated(options) {
    try {
      const response = await productDao.getAllPaginated(options);

      const result = {
        payload: response.docs,
        status: "success",
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage
          ? `http://localhost:8080/views/products?page=${response.prevPage}`
          : null,
        nextLink: response.hasNextPage
          ? `http://localhost:8080/views/products?page=${response.nextPage}`
          : null,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async create(product) {
    try {
      const products = await productDao.getAll();

      if (products.find((p) => p.code === product.code))
        throw new Error("Product already exists");

      const newProduct = await productDao.create(product);
      return newProduct || false;
    } catch (error) {
      console.log(error);
    }
  }
}
