// Menu data array
var menuCategories = [
    {
        name: "Appetizers",
        items: [
            {
                name: "Bruschetta",
                description: "Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil",
                price: 8.99
            },
            {
                name: "Mozzarella Sticks",
                description: "Crispy breaded mozzarella served with marinara sauce",
                price: 7.99
            },
            {
                name: "Stuffed Mushrooms",
                description: "Mushroom caps filled with herbed cream cheese and breadcrumbs",
                price: 9.99
            }
        ]
    },
    {
        name: "Main Courses",
        items: [
            {
                name: "Grilled Salmon",
                description: "Fresh salmon fillet grilled to perfection with lemon butter sauce",
                price: 22.99
            },
            {
                name: "Filet Mignon",
                description: "8oz tender beef filet with roasted vegetables and red wine reduction",
                price: 28.99
            },
            {
                name: "Chicken Parmesan",
                description: "Breaded chicken breast topped with marinara and melted mozzarella",
                price: 18.99
            },
            {
                name: "Vegetable Lasagna",
                description: "Layers of pasta with fresh vegetables, ricotta, and tomato sauce",
                price: 16.99
            }
        ]
    },
    {
        name: "Desserts",
        items: [
            {
                name: "Chocolate Lava Cake",
                description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
                price: 8.99
            },
            {
                name: "New York Cheesecake",
                description: "Creamy cheesecake with graham cracker crust and berry compote",
                price: 7.99
            },
            {
                name: "Tiramisu",
                description: "Classic Italian dessert with layers of coffee-soaked ladyfingers",
                price: 9.99
            }
        ]
    },
    {
        name: "Beverages",
        items: [
            {
                name: "Fresh Lemonade",
                description: "Homemade lemonade with mint and lemon slices",
                price: 4.99
            },
            {
                name: "Iced Tea",
                description: "Freshly brewed iced tea with lemon",
                price: 3.99
            },
            {
                name: "Coffee",
                description: "Freshly brewed coffee - regular or decaf",
                price: 2.99
            }
        ]
    }
];

// Function to display all menu items
function displayMenu() {
    var menuContainer = document.getElementById('menu-items');
    
    // Clear any existing content
    menuContainer.innerHTML = '';
    
    // Loop through each category
    menuCategories.forEach(function(category) {
        // Create category section
        var categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        
        // Create category title
        var categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;
        categorySection.appendChild(categoryTitle);
        
        // Loop through items in this category
        category.items.forEach(function(item) {
            // Create menu item
            var menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            
            // Create item name
            var itemName = document.createElement('h3');
            itemName.className = 'item-name';
            itemName.textContent = item.name;
            menuItem.appendChild(itemName);
            
            // Create item description
            var itemDescription = document.createElement('p');
            itemDescription.className = 'item-description';
            itemDescription.textContent = item.description;
            menuItem.appendChild(itemDescription);
            
            // Create item price
            var itemPrice = document.createElement('p');
            itemPrice.className = 'item-price';
            itemPrice.textContent = '$' + item.price.toFixed(2);
            menuItem.appendChild(itemPrice);
            
            // Add menu item to category section
            categorySection.appendChild(menuItem);
        });
        
        // Add category section to main container
        menuContainer.appendChild(categorySection);
    });
}

// Function to initialize the application
function init() {
    console.log('Restaurant Menu Application Started');
    displayMenu();
}

// Wait for the DOM to be fully loaded before running the script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Additional utility functions that might be required
function getRandomMenuItem() {
    var allItems = [];
    menuCategories.forEach(function(category) {
        allItems = allItems.concat(category.items);
    });
    
    if (allItems.length > 0) {
        var randomIndex = Math.floor(Math.random() * allItems.length);
        return allItems[randomIndex];
    }
    return null;
}

function getItemsByMaxPrice(maxPrice) {
    var affordableItems = [];
    menuCategories.forEach(function(category) {
        category.items.forEach(function(item) {
            if (item.price <= maxPrice) {
                affordableItems.push(item);
            }
        });
    });
    return affordableItems;
}

// Example of how to add a new category dynamically
function addNewCategory(categoryName, itemsArray) {
    var newCategory = {
        name: categoryName,
        items: itemsArray
    };
    menuCategories.push(newCategory);
    displayMenu(); // Refresh the display
}

// Example of how to add a new item to an existing category
function addMenuItemToCategory(categoryName, itemName, description, price) {
    var category = menuCategories.find(function(cat) {
        return cat.name === categoryName;
    });
    
    if (category) {
        var newItem = {
            name: itemName,
            description: description,
            price: price
        };
        category.items.push(newItem);
        displayMenu(); // Refresh the display
    }
}

// Make functions available globally for testing
window.restaurantMenu = {
    displayMenu: displayMenu,
    getRandomMenuItem: getRandomMenuItem,
    getItemsByMaxPrice: getItemsByMaxPrice,
    addNewCategory: addNewCategory,
    addMenuItemToCategory: addMenuItemToCategory,
    menuData: menuCategories
};
