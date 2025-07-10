
document.cookie = "orderId=0,counter=0";

// Get product from localStorage
let orderedProduct = JSON.parse(localStorage.getItem("orderedProduct"));

if (orderedProduct) {
  let container = document.getElementById("orderContainer");

  let productBox = document.createElement("div");
  productBox.style.marginTop = "40px";

  let img = document.createElement("img");
  img.src = orderedProduct.preview;
  img.style.width = "200px";
  img.style.borderRadius = "10px";
  img.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

  let name = document.createElement("h3");
  name.textContent = orderedProduct.name;

  let price = document.createElement("p");
  price.textContent = "Rs " + orderedProduct.price;

  productBox.appendChild(img);
  productBox.appendChild(name);
  productBox.appendChild(price);

  container.appendChild(productBox);
}

localStorage.removeItem("orderedProduct");


