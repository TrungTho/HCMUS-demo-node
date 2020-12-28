module.exports = {
  add(cart, item) {
    for (cItem of cart) {
      if (cItem === item) {
        ci.quantity += +item.quantity;
        return;
      }
    }

    cart.push(item);
  },
};
