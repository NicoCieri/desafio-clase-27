import { createResponse } from "../utils.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res, next) {
    try {
      const items = await this.service.getAll();
      createResponse(res, 200, items);
    } catch (error) {
      next(error.message);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const items = await this.service.getById(id);
      if (!items)
        createResponse(res, 404, {
          method: "service",
          error: "Item not found",
        });
      else createResponse(res, 200, items);
    } catch (error) {
      next(error.message);
    }
  }

  async create(req, res, next) {
    try {
      const newItem = await this.service.create(req.body);
      if (!newItem)
        createResponse(res, 404, {
          method: "service",
          error: "Valiadtion error",
        });
      else createResponse(res, 200, newItem);
    } catch (error) {
      next(error.message);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          method: "service",
          error: "Item not found",
        });
      else {
        const newItem = await this.service.update(id, req.body);
        createResponse(res, 200, newItem);
      }
    } catch (error) {
      next(error.message);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          method: "service",
          error: "Item not found",
        });
      else {
        const deletedItem = await this.service.delete(id);
        createResponse(res, 200, deletedItem);
      }
    } catch (error) {
      next(error.message);
    }
  }
}
