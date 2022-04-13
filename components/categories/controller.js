
const categoryService = require('./service');

exports.getCategories = async () => {
   let data = await categoryService.getCategories();
   data = data.map(item =>{
      item = {
         _id: item._id,
         name: item.name,
         description: item.description
      }
      return item;
   })
   return data;
}

exports.getById = async (id) => {
   let product = await categoryService.getById(id);
   product = {
      _id: product._id,
      name: product.name,
      description: product.description
   }
   return product;
}

exports.insert = async (body) => {
   const { name, description} = body;
   const product = {name, description}
   await categoryService.insert(product);
}

exports.delete = async (id) => {
   await categoryService.delete(id);
}

exports.update = async (id, product) => {
   await categoryService.update(id, product)
}