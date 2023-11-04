
let global_price = 0;


// // show ra gio hang
(function () {
    // Lấy giá trị của userId từ localStorage
    var check = localStorage.getItem("loggedInUser");

    if (check) {
        // Gửi yêu cầu GET đến API
        fetch("http://localhost:3000/carts")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var id = JSON.parse(check).id;
                var cart = data.find(function (item) {
                    return item.userId === parseInt(id);
                });

                if (cart) {
                    var products = cart.products;
                    var html = "";

                    products.forEach(function (product) {
                        html += `
                <tr>
                  <td class="align-middle text-center">
                    <img class="rounded" src="${product.img}" style="max-width: 200px; max-height:200;">
                  </td>
                  <td class="align-middle text-center">${product.product_name}</td>
                  <td class="align-middle">${product.size}</td>
                  <td class="align-middle">$${product.price}</td>
                  <td class="align-middle">${product.quan_choose}</td>
                  <td class="align-middle">$${product.price * product.quan_choose}</td>
                  <td class="text-center align-middle">
                    <button type="button" onclick="removeFromCart(${product.id})" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myDelete">
                      <i class="fa fa-trash fa-lg me-2" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>`;
                    });

                    // Gán giá trị vào đoạn mã HTML đã cho
                    document.getElementById("cart_item").innerHTML = html;
                }
            })
            .catch(function (error) {
                console.log("Lỗi khi lấy dữ liệu từ API: " + error);
            });
    }
})();




// total price
(function () {
    var check = localStorage.getItem("loggedInUser");

    if (check) {
        fetch("http://localhost:3000/carts")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var id = JSON.parse(check).id;
                var cart = data.find(function (item) {
                    return item.userId === parseInt(id);
                });
                console.log(cart)
                if (cart) {
                    var products = cart.products;
                    var html = "";
                    var totalPrice = 0; // Khởi tạo giá tổng ban đầu

                    for (var i = 0; i < products.length; i++) {
                        var product = products[i];
                        html += `
                <tr>
                  <td>${product.product_name}</td>
                  <td class="text-end">${product.price * product.quan_choose}</td>
                </tr>
              `;
                        totalPrice += product.price * product.quan_choose; // Cập nhật giá tổng
                    }

                    global_price = totalPrice;
                    document.getElementById("uPrice").textContent = totalPrice; // Cập nhật giá tổng trong HTML
                    document.getElementById("prd_infor").innerHTML = html;
                }
            })
            .catch(function (error) {
                console.log("Lỗi khi lấy dữ liệu từ API: " + error);
            });
    }
})();




// them vao gio hang
async function addCart(pd_id) {
    const cartApi = "http://localhost:3000/carts";
    // Lấy userId từ localStorage
    let userInfor = JSON.parse(localStorage.getItem("loggedInUser"));
    let userId = userInfor.id;

    try {
        const response = await fetch(cartApi);
        const carts = await response.json();
        let cart = carts.find(cart => cart.userId === userId);

        if (cart) {
            const existingProduct = cart.products.find(product => product.id === pd_id);

            if (existingProduct) {
                alert("Sản phẩm đã tồn tại trong giỏ hàng!");
            } else {
                const newProduct = await prepareData(pd_id);

                if (newProduct) {
                    cart.products.push(newProduct);

                    const updatedCartResponse = await fetch(`${cartApi}/${cart.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cart)
                    });

                    const updatedCart = await updatedCartResponse.json();
                    console.log("Sản phẩm đã được thêm vào giỏ hàng thành công!");
                    console.log(updatedCart);
                }
            }
        } else {
            const newProduct = await prepareData(pd_id);

            if (newProduct) {
                cart = {
                    userId: userId,
                    products: [newProduct],
                };

                const createdCartResponse = await fetch(cartApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cart)
                });

                const createdCart = await createdCartResponse.json();
                console.log("Đã tạo giỏ hàng mới và thêm sản phẩm thành công!");
                console.log(createdCart);
            }
        }
    } catch (error) {
        console.error("Lỗi khi thao tác giỏ hàng:", error);
    }
}

async function prepareData(pd_id) {
    const productsApi = "http://localhost:3000/products";

    try {
        const response = await fetch(`${productsApi}/${pd_id}`);
        const product = await response.json();

        var quantityInput = document.querySelector('.quantity');
        var quantity = parseInt(quantityInput.value);

        var sizeSelect = document.querySelector('.size');
        var size = sizeSelect.value;

        if (quantity <= 0 || quantity > product.quantity) {
            alert('Vui lòng nhập số lượng hợp lệ.');
            return null;
        } else {
            let newProduct = {
                id: pd_id,
                product_name: product.product_name,
                img: product.img,
                price: product.price,
                description: product.description,
                category: product.category,
                size: size,
                brand: product.brand,
                status: product.status,
                quantity: product.quantity,
                quan_choose: quantity,
                sold: product.sold,
                viewer: product.viewer,
                CreateAt: product.CreateAt,
                DeleteAt: product.DeleteAt
            };
            return newProduct;
        }
    } catch (error) {
        console.log("Lỗi khi lấy thông tin sản phẩm: " + error);
        return null;
    }
}




// remove gio hang
async function removeFromCart(productId) {
    try {
        // Lấy giá trị của userId từ localStorage
        var check = localStorage.getItem("loggedInUser");

        if (check) {
            // Gửi yêu cầu GET đến API để lấy giỏ hàng
            var response = await fetch("http://localhost:3000/carts");
            var data = await response.json();

            var id = JSON.parse(check).id;
            var cart = data.find(item => item.userId === parseInt(id));

            if (cart) {
                // Xóa mặt hàng khỏi giỏ hàng
                var updatedProducts = cart.products.filter(product => product.id !== productId);
                cart.products = updatedProducts;

                // Gửi yêu cầu PUT đến API để cập nhật giỏ hàng
                var updateResponse = await fetch(`http://localhost:3000/carts/${cart.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cart)
                });

                if (updateResponse.ok) {
                    console.log("Đã xóa mặt hàng khỏi giỏ hàng thành công!");

                    // Gọi lại hàm showCart() để cập nhật danh sách giỏ hàng trên giao diện
                    showCart();
                } else {
                    console.error("Lỗi khi cập nhật giỏ hàng:", updateResponse.status);
                }
            }
        }
    } catch (error) {
        console.log("Lỗi khi thao tác với giỏ hàng: " + error);
    }
}




function selectQRCode() {
    // Send a POST request to the server if needed
        fetch("http://localhost:3000/paymentMomo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                global_price,
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            // window.location.href = res.payUrl;
            window.open(res.payUrl)
            console.log(res);
        });

}
