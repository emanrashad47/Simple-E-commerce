
let date = new Date();
let nextDate = date.setMonth(date.getMonth() + 1);

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
  const products = JSON.parse(this.responseText);
  let container = document.querySelector(".container");
  // let s = '';
  for (proc of products) {
    // s+=`${proc.category} , `;
    let product = `
    <div class="product" id = "ID${proc.id}">
        <div onclick="showDetailes(${proc.id})" class="product-Image">
            <img src = ${proc.image}>
        </div>
        <div class="product-Info">
          <p class="proTitle">${proc.title}</p>
          <div class="proContent">
          <div class="pandc">
            <span class="price">${proc.price}$</span>
            <span class="category">${proc.category}</span>
          </div>
          <div class="proRating">
            <ul class="stars">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa far fas fa-star-half-alt"></i></li>
              <li><i class="fa fa-star-o"></i></li>
              <span class="votes">${proc.rating.count} votes</span>
            </ul>
          </div>
        </div>
      </div>
      <button class='clickMe' value="${proc.id}">Add to Cart</button>
    </div>`;
    container.innerHTML += product;
    // console.log(proc.id);
  }
  
//وهي رقم المنتجات الي بالسلة
  let countProduct = document.querySelector("#countProduct");
  let s = document.cookie.length > 0 ? document.cookie.substring(document.cookie.indexOf("=") + 1):'';
  document.cookie =`id=${s} ;max-age= ${nextDate}`;
  console.log(document.cookie);
  

  let counter = document.cookie.split("=")[1].split(",").length-1;
  countProduct.innerHTML = counter;
  let btns = document.querySelectorAll(".product .clickMe");
  btns.forEach((btn) => {
    let selectedid = btn.value;
    btn.addEventListener("click", () => {
      let selectedIds = document.cookie.split("=")[1].split(",");
      if(!selectedIds.includes(`${selectedid}`)){
      document.cookie += `${selectedid},`;

      console.log(document.cookie);//

      counter++;
      console.log(counter);//
      
      countProduct.innerHTML = counter;
      }
    });
  });

};

xmlhttp.open("GET", "https://fakestoreapi.com/products");
xmlhttp.send();
xmlhttp.onload();

function showDetailes(index){
  window.localStorage.setItem("information", JSON.stringify(index));
  window.location.assign(`information.html`);

}
