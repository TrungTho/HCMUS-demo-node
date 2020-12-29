module.exports = {
  add(cart, item) {
    for (cItem of cart) {
      if (cItem.id === item.id) {
        ci.quantity += item.quantity;
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
