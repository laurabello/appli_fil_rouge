let products = [{
        id: 1,
        name: "Product 1",
        price: 12,
        quantity: 0
    },
    {
        id: 2,
        name: "Product 2",
        price: 25,
        quantity: 0
    },
    {
        id: 3,
        name: "Product 3",
        price: 8,
        quantity: 0
    },
    {
        id: 4,
        name: "Product 4",
        price: 90,
        quantity: 0
    },
    {
        id: 5,
        name: "Product 5",
        price: 64,
        quantity: 0
    },
    {
        id: 6,
        name: "Product 6",
        price: 14,
        quantity: 0
    },
]


/**
 * Function to display the products in a table
 * @param {Array} list 
 * @param {HTMLElement} container 
 */
function productsList(list, container, showQty = false) {
    list.forEach(product => {
        // Create a table row for the product
        const row = document.createElement('tr');
        container.appendChild(row);

        // Create the columns
        const id = document.createElement('td');
        const name = document.createElement('td');
        const price = document.createElement('td');
        const select = document.createElement('td');
        const quantity = document.createElement('td');

        // Fill in the columns with the product details
        id.innerText = product.id;
        name.innerText = product.name;
        price.innerText = product.price;
        quantity.innerText = product.quantity;
        quantity.setAttribute('data-id', product.id);


        // Append the columns to the row
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(price);

        if (!showQty) {
            // Add a column to add product to the cart
            const addToCart = document.createElement('input');
            addToCart.setAttribute('type', 'button');
            addToCart.setAttribute('value', "+");
            addToCart.setAttribute('data-id', product.id);
            addToCart.classList.add('addToCart');
            select.appendChild(addToCart);

            // Add a column to remove product from the cart
            const removeFromCart = document.createElement('input');
            removeFromCart.setAttribute('type', 'button');
            removeFromCart.setAttribute('value', "-");
            removeFromCart.setAttribute('data-id', product.id);
            removeFromCart.classList.add('removeFromCart');
            select.appendChild(removeFromCart);

            row.appendChild(select);
        } 

        row.appendChild(quantity);
    });
}


// Dipslay the product list from a different list depending the page
const productsContainer = document.querySelector('#productsList');
const selectedProductsList = document.querySelector('#selectedProductsList');

if (productsContainer) {
    let list = (sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : products;
    productsList(list, productsContainer);
} else if (selectedProductsList) {
    let caddy = JSON.parse(sessionStorage.getItem("cart"));
    productsList(caddy, selectedProductsList, true);

    // Add event listener on the validate button for the caddy page
    let validate = document.querySelector('#validateCmd');
    validate.addEventListener('click', validateCmd);
}

/**
 * Function to increase or decrease products quantity on click
 */
function modifyCart(action, productId) {
    let list = (sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : products;
    let selectedProd = list.find(product => product.id == productId);
    console.log(selectedProd)
    if (action == "add") {
        selectedProd.quantity++
    } else if (selectedProd.quantity > 0) {
        selectedProd.quantity--
    }
    let updateQty = document.querySelector(`td[data-id = "${selectedProd.id}"]`);
    updateQty.innerText = selectedProd.quantity;
    sessionStorage.setItem("cart", (JSON.stringify(list)));
}

// Add event listener on every buttons
const changeCart = document.querySelectorAll('.addToCart, .removeFromCart');
changeCart.forEach(btn => {
    let productId = btn.dataset.id;
    let action = (btn.classList.contains('addToCart')) ? 'add' : 'remove';
    btn.addEventListener('click', () => modifyCart(action, productId));
})

/**
 * Function to display the cart content as a list and calculate the total price
 */
function validateCmd() {
    let cmdContainer = document.querySelectorAll(".recapCmd");

    // Get datas content of the cart
    let cmd = JSON.parse(sessionStorage.getItem("cart"));
    let totalCart = 0;
    console.log(cmd);

    // Add title
    let title = document.createElement('h2');
    title.innerText = "Récapitulatif de votre commande : ";
    cmdContainer[0].appendChild(title);

    // Add a list to display cart elements
    let ul = document.createElement('ul');
    cmdContainer[0].appendChild(ul);
    cmd.forEach(item => {
        if (item.quantity > 0) {
            let li = document.createElement('li');
            li.innerText = `${item.name} - ${item.price} euros X ${item.quantity}\n`
            ul.appendChild(li);
            totalCart += item.price;
        }
    })

    // claculate and display total
    let pTotal = document.createElement('p');
    pTotal.innerText = `Total de votre commande : ${totalCart} euros`;
    cmdContainer[0].appendChild(pTotal);
}