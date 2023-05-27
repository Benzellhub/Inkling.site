updateCartTotal();

document.getElementById('emptycart').addEventListener('click', emptyCart);
const cartBtns = document.getElementsByClassName('addtocart__btn');
for (let i = 0; i < cartBtns.length; i += 1) {
  cartBtns[i].addEventListener('click', function () {
    addToCart(this);
  });
}

function addToCart(elem) {
  let sibs = [];
  let getprice;
  let getproductName;
  let cart = [];
  let stringCart;
  while ((elem = elem.previousSibling)) {
    if (elem.nodeType === 3) continue;
    if (elem.className == 'price') {
      getprice = elem.innerText;
    }
    if (elem.className == 'product__name') {
      getproductName = elem.innerText;
    }
    sibs.push(elem);
  }
  const product = {
    productname: getproductName,
    price: getprice,
  };
  const stringProduct = JSON.stringify(product);

  if (!sessionStorage.getItem('cart')) {
    cart.push(stringProduct);
    stringCart = JSON.stringify(cart);
    sessionStorage.setItem('cart', stringCart);
    addedToCart(getproductName);
    updateCartTotal();
  } else {
    cart = JSON.parse(sessionStorage.getItem('cart'));
    cart.push(stringProduct);
    stringCart = JSON.stringify(cart);
    sessionStorage.setItem('cart', stringCart);
    addedToCart(getproductName);
    updateCartTotal();
  }
}

function updateCartTotal() {
  let total = 0;
  let price = 0;
  let items = 0;
  let productname = '';
  let carttable = '';
  if (sessionStorage.getItem('cart')) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    items = cart.length;
    for (let i = 0; i < items; i += 1) {
      let x = JSON.parse(cart[i]);
      price = parseFloat(x.price.split('$')[1]);
      productname = x.productname;
      carttable += `<tr><td>${productname}</td><td>$${price.toFixed(
        2
      )}</td></tr>`;
      total += price;
    }
  }
  document.getElementById('total').innerHTML = total.toFixed(2);
  document.getElementById('cart__table').innerHTML = carttable;
  document.getElementById('items__quantity').innerHTML = items;
}

function addedToCart(pname) {
  const message = `${pname} was added to the cart`;
  const alerts = document.getElementById('alerts');
  alerts.innerHTML = message;
  if (!alerts.classList.contains('message')) {
    alerts.classList.add('message');
  }
}

function emptyCart() {
  if (sessionStorage.getItem('cart')) {
    sessionStorage.removeItem('cart');
    updateCartTotal();
    const alerts = document.getElementById('alerts');
    alerts.innerHTML = '';
    if (alerts.classList.contains('message')) {
      alerts.classList.remove('message');
    }
  }
}
