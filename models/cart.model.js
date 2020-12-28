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
};
