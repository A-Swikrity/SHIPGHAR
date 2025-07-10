

// Helper to get cookie value by name
function getCookieValue(name) {
    let match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

let counter = Number(getCookieValue('counter')) || 0;
document.getElementById("badge").innerText = counter;
document.getElementById("totalItem").innerText = 'Items List';

let products = JSON.parse(localStorage.getItem("products"));
if (!products) {
    alert("No products found in local storage!");
}

let orderIdStr = getCookieValue('orderId') || "";
let orderedIds = orderIdStr.trim().split(" ").filter(id => id.length > 0);

// Container elements
let cartContainer = document.getElementById('cartContainer');
let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';
cartContainer.appendChild(boxContainerDiv);

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
totalh2.textContent = 'Total Amount';
totalDiv.appendChild(totalh2);

cartContainer.appendChild(totalContainerDiv);

// Button container and button
let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonTag.textContent = "Place Order";
buttonDiv.appendChild(buttonTag);

buttonTag.onclick = function () {
    window.location.href = 'payment.html';
}

// Count quantity of each product ID
let counted = {};
orderedIds.forEach(id => {
    counted[id] = (counted[id] || 0) + 1;
});

// Function to create product item section
function dynamicCartSection(product, qty) {
    let boxDiv = document.createElement('div');
    boxDiv.className = 'box';  // changed id to class for multiple items

    let img = document.createElement('img');
    img.src = product.preview;
    boxDiv.appendChild(img);

    let nameElem = document.createElement('h3');
    nameElem.textContent = `${product.name} × ${qty}`;
    boxDiv.appendChild(nameElem);

    let amountElem = document.createElement('h4');
    amountElem.textContent = 'Amount: Rs ' + (product.price * qty);
    boxDiv.appendChild(amountElem);

    boxContainerDiv.appendChild(boxDiv);
}

// Clear previous total amount h4 if exists
function amountUpdate(amount) {
    // Remove previous amount h4 if any
    let prev = totalDiv.querySelector('h4');
    if (prev) prev.remove();

    let totalh4 = document.createElement('h4');
    totalh4.textContent = 'Amount: Rs ' + amount;
    totalDiv.appendChild(totalh4);
}

// Build cart UI and calculate total
let totalAmount = 0;
for (let id in counted) {
    let product = products.find(p => p.id == id);
    if (product) {
        let qty = counted[id];
        totalAmount += product.price * qty;
        dynamicCartSection(product, qty);
    }
}

amountUpdate(totalAmount);

