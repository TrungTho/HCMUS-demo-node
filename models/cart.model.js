const productModel = require("./product.model");

module.exports = {
  add(cart, item) {
    for (cItem of cart) {
      if (cItem.id === item.id) {
        cItem.quantity += item.quantity;
        return;
      }
    }

    cart.push(item);
  },

  getTotalItems(cart) {
    let count = 0;
    for (item of cart) {
      count += item.quantity;
    }

    return count;
  },

  async getTotalMoney(cart) {
    let totalMoney = 0;
    for (item of cart) {
      const product = await productModel.getSingle(item.id);
      // console.log(product.Price);
      //console.log(Number(product.Price));
      totalMoney += item.quantity * Number(product.Price);
      // console.log(totalMoney);
    }

    return totalMoney;
  },

  del(cart, id) {
    // console.log("in model");
    // console.log(cart);
    // console.log("----------");
    // console.log(id);
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].id === id) {
        cart.splice(i, 1);
        return;
      }
    }
  },
};
