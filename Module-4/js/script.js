// Main menu data array - ALL content is stored in JavaScript
var menuCategories = [
    {
        id: 1,
        name: "Appetizers",
        items: [
            {
                id: 101,
                name: "Bruschetta",
                description: "Toasted bread topped with fresh tomatoes, garlic, and basil",
                price: 8.99,
                spicy: false,
                vegetarian: true
            },
            {
                id: 102,
                name: "Spicy Chicken Wings",
                description: "Crispy chicken wings with your choice of sauce",
                price: 10.99,
                spicy: true,
                vegetarian: false
            },
            {
                id: 103,
                name: "Mozzarella Sticks",
                description: "Breaded mozzarella served with marinara sauce",
                price: 7.99,
                spicy: false,
                vegetarian: true
            }
        ]
    },
    {
        id: 2,
        name: "Main Courses",
        items: [
            {
                id: 201,
                name: "Grilled Salmon",
                description: "Fresh salmon fillet with lemon butter sauce",
                price: 22.99,
                spicy: false,
                vegetarian: false
            },
            {
                id: 202,
                name: "Spaghetti Carbonara",
                description: "Classic pasta with bacon, eggs, and parmesan",
                price: 16.99,
                spicy: false,
                vegetarian: false
            },
            {
                id: 203,
                name: "Vegetable Curry",
                description: "Spicy vegetable curry with rice",
                price: 14.99,
                spicy: true,
                vegetarian: true
            },
            {
                id: 204,
                name: "Beef Burger",
                description: "Angus beef patty with special sauce",
                price: 15.99,
                spicy: false,
                vegetarian: false
            }
        ]
    },
    {
        id: 3,
        name: "Desserts",
        items: [
            {
                id: 301,
                name: "Chocolate Lava Cake",
                description: "Warm chocolate cake with molten center",
                price: 8.99,
                spicy: false,
                vegetarian: true
            },
            {
                id: 302,
                name: "Cheesecake",
                description: "New York style with berry compote",
                price: 7.99,
                spicy: false,
                vegetarian: true
            },
            {
                id: 303,
                name: "Ice Cream Sundae",
                description: "Vanilla ice cream with hot fudge and nuts",
                price: 6.99,
                spicy: false,
                vegetarian: true
            }
        ]
    }
];

// Global variables
var currentFilter = 'all';
var cart = [];

// Main function to display menu
function displayMenu() {
    console.log("Displaying menu with filter:", currentFilter);
    
    var menuContainer = document.getElementById('menu-items');
    if (!menuContainer) {
        console.error("Menu container not found!");
        return;
    }
    
    // Clear existing content
    menuContainer.innerHTML = '';
    
    // Create filter buttons
    createFilterButtons(menuContainer);
    
    // Loop through each category and create elements dynamically
    menuCategories.forEach(function(category) {
        // Create category section using JavaScript
        var categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        categorySection.id = 'category-' + category.id;
        
        // Create category title using JavaScript
        var categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;
        categorySection.appendChild(categoryTitle);
        
        // Create items container
        var itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-container';
        
        // Filter and display items
        var filteredItems = category.items.filter(function(item) {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'spicy') return item.spicy;
            if (currentFilter === 'vegetarian') return item.vegetarian;
            return true;
        });
        
        if (filteredItems.length === 0) {
            var noItemsMsg = document.createElement('p');
            noItemsMsg.textContent = 'No items match the current filter.';
            noItemsMsg.className = 'no-items';
            itemsContainer.appendChild(noItemsMsg);
        } else {
            // Create each menu item dynamically
            filteredItems.forEach(function(item) {
                var menuItem = createMenuItem(item);
                itemsContainer.appendChild(menuItem);
            });
        }
        
        categorySection.appendChild(itemsContainer);
        menuContainer.appendChild(categorySection);
    });
    
    // Display cart summary
    displayCartSummary();
}

