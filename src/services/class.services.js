export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return items;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      return item ?? false;
    } catch (error) {
      console.log(error);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      return newItem ?? false;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      return await this.dao.update(id, obj);
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      return await this.dao.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
