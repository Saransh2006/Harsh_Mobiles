// =======================
// SELECT ELEMENTS
// =======================

const mobilesBtn = document.getElementById("mobilesBtn");
const electronicsBtn = document.getElementById("electronicsBtn");
const toggleBg = document.getElementById("toggleBg");
const productContainer = document.getElementById("productContainer");


// =======================
// RENDER PRODUCTS
// =======================

function renderProducts(data) {

    let html = "";

    data.forEach((product, index) => {

        html += `
<div class="card fade-up">

    <div class="image-box">
        <img src="${product.image}">
        <span class="badge">In Stock</span>
    </div>

    <h3>${product.name}</h3>

    <ul>
        ${product.features.map(f => `<li>${f}</li>`).join("")}
    </ul>

    <div class="bottom-row">
        <span class="price">${product.price}</span>
        <button class="view-btn">View</button>
    </div>

</div>
`;
    });

    productContainer.innerHTML = html;
}


// =======================
// LOAD DATA
// =======================

async function loadMobiles() {
    const res = await fetch("/api/mobiles");
    const data = await res.json();
    renderProducts(data);
}

async function loadElectronics() {
    const res = await fetch("/api/electronics");
    const data = await res.json();
    renderProducts(data);
}


// =======================
// BUTTON EVENTS
// =======================

// default load
loadMobiles();

mobilesBtn.addEventListener("click", () => {

    mobilesBtn.classList.add("active");
    electronicsBtn.classList.remove("active");

    document.querySelector(".toggle").classList.remove("active-right");

    loadMobiles();
});

electronicsBtn.addEventListener("click", () => {

    electronicsBtn.classList.add("active");
    mobilesBtn.classList.remove("active");

    document.querySelector(".toggle").classList.add("active-right");

    loadElectronics();
});

// =======================
// REPAIR TRACKING
// =======================

async function trackRepair() {

    const id = document.getElementById("repairId").value.trim().toUpperCase();
    const resultDiv = document.getElementById("repairResult");

    if(!id){
        resultDiv.innerHTML = `<p class="repair-error">Enter Repair ID</p>`;
        return;
    }

    try{
        const res = await fetch(`/api/repair/${id}`);

        if(!res.ok){
            resultDiv.innerHTML = `<p class="repair-error">Repair not found</p>`;
            return;
        }

        const data = await res.json();

       resultDiv.innerHTML = `
    <div class="repair-card">

        <h3>Repair Details</h3>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Device:</strong> ${data.device}</p>

        <div class="status ${data.status.toLowerCase()}">
            ${data.status}
        </div>

    </div>
`;

    }catch(err){
        resultDiv.innerHTML = `<p class="repair-error">Server error</p>`;
    }
}

