// import các thư viện cần dùng
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const mongoose = require('mongoose');
require('./components/users/model');
require('./components/products/model');
require('./components/categories/model');




// khai báo các router
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var apiRoutes = require('./routes/api');
var categoryRoute = require('./routes/category');






var app = express();

// view engine setup
// HBS engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mykey',
  resave : true,
  saveUninitialized: true,
  cookie: {secure: false}
}))

mongoose.connect('mongodb+srv://admin:123@cluster0.uvnjj.mongodb.net/Hoanps16094?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err)); 


// http://localhost:3000/
// import các router
app.use('/', indexRouter);
app.use('/san-pham', productRouter);
app.use('/api', apiRoutes);
app.use('/danh-muc', categoryRoute);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// dang-nhap
// san-pham
// danh-muc
// chi-tiet-san-pham
// chi-tiet-danh-muc
// thong-ke


/**
 * 
 * localhost:3000/
 * method: get                          - nếu chưa đăng nhập: chuyển qua đăng nhập
 *                                      - nếu đã đăng nhập: chuyển qua sản phẩm / chuyển qua thống kê
 * 
 * =============================
 * 
 * localhost:3000/dang-nhap
 * method: get                          hiện trang đăng nhập
 * method: post                         thực hiện đăng nhập
 * 
 * localhost:3000/dang-xuat
 * method: get                          hiện trang đăng xuất
 * 
 * 
 * =============================
 * 
 * localhost:3000/san-pham
 * method: get                          thực hiện lấy danh sách sản phẩm
 * method: post                         thực hiện thêm mới sản phẩm
 * method: delete                       thực hiện xóa sản phẩm
 * 
 * localhost:3000/san-pham/12345/edit   
 * method: get                          lấy thông tin chi tiết sản phẩm
 * method: put                          cập nhật thông tin sản phẩm
 * 
 * =============================
 * 
 * localhost:3000/danh-muc
 * method: get                          thực hiện lấy danh mục 
 * method: post                         thực hiện thêm mới danh mục
 * method: delete                       thực hiện xóa danh mục
 * 
 * localhost:3000/danh-muc/12345/edit   
 * method: get                          lấy thông tin chi tiết danh mục
 * method: put                          cập nhật thông tin danh mục
 * 
 * =============================
 * 
 * localhost:3000/thong-ke
 * method: get                          thực hiện lấy thông tin trang thống kê
 * 
 */




// lab 2
// tạo 1 project expressjs, view hbs
// viết 2 pages:
// http://localhost:3000/canh-day/10/chieu-cao/5
// render page có diện tích tam giác
// http://localhost:3000/dang-nhap
// render page có giao diện bootstraps