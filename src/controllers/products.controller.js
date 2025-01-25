import productsManager from "../data/fs/products.fs.js";

const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.status(200).json({ response: one });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateOne(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProduct,
  destroyProduct,
};