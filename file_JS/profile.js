function profile() {
    // Lấy thông tin người dùng đã đăng nhập từ local storage
    let storedUser = localStorage.getItem("loggedInUser");
    let loggedInUser = JSON.parse(storedUser);
    let userId = loggedInUser.id;

    let apiUser = "http://localhost:3000/users";
    fetch(`${apiUser}/${userId}`)
        .then(res => res.json())
        .then((user) => {
            // Lấy các phần tử input trong modal
            let nameText = document.getElementById('yourN');

            let nameInput =document.getElementById('name');
            let emailInput = document.getElementById('email1');
            let addressInput = document.getElementById('address');
            let phoneInput = document.getElementById('phone');
            let passWordInput = document.getElementById('password');
            let passWordAgainInput = document.getElementById('passwordAgain');

            // Đặt giá trị của các ô từ thông tin người dùng
            nameText.textContent = user.name;

            nameInput.value = user.name;
            emailInput.value = user.email;
            addressInput.value = user.address;
            phoneInput.value = user.phonenumber;
            passWordInput.value = user.password;
        });
}

document.getElementById("changeInfoModal").addEventListener("click", profile);


