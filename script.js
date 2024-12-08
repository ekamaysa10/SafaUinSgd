// Fungsi untuk toggle menu dropdown
function toggleMenu() {
    var menu = document.getElementById("dropdown-menu");
    menu.classList.toggle('show');  // Menggunakan toggle untuk menambah/menghapus class
}
// Fungsi untuk toggle menu dropdown
function toggleMenu() {
    var menu = document.getElementById("dropdown-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Menutup dropdown jika klik di luar menu dropdown
window.onclick = function(event) {
    if (!event.target.matches('.menu-icon button, .menu-icon i')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};


// Data untuk pencarian
const items = [
    { name: "Gorengan Bu Ade", link: "Gorengan.html" },
    { name: "PUSAT ES", link: "Jus.html" },
    { name: "Fotocopy", link: "Fotocopy.html" },
    { name: "Audrey Food", link: "Audrey Food.html" },
    { name: "Seblak Hot Jeletot Teh Eva", link: "Seblak.html" },
    { name: "Hi.Pod", link: "HiPod.html" },
    { name: "Es Teler Sultan Jatinangor", link: "EsTeler.html" },
    { name: "Batagor 486", link: "Batagor.html" },
];

// Fungsi pencarian
function searchItems() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    
    // Hapus hasil sebelumnya
    resultsContainer.innerHTML = '';

    if (input.trim() === '') {
        resultsContainer.style.display = 'none'; // Sembunyikan hasil jika input kosong
        return;
    }

    // Filter data berdasarkan input
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(input)
    );

    // Menampilkan hasil
    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `<a href="${item.link}">${item.name}</a>`;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }

    // Tampilkan hasil
    resultsContainer.style.display = 'block';
}

// Menyembunyikan hasil jika klik di luar bilah pencarian
document.addEventListener('click', function (event) {
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.getElementById('search-results');

    if (!searchBar.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});





// Tutup menu dropdown jika klik di luar area menu
window.addEventListener('click', function(event) {
    if (!event.target.matches('.menu-icon button, .menu-icon i')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
});

// Fungsi untuk menampilkan kategori tertentu
function showCategory(category) {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('makanan-section').style.display = 'none';
    document.getElementById('minuman-section').style.display = 'none';
    document.getElementById('fotocopy-section').style.display = 'none';

    if (category === 'makanan') {
        document.getElementById('makanan-section').style.display = 'block';
    } else if (category === 'minuman') {
        document.getElementById('minuman-section').style.display = 'block';
    } else if (category === 'fotocopy') {
        document.getElementById('fotocopy-section').style.display = 'block';
    } else if (category === 'home') {
        document.getElementById('home-section').style.display = 'block';
    }
}

// Pengelolaan Keranjang
let cart = [];
let cartCount = 0;
let totalPrice = 0;

// Fungsi untuk menambah jumlah item
function increaseQuantity(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.innerText);
    quantity++;
    quantityElement.innerText = quantity;

    // Perbarui jumlah di keranjang
    updateCartQuantity(itemName, itemPrice, 1);
}

// Fungsi untuk mengurangi jumlah item
function decreaseQuantity(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.innerText);

    if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;

        // Perbarui jumlah di keranjang
        updateCartQuantity(itemName, itemPrice, -1);
    }
}

// Fungsi untuk menambah item ke keranjang
function addToCart(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 0) {
        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: quantity });
        }
        cartCount += quantity;
        totalPrice += quantity * itemPrice;

        updateCartDisplay();
        openCart(); // Buka keranjang secara otomatis setelah item ditambahkan
    }
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartQuantity(itemName, itemPrice, change) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += change;

        // Jika jumlah item <= 0, hapus dari keranjang
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== itemName);
        }

        // Update cart count dan total price
        cartCount += change;
        totalPrice += change * itemPrice;
        
        // Pastikan nilai total tidak negatif
        if (cartCount < 0) cartCount = 0;
        if (totalPrice < 0) totalPrice = 0;

        updateCartDisplay();
    }
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Kosongkan konten keranjang sebelum menambahkan item baru

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<p>${item.name} - Rp${(item.price * item.quantity).toLocaleString()} x${item.quantity}</p>`;
        cartItems.appendChild(cartItem);
    });

    // Update total harga dan jumlah item di badge
    document.getElementById('total-price').textContent = `Rp${totalPrice.toLocaleString()}`;
    document.getElementById('cart-count').textContent = cartCount;
}

// Fungsi untuk membuka modal keranjang
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

// Fungsi untuk menutup modal keranjang
function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Event untuk close modal dengan klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fungsi untuk mengonfirmasi pesanan
function confirmOrder() {
    // Simpan data pesanan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total-price', totalPrice);

    // Pastikan penyimpanan terjadi sebelum redirect
    window.location.href = 'Pesanan.html';
}

// Fungsi untuk menampilkan halaman detail pesanan
function showOrderDetails() {
    // Mengambil data pesanan dari localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = localStorage.getItem('total-price') || 0;

    // Menampilkan daftar pesanan di halaman
    const orderItemsList = document.getElementById('order-items-list');
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rp${(item.price * item.quantity).toLocaleString()} x${item.quantity}`;
        orderItemsList.appendChild(listItem);
    });

    // Menampilkan total harga
    document.getElementById('order-total-price').textContent = `Rp${parseInt(totalPrice).toLocaleString()}`;
}

// Fungsi untuk pembayaran
function makePayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    alert(`Pembayaran menggunakan metode: ${paymentMethod}. Terima kasih telah berbelanja!`);
    // Logika pembayaran bisa ditambahkan di sini
}
  // Simpan data ke localStorage dan buka halaman Struk
