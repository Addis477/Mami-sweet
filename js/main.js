/* ============================================
   MAMI SWEETS - COMPLETE PREMIUM JAVASCRIPT
   SWEETS MOMENT made luxurious | Warm Chocolate Theme
   Includes: Page Transitions | WhatsApp | Gift Card | AOS | Full Cart
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. PAGE TRANSITIONS (Smooth Navigation) ==========
    const transitionOverlay = document.querySelector('.page-transition');
    
    // Add transition effect to all internal links
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('tel') && !href.startsWith('mailto') && !href.startsWith('javascript')) {
            // Don't add transition for WhatsApp button
            if (!link.classList.contains('whatsapp-float')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetUrl = this.getAttribute('href');
                    if (transitionOverlay) {
                        transitionOverlay.classList.add('active');
                        setTimeout(() => {
                            window.location.href = targetUrl;
                        }, 500);
                    } else {
                        window.location.href = targetUrl;
                    }
                });
            }
        }
    });
    
    // Remove transition overlay when page loads
    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 100);
    }
    
    // ========== 2. AOS ANIMATION INITIALIZATION ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
    
    // ========== 3. MOBILE SIDEBAR TOGGLE ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking any navigation link
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== 4. TOAST NOTIFICATION SYSTEM ==========
    window.showToast = function(message, duration = 2500) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, duration);
    };
    
    // ========== 5. ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== 6. ADD TO CART BUTTONS (All Pages) ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const itemName = this.getAttribute('data-item') || 'Item';
            showToast(`✓ ${itemName} added to cart!`);
        });
    });
    
    // ========== 7. GIFT CARD FUNCTIONALITY ==========
    const buyGiftBtn = document.getElementById('buyGiftBtn');
    if (buyGiftBtn) {
        buyGiftBtn.addEventListener('click', function() {
            const email = document.getElementById('giftEmail')?.value.trim();
            const name = document.getElementById('giftName')?.value.trim();
            const message = document.getElementById('giftMessage')?.value.trim();
            
            if (!email) {
                showToast('⚠️ Please enter recipient email address');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ Please enter a valid email address');
                return;
            }
            
            if (!name) {
                showToast('⚠️ Please enter your name');
                return;
            }
            
            showToast('🎁 Gift card purchased! Check your email for details.');
            
            // Clear form
            if (document.getElementById('giftEmail')) document.getElementById('giftEmail').value = '';
            if (document.getElementById('giftName')) document.getElementById('giftName').value = '';
            if (document.getElementById('giftMessage')) document.getElementById('giftMessage').value = '';
        });
    }
    
    // Gift amount selection
    document.querySelectorAll('.gift-amount span').forEach(amount => {
        amount.addEventListener('click', function() {
            document.querySelectorAll('.gift-amount span').forEach(a => a.style.background = '#FDF8F2');
            this.style.background = '#C47A4A';
            this.style.color = 'white';
            showToast(`Selected ${this.textContent} gift card`);
        });
    });
    
    // ========== 8. CONTACT FORM SUBMIT ==========
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) {
        sendContactBtn.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMsg')?.value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠️ Please fill all fields (Name, Email, Message)');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ Please enter a valid email address');
                return;
            }
            
            showToast('📨 Message sent! We\'ll reply within 24 hours.');
            
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    // ========== 9. CATERING/BULK INQUIRY BUTTONS ==========
    document.querySelectorAll('.catering-inquiry, .bulk-inquiry').forEach(btn => {
        btn.addEventListener('click', function() {
            const formSection = document.getElementById('cateringForm') || document.getElementById('bulkForm');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('📋 Please fill out the form below');
            } else {
                showToast('📋 Please contact us for more information');
            }
        });
    });
    
    // ========== 10. REGULAR ORDER FORM SUBMIT ==========
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill Name, Phone, and Address');
                return;
            }
            
            showToast(`✨ Thanks ${name}! Your order has been placed. We'll call you to confirm.`);
            
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    // ========== 11. CARD ANIMATION ON SCROLL ==========
    const animateCards = document.querySelectorAll('.product-card');
    if (animateCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animateCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // ========== 12. WHATSAPP BUTTON TRACKING ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp chat initiated');
        });
    }
    
    // ========== 13. CATEGORY FILTER FOR HOME & MENU PAGES ==========
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const allProducts = document.querySelectorAll('.product-card');
    
    if (categoryBtns.length > 0 && allProducts.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-cat');
                allProducts.forEach(product => {
                    if (category === 'all' || product.getAttribute('data-cat') === category) {
                        product.style.display = 'block';
                        product.style.animation = 'fadeInUp 0.4s ease forwards';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
    
    console.log('MAMI SWEETS - Premium website loaded successfully!');
    
}); // End DOMContentLoaded

// ========== 14. SHOP PAGE CART FUNCTIONALITY (Global) ==========
let cart = [];
const FREE_DELIVERY = 1500;

window.updateCart = function() {
    const cartDiv = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    const countSpan = document.getElementById('cartCount');
    
    if (!cartDiv) return;
    
    if (cart.length === 0) {
        cartDiv.innerHTML = '<div class="empty-cart">🛒 Your cart is empty</div>';
        if (totalSpan) totalSpan.textContent = 'ETB 0';
        if (countSpan) countSpan.textContent = '(0 items)';
        return;
    }
    
    let html = '';
    let total = 0;
    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <span class="item-name"><strong>${escapeHtml(item.name)}</strong></span>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">−</button>
                    <span class="item-qty">${item.qty}</span>
                    <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
                    <button class="remove-btn" onclick="window.removeItem(${idx})">🗑️</button>
                </div>
                <span class="item-total-price">ETB ${itemTotal}</span>
            </div>
        `;
    });
    cartDiv.innerHTML = html;
    if (totalSpan) totalSpan.textContent = `ETB ${total}`;
    if (countSpan) countSpan.textContent = `(${cart.reduce((s, i) => s + i.qty, 0)} items)`;
    
    const deliveryNote = document.querySelector('.delivery-note');
    if (deliveryNote) {
        if (total >= FREE_DELIVERY) {
            deliveryNote.innerHTML = '✅ Free delivery applied!';
            deliveryNote.style.color = '#4CAF50';
        } else {
            deliveryNote.innerHTML = `🚚 Add ETB ${FREE_DELIVERY - total} more for free delivery`;
            deliveryNote.style.color = '#8B6340';
        }
    }
};

window.changeQty = function(idx, delta) {
    const newQty = cart[idx].qty + delta;
    if (newQty <= 0) {
        cart.splice(idx, 1);
    } else {
        cart[idx].qty = newQty;
    }
    window.updateCart();
};

window.removeItem = function(idx) {
    cart.splice(idx, 1);
    window.updateCart();
};

window.clearCart = function() {
    cart = [];
    window.updateCart();
};

// Helper function to escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Add to cart from shop items
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemDiv = this.closest('.shop-item');
            if (itemDiv) {
                const name = itemDiv.getAttribute('data-name');
                const price = parseInt(itemDiv.getAttribute('data-price'));
                const existing = cart.find(i => i.name === name);
                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({ name, price, qty: 1 });
                }
                window.updateCart();
                showToast(`✓ ${name} added`);
            }
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill all fields');
                return;
            }
            
            if (cart.length === 0) {
                showToast('⚠️ Your cart is empty');
                return;
            }
            
            const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
            showToast(`✅ Thanks ${name}! Your order (ETB ${total}) has been placed.`);
            cart = [];
            window.updateCart();
            
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    // Initialize cart display on shop page
    if (document.getElementById('cartItems')) {
        window.updateCart();
    }
});
