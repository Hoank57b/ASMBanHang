var express = require('express');
var router = express.Router();

const categoryController = require('../components/categories/controller');

router.get('/', async function (req, res, next) {
    // lấy danh sách sản phẩm
    const data = await categoryController.getCategories();
    res.render('categories', { categories: data });
  });

  router.post('/', async function (req, res, next) {
    // xử lý thêm mới sản phẩm
    let { body} = req;
    console.log('body',body);
    body = { ...body };
    await categoryController.insert(body);
    res.redirect('/danh-muc');
  });

  router.get('/insertcategory',async function (req, res, next) {
    // xử lý hiển thị trang thông tin thêm mới
    const categories = await categoryController.getCategories();
    res.render('category_insert', { categories: categories });
  });

  router.delete('/:id/deletecategory' ,async function (req, res, next) {
    // xử lý xóa sản phẩm
    const { id } = req.params;
    await categoryController.delete(id);
  
    res.json({ result: true });
  });
  
  router.get('/:id/editcategory' , async function (req, res, next) {
    // xử lý lấy một sản phẩm
    const { id } = req.params;
    //lay mot san pham
    const category = await categoryController.getById(id);
    res.render('category', { category: category } );
  });

  /**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: post
 * detail: update one product
 */
router.post('/:id/editcategory', async function (req, res, next) {
    // xử lý cập nhật một sản phẩm
    let { params, body } = req;
    delete body;
  
    await categoryController.update(params.id, body);
    res.redirect('/danh-muc');
  });



module.exports = router;