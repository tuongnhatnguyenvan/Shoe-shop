fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
        const table = document.getElementById("table-tr_display");

        data.forEach((user) => {
            console.log(user);
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("btn", "btn-outline-danger");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#myDelete");
            deleteButton.innerHTML = `
        <i class="fa fa-trash fa-lg me-2" aria-hidden="true"></i>
      `;

            deleteButton.addEventListener("click", function () {
                const userId = user.id;
                const dele = document.getElementById('nutdeleteuser');
                dele.addEventListener('click', () => {
                    deleteUser(userId);
                })
            });

            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.phonenumber}</td>
        <td>${user.role}</td>
      `;
            const deleteCell = document.createElement("td");
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            table.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    });

function deleteUser(userId) {
    // Gửi yêu cầu DELETE để xóa người dùng khỏi JSON
    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .catch(function (error) {
            // Xử lý lỗi khi gửi yêu cầu
            alert('Đã xảy ra lỗi: ' + error.message);
        });
}



document.querySelector('.add').addEventListener('click', function () {
    // Lấy giá trị từ các trường input
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var phoneNumber = document.getElementById('phonenumber').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    // Tạo một đối tượng mới từ dữ liệu người dùng
    var newUser = {
        id: null, // Thêm userId tự động
        email: email,
        password: password,
        name: name,
        address: address,
        phonenumber: phoneNumber,
        role: role
    };




    // Gửi yêu cầu POST để thêm dữ liệu vào JSON
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(function (response) {
            if (response.ok) {
                // Thêm thành công, hiển thị thông báo
                alert('Thêm người dùng thành công!');
            } else {
                // Xử lý lỗi khi thêm không thành công
                alert('Thêm người dùng thất bại!');
            }
        })
});
