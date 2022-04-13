/**
 * service: tầng giao tiếp với database
 */

const productModel = require('./model');

/**
 * lấy danh sách tất cả sản phẩm từ database
 */
exports.getProducts = async () => {
  // return data;
  // select * from products 
  const products =await productModel.find().populate('category_id');
  return products;
}

/*
lay thong tin chi tiet
*/
exports.getById = async (id) => {
  // const product = data.filter(item => item._id == id)[0];
  // return product;
  const product = await productModel.findById(id).populate('category_id');
  return product;
}

/*
them mooi san pham
*/
exports.insert = async (product) => {
  // data.push(product);
  const p = new productModel(product);
  await p.save();
}

// xoa san pham 
exports.delete = async (id) => {
  // data = data.filter(item => item._id != id)
  await productModel.findByIdAndDelete(id);
}

/*
sua thong tin san pham
*/

exports.update = async (id, product) =>{
  // data = data.map(item => {
  //   if(item._id == id){
  //     item = {...item, ...product}
  //   }
  //   return item;
  // })
  await productModel.findByIdAndUpdate(id, product);
}




