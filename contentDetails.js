console.clear();

let id = location.search.split('?')[1]; // Get product ID
let allProducts = JSON.parse(localStorage.getItem("products"));
let selectedProduct = allProducts.find(p => p.id == id);

if (!selectedProduct) {
  alert("Product not found!");
} else {
  dynamicContentDetails(selectedProduct);
}

function dynamicContentDetails(ob) {
  let mainContainer = document.createElement('div');
  mainContainer.id = 'containerD';
  document.getElementById('containerProduct').appendChild(mainContainer);

  let imageSectionDiv = document.createElement('div');
  imageSectionDiv.id = 'imageSection';

  let imgTag = document.createElement('img');
  imgTag.id = 'imgDetails';
  imgTag.src = ob.preview;
  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement('div');
  productDetailsDiv.id = 'productDetails';

  let h1 = document.createElement('h1');
  h1.textContent = ob.name;

  let h4 = document.createElement('h4');
  h4.textContent = ob.brand;

  let detailsDiv = document.createElement('div');
  detailsDiv.id = 'details';

  let h3DetailsDiv = document.createElement('h3');
  h3DetailsDiv.textContent = 'Rs ' + ob.price;

  let h3 = document.createElement('h3');
  h3.textContent = 'Description';

  let para = document.createElement('p');
  para.textContent = ob.description;

  let productPreviewDiv = document.createElement('div');
  productPreviewDiv.id = 'productPreview';

  let h3ProductPreviewDiv = document.createElement('h3');
  h3ProductPreviewDiv.textContent = 'Product Preview';
  productPreviewDiv.appendChild(h3ProductPreviewDiv);

  for (let i = 0; i < ob.photos.length; i++) {
    let imgTagProductPreviewDiv = document.createElement('img');
    imgTagProductPreviewDiv.src = ob.photos[i];
    imgTagProductPreviewDiv.onclick = function () {
      imgTag.src = ob.photos[i];
    };
    productPreviewDiv.appendChild(imgTagProductPreviewDiv);
  }

  let buttonDiv = document.createElement('div');
  buttonDiv.id = 'button';

  let buttonTag = document.createElement('button');
  buttonTag.textContent = 'Add to Cart';

  buttonTag.onclick = function () {
    let order = id + " ";
    let counter = 1;
    if (document.cookie.indexOf(",counter=") >= 0) {
      order = id + " " + document.cookie.split(",")[0].split("=")[1];
      counter = Number(document.cookie.split(",")[1].split("=")[1]) + 1;
    }
    document.cookie = "orderId=" + order + ",counter=" + counter;
   
    document.getElementById("badge").innerHTML = counter;

    // Show popup
    showAddToCartPopup();
  };

  buttonDiv.appendChild(buttonTag);

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(productPreviewDiv);
  productDetailsDiv.appendChild(buttonDiv);
}

function showAddToCartPopup() {
  // Create popup container
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "rgba(3,122,122,0.9)";
  popup.style.color = "white";
  popup.style.padding = "15px 25px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  popup.style.zIndex = 1000;
  popup.style.display = "flex";
  popup.style.alignItems = "center";
  popup.style.gap = "15px";
  popup.style.fontSize = "16px";

  // Text message
  const msg = document.createElement("span");
  msg.textContent = "Product added successfully!";

  // View Cart button
  const viewBtn = document.createElement("button");
  viewBtn.textContent = "View Cart";
  viewBtn.style.backgroundColor = "white";
  viewBtn.style.color = "rgb(3,122,122)";
  viewBtn.style.border = "none";
  viewBtn.style.borderRadius = "5px";
  viewBtn.style.padding = "6px 12px";
  viewBtn.style.cursor = "pointer";
  viewBtn.onclick = () => {
    window.location.href = "cart.html"; 
  };

  popup.appendChild(msg);
  popup.appendChild(viewBtn);


  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 5000);
}



