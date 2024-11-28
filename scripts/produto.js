document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.botao-busca').addEventListener('click', function() {
        const cep = document.querySelector('.cep').value;
        
        if (cep.length === 8) {
            consultarFrete(cep);
        } else {
            alert('Por favor, insira um CEP válido!');
        }
    });

    function consultarFrete(cep) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                const endereco = response.data;
                if (endereco.erro) {
                    alert('CEP não encontrado.');
                } else {
                    document.getElementById('cep').textContent = endereco.cep;
                    document.getElementById('cidade').textContent = endereco.localidade;
                    document.getElementById('estado').textContent = endereco.uf;

                    let valorFrete = calcularFrete(endereco);
                    document.getElementById('frete').textContent = `R$${valorFrete.toFixed(2)}`;
                }
            })
            .catch(error => {
                console.error(error);
                alert('Ocorreu um erro ao buscar o CEP.');
            });
    }

    function calcularFrete(endereco) {ão
        const cidade = endereco.localidade.toLowerCase();
        if (cidade === 'são paulo') {
            return 15.50;
        } else if (cidade === 'rio de janeiro') {
            return 18.75;
        } else {
            return 25.00;
        }
    }

    const botaoMaisInf = document.querySelector('.maisInf');
    const detalhes = document.querySelectorAll('.infoCEP');

    botaoMaisInf.addEventListener('click', () => {
        detalhes.forEach(detalhe => {

            detalhe.classList.toggle('visivel');
        });

        const icone = botaoMaisInf.querySelector('i');
        if (icone.classList.contains('bi-chevron-right')) {
            icone.classList.replace('bi-chevron-right', 'bi-chevron-down');
        } else {
            icone.classList.replace('bi-chevron-down', 'bi-chevron-right');
        }
    });

    document.querySelectorAll('.add-cart').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            addCartClicked(event);
        });
    });
});


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
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
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
        button.addEventListener('click', addCartClicked); // Este evento já está configurando a adição ao carrinho
    }

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
    console.log("Adicionando item ao carrinho"); // Verifique se a função é chamada mais de uma vez
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    var tittle = shopProducts.getElementsByClassName('card-text')[0].innerText;
    var price = shopProducts.getElementsByTagName('span')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('card-img-top')[0].src;

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