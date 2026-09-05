/* ===== Main JavaScript File ===== */

/* ===== Initialize on Page Load ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Display featured products on homepage
    if (document.getElementById('productsContainer')) {
        displayProducts(productsData.slice(0, 6)); // Show first 6 products
    }
    
    // Setup navigation
    setupNavigation();
    
    // Setup smooth scrolling
    setupSmoothScroll();
    
    // Setup search functionality
    setupSearch();
});

/* ===== Navigation Setup ===== */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

/* ===== Smooth Scroll ===== */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===== Search Functionality ===== */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchProducts(e.target.value);
        });
    }
}

/* ===== Scroll to Top Button ===== */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

/* ===== Mobile Menu Toggle ===== */
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburgerMenu';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--primary-color);
        padding: 10px;
    `;
    
    // Add hamburger to navbar (only on mobile)
    if (window.innerWidth <= 640) {
        navbar.appendChild(hamburger);
        hamburger.style.display = 'block';
    }
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
            hamburger.style.display = 'none';
            navLinks.classList.remove('active');
        } else {
            hamburger.style.display = 'block';
        }
    });
}

setupMobileMenu();

/* ===== Lazy Loading Images ===== */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

setupLazyLoading();

/* ===== Add to Favorites (Local Storage) ===== */
class Favorites {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }
    
    add(productId) {
        if (!this.favorites.includes(productId)) {
            this.favorites.push(productId);
            this.save();
            return true;
        }
        return false;
    }
    
    remove(productId) {
        this.favorites = this.favorites.filter(id => id !== productId);
        this.save();
    }
    
    isFavorite(productId) {
        return this.favorites.includes(productId);
    }
    
    getAll() {
        return this.favorites;
    }
    
    save() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}

const favorites = new Favorites();

/* ===== Add Favorite Button to Products ===== */
function addFavoriteButtons() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent;
        const product = productsData.find(p => p.name === productName);
        
        if (product) {
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.innerHTML = favorites.isFavorite(product.id) ? '❤️' : '🤍';
            favoriteBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                z-index: 10;
                transition: transform 0.2s;
            `;
            
            card.style.position = 'relative';
            card.appendChild(favoriteBtn);
            
            favoriteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (favorites.isFavorite(product.id)) {
                    favorites.remove(product.id);
                    this.innerHTML = '🤍';
                } else {
                    favorites.add(product.id);
                    this.innerHTML = '❤️';
                }
            });
            
            favoriteBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            
            favoriteBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Call after products are displayed
const originalDisplayProducts = displayProducts;
window.displayProducts = function(products) {
    originalDisplayProducts(products);
    addFavoriteButtons();
};

/* ===== Analytics Tracking ===== */
class Analytics {
    static trackProductView(productId) {
        const views = JSON.parse(localStorage.getItem('productViews')) || {};
        views[productId] = (views[productId] || 0) + 1;
        localStorage.setItem('productViews', JSON.stringify(views));
    }
    
    static trackClick(productId) {
        const clicks = JSON.parse(localStorage.getItem('productClicks')) || {};
        clicks[productId] = (clicks[productId] || 0) + 1;
        localStorage.setItem('productClicks', JSON.stringify(clicks));
    }
    
    static getStats() {
        return {
            views: JSON.parse(localStorage.getItem('productViews')) || {},
            clicks: JSON.parse(localStorage.getItem('productClicks')) || {}
        };
    }
}

/* ===== Track Affiliate Links ===== */
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-link')) {
        const productName = e.target.closest('.product-card')?.querySelector('.product-name')?.textContent;
        const product = productsData.find(p => p.name === productName);
        if (product) {
            Analytics.trackClick(product.id);
        }
    }
});

/* ===== Print Function ===== */
function printProducts() {
    window.print();
}

/* ===== Share Function ===== */
function shareProduct(productId) {
    const product = getProductById(productId);
    if (product && navigator.share) {
        navigator.share({
            title: product.name,
            text: product.description,
            url: product.affiliateLink
        }).catch(err => console.log('Error sharing:', err));
    }
}

/* ===== Dark Mode Toggle ===== */
class DarkMode {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (this.isDarkMode) {
            this.enable();
        }
    }
    
    toggle() {
        this.isDarkMode ? this.disable() : this.enable();
    }
    
    enable() {
        this.isDarkMode = true;
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('darkMode', 'true');
    }
    
    disable() {
        this.isDarkMode = false;
        document.body.style.filter = 'none';
        localStorage.setItem('darkMode', 'false');
    }
}

const darkMode = new DarkMode();

/* ===== Notification System ===== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: var(--shadow);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ===== Add Animation Styles ===== */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ===== Performance Monitoring ===== */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

/* ===== Export for Testing ===== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Favorites,
        Analytics,
        DarkMode,
        showNotification,
        shareProduct,
        printProducts
    };
}
