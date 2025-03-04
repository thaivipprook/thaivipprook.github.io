let balance = 10000000; // 10 triệu VND khởi đầu
let betAmount = 0;
let betChoice = null;
let wins = 0;
let losses = 0;
let history = [];
let gameCountdown = 60;
let betCountdown = 15;
let gameTimerInterval;
let betTimerInterval;
let isConfirmed = false;

// Lấy danh sách người dùng từ localStorage hoặc khởi tạo mặc định
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "admin", password: "123456" }
];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function formatVND(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showRegister() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}

function showDeposit() {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('depositContainer').style.display = 'block';
}

function hideDeposit() {
    document.getElementById('depositContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('depositAmount').value = '';
    document.getElementById('depositMessage').textContent = '';
}

function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    if (!username || !password) {
        registerMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    if (users.find(u => u.username === username)) {
        registerMessage.textContent = "Tên người dùng đã tồn tại!";
        return;
    }

    users.push({ username, password });
    saveUsers();
    registerMessage.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        startGameLoop();
    } else {
        loginMessage.textContent = "Tên người dùng hoặc mật khẩu sai!";
    }
}

function logout() {
    clearInterval(gameTimerInterval);
    clearInterval(betTimerInterval);
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginMessage').textContent = '';
}

function deposit() {
    const amount = parseInt(document.getElementById('depositAmount').value);
    const depositMessage = document.getElementById('depositMessage');

    if (!amount || amount <= 0) {
        depositMessage.textContent = "Vui lòng nhập số tiền hợp lệ!";
        return;
    }

    // Mô phỏng nạp tiền (thực tế cần API ngân hàng)
    balance += amount;
    document.getElementById('balance').textContent = formatVND(balance);
    depositMessage.textContent = `Đã nạp ${formatVND(amount)} VND thành công!`;
    setTimeout(hideDeposit, 2000); // Quay lại game sau 2 giây
}

function setChoice(choice) {
    if (isConfirmed) {
        showPopup("Đã xác nhận cược, không thể thay đổi lựa chọn!");
        return;
    }
    betChoice = choice;
    document.getElementById('taiBtn').style.background = '#4CAF50'; // Reset về xanh lá
    document.getElementById('xiuBtn').style.background = '#4CAF50'; // Reset về xanh lá
    document.getElementById(`${choice.toLowerCase()}Btn`).style.background = '#f44336'; // Đổi màu đỏ
    updateBetStatus();
}

function placeBet(amount) {
    if (!betChoice) {
        showPopup("Vui lòng chọn Tài hoặc Xỉu trước!");
        return;
    }
    if (amount > balance) {
        showPopup("Không đủ số dư để đặt cược!");
        return;
    }
    betAmount += amount;
    balance -= amount;
    document.getElementById('balance').textContent = formatVND(balance);
    document.getElementById('betAmount').textContent = formatVND(betAmount);
    updateBetStatus();
}

function confirmBet() {
    if (!betChoice || betAmount === 0) {
        showPopup("Vui lòng chọn Tài/Xỉu và đặt tiền trước khi xác nhận!");
        return;
    }
    isConfirmed = true;
    document.getElementById('taiBtn').disabled = true;
    document.getElementById('xiuBtn').disabled = true;
    document.getElementById('confirmBtn').disabled = true;
    showPopup("Cược đã được xác nhận! Bạn vẫn có thể thêm tiền.");
}

function updateBetStatus() {
    const status = betChoice ? `${betChoice} - ${formatVND(betAmount)} VND` : "Chưa chọn";
    document.getElementById('betStatus').textContent = status;
}

function resetBetting() {
    betAmount = 0;
    betChoice = null;
    isConfirmed = false;
    document.getElementById('betAmount').textContent = '0';
    document.getElementById('taiBtn').style.background = '#4CAF50';
    document.getElementById('xiuBtn').style.background = '#4CAF50';
    document.getElementById('betStatus').textContent = "Chưa chọn";
    document.getElementById('taiBtn').disabled = false;
    document.getElementById('xiuBtn').disabled = false;
    document.getElementById('bet10000').disabled = false;
    document.getElementById('bet50000').disabled = false;
    document.getElementById('bet100000').disabled = false;
    document.getElementById('bet500000').disabled = false;
    document.getElementById('confirmBtn').disabled = false;
}

function startGameLoop() {
    gameCountdown = 60;
    betCountdown = 15;
    document.getElementById('gameCountdown').textContent = gameCountdown;
    document.getElementById('betCountdown').textContent = betCountdown;
    document.getElementById('dealerVoice').play();
    document.getElementById('outcome').textContent = "Đặt cược đi nào!";
    clearInterval(gameTimerInterval);
    clearInterval(betTimerInterval);
    resetBetting();

    gameTimerInterval = setInterval(() => {
        gameCountdown--;
        document.getElementById('gameCountdown').textContent = gameCountdown;
        if (gameCountdown <= 15 && !betTimerInterval) {
            startBetCountdown();
        }
        if (gameCountdown <= 0) {
            playGame();
            startGameLoop();
        }
    }, 1000);
}

function startBetCountdown() {
    betCountdown = 15;
    document.getElementById('betCountdown').textContent = betCountdown;
    betTimerInterval = setInterval(() => {
        betCountdown--;
        document.getElementById('betCountdown').textContent = betCountdown;
        if (betCountdown <= 5) {
            document.getElementById('outcome').textContent = "Chuẩn bị tung!";
        }
        if (betCountdown <= 0) {
            clearInterval(betTimerInterval);
        }
    }, 1000);
}

function playGame() {
    document.getElementById('diceSound').play();
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');
    dice1.classList.add('rolling');
    dice2.classList.add('rolling');
    dice3.classList.add('rolling');

    setTimeout(() => {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        const roll3 = Math.floor(Math.random() * 6) + 1;
        const total = roll1 + roll2 + roll3;
        const outcome = (total >= 11 && total <= 18) ? 'Tài' : 'Xỉu';

        dice1.textContent = roll1;
        dice2.textContent = roll2;
        dice3.textContent = roll3;
        dice1.classList.remove('rolling');
        dice2.classList.remove('rolling');
        dice3.classList.remove('rolling');

        document.getElementById('outcome').textContent = `${outcome} (${total})`;

        if (betAmount > 0 && isConfirmed) {
            if (outcome === betChoice) {
                const winnings = betAmount * 2;
                balance += winnings;
                wins++;
                document.getElementById('winSound').play();
                showPopup(`Chúc mừng! Bạn thắng ${formatVND(winnings)} VND`);
            } else {
                losses++;
                document.getElementById('loseSound').play();
                showPopup(`Rất tiếc! Bạn thua ${formatVND(betAmount)} VND`);
            }
        } else if (betAmount > 0 && !isConfirmed) {
            showPopup("Bạn chưa xác nhận cược, tiền sẽ không được tính!");
        }

        document.getElementById('balance').textContent = formatVND(balance);
        document.getElementById('winRate').textContent = `${wins}/${losses}`;
        addToHistory(roll1, roll2, roll3, total, outcome);
    }, 2000);
}

function addToHistory(d1, d2, d3, total, outcome) {
    history.unshift(`Xúc xắc: ${d1}, ${d2}, ${d3} | Tổng: ${total} | ${outcome}`);
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.slice(0, 5).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function showPopup(message) {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}