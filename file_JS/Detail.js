var handleOnclick = (id) => {
  fetch(`${productsApi}/${id}`)
    .then(res => res.json())
    .then((product) => {
      var container = document.getElementById('detai_product');
      var htmls = '';

      htmls += `
      <!-- Header của modal -->
      <div class="modal-header">
          <h5 class="modal-title" id="modalDetailLabel">Product Detail</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <!-- Cột chứa hình ảnh sản phẩm -->
            <div class="col-md-4">
              <img
                src="${product.img}"
                style="height: 320px;
                alt="Product Image" class="w-100">
            </div>
            <!-- Cột chứa thông tin sản phẩm -->
            <div class="col-md-8">
              <div class="product-info">
                <h2>${product.product_name}</h2>
                <p><b>Price: $${product.price}</b></p>
                <!-- Dòng chứa thông tin số lượng -->
                <div class="row align-items-center">
                  <div class="col-6">
                    <p><b>Quantity:</b></p>
                  </div>
                  <div class="col-3">
                    <div class="input-group">
                      <input type="number" class="form-control quantity" value="1">
                    </div>
                  </div>
                </div>
                <!-- Dòng chứa thông tin size -->
                <div class="row align-items-center">
                  <div class="col-6">
                    <p><b>Size:</b></p>
                  </div>
                  <div class="col-3">
                    <div class="input-group"> 
                      <select class="form-select size">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p><b>Description:</b></p>
                <p>
                  ${product.description}
                </p>
                <p><b>Quantity in stock:</b>${product.quantity}</p>
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer justify-content-around">
      <!-- Cột chứa nút "Add to Cart" -->
      <div class="col-lg-6 col-6">
          <button type="button" class="btn btn-success w-100" onclick="addCart(${product.id})">Add to Cart</button>
      </div>
      <!-- Cột chứa nút "Buy Now" -->
      <div class="col-lg-6 col-6">
          <button type="button" class="btn btn-success w-100" onclick="clickBuyNow(${product.id});">Buy Now</button>
      </div>
  </div>
    `;

      container.innerHTML = htmls;
    })
}
