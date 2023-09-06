import MongoDao from "./mongo.dao.js";
import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  async getAllPaginated({
    limit = 10,
    page = 1,
    sortOrder = "asc",
    category = null,
    available = null,
  } = {}) {
    try {
      const query = {
        ...(category !== null && { category: { $eq: category } }),
        ...(available !== null && {
          stock: { ...(available ? { $gt: 0 } : { $eq: 0 }) },
        }),
      };

      const response = await ProductModel.paginate(query, {
        page,
        limit,
        sort: { price: sortOrder },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
