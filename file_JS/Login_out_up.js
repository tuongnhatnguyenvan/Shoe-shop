// login
let apiUser = "http://localhost:3000/users";

function checkLogin() {
  // Kiểm tra xem đã có thông tin đăng nhập trong Local Storage hay chưa
  let storedUser = localStorage.getItem("loggedInUser");
  if (storedUser) {
    // Chuyển đến trang tương ứng với vai trò đã đăng nhập
    let loggedInUser = JSON.parse(storedUser);
    checkUserRole(loggedInUser.role);
  }
};

function login() {
  getUser(handleLogin);
}

function getUser(callback) {
  fetch(apiUser)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function checkUserRole(role) {
  if (role === "user") {
    window.location.href = "Home_user.html";
  } else if (role === "admin") {
    window.location.href = "user.html";
  }
}

function handleLogin(data) {
  let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value;

  let loggedInUser = data.find(function (user) {
    return user.name === username && user.password === password;
  });

  if (loggedInUser) {
    alert("Logged in successfully!");
    // Lưu thông tin đăng nhập vào Local Storage
    localStorage.setItem("loggedInUser", JSON.stringify({ id: loggedInUser.id, role: loggedInUser.role }));
    setTimeout(function () {
      checkUserRole(loggedInUser.role);
    }, 0);
  } else {
    alert("Invalid username or password!");
  }
}

// Thêm hàm login() vào sự kiện onclick của nút "Login"
document.getElementById("login-btn").onclick = login;





// logout
function logout() {
  // Xóa thông tin đăng nhập khỏi Local Storage
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");

  // Chuyển hướng đến trang Home_page.html sau khi logout
  window.location.href = "Home_page.html";
}





const sendEmail = (email, name) => {
  console.log(email)
  fetch('http://localhost:3000/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, name}),
  })
    .then((response) => {
     console.log(response)
    })
}




// signup
function register() {
  // Lấy giá trị từ các trường input
  const username = document.getElementById('u').value;
  const address = document.getElementById('a').value;
  const phone = document.getElementById('ph').value;
  const email = document.getElementById('e').value;
  const password = document.getElementById('pa').value;

  // Kiểm tra xem các trường nhập liệu có được điền đầy đủ hay không
  if (!username || !address || !phone || !email || !password) {
    alert('Đăng ký không thành công! Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Tạo một đối tượng người dùng mới
  const newUser = {
    email: email,
    password: password,
    name: username,
    address: address,
    phonenumber: phone,
    role: 'user'
  };

  // Gửi yêu cầu POST đến API để thêm người dùng mới
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then(async (response) => {
      if (response.ok) {
        // Đăng ký thành công
        await sendEmail(newUser.email, newUser.name);
        alert('Đăng ký thành công!');
      } else {
        // Đăng ký không thành công
        console.error('Registration failed');
        alert('Đăng ký không thành công!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Đăng ký không thành công!');
    });
}