document.getElementById("place-order-btn").addEventListener("click", function() {
    const orderData = {
        storeName: "Gorengan Bu Ade",
        storeAddress: "Jl. Sukajadi No. 123, Bandung",
        items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity
        })),
        totalPrice: calculateTotalPrice(),
        paymentMethod: document.getElementById("payment-method").value || "Cash" // Default ke Cash
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));
    window.location.href = "Struk.html";
});

function completeOrder() {
    alert("Pesanan berhasil dibuat!");
    localStorage.removeItem("cart"); // Hapus data pesanan setelah diproses
    window.location.href = "Menu1.html";
}


// Fungsi untuk membuka modal struk
function openReceiptModal() {
    const receiptModal = document.getElementById("receipt-modal");
    const receiptItemsContainer = document.getElementById("receipt-items");
    const receiptTotalPrice = document.getElementById("receipt-total-price");

    // Kosongkan konten modal struk
    receiptItemsContainer.innerHTML = "";

    // Tambahkan item pesanan ke dalam struk
    let totalHarga = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} x${item.quantity} - Rp${item.price * item.quantity}`;
        receiptItemsContainer.appendChild(itemElement);
        totalHarga += item.price * item.quantity;
    });

    // Tampilkan total harga di modal struk
    receiptTotalPrice.textContent = `Rp${totalHarga}`;

    // Tampilkan modal struk
    receiptModal.style.display = "block";
}

// Fungsi untuk menutup modal struk
function closeReceiptModal() {
    document.getElementById("receipt-modal").style.display = "none";
}

// Fungsi untuk memilih metode pembayaran
function selectPaymentMethod(method) {
    const paymentMethodText = document.getElementById('payment-method-text');
    const qrisImage = document.getElementById('qris-image');

    // Memperbarui teks di modal sesuai dengan metode pembayaran yang dipilih
    if (method === 'qris') {
        paymentMethodText.textContent = 'QRIS';  // Mengubah teks menjadi QRIS
        qrisImage.style.display = 'block';  // Menampilkan gambar QRIS
    } else {
        paymentMethodText.textContent = 'Cash';  // Mengubah teks menjadi Cash
        qrisImage.style.display = 'none';   // Menyembunyikan gambar QRIS
    }
}


// Fungsi untuk mengonfirmasi pesanan dan membuka modal struk
function confirmOrder() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const paymentMethodElement = document.getElementById('payment-method-text');
    
    // Set metode pembayaran sesuai pilihan
    paymentMethodElement.textContent = selectedMethod === 'qris' ? 'QRIS' : 'Cash';
    
    // Tampilkan modal struk dengan metode pembayaran yang dipilih
    openReceiptModal();
}

// Fungsi untuk membuka modal keranjang (sesuaikan jika sudah didefinisikan di tempat lain)
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
}

// Fungsi untuk menutup modal keranjang (sesuaikan jika sudah didefinisikan di tempat lain)
function closeModal() {
    document.getElementById("cart-modal").style.display = "none";
}
// Daftar nomor WhatsApp berdasarkan nama toko
const whatsappNumbers = {
    "Audrey Food": "6285722729950",
    "Pusat Es": "6285176700525",
    "Fotocopy": "6283100426211",
    "Hi.pod": "6285723891658",
    "Batagor": "6285137612150",
    "Es Teler": "6289685380505"
};

// Fungsi untuk konfirmasi pesanan via WhatsApp
function confirmOrderAndRedirect(storeName) {
    let orders = cart.map(item => 
        `${item.name} (x${item.quantity}) - Rp${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    // Ambil metode pembayaran yang dipilih
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const paymentMethodText = paymentMethod === 'cash' ? 'Cash' : 'QRIS';

    // Format pesan untuk WhatsApp
    const message = `Pesanan dari ${storeName}:\n\n${orders}\nTotal Pembayaran: Rp${totalPrice.toLocaleString()}\nMetode Pembayaran: ${paymentMethodText}\n\nTerima kasih!`;

    // Ambil nomor WhatsApp berdasarkan nama toko
    const phoneNumber = whatsappNumbers[storeName];
    if (!phoneNumber) {
        alert("Nomor WhatsApp untuk toko ini tidak ditemukan.");
        return;
    }

    // Buat URL WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}

// Contoh penggunaan: Panggil fungsi dengan nama toko yang sesuai
document.getElementById("confirm-order-btn").addEventListener("click", function() {
    const storeName = "Audrey Food"; // Sesuaikan nama toko
    confirmOrderAndRedirect(storeName);
});


// Fungsi untuk menyimpan pesanan ke localStorage
function saveOrderToLocalStorage() {
    const orderData = {
        storeName: "Audrey Food",
        items: cart,
        totalPrice: totalPrice,
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));
    window.location.href = "Struk.html";
}

// Fungsi untuk menampilkan struk pesanan
function showOrderDetails() {
    const orderData = JSON.parse(localStorage.getItem("orderData")) || { items: [], totalPrice: 0 };

    const orderItemsList = document.getElementById('order-items-list');
    orderItemsList.innerHTML = '';

    orderData.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rp${(item.price * item.quantity).toLocaleString()} x${item.quantity}`;
        orderItemsList.appendChild(listItem);
    });

    document.getElementById('order-total-price').textContent = `Rp${parseInt(orderData.totalPrice).toLocaleString()}`;
}

// Fungsi untuk memilih metode pembayaran
function selectPaymentMethod(method) {
    const qrisImage = document.getElementById('qris-image');
    const paymentMethodText = document.getElementById('payment-method-text');

    if (method === 'qris') {
        qrisImage.style.display = 'block';
        paymentMethodText.textContent = 'QRIS';
    } else {
        qrisImage.style.display = 'none';
        paymentMethodText.textContent = 'Cash';
    }
}
