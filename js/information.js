let selected =   window.localStorage.getItem("information");
console.log(window.location.search);

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
  const productjson = JSON.parse(this.responseText);
  let productinHTML = document.querySelector(".container");
  // عملت صفحة وحدة للتفاصيل واخدت من مسار الصفحة رقم العنصر الي ضغط عليه الي هوا انا مخزناه في اسم الزر فلما يضغط حيظهر بالمسار تبع الصفحة فانا اخدته من هناك وعرضته

  let product = `
        <div class="product" id = "ID${productjson.id}">
            <div class="product-Image">
                <img src="${productjson.image}" class="proImage" width="100%  alt="product image">
            </div>
            <div class="product-Info">
                <p class="proTitle">${productjson.title}</p>
                <div class="proRating">
                    <ul class="stars">
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa far fas fa-star-half-alt"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    </ul>
                </div>
                <p class="price">${productjson.price}$</p>
                <p class='description'><b>Description</b></p>
                <p class="proDescription">${productjson.description}</p>
                <div class="probtns">
                <button class='clickMe' id='add' value="${productjson.id}"><i class="fa-solid fa-cart-shopping"></i>  ADD TO CARD</button>
                <button class='clickMe'>BUY NOW</button>
                </div>
            </div>
        </div>`;
  productinHTML.innerHTML += product;
  document.title = productjson.title;

  let btn = document.querySelector("#add");
  btn.addEventListener("click", () => {
    let selectedIds = document.cookie.split("=")[1].split(",");
    if (!selectedIds.includes(selected)) {
      document.cookie += `${selected},`;
    }
    console.log(document.cookie);
  });
};
xmlhttp.open("GET", `https://fakestoreapi.com/products/${selected}`);
xmlhttp.send();
xmlhttp.onload();
