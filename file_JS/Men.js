
const productsApi = ' http://localhost:3000/products';

// thanh truoc trai phai
const leftText = document.querySelector('.left-text');
const rightText = document.querySelector('.right-text');
const contentRow = document.querySelector('.content-row');
const leftRow = document.querySelector('.left-row');
const rightRow = document.querySelector('.right-row');

leftText.addEventListener('click', function () {
    leftRow.style.display = 'flex';
    rightRow.style.display = 'none';
    contentRow.style.display = 'none';
    leftText.classList.add('selected');
    rightText.classList.remove('selected');

    fetch(productsApi)
        .then(response => response.json())
        .then((products) => {
            console.log(products);
            // Lọc và hiển thị sản phẩm theo điều kiện (gender === 'men' || gender === 'unisex') && category === 'fashion'
            const filteredProducts = products.filter(product => (product.gender === 'men' || product.gender === 'unisex') && product.category === 'fashion');
            displayProducts(filteredProducts, 'cards_left');
        });
});

rightText.addEventListener('click', function () {
    leftRow.style.display = 'none';
    rightRow.style.display = 'flex';
    contentRow.style.display = 'none';
    leftText.classList.remove('selected');
    rightText.classList.add('selected');

    fetch(productsApi)
        .then(response => response.json())
        .then((products) => {
            console.log(products);
            // Lọc và hiển thị sản phẩm theo điều kiện (gender === 'men' || gender === 'unisex') && category === 'sport'
            const filteredProducts = products.filter(product => (product.gender === 'men' || product.gender === 'unisex') && product.category === 'sport');
            displayProducts(filteredProducts, 'cards_right');
        });
});

// Hàm hiển thị sản phẩm lên id được chỉ định
function displayProducts(products, targetId) {
    const container = document.getElementById(targetId);
    let html = '';

    products.forEach(product => {
        html += `
            <div onclick="handleOnclick(${product.id})" class="col-md-3">
                <div class="card mb-3">
                    <img src="${product.img}" class="card-img-top" style="height: 320px; alt="Product Image">
                    <div class="card-body">
                        <h5 class="card-title">${product.product_name}</h5>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-text">$${product.price}</h6>
                            <h6 class="card-text"><i class="fa fa-users" aria-hidden="true"></i>${product.viewer}</h6>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}


fetch(productsApi)
    .then(response => response.json())
    .then((products) => {
        console.log(products);
        // Lọc và hiển thị sản phẩm theo điều kiện (gender === 'men' || gender === 'unisex')
        const filteredProducts = products.filter(product => product.gender === 'men' || product.gender === 'unisex');
        displayProducts(filteredProducts, 'cards_overview');
    });