// Function to create a single menu item element
function createMenuItem(item) {
    var menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.id = item.id;
    
    // Item name with badges
    var itemName = document.createElement('h3');
    itemName.className = 'item-name';
    itemName.textContent = item.name;
    
    // Add badges for special items
    if (item.spicy) {
        var spicyBadge = document.createElement('span');
        spicyBadge.className = 'badge spicy-badge';
        spicyBadge.textContent = '🌶️ Spicy';
        itemName.appendChild(spicyBadge);
    }
    
    if (item.vegetarian) {
        var vegBadge = document.createElement('span');
        vegBadge.className = 'badge veg-badge';
        vegBadge.textContent = '🥬 Vegetarian';
        itemName.appendChild(vegBadge);
    }
    
    menuItem.appendChild(itemName);
    
    // Item description
    var itemDescription = document.createElement('p');
    itemDescription.className = 'item-description';
    itemDescription.textContent = item.description;
    menuItem.appendChild(itemDescription);
    
    // Item price and add to cart button
    var priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';
    
    var itemPrice = document.createElement('span');
    itemPrice.className = 'item-price';
    itemPrice.textContent = '$' + item.price.toFixed(2);
    priceContainer.appendChild(itemPrice);
    
    var addButton = document.createElement('button');
    addButton.className = 'add-to-cart';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = function() {
        addToCart(item);
    };
    priceContainer.appendChild(addButton);
    
    menuItem.appendChild(priceContainer);
    
    return menuItem;
}

// Function to create filter buttons
function createFilterButtons(container) {
    var filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    
    var filters = [
        { id: 'all', text: 'All Items' },
        { id: 'spicy', text: '🌶️ Spicy' },
        { id: 'vegetarian', text: '🥬 Vegetarian' }
    ];
    
    filters.forEach(function(filter) {
        var button = document.createElement('button');
        button.className = 'filter-btn' + (currentFilter === filter.id ? ' active' : '');
        button.textContent = filter.text;
        button.onclick = function() {
            setFilter(filter.id);
        };
        filterContainer.appendChild(button);
    });
    
    container.appendChild(filterContainer);
}

// Function to set filter and refresh display
function setFilter(filter) {
    currentFilter = filter;
    displayMenu();
}

// Cart functionality
function addToCart(item) {
    var existingItem = cart.find(function(cartItem) {
        return cartItem.id === item.id;
    });
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    displayCartSummary();
    showNotification(item.name + ' added to cart!');
}

function displayCartSummary() {
    var cartContainer = document.getElementById('cart-summary');
    if (!cartContainer) {
        // Create cart container if it doesn't exist
        cartContainer = document.createElement('div');
        cartContainer.id = 'cart-summary';
        cartContainer.className = 'cart-summary';
        document.body.insertBefore(cartContainer, document.getElementById('menu-items'));
    }
    
    var totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
    
    var totalPrice = cart.reduce(function(total, item) {
        return total + (item.price * item.quantity);
    }, 0);
    
    cartContainer.innerHTML = `
        <h3>🛒 Cart Summary</h3>
        <p>Items: ${totalItems} | Total: $${totalPrice.toFixed(2)}</p>
        ${totalItems > 0 ? '<button class="clear-cart" onclick="clearCart()">Clear Cart</button>' : ''}
    `;
}

function clearCart() {
    cart = [];
    displayCartSummary();
    showNotification('Cart cleared!');
}

function showNotification(message) {
    // Remove existing notification
    var existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    var notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

// Utility functions
function getMenuItemById(id) {
    for (var i = 0; i < menuCategories.length; i++) {
        var category = menuCategories[i];
        var item = category.items.find(function(menuItem) {
            return menuItem.id === id;
        });
        if (item) return item;
    }
    return null;
}

function getItemsByCategory(categoryName) {
    var category = menuCategories.find(function(cat) {
        return cat.name === categoryName;
    });
    return category ? category.items : [];
}

// Initialize application
function init() {
    console.log('Initializing Restaurant Menu Application');
    console.log('Menu data:', menuCategories);
    
    // Wait a bit for DOM to be ready
    setTimeout(function() {
        displayMenu();
        
        // Add some demo functionality
        console.log('Application ready! Try these in console:');
        console.log('- restaurantMenu.setFilter("spicy")');
        console.log('- restaurantMenu.addNewItem("Main Courses", "Test Item", "Description", 9.99)');
    }, 100);
}

// Make functions available globally for testing
window.restaurantMenu = {
    displayMenu: displayMenu,
    setFilter: setFilter,
    addToCart: addToCart,
    clearCart: clearCart,
    getMenuItemById: getMenuItemById,
    getItemsByCategory: getItemsByCategory,
    menuData: menuCategories,
    cart: cart
};

// Add new item function for demonstration
window.restaurantMenu.addNewItem = function(categoryName, itemName, description, price) {
    var category = menuCategories.find(function(cat) {
        return cat.name === categoryName;
    });
    
    if (category) {
        var newItem = {
            id: Date.now(), // Simple ID generation
            name: itemName,
            description: description,
            price: price,
            spicy: false,
            vegetarian: false
        };
        category.items.push(newItem);
        displayMenu();
        console.log('New item added:', newItem);
    }
};

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
