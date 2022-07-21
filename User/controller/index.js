  var listProducts = [];
var listCartProduct = [];

function getListProduct() {
  document.getElementById("loading").style.display = "block";
  axios({
    url: "https://62bc4dcaeff39ad5ee2239fc.mockapi.io/api/MoblieProducts",
    method: "GET",
  })
    .then(function (res) {
      document.getElementById("loading").style.display = "none";

      listProducts = res.data;
      renderProducts(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

getListProduct(renderProducts);

// render
function renderProducts(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    let cartLocalJS = JSON.stringify(data[i]);
    content += `
        <tr> 
            <td> ${i + 1}</td>
            <td>${data[i].name} </td>
            <td>
            <img width="50px" src="${data[i].img}" />
        </td>
            <td>${data[i].price} $</td>
            <td>${data[i].sceen}"</td>
            <td>${data[i].backCamera} </td> 
            <td>${data[i].frontCamera} </td>
            <td>${data[i].type} </td>
            <td>${data[i].desc} </td>
            <td>
            <button onclick='addCart(${cartLocalJS})' class="btn btn-info">
            Add to cart
            </button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function searchPhone() {
  var keyword = document
    .getElementById("inputSearch")
    .value.toLowerCase()
    .trim();
  const result = listProducts.filter((item) => {
    return item.name.toLowerCase().trim().includes(keyword.toLowerCase());
  });
  renderProducts(result);
}

function filterPhone() {
  var keyword = document.getElementById("filter").value.toLowerCase();

  if (keyword === "all") {
    renderProducts(listProducts);
    console.log("all");
  } else {
    const result = listProducts.filter((item) => {
      return item.type.toLowerCase() === keyword.toLowerCase();
    });
    renderProducts(result);
  }
}

// add cart
function addCart(cartPr) {
  let index = findById(cartPr.id);

  if (index !== -1) {
    listCartProduct[index].quantity = ++listCartProduct[index].quantity;
  } else {
    listCartProduct.push({ ...cartPr, quantity: 1 });
  }

  saveLocal();
  showCart();
}

//  rendergiohang
function showCart() {
  getLocal();
  let renderHTML = "";

  for (var i = 0; i < listCartProduct.length; i++) {
    renderHTML += `
    <tr> 
    <td>${i + 1}</td>
    <td>${listCartProduct[i].name}</td>
    <td>
    <img width="50px" src="${listCartProduct[i].img}" />
    </td>
    <td>${listCartProduct[i].price}$</td>
    <td>${listCartProduct[i].sceen}" , Camera trước ${
      listCartProduct[i].frontCamera
    }, Camera sau ${listCartProduct[i].backCamera}, ${
      listCartProduct[i].desc
    }</td>
    <td>${listCartProduct[i].quantity}</td>
    <td>
    <button onClick="deleteCart(${
      listCartProduct[i].id
    })" class="btn btn-danger">X</button>
    </td>
</tr>
    `;
  }
  document.getElementById("tblcart").innerHTML = renderHTML;
  document.getElementById("totalPrice").innerHTML = listCartProduct.reduce(
    (ac, cr) => {
      return (ac += cr.price * cr.quantity);
    },
    0
  );
 
}

// findById
function findById(id) {
  const index = listCartProduct.findIndex((cartItem) => {
    return cartItem.id === id;
  });
  return index;
}

// delete Cart
function deleteCart(id) {
  let index = findById(id);

  listCartProduct.splice(index, 1);
  saveLocal();
  showCart();
}

// renderbill
function renderbill() {
  listCartProduct = [];
  saveLocal();
  showCart();
}

// checkOut
function checkOut() {}

function getLocal() {
  let JSONCartLocal = localStorage.getItem("listCartProduct");

  if (JSONCartLocal == null) return;

  listCartProduct = JSON.parse(JSONCartLocal);
}

function saveLocal() {
  let JSONcart = JSON.stringify(listCartProduct);

  localStorage.setItem("listCartProduct", JSONcart);
}



showCart();
