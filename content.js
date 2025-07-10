let localProducts = [
  {
    id: 1,
    name: "Woolen bag",
    brand: "BrandX",
    price: 499,
    preview: "images/bagwoolen.png",
    isAccessory: true,
    description: "A comfortable and stylish plain woolen bag.",
    photos: ["images/bagwoolen.png"]
  },
  {
    id: 2,
    name: "Woolen Socks",
    brand: "BrandX",
    price: 999,
    preview: "images/sockss.png",
    isAccessory: true,
    description: "Keep yourself warm with this cool woolen socks.",
    photos: ["images/sockss.png"]
  },
  {
    id: 3,
    name: "Handmade Purse",
    brand: "BrandY",
    price: 1499,
    preview: "images/purse.png",
    isAccessory: false,
    description: "Carry this designery handmade purse",
    photos: ["images/purse.png"]
  },
  {
    id: 4,
    name: "Natural Soap",
    brand: "BrandX",
    price: 799,
    preview: "images/soap.png",
    isAccessory: true,
    description: "keep you skin soft and healthy with this natural soap",
    photos: ["images/soap.png"]
  },
   {
    id: 5,
    name: "Mango Pickle",
    brand: "BrandY",
    price: 799,
    preview: "images/pickle.png",
    isAccessory: false,
    description: "Give yourself a delicious mango pickle treat",
    photos: ["images/pickle.png"]
  },
 {
    id: 6,
    name: "Mitila Art",
    brand: "BrandY",
    price: 799,
    preview: "images/mithilaart.png",
    isAccessory: false,
    description: "Handmade mitila art for decoration",
    photos: ["images/mithilaart.png"]
  },
 {
    id: 7,
    name: "Candel Collection",
    brand: "BrandY",
    price: 799,
    preview: "images/candel.png",
    isAccessory: false,
    description: "gift yourself these beautiful candel collection",
    photos: ["images/candel.png"]
  },
   {
    id: 8,
    name: "Bamboo Basket",
    brand: "BrandX",
    price: 799,
    preview: "images/basket.png",
    isAccessory: true,
    description: "pure mandmade comfortable bamboo basket",
    photos: ["images/basket.png"]
  },
   {
    id: 9,
    name: "Pure Honey",
    brand: "BrandX",
    price: 799,
    preview: "images/honey.png",
    isAccessory: false,
    description: "Healthy honey from honey bee",
    photos: ["images/honey.png"]
  },
   {
    id: 10,
    name: "Fresh Mushrooms",
    brand: "BrandY",
    price: 799,
    preview: "images/mushroom.png",
    isAccessory: true,
    description: "tasty cultivated mushroom",
    photos: ["images/mushroom.png"]
  }
];

// Save to localStorage
localStorage.setItem("products", JSON.stringify(localProducts));

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  let h2 = document.createElement("h2");
  h2.textContent = "Rs " + ob.price;

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

for (let i = 0; i < localProducts.length; i++) {
  if (localProducts[i].isAccessory) {
    containerAccessories.appendChild(dynamicClothingSection(localProducts[i]));
  } else {
    containerClothing.appendChild(dynamicClothingSection(localProducts[i]));
  }
}
