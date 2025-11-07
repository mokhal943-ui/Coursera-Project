// =============================================
// ASSIGNMENT 4 - RESTAURANT MENU APPLICATION
// All content dynamically generated with JavaScript
// =============================================

// Main menu data array - ALL content stored in JavaScript
const menuCategories = [
    {
        id: 'appetizers',
        name: 'Appetizers',
        items: [
            {
                id: 1,
                name: 'Bruschetta',
                description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
                price: 8.99,
                tags: ['vegetarian'],
                popular: true
            },
            {
                id: 2,
                name: 'Spicy Chicken Wings',
                description: 'Crispy chicken wings with buffalo sauce and blue cheese dip',
                price: 12.99,
                tags: ['spicy'],
                popular: true
            },
            {
                id: 3,
                name: 'Mozzarella Sticks',
                description: 'Breaded mozzarella served with marinara sauce',
                price: 7.99,
                tags: ['vegetarian']
            },
            {
                id: 4,
                name: 'Shrimp Cocktail',
                description: 'Chilled shrimp with cocktail sauce and lemon',
                price: 14.99,
                tags: ['gluten-free']
            }
        ]
    },
    {
        id: 'mains',
        name: 'Main Courses',
        items: [
            {
                id: 5,
                name: 'Grilled Salmon',
                description: 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables',
                price: 24.99,
                tags: ['gluten-free'],
                popular: true
            },
            {
                id: 6,
                name: 'Filet Mignon',
                description: '8oz tender beef filet with red wine reduction and mashed potatoes',
                price: 32.99,
                tags: ['gluten-free']
            },
            {
                id: 7,
                name: 'Vegetable Lasagna',
                description: 'Layers of pasta with fresh vegetables, ricotta, and tomato sauce',
                price: 18.99,
                tags: ['vegetarian']
            },
            {
                id: 8,
                name: 'Spicy Chicken Curry',
                description: 'Chicken cooked in aromatic spices with basmati rice',
                price: 19.99,
                tags: ['spicy']
            },
            {
                id: 9,
                name: 'Mushroom Risotto',
                description: 'Creamy arborio rice with wild mushrooms and parmesan',
                price: 16.99,
                tags: ['vegetarian', 'gluten-free']
            }
        ]
    },
    {
        id: 'desserts',
        name: 'Desserts',
        items: [
            {
                id: 10,
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with molten center and vanilla ice cream',
                price: 9.99,
                tags: ['vegetarian'],
                popular: true
            },
            {
                id: 11,
                name: 'New York Cheesecake',
                description: 'Creamy cheesecake with graham cracker crust and berry compote',
                price: 8.99,
                tags: ['vegetarian']
            },
            {
                id: 12,
                name: 'Tiramisu',
                description: 'Classic Italian dessert with coffee-soaked ladyfingers',
                price: 9.99,
                tags: ['vegetarian']
            }
        ]
    }
];

// Application state
let currentFilter = 'all';
let shoppingCart = [];

// Initialize the application
function init() {
    console.log('🚀 Assignment 4 - Restaurant Menu Application Initialized');
    console.log('📊 Menu Data:', menuCategories);
    
    createFilterButtons();
    displayMenu();
    displayCart();
    
    // Demonstrate JavaScript functionality
    console.log('💡 Try these in console:');
    console.log('   - app.filterMenu("vegetarian")');
    console.log('   - app.addToCart(1)');
    console.log('   - app.showNotification("Hello from JavaScript!")');
}

// Create filter buttons dynamically
function createFilterButtons() {
    const controlsSection = document.getElementById('controls');
    
    const filters = [
        { id: 'all', text: 'All Items' },
        { id: 'vegetarian', text: '🥬 Vegetarian' },
        { id: 'spicy', text: '🌶️ Spicy' },
        { id: 'gluten-free', text: '🌾 Gluten Free' }
    ];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = `filter-btn ${filter.id === currentFilter ? 'active' : ''}`;
        button.textContent = filter.text;
        button.onclick = () => filterMenu(filter.id);
        controlsSection.appendChild(button);
    });
}

// Filter menu items
function filterMenu(filterType) {
    currentFilter = filterType;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayMenu();
}

