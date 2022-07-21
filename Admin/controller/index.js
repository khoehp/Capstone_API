var listProducts = [];

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

getListProduct();

// render
function renderProducts(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
        <tr> 
            <td> ${i + 1}</td>
            <td>${data[i].name} </td>
            <td>${data[i].price} $</td>
            <td>${data[i].sceen}"</td>
            <td>${data[i].backCamera} </td>
            <td>${data[i].frontCamera} </td>
            <td>
                <img width="50px" src="${data[i].img}" />
            </td>
            <td>${data[i].type} </td>
            <td>${data[i].desc} </td>
            <td>
            <button onclick="deleteProduct('${
              data[i].id
            }')" class="btn btn-danger"> Xóa</button>
            <button onclick="getProduct('${
              data[i].id
            }')" class="btn btn-info">Cập nhật </button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function createProduct() {
  var isValid = validateForm();
  if (!isValid) return;

  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodSize = document.getElementById("Kichthuoc").value;
  var prodBack = document.getElementById("BackCam").value;
  var prodFront = document.getElementById("FrontCam").value;
  var prodImg = document.getElementById("HinhSP").value;
  var prodDesc = document.getElementById("MoTa").value;
  var prodType = document.getElementById("Loai").value;

  var product = new Product(
    prodName,
    prodPrice,
    prodSize,
    prodBack,
    prodFront,
    prodImg,
    prodDesc,
    prodType
  );

  axios({
    url: "https://62bc4dcaeff39ad5ee2239fc.mockapi.io/api/MoblieProducts",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      console.log(res);
      getListProduct();
      document.getElementById("btnCloseModel").click();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function deleteProduct(id) {
  axios({
    url: "https://62bc4dcaeff39ad5ee2239fc.mockapi.io/api/MoblieProducts/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      getListProduct();
      alert("Xóa thành công");
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getProduct(id) {
  console.log(id);
  axios({
    url: "https://62bc4dcaeff39ad5ee2239fc.mockapi.io/api/MoblieProducts/" + id,
    method: "GET",
  })
    .then(function (res) {
      document.getElementById("btnThemSP").click();

      if (id) {
        document.getElementById("TenSP").value = res.data.name;
        document.getElementById("GiaSP").value = res.data.price;
        document.getElementById("Kichthuoc").value = res.data.sceen;
        document.getElementById("BackCam").value = res.data.backCamera;
        document.getElementById("FrontCam").value = res.data.frontCamera;
        document.getElementById("HinhSP").value = res.data.img;
        document.getElementById("MoTa").value = res.data.desc;
        document.getElementById("Loai").value = res.data.type;
        document.getElementById("productId").value = res.data.id;
      }

      document.getElementById("btnUpdate").style.display = "block";
      document.getElementById("btnSaveInfo").style.display = "none";
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodSize = document.getElementById("Kichthuoc").value;
  var prodBack = document.getElementById("BackCam").value;
  var prodFront = document.getElementById("FrontCam").value;
  var prodImg = document.getElementById("HinhSP").value;
  var prodDesc = document.getElementById("MoTa").value;
  var prodType = document.getElementById("Loai").value;

  var prodId = document.getElementById("productId").value;

  console.log(prodId);

  var product = new Product(
    prodName,
    prodPrice,
    prodSize,
    prodBack,
    prodFront,
    prodImg,
    prodDesc,
    prodType
  );

  axios({
    url:
      "https://62bc4dcaeff39ad5ee2239fc.mockapi.io/api/MoblieProducts/" +
      prodId,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      console.log(res);
      getListProduct();
      document.getElementById("btnCloseModel").click();
      (prodName = ""),
        (prodPrice = ""),
        (prodSize = ""),
        (prodBack = ""),
        (prodFront = ""),
        (prodImg = ""),
        (prodDesc = ""),
        (prodType = ""),
        (prodId = "");
    })
    .catch(function (err) {
      console.log(err);
    });
}

// ----------------VALIDATIONS--------------------
function validateForm() {
  var isValid = true;
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var sceen = document.getElementById("Kichthuoc").value;
  var backCam = document.getElementById("BackCam").value;
  var frontCam = document.getElementById("FrontCam").value;
  var img = document.getElementById("HinhSP").value;
  var type = document.getElementById("Loai").value;
  var desc = document.getElementById("MoTa").value;

  isValid &=
    checkRequired(name, "spanTenSP") && checkLength(name, "spanTenSP", 4, 50);
  isValid &= checkRequired(price, "spanGiaSP");
  isValid &= checkRequired(sceen, "spanKichThuoc");
  isValid &= checkRequired(backCam, "spanCamSau");
  isValid &= checkRequired(frontCam, "spanCamTruoc");
  isValid &= checkRequired(img, "spanHinhAnh");
  isValid &= checkRequired(type, "spanLoai");
  isValid &= checkRequired(desc, "spanMoTa");

  return isValid;
}

function checkRequired(val, spanId) {
  if (val.length > 0) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "* Truong nay bat buoc nhap";
  return false;
}

function checkLength(val, spanId, min, max) {
  if (val.length >= min && val.length <= max) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(
    spanId
  ).innerHTML = `* Do dai phai tu ${min} toi ${max} ky tu`;
  return false;
}
function checkNumber(val, spanID) {
  var letter = /^[0-9]+$/;
  if (val.match(letter)) {
    document.getElementById(spanID).innerHTML = "";
    return true;
  } else document.getElementById(spanID).innerHTML = "* Vui long nhap so";
  return false;
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

  // console.log(keyword);
}

console.log(listProducts);
getListProduct();
