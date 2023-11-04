// Show Products

const productsApi = "http://localhost:3000/products";
fetch(productsApi)
    .then((response) => response.json())
    .then((products) => {
        console.log(products);
        var container = document.getElementById("ShowProduct");
        var html = "";
        html += `
    <table class="table table-bordered table-hover mt-5">
    <thead>
        <tr>
            <th scope="col " colspan="6">PRODUCT</th>
            <td scope="col" class="text-end"><button type="button"
                    class="btn btn-success" data-bs-toggle="modal"
                    data-bs-target="#add_Product" >Add Product</button></td>
        </tr>
        <tr class="table-secondary">
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sold</th>
            <th scope="col">Price</th>
            <th scope="col" colspan="2">Action</th>
        </tr>
    </thead>
    <tbody>
    `;

        products.forEach((element) => {
            // var sold=products.quantity-products.sold
            html += `
            <tr>
            <td class="text-center align-middle">${element.id}</td>
            <td class="text-center align-middle">${element.product_name}</td>
            <td class="text-center align-middle"><img class="img-fluid" width="200" height="200" src="${element.img}" alt="Ảnh Giày" class="img-fluid rounded"></td>
            <td class="text-center align-middle">${element.quantity}</td>
            <td class="text-center align-middle">${element.sold}</td>
            <td class="text-center align-middle">${element.price}</td>
            <td class="text-center align-middle">
              <button type="button" onclick="handleOnclick(${element.id})" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myDelete"><i class="fa fa-trash fa-lg me-2" aria-hidden="true"></i></button>
              <button type="button" onclick="handleOnclick1(${element.id})"class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#myUpdate"><i class="fa fa-cog fa-lg" aria-hidden="true"></i></button>
            </td>
          </tr>
     `;
        });
        html += `</tbody>
            </table>`;

        container.innerHTML = html;
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// delete
var handleOnclick = (id) => {
    var deleteButton = document.getElementById("deleteConfirmButton");
    deleteButton.addEventListener("click", function () {
        fetch(`${productsApi}/${id}`, {
            method: "DELETE",
        })
            .then(function (response) {
                if (response.ok) {
                    console.log("Product deleted successfully.");
                    fetchProducts(); // Fetch and update the product list
                    $("#myDelete").modal("hide"); // Hiện
                    alert("Product deleted successfully.");
                } else {
                    console.error("Error deleting product.");
                }
            })
            .catch(function (error) {
                console.error("Error:", error);
            });
    });
};
// Add Product
// Xử lý sự kiện click của nút "Add"
function addProduct() {
    // Lấy dữ liệu từ các trường nhập liệu trong modal
    var product_name = document.getElementById("product_name").value;
    var img = document.getElementById("image").value;
    var price = document.getElementById("Price").value;
    var description = document.getElementById("description").value;
    var category = document.getElementById("category").value;
    var size = document.getElementById("size").value;
    var gender = document.getElementById("gender").value;
    var brand = document.getElementById("brand").value;
    var status = document.getElementById("choose");
    var option1 = status.options[status.selectedIndex].text;
    var quantity = document.getElementById("quantity").value;
    var sold = document.getElementById("sold").value;
    var viewer = document.getElementById("choose");
    var options2 = viewer.options[viewer.selectedIndex].text;
    var createAt = document.getElementById("createAt").value;

    // Tạo đối tượng sản phẩm từ dữ liệu đã lấy
    var newProduct = {
        product_name: product_name,
        img: img,
        price: price,
        description: description,
        category: category,
        size: size,
        gender: gender,
        brand: brand,
        status: option1,
        quantity: quantity,
        sold: sold,
        viewer: options2,
        createAt: createAt
    };
    alert("Product added successfully");

    // Gửi yêu cầu POST để thêm sản phẩm vào cơ sở dữ liệu
    fetch(productsApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(function (response) {
            if (response.ok) {
                console.log("Product added successfully");
                // Thực hiện các hành động khác sau khi thêm sản phẩm thành công
            } else {
                console.error("Error adding product:", response.status);
                // Xử lý lỗi khi không thể thêm sản phẩm
            }
        })
        .catch(function (error) {
            console.error("Error adding product:", error);
            // Xử lý lỗi khi có lỗi trong quá trình gửi yêu cầu
        });
};

// update
function handleOnclick1(id) {
    const productsApi = "http://localhost:3000/products";

    fetch(productsApi)
        .then(response => response.json())
        .then(data => {
            // Lấy dữ liệu từ JSON dựa trên id
            var jsonData = data.find(product => product.id === id);

            // Hiển thị dữ liệu lên form modal
            document.getElementById("id_modal").value = jsonData.id;
            document.getElementById("productname_modal").value = jsonData.product_name;
            document.getElementById("linkimg_modal").value = jsonData.img;
            document.getElementById("price_modal").value = jsonData.price;
            document.getElementById("description_modal").value = jsonData.description;
            document.getElementById("category_modal").value = jsonData.category;
            document.getElementById("size_modal").value = jsonData.size;
            document.getElementById("brand_modal").value = jsonData.brand;
            document.getElementById("status_modal").value = jsonData.status;
            document.getElementById("gender_modal").value = jsonData.gender;
            document.getElementById("quantity_modal").value = jsonData.quantity;
            document.getElementById("sold_modal").value = jsonData.sold;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    document.getElementById("save_button").addEventListener("click", function () {
        // Thực hiện cập nhật dữ liệu vào JSON
        updateProductData();
    });
}

function updateProductData() {
    const updatedData = {
        id: document.getElementById("id_modal").value,
        product_name: document.getElementById("productname_modal").value,
        img: document.getElementById("linkimg_modal").value,
        price: document.getElementById("price_modal").value,
        description: document.getElementById("description_modal").value,
        category: document.getElementById("category_modal").value,
        size: document.getElementById("size_modal").value,
        brand: document.getElementById("brand_modal").value,
        status: document.getElementById("status_modal").value,
        gender: document.getElementById("gender_modal").value,
        quantity: document.getElementById("quantity_modal").value,
        sold: document.getElementById("sold_modal").value
    };

    // Gửi yêu cầu PUT để cập nhật dữ liệu vào JSON
    fetch(productsApi + "/" + updatedData.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data updated:", data);
            // Thực hiện các thao tác cần thiết sau khi cập nhật thành công
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu có
        });
}