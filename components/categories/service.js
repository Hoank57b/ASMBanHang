
const categoryModel = require('./model');



exports.getCategories = async () => {
    //  return data;
    //  select * from categories
    const categories = await categoryModel.find().populate('_id');
    return categories;

}
exports.getById = async (id) => {
    const category = await categoryModel.findById(id).populate('_id');
    return category;
}
exports.insert = async (category) => {
    // data.push(product);
    const p = new categoryModel(category);
    await p.save();
  }
  
  // xoa san pham 
  exports.delete = async (id) => {
    // data = data.filter(item => item._id != id)
    await categoryModel.findByIdAndDelete(id);
  }
  
  /*
  sua thong tin san pham
  */
  
  exports.update = async (id, category) =>{
    // data = data.map(item => {
    //   if(item._id == id){
    //     item = {...item, ...product}
    //   }
    //   return item;
    // })
    await categoryModel.findByIdAndUpdate(id, category);
  }




