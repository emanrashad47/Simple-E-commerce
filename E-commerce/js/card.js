const xmlhttpt = new XMLHttpRequest();
xmlhttpt.onload = function () {
  const products = JSON.parse(this.responseText);
  //ربطت المكان الي بدي احط فيه الproducts والي بدي اظهر في السعر الكلي
  let productsinHTML = document.querySelector(".products");
  let totalepricetext = document.querySelector(".total #totalPrice");
  let selectedIds = document.cookie.split("=")[1].split(",");

  //عملت مصفوفة كل عنصر فيها يحوي عنصرين مخزن فيهم سعر المنتج والعداد تبعه ومحطوطين ب idex=product.id
  let arr =[];
  for (proc of products) {
    arr[proc.id-1] = [0,proc.price];
    //اضافة العناصر صاحبة ال id المخزن بالكوكي
    if (selectedIds.includes(`${proc.id}`)) {
      //ادخال قيمة العداد للمنتجات التي اختارها المستخدم ب 1 وتخزينه بالمصفوفة ، أظهرت الرقم 1 داخل العداد من خلال تاغ الانبوت بخاصية المين
      arr[proc.id-1] = [1,proc.price];
      
      let product = `
      <div class="product" id = "ID${proc.id}">
          <div class="product-Image">
            <img src="${proc.image}" class="proImage" width="100%  alt="product image">
          </div>
          <div class="product-Info">
            <p class="proTitle">${proc.title}</p>
            <div class="proRating">
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa far fas fa-star-half-alt"></i></li>
                <li><i class="fa fa-star-o"></i></li>
                </ul>
                <p class="votes">${proc.rating.count} votes</p>
            </div>
            <div class="proContent">
              <p class="price">${proc.price}$</p>
              <p class="category">${proc.category}</p>
            </div>
            <input type="number" min="1" name="${proc.id}" value ='1' >
            <button value="${proc.id}" > DELET </button>
          </div>
        </div>`;
      productsinHTML.innerHTML += product;
    }
    
  }
  let price = totalPrice(arr);
  totalepricetext.innerHTML = `${price}$`;

  let inputs = document.querySelectorAll(".product input");
  
  inputs.forEach((input)=> {
    input.onchange =  () => {
      arr[parseInt(input.name)-1][0] = parseInt(input.value);
      
      price =totalPrice(arr);
      totalepricetext.innerHTML = `${price}$`;
      
    };
  });

  let btns = document.querySelectorAll(".product .product-Info button");
  btns.forEach ((btn)=> {

    btn.onclick = () => {
      document.cookie = document.cookie.replace(new RegExp(`${btn.value},`) ,  '');
      price = totalPriceAfterDelet(price , btn.value ,arr);
      totalepricetext.innerHTML = `${price}$`;
      document.querySelector(`.products .product#ID${btn.value}`).remove();
    };
  });

  function totalPrice(arr){
    let sum = 0;
    for(r of arr){
      sum+=r[0]*r[1];
    }
    return sum.toFixed(2);
  }
  function  totalPriceAfterDelet (price , index , arr){
    let m = arr[index-1];
    price -= m[0]*m[1];
    return price.toFixed(2);
  }


};
xmlhttpt.open("GET", "https://fakestoreapi.com/products");
xmlhttpt.send();
xmlhttpt.onload();
