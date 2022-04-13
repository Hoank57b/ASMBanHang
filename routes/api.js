var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller')
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');
const async = require('hbs/lib/async');

/**
 * page: register
 * http://localhost:3000/api/register
 * method: post
 */
router.post('/register', async function (req, res, next) {
    const { email, password, confirm_password } = req.body;
    // kiểm tra email, password
    const result = await userController.register(email, password, confirm_password);
    if (result) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
});

/**
 * page: login
 * http://localhost:3000/api/ogin
 * method: post
 */
router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
        const token = jwt.sign({ _id: result._id, email: result.email }, 'mykey');
        res.json({ status: true , result, token });
    } else {
        res.json({ status: false });
    }
});


/**
 * page: product
 * http://localhost:3000/api/products
 * method: get
 * detail: get list products
 */
 router.get('/products' ,[authentication.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const products = await productController.getProducts();
    res.json(products);
  });

  router.get('/products/:id/detail' ,[authentication.checkToken], async function (req, res, next) {
    const { id } = req.params;
    const products = await productController.getById(id);
    res.json(products);
  });

  router.get('/categories', [authentication.checkToken], async function(req, res, next ){
      const categories = await categoryController.getCategories();
      res.json(categories);
  });
  router.get('/categories/:id/detail', [authentication.checkToken], async function(req, res, next){
      const categories = await categoryController.getById(id);
      res.json(categories);
  })





module.exports = router;