document.querySelectorAll('.add-cart').forEach(function(icon) {
    icon.addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
    });
});

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart") ;
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();
}

function ready() {
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // Evento para o botão "Comprar agora"
    var buyButton = document.getElementsByClassName('btn-buy')[0];
    if (buyButton) {
        buyButton.addEventListener('click', buyButtonClicked);
    }

    updatetotal();
}

function buyButtonClicked() {
    alert('Seu pedido foi feito!');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    if (cartContent) {
        // Remover todos os itens do carrinho
        while (cartContent.firstChild) {
            cartContent.removeChild(cartContent.firstChild);
        }
    }
    updatetotal(); // Zera o total após limpar
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement.parentElement; // Ajuste para obter o elemento correto
    var tittle = shopProducts.getElementsByClassName('card-text')[0].innerText;
    var price = shopProducts.getElementsByTagName('span')[0].innerText; // Obtendo o preço
    var productImg = shopProducts.getElementsByClassName('card-img-top')[0].src;

    // Chamando addProductToCart
    addProductToCart(tittle, price, productImg);
    updatetotal();
}

function addProductToCart(tittle, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    if (!cartItems) {
        console.error("Contêiner do carrinho não encontrado!");
        return;
    }

    var cartBoxContent = `
        <img src="${productImg}" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-tittle">${tittle}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash3 cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Adicionando eventos
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    console.log("Item adicionado:", tittle, price, productImg);
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];

        // Obter os elementos de preço e quantidade
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        if (!priceElement || !quantityElement) {
            console.warn("Elemento de preço ou quantidade não encontrado no item do carrinho.");
            continue; // Pular para o próximo item
        }

        // Converter os valores para números válidos
        var price = parseFloat(
            priceElement.innerText.replace("R$", "").replace(",", ".").trim()
        );
        var quantity = parseInt(quantityElement.value);

        // Validar os valores
        if (isNaN(price) || isNaN(quantity)) {
            console.warn("Preço ou quantidade inválidos:", price, quantity);
            continue; // Pular para o próximo item
        }

        // Calcular o total
        total += price * quantity;
    }

    // Atualizar o total na interface (usando vírgula para decimal)
    document.getElementsByClassName("total-price")[0].innerText =
        "R$" + total.toFixed(2).replace(".", ",");
}