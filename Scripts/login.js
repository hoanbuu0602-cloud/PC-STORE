function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// Hiển thị thông báo
function showMessage(boxId, message, type) {
    let box = document.getElementById(boxId);

    // Xóa thông báo cũ
    let oldMsg = box.querySelector(".msg");
    if (oldMsg) oldMsg.remove();

    // Tạo thông báo mới
    let div = document.createElement("div");
    div.className = "msg " + (type === "error" ? "error" : "success");
    div.innerText = message;

    box.appendChild(div);
}

// ĐĂNG KÝ
function register() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (username === "" || password === "") {
        showMessage("registerBox", "Vui lòng nhập đầy đủ thông tin!", "error");
        return;
    }

    // Lấy danh sách tài khoản trong localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng tên
    let exist = users.find(u => u.username === username);
    if (exist) {
        showMessage("registerBox", "Tên đã được sử dụng!", "error");
        return;
    }

    // Thêm người dùng mới
    users.push({ username: username, password: password });

    localStorage.setItem("users", JSON.stringify(users));

    showMessage("registerBox", "Đăng ký thành công! Hãy đăng nhập.", "success");

    setTimeout(() => {
        showLogin();
    }, 1200);
}

// ĐĂNG NHẬP
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (username === "" || password === "") {
        showMessage("loginBox", "Vui lòng nhập đầy đủ thông tin!", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra tài khoản
    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showMessage("loginBox", "Sai tên đăng nhập hoặc mật khẩu!", "error");
        return;
    }

    // Lưu trạng thái đăng nhập
    localStorage.setItem("loggedInUser", username);

    showMessage("loginBox", "Đăng nhập thành công!", "success");

    // Chuyển về HOME
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1200);
}
