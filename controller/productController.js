const { findById, findByIdAndUpdate } = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const ApiFeature = require("../utils/apiFeatures");

//create product---Admin Route
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//Update products ---Admin Route
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete Product ---Admin  Route
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

//get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const resultPerPage = 5;
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

//get single Product
exports.getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  res.status(200).json({ success: true, product });
});
