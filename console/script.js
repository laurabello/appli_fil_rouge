alert("Bienvenue sur la mini boutique de l'Archipel!");

let products = [{
        id: 1,
        name: "Product 1",
        price: 12,
        selected: false,
        quantity: 0
    },
    {
        id: 2,
        name: "Product 2",
        price: 25,
        selected: false,
        quantity: 0
    },
    {
        id: 3,
        name: "Product 3",
        price: 8,
        selected: false,
        quantity: 0
    },
    {
        id: 4,
        name: "Product 4",
        price: 90,
        selected: false,
        quantity: 0
    },
    {
        id: 5,
        name: "Product 5",
        price: 64,
        selected: false,
        quantity: 0
    },
    {
        id: 6,
        name: "Product 6",
        price: 14,
        selected: false,
        quantity: 0
    }
]
let stop = false;

while (!stop) {
    let userChoice = parseInt(prompt("Que voulez-vous faire?\n1.Voir la liste des produits.\n2.Voir le contenu de votre caddy.\n3.Ajouter un produit au caddy.\n4.Supprimer un produit du caddy.\n5.Valider ma commande.\n6. Sortir"));

    switch (userChoice) {
        case 1:
            console.log("Nos produits : ");
            products.forEach(product => {
                console.log("id : " + product.id + " - " + product.name + " - " + product.price + " euros");
            })
            break;
        case 2:
            console.log("Le contenu de votre caddy : ");
            products.forEach(product => {
                if (product.quantity > 0) {
                    console.log("id : " + product.id + " - " + product.name + " - " + product.price + " euros - quantity : " + product.quantity);
                }
            });
            break;
        case 3:
            const selectedProductId = prompt("Tapez l'identifiant du produit que vous voulez ajouter à votre caddy.");
            const selectedProduct = products.find(product => product.id == selectedProductId);
            selectedProduct.quantity++;
            break;
        case 4:
            const deletedProductId = prompt("Tapez l'identifiant du produit que vous voulez supprimer de votre caddy.");
            const deletedProduct = products.find(product => product.id == deletedProductId);
            if (deletedProduct.quantity > 0) {
                deletedProduct.quantity--;
            }
            break;
        case 5:
            let total = 0;
            let command = "";
            let countProducts = 0;
            products.forEach(product => {
                if (product.quantity > 0) {
                    countProducts++
                    total += (product.price) * product.quantity;
                    command += "id : " + product.id + " - " + product.name + " - " + product.price + " euros - quantity : " + product.quantity + "\n";
                }
            });
            if (countProducts > 0) {
                if (confirm("Votre commande : \n" + command + "Total de votre commande : " + total + " euros")) {
                    alert("Merci pour votre commande!");
                    stop = true;
                } else {
                    alert("Ok, je vous laisse continuer.");
                }
            } else {
                alert("Votre caddy est vide!");
            }
            break;
        case 6:
            alert("Ok Bye!");
            stop = true;
            break;
        default:
            console.log("Désolé je n'ai pas compris votre choix.")
    }
}