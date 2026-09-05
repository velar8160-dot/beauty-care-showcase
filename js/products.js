/* ===== Products Data ===== */
const productsData = [
    {
        id: 1,
        name: "كريم الوجه المرطب الفاخر",
        description: "كريم مرطب عميق بتركيبة فاخرة غنية بمستخلصات الورد الطبيعية",
        price: "129.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Face+Cream",
        category: "skincare",
        affiliateLink: "https://example.com/product1"
    },
    {
        id: 2,
        name: "سيرم ضد الشيخوخة",
        description: "سيرم متقدم يحتوي على فيتامين C وحمض الهيالورونيك",
        price: "189.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Anti-Aging+Serum",
        category: "skincare",
        affiliateLink: "https://example.com/product2"
    },
    {
        id: 3,
        name: "شامبو الشعر الطبيعي",
        description: "شامبو طبيعي خالٍ من الكيماويات الضارة لشعر صحي ولامع",
        price: "79.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Natural+Shampoo",
        category: "haircare",
        affiliateLink: "https://example.com/product3"
    },
    {
        id: 4,
        name: "بلسم الشعر المعالج",
        description: "بلسم مكثف يعالج الشعر الجاف والتالف بعمق",
        price: "89.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Hair+Conditioner",
        category: "haircare",
        affiliateLink: "https://example.com/product4"
    },
    {
        id: 5,
        name: "أحمر الشفاه الفاخر",
        description: "أحمر شفاه بتركيبة ناعمة وألوان احترافية طويلة الأمد",
        price: "99.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Luxury+Lipstick",
        category: "makeup",
        affiliateLink: "https://example.com/product5"
    },
    {
        id: 6,
        name: "أساس مكياج متطور",
        description: "أساس سائل خفيف يوفر تغطية مثالية طوال اليوم",
        price: "159.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Foundation",
        category: "makeup",
        affiliateLink: "https://example.com/product6"
    },
    {
        id: 7,
        name: "زيت الجسم المرطب",
        description: "زيت فاخر يرطب الجسم ويترك رائحة عطرة ناعمة",
        price: "119.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Body+Oil",
        category: "bodycare",
        affiliateLink: "https://example.com/product7"
    },
    {
        id: 8,
        name: "جل الاستحمام المعطر",
        description: "جل استحمام منعش برائحة الورد والياسمين الطبيعية",
        price: "69.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Body+Gel",
        category: "bodycare",
        affiliateLink: "https://example.com/product8"
    },
    {
        id: 9,
        name: "عطر الورد الكلاسيكي",
        description: "عطر كلاسيكي برائحة الورد الفاخرة التي تدوم طويلاً",
        price: "249.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Rose+Perfume",
        category: "fragrances",
        affiliateLink: "https://example.com/product9"
    },
    {
        id: 10,
        name: "عطر الزهور الشرقي",
        description: "عطر شرقي فاخر بنوتات الزهور والعنبر",
        price: "299.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Floral+Perfume",
        category: "fragrances",
        affiliateLink: "https://example.com/product10"
    },
    {
        id: 11,
        name: "مصل الفيتامين E",
        description: "مصل غني بفيتامين E لحماية البشرة من الجذور الحرة",
        price: "109.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Vitamin+E+Serum",
        category: "skincare",
        affiliateLink: "https://example.com/product11"
    },
    {
        id: 12,
        name: "قناع الوجه المنعش",
        description: "قناع أسبوعي ينعش الجلد ويعيد الحيوية والإشراق",
        price: "89.99 ر.س",
        image: "https://via.placeholder.com/300x300?text=Face+Mask",
        category: "skincare",
        affiliateLink: "https://example.com/product12"
    }
];

/* ===== Display Products Function ===== */
function displayProducts(products = productsData) {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
                <a href="${product.affiliateLink}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="product-link">
                    اشتري الآن من المتجر
                </a>
            </div>
        `;
        container.appendChild(productCard);
    });
}

/* ===== Filter Products by Category ===== */
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(productsData);
    } else {
        const filtered = productsData.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

/* ===== Search Products ===== */
function searchProducts(query) {
    const filtered = productsData.filter(product => 
        product.name.includes(query) || 
        product.description.includes(query)
    );
    displayProducts(filtered);
}

/* ===== Sort Products ===== */
function sortProducts(sortBy) {
    let sorted = [...productsData];
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-high':
            sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
            break;
        default:
            sorted = productsData;
    }
    
    displayProducts(sorted);
}

/* ===== Get Product by ID ===== */
function getProductById(id) {
    return productsData.find(product => product.id === id);
}

/* ===== Get Products by Category ===== */
function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

/* ===== Export Functions ===== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productsData,
        displayProducts,
        filterProducts,
        searchProducts,
        sortProducts,
        getProductById,
        getProductsByCategory
    };
}
