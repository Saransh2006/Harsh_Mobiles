// =======================
// AUTH CHECK
// =======================

const token = sessionStorage.getItem("auth");

if(!token){
    window.location.href = "/admin-login";
}

// =======================
// LOGOUT
// =======================

function logout(){
    sessionStorage.removeItem("auth");
    window.location.href = "/admin-login";
}

// =======================
// TAB SWITCH
// =======================

function showSection(section, event){

    document.getElementById("productsSection").style.display = "none";
    document.getElementById("repairsSection").style.display = "none";

    document.getElementById(section + "Section").style.display = "block";

    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if(section === "repairs"){
        loadRepairs();
    }
}

// =======================
// ADD PRODUCT
// =======================

document.getElementById("productForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fileInput = document.getElementById("imageFile");
    let imageUrl = "";

    if(fileInput && fileInput.files[0]){
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);

        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
    }

    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        image: imageUrl,
        features: [
            document.getElementById("feature1").value,
            document.getElementById("feature2").value
        ],
        category: document.getElementById("category").value.toLowerCase()
    };

    await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    alert("Product Added ✅");

    e.target.reset();
    loadProducts();
});

// =======================
// LOAD PRODUCTS
// =======================

async function loadProducts(){

    const res = await fetch("/api/products");
    const data = await res.json();

    const container = document.getElementById("adminProductContainer");

    if(data.length === 0){
        container.innerHTML = "<p>No products available</p>";
        return;
    }

    let html = "";

    data.forEach(p => {
        html += `
        <div class="admin-card">
            <img src="${p.image || '/images/default.png'}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <button onclick="deleteProduct('${p._id}')">Delete</button>
        </div>
        `;
    });

    container.innerHTML = html;
}

// =======================
// DELETE PRODUCT
// =======================

async function deleteProduct(id){

    if(!confirm("Delete this product?")) return;

    await fetch(`/api/products/${id}`, {
        method: "DELETE"
    });

    loadProducts();
}

// =======================
// ADD REPAIR
// =======================

document.getElementById("repairForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const repair = {
        id: document.getElementById("repairId").value.trim().toUpperCase(),
        name: document.getElementById("customerName").value,
        device: document.getElementById("device").value,
        status: document.getElementById("status").value
    };

    await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(repair)
    });

    alert("Repair Added ✅");

    e.target.reset();
    loadRepairs();
});

// =======================
// LOAD REPAIRS
// =======================

async function loadRepairs(){

    const res = await fetch("/api/repairs");
    const data = await res.json();

    const container = document.getElementById("repairList");

    if(data.length === 0){
        container.innerHTML = "<p>No repairs available</p>";
        return;
    }

    let html = "";

    data.forEach(r => {
        html += `
        <div class="repair-card-admin">
            <h4>${r.id}</h4>
            <p>${r.name}</p>
            <p>${r.device}</p>
            <p>${r.status}</p>
            <button onclick="deleteRepair('${r.id}')">Delivered</button>
        </div>
        `;
    });

    container.innerHTML = html;
}

// =======================
// DELETE REPAIR
// =======================

async function deleteRepair(id){

    await fetch(`/api/repair/${id}`, {
        method: "DELETE"
    });

    loadRepairs();
}

// =======================
// DASHBOARD
// =======================

async function loadDashboard(){

    const products = await fetch("/api/products").then(res => res.json());
    const repairs = await fetch("/api/repairs").then(res => res.json());

    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("totalRepairs").innerText = repairs.length;
}

// =======================
// INIT
// =======================

loadProducts();
loadRepairs();
loadDashboard();