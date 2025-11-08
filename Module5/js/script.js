var dc = {};

$(document).ready(function () {
    console.log("Document ready");
    $dc.loadHomePage();
});

$dc = {};

$dc.loadHomePage = function () {
    $("#main-content").load("snippets/home-snippet.html", function () {
        console.log("Home snippet loaded");
        $dc.loadRandomCategory();
    });
};

$dc.loadRandomCategory = function () {
    var categories = [
        { short_name: "L", name: "Lunch" },
        { short_name: "D", name: "Dinner" },
        { short_name: "S", name: "Sushi" },
        { short_name: "A", name: "Appetizers" },
        { short_name: "DS", name: "Desserts" },
        { short_name: "B", name: "Beverages" }
    ];

    var randomIndex = Math.floor(Math.random() * categories.length);
    var randomCategory = categories[randomIndex];
    
    console.log("Random category:", randomCategory.name);

    var specialsLink = $("#main-content").find('a[onclick*="{{randomCategoryShortName}}"]');
    
    if (specialsLink.length > 0) {
        var currentOnClick = specialsLink.attr('onclick');
        var newOnClick = currentOnClick.replace('{{randomCategoryShortName}}', "'" + randomCategory.short_name + "'");
        specialsLink.attr('onclick', newOnClick);
    }
};

$dc.loadMenuItems = function (categoryShortName) {
    console.log("Loading category:", categoryShortName);
    
    if (categoryShortName === 'Map') {
        $dc.showMap();
        return;
    }
    
    var categories = {
        "L": { name: "Lunch", items: ["Chicken Lunch", "Beef Lunch", "Vegetable Salad"] },
        "D": { name: "Dinner", items: ["Steak Dinner", "Salmon Plate", "Pasta"] },
        "S": { name: "Sushi", items: ["California Roll", "Spicy Tuna", "Dragon Roll"] },
        "A": { name: "Appetizers", items: ["Spring Rolls", "Dumplings", "Wontons"] },
        "DS": { name: "Desserts", items: ["Chocolate Cake", "Ice Cream", "Pie"] },
        "B": { name: "Beverages", items: ["Juice", "Soda", "Iced Tea"] }
    };
    
    var category = categories[categoryShortName] || { name: "Menu", items: ["Item 1", "Item 2", "Item 3"] };
    
    var html = '<h2 class="text-center">' + category.name + ' Menu</h2>';
    
    category.items.forEach(function(item, index) {
        var price = (10.99 + index).toFixed(2);
        html += '<div class="menu-item"><h3>' + item + '</h3><p>Fresh ' + item.toLowerCase() + '</p><p><strong>$' + price + '</strong></p></div>';
    });
    
    html += '<div class="text-center"><button class="btn btn-primary" onclick="$dc.loadHomePage()">← Back to Home</button></div>';
    
    $("#main-content").html(html);
};

$dc.showMap = function () {
    var html = '<h2 class="text-center">Our Location</h2>';
    html += '<div class="map-container text-center">';
    html += '<h3>David Chu\'s China Bistro</h3>';
    html += '<p><strong>123 Main Street, Baltimore, MD</strong></p>';
    html += '<p>📞 (410) 555-1234</p>';
    html += '</div>';
    html += '<div class="text-center"><button class="btn btn-primary" onclick="$dc.loadHomePage()">← Back to Home</button></div>';
    
    $("#main-content").html(html);
};