// Display the entire menu dynamically
function displayMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '<h2 style="text-align: center; color: white; margin: 20px 0;">Loading Menu...</h2>';
    
    // Simulate loading (demonstrates async capability)
    setTimeout(() => {
        menuContainer.innerHTML = '';
        
        menuCategories.forEach(category => {
            const filteredItems = category.items.filter(item => {
                if (currentFilter === 'all') return true;
                return item.tags.includes(currentFilter);
            });
            
            if (filteredItems.length > 0) {
                const categoryElement = createCategoryElement(category, filteredItems);
                menuContainer.appendChild(categoryElement);
            }
        });
        
        if (menuContainer.children.length === 0) {
            menuContainer.innerHTML = '<div class="menu-category"><h2 class="category-title">No items found</h2><p style="text-align: center; color: #7f8c8d;">Try a different filter.</p></div>';
        }
    }, 500);
}

// Create a category element
function createCategoryElement(category, items) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category';
    
    const title = document.createElement('h2');
    title.className = 'category-title';
    title.textContent = category.name;
    categoryDiv.appendChild(title);
    
    items.forEach(item => {
        const itemElement = createMenuItemElement(item);
        categoryDiv.appendChild(itemElement);
    });
    
    return categoryDiv;
}

// Create a single menu item element
function createMenuItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.dataset.itemId = item.id;
    
    const itemInfo = document.createElement('div');
    itemInfo.className = 'item-info';
    
    // Item name with badges
    const nameDiv = document.createElement('div');
    nameDiv.className = 'item-name';
    nameDiv.textContent = item.name;
    
    if (item.popular) {
        const popularBadge = document.createElement('span');
        popularBadge.className = 'badge';
        popularBadge.textContent = '🔥 Popular';
        popularBadge.style.background = '#f39c12';
        nameDiv.appendChild(popularBadge);
    }
    
    item.tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.className = `badge ${tag}`;
        badge.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        nameDiv.appendChild(badge);
    });
    
    itemInfo.appendChild(nameDiv);
    
    // Item description
    const description = document.createElement('p');
    description.className = 'item-description';
    description.textContent = item.description;
    itemInfo.appendChild(description);
    
    // Item details
    const details = document.createElement('p');
    details.className = 'item-details';
    details.textContent = `Item ID: ${item.id} | Category: ${findCategoryByItemId(item.id)}`;
    itemInfo.appendChild(details);
    
    itemDiv.appendChild(itemInfo);
    
    // Price and add to cart button
    const price = document.createElement('div');
    price.className = 'item-price';
    price.textContent = `$${item.price.toFixed(2)}`;
    itemDiv.appendChild(price);
    
    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = () => addToCart(item);
    itemDiv.appendChild(addButton);
    
    return itemDiv;
}

// Shopping cart functionality
function addToCart(item) {
    const existingItem = shoppingCart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        shoppingCart.push({
            ...item,
            quantity: 1
        });
    }
    
    displayCart();
    showNotification(`✅ ${item.name} added to cart!`);
    
    console.log('🛒 Cart updated:', shoppingCart);
}

function displayCart() {
    const cartSection = document.getElementById('cart-section');
    
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartSection.innerHTML = `
        <div class="cart-summary">
            <h2>🛒 Shopping Cart</h2>
            <p>Items in cart: <strong>${totalItems}</strong></p>
            <p class="cart-total">Total: $${totalPrice.toFixed(2)}</p>
            ${totalItems > 0 ? '<button class="clear-cart" onclick="clearCart()">Clear Cart</button>' : '<p class="empty-cart">Your cart is empty</p>'}
        </div>
    `;
}

function clearCart() {
    shoppingCart = [];
    displayCart();
    showNotification('🗑️ Cart cleared!');
}

// Utility functions
function findCategoryByItemId(itemId) {
    for (const category of menuCategories) {
        const item = category.items.find(item => item.id === itemId);
        if (item) return category.name;
    }
    return 'Unknown';
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Public API for demonstration
window.app = {
    filterMenu,
    addToCart,
    clearCart,
    showNotification,
    getMenuData: () => menuCategories,
    getCart: () => shoppingCart
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('📝 Assignment 4 JavaScript loaded successfully!');
