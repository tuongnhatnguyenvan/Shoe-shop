
// Lắng nghe sự kiện click vào nút "Buy Now"
function clickBuyNow(id) {

    fetch(`${productsApi}/${id}`)
        .then(res => res.json())
        .then((product) => {
            // Lấy giá trị trong \phần tử input
            var quantityInput = document.querySelector('.quantity');
            var quantity = parseInt(quantityInput.value);
            console.log(quantity);

            // Lấy giá trị trong phần tử select
            var sizeSelect = document.querySelector('.size');
            var size = sizeSelect.value;
            console.log(size);

            if (quantity <= 0 || quantity > product.quantity) {
                alert('Please enter a valid quantity.');
                return;
            }
            else {
                // Ẩn modal detail
                $('#modalDetail').modal('hide');
                // Hiển thị modal checkout
                $('#checkout_form').modal('show');
                localStorage.setItem("pd_buy", JSON.stringify({ id: product.id, qt: quantity, size: size }));
            }

            var total = quantity * product.price;
            document.getElementById('cost').textContent = total;
        }
        )
}

const paymentApi = 'http://localhost:3000/payment';
// payment
function checkOut_BuyNow() {
    let get_id_infor = JSON.parse(localStorage.getItem("pd_buy"));
    let get_id = get_id_infor.id;
    let get_quantity = get_id_infor.qt;
    let get_size = get_id_infor.size;

    updateProductData(get_id, get_quantity);

    postData(get_id, get_size);

}

function updateProductData(get_id, get_quantity) {

    // Lấy dữ liệu hiện tại của sản phẩm từ API
    fetch(`${productsApi}/${get_id}`)
        .then(response => response.json())
        .then(data => {
            // Cập nhật dữ liệu
            const updatedData = {
                quantity: data.quantity - get_quantity,
                sold: data.sold + get_quantity
            };

            // Gửi yêu cầu PATCH để cập nhật dữ liệu trên API
            fetch(`${productsApi}/${get_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
                .then(response => {
                    if (response.ok) {
                        // Thông báo thành công
                        alert("Success!");
                    } else {
                        // Xử lý lỗi
                        throw new Error('Error.');
                    }
                })
                .catch(error => {
                    // Ghi log cho lỗi
                    console.log(error);
                    // Thông báo lỗi
                    alert("Error: " + error.message);
                });
        })
        .catch(error => {
            // Ghi log cho lỗi
            console.log(error);
            // Thông báo lỗi
            alert("Error: " + error.message);
        });
}

function postData(get_id, get_size) {
    // Lấy tham chiếu đến các phần tử input
    var recipientNameInput = document.getElementById('r_name');
    var deliveryAddressInput = document.getElementById('d_a');
    var recipientPhoneNumberInput = document.getElementById('r_ph');
    var paymentMethodSelect = document.getElementById('pay');
    const costElement = document.getElementById('cost');

    // Lấy giá trị từ các ô input
    var recipientName = recipientNameInput.value;
    var deliveryAddress = deliveryAddressInput.value;
    var recipientPhoneNumber = recipientPhoneNumberInput.value;
    var paymentMethod = paymentMethodSelect.value;
    const costValue = costElement.textContent;

    fetch(`${productsApi}/${get_id}`)
        .then(response => response.json())
        .then((products) => {
            var get_id_user = "";
            if (localStorage.getItem("loggedInUser")) {
                get_id_user = JSON.parse(localStorage.getItem("loggedInUser")).id;
            }
            else {
                get_id_user = null;
                alert(get_id_user);
            }
            var product_ordered = [{
                id: products.id,
                product_name: products.product_name,
                img: products.img,
                price: products.price,
                description: products.description,
                category: products.category,
                gender: products.gender,
                size: get_size,
                brand: products.brand,
                status: products.status,
                quantity: products.quantity,
                sold: products.sold,
                viewer: products.viewer,
                CreateAt: products.CreateAt,
                DeleteAt: products.DeleteAt
            }];

            var newPayment = {
                id_user: get_id_user,
                consignee_name: recipientName,
                consignee_phone_number: recipientPhoneNumber,
                delivery_address: deliveryAddress,
                method_payment: paymentMethod,
                products: product_ordered,
                total: costValue
            };

            fetch(paymentApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPayment)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        });
}