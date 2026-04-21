// =======================
// SWITCH SECTIONS (Tabs)
// =======================

function showSection(section, event){

    // Hide all sections
    document.getElementById("productsSection").style.display = "none";
    document.getElementById("repairsSection").style.display = "none";

    // Show selected section
    document.getElementById(section + "Section").style.display = "block";

    // Active tab highlight
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    // 🔥 IMPORTANT: reload repairs when opening repairs tab
    if(section === "repairs"){
        loadRepairs();
    }
}


// =======================
// ADD PRODUCT
// =======================

document.getElementById("productForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const category = document.getElementById("category").value;

    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        features: [
            document.getElementById("feature1").value,
            document.getElementById("feature2").value
        ]
    };

    await fetch(`/api/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    alert("Product Added ✅");

    // reset form
    document.getElementById("productForm").reset();

    loadProducts();
});


// =======================
// LOAD PRODUCTS
// =======================

async function loadProducts(){

    const res = await fetch("/api/mobiles");
    const data = await res.json();

    const container = document.getElementById("adminProductContainer");

    let html = "";

    data.forEach((p, index) => {

        html += `
        <div class="admin-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <button onclick="deleteProduct('mobiles', ${index})">Delete</button>
        </div>
        `;
    });

    container.innerHTML = html;
}


// =======================
// DELETE PRODUCT
// =======================

async function deleteProduct(category, index){

    const confirmDelete = confirm("Delete this product?");
    if(!confirmDelete) return;

    await fetch(`/api/${category}/${index}`, {
        method: "DELETE"
    });

    alert("Deleted ✅");

    loadProducts();
}


// =======================
// LOAD REPAIRS
// =======================

async function loadRepairs(){

    const res = await fetch("/api/repairs");
    const data = await res.json();

    const container = document.getElementById("repairList");

    // 🔥 Handle empty case
    if(data.length === 0){
        container.innerHTML = "<p>No repairs added yet</p>";
        return;
    }

    let html = "";

    data.forEach((r, index) => {
    html += `
        <div class="repair-card-admin">
            <h4>${r.id}</h4>
            <p><strong>Name:</strong> ${r.name}</p>
            <p><strong>Device:</strong> ${r.device}</p>
            <p><strong>Status:</strong> ${r.status}</p>

            <button onclick="deleteRepair(${index})">Mark Delivered</button>
        </div>
    `;
});

    container.innerHTML = html;
}


// =======================
// ADD REPAIR
// =======================

document.getElementById("repairForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const repair = {
        id: document.getElementById("repairId").value,
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

    // reset form
    document.getElementById("repairForm").reset();

    // 🔥 instant UI update
    loadRepairs();
});


// =======================
// INIT
// =======================

loadProducts();
loadRepairs();

// =======================
// DELETE REPAIR
// =======================

async function deleteRepair(index){

    const confirmDelete = confirm("Mark this device as delivered?");

    if(!confirmDelete) return;

    await fetch(`/api/repairs/${index}`, {
        method: "DELETE"
    });

    alert("Device Delivered ✅");

    loadRepairs();
}