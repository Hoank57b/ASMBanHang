var express = require('express');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');

const upload = require('../middle/upload');
const authentication = require('../middle/authentication');


/**
 * page: product
 * http://localhost:3000/san-pham
 * method: get
 * detail: get list products
 */
router.get('/', [authentication.checkLogin] , async function (req, res, next) {
  // lấy danh sách sản phẩm
  const data = await productController.getProducts();
  res.render('products', { products: data });
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: post
 * detail: insert new product
 */
router.post('/', [upload.single('image'), authentication.checkLogin], async function (req, res, next) {
  // xử lý thêm mới sản phẩm
  let { body, file } = req;
  let image = '';
  if (file) {
    image = 'http://192.168.1.17:3000/images/' + file.filename;
  }
  body = { ...body, image };
  await productController.insert(body);
  res.redirect('/san-pham');
});

/**
 * page: product insert
 * http://localhost:3000/san-pham/insert
 * method: get
 * detail: insert new product
 */
router.get('/insert', [authentication.checkLogin] ,async function (req, res, next) {
  // xử lý hiển thị trang thông tin thêm mới
  const categories = await categoryController.getCategories();
  res.render('product_insert', { categories: categories });
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/delete
 * method: delete
 * detail: delete product

 */
router.delete('/:id/delete', [authentication.checkLogin] ,async function (req, res, next) {
  // xử lý xóa sản phẩm
  const { id } = req.params;
  await productController.delete(id);

  res.json({ result: true });
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: get
 * detail: get one product
 */
router.get('/:id/edit', [authentication.checkLogin] , async function (req, res, next) {
  // xử lý lấy một sản phẩm
  const { id } = req.params;
  //lay mot san pham
  const product = await productController.getById(id);
  //lay danh sach danh muc
  const categories = await categoryController.getCategories();
  res.render('product', { product: product , categories: categories} );
});


/**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: post
 * detail: update one product
 */
router.post('/:id/edit', [upload.single('image'), authentication.checkLogin], async function (req, res, next) {
  // xử lý cập nhật một sản phẩm
  let { params, file, body } = req;
  delete body.image;

  if (file) {
    let image = 'http://192.168.1.17:3000/images/' + file.filename;
    body = { ...body, image }
  }

  await productController.update(params.id, body);
  res.redirect('/san-pham');
});






module.exports = router;