var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// //localhost:3000/san-pham/12345/edit  
// router.get('/san-pham/12345/edit', function(req, res, next) {
//   res.render('detail', { title: 'Express' });
// });

// //localhost:3000/danh-muc
// router.get('/danh-muc', function(req, res, next) {
//   res.render('product', { title: 'Express' });
// });

// //localhost:3000/thong-ke
// router.get('/san-pham', function(req, res, next) {
//   res.render('products', { title: 'Express' });
// });

//http://localhost:3000/tinh_dien_tich_tam_giac?canh_day=10&chieu_cao=5
/* GET dien tich tam giac page. */
router.get('/tinh_dien_tich_tam_giac', function (req, res, next) {
  const { canh_day, chieu_cao } = req.query;
  const dt = 1 / 2 * (canh_day * chieu_cao);
  res.render('index', { title: 'Diện tích tam giác', dt: dt });
});



//localhost:3000/dangnhap
router.get('/dang-nhap', [authentication.checkLogin], function (req, res, next) {
  res.render('login',{layout: false});
});



/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */
router.post('/dang-nhap', async function (req, res, next) {
  // xử lý login
  // đọc email, password từ body
  const { email, password } = req.body;
  // kiểm tra email, password
  const result = await userController.login(email, password);
  if (result) {
    const token = jwt.sign({ _id: result._id, email: result.email }, 'mykey');
    req.session.token = token;
    // nếu đúng: chuyển qua trang sản phẩm
    res.redirect('/san-pham');
  } else {
    // nếu sai: vẫn ở trang login
    res.redirect('/dang-nhap');
  }
});


  router.get('/dang-xuat', [authentication.checkLogin], function (req, res, next) {
    req.session.destroy(function (err) {
      // đăng xuất thành công chuyển sang trang đăng nhập
      res.redirect('/dang-nhap');
    });



});



module.exports = router;
