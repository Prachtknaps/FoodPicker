let defaultFoodList = [
    {
        name: "McDonald's",
        icon: "<i class='fa-solid fa-burger fa-sm'></i>",
        desc: "This is a default food list. It contains a few products from McDonald's. (I didn't get paid for that :D)",
        list: [
            "SIGNATURE Smoky Cheese", "SIGNATURE Cheese & Beef", "Hamburger", "Cheeseburger", "Double Cheese Burger", "Bacon Double Cheeseburger", "Big Mac", 
            "Hamburger Royal TS", "McF1rst Beef", "McChicken", "Chickenburger", "Fresh Chicken Wrap", "Chicken McNuggets (6x)", "Chicken McNuggets (9x)", "McFish",
            "Curly Fries (large)", "Curly Fries (medium)", "Fries (large)", "Fries (medium)", "Fries (small)", "McMuffin Beef", "McMuffin Fresh Chicken", "McMuffin Cheese and Egg",
            "McMuffin Bacon and Egg", "McToast Bacon-Cheese", "McToast Ham-Cheese", "McToast Cheese", "Pancakes", "Ham and Eggs"
        ]},
];

let iconList = [
    ["fa-solid fa-apple-whole fa-sm", "icon fa-solid fa-apple-whole fa-lg", "Apple"],
    ["fa-solid fa-bacon fa-sm", "icon fa-solid fa-bacon fa-lg", "Bacon"],
    ["fa-solid fa-bowl-food fa-sm", "icon fa-solid fa-bowl-food fa-lg", "Bowl Food"],
    ["fa-solid fa-bowl-rice fa-sm", "icon fa-solid fa-bowl-rice fa-lg", "Bowl Rice"],
    ["fa-solid fa-bread-slice fa-sm", "icon fa-solid fa-bread-slice fa-lg", "Bread Slice"],
    ["fa-solid fa-burger fa-sm", "icon fa-solid fa-burger fa-lg", "Burger"],
    ["fa-solid fa-cake-candles fa-sm", "icon fa-solid fa-cake-candles fa-lg", "Cake Candles"],
    ["fa-solid fa-candy-cane fa-sm", "icon fa-solid fa-candy-cane fa-lg", "Candy Cane"],
    ["fa-solid fa-carrot fa-sm", "icon fa-solid fa-carrot fa-lg", "Carrot"],
    ["fa-solid fa-cheese fa-sm", "icon fa-solid fa-cheese fa-lg", "Cheese"],
    ["fa-solid fa-cookie fa-sm", "icon fa-solid fa-cookie fa-lg", "Cookie"],
    ["fa-solid fa-cookie-bite fa-sm", "icon fa-solid fa-cookie-bite fa-lg", "Cookie Bite"],
    ["fa-solid fa-drumstick-bite fa-sm", "icon fa-solid fa-drumstick-bite fa-lg", "Drumstick Bite"],
    ["fa-solid fa-egg fa-sm", "icon fa-solid fa-egg fa-lg", "Egg"],
    ["fa-solid fa-fish fa-sm", "icon fa-solid fa-fish fa-lg", "Fish"],
    ["fa-solid fa-fish-fins fa-sm", "icon fa-solid fa-fish-fins fa-lg", "Fish Fins"],
    ["fa-solid fa-glass-water fa-sm", "icon fa-solid fa-glass-water fa-lg", "Glass of Water"],
    ["fa-solid fa-hotdog fa-sm", "icon fa-solid fa-hotdog fa-lg", "Hotdog"],
    ["fa-solid fa-ice-cream fa-sm", "icon fa-solid fa-ice-cream fa-lg", "Ice Cream"],
    ["fa-solid fa-lemon fa-sm", "icon fa-solid fa-lemon fa-lg", "Lemon"],
    ["fa-solid fa-mug-hot fa-sm", "icon fa-solid fa-mug-hot fa-lg", "Mug"],
    ["fa-solid fa-pepper-hot fa-sm", "icon fa-solid fa-pepper-hot fa-lg", "Pepper"],
    ["fa-solid fa-pizza-slice fa-sm", "icon fa-solid fa-pizza-slice fa-lg", "Pizza Slice"],
    ["fa-solid fa-shrimp fa-sm", "icon fa-solid fa-shrimp fa-lg", "Shrimp"],
    ["fa-solid fa-utensils fa-sm", "icon fa-solid fa-utensils fa-lg", "Utensils"],
    ["fa-solid fa-wine-bottle fa-sm", "icon fa-solid fa-wine-bottle fa-lg", "Wine Bottle"],
    ["fa-solid fa-wine-glass fa-sm", "icon fa-solid fa-wine-glass fa-lg", "Wine Glass"],
    ["fa-solid fa-whiskey-glass fa-sm", "icon fa-solid fa-whiskey-glass fa-lg", "Whiskey Glass"]
];

let foodList = [];
let foodIndex = 0;
let editedIcon = null;
let newListIcon = null;
let navListContainer = document.getElementById("nav-dropdown");

let foodPicker = document.getElementById("food-picker");
let foodHeader = document.getElementById("list-name");
let foodDesc = document.getElementById("list-desc");
let foodResult = document.getElementById("list-result");

let foodEditor = document.getElementById("food-editor");
let editHeaderInput = document.getElementById("edit-name-input");
let editIconInput = document.getElementById("edit-icon-input");
let editDescInput = document.getElementById("edit-desc-input");
let editListInput = document.getElementById("edit-list-input");

let foodAdder = document.getElementById("food-adder");
let addHeaderInput = document.getElementById("add-name-input");
let addDescInput = document.getElementById("add-desc-input");
let addIconInput = document.getElementById("add-icon-input");
let addListInput = document.getElementById("add-list-input");

LoadUserLists();
UpdateNavbar();
SetFoodIndex(0);

// From each list, there will be created a button inside the list container (icon + name)
function UpdateNavbar() {
    navListContainer.innerHTML = "";
    for (let i = 0; i < foodList.length; i++) navListContainer.innerHTML += "<button onclick='SetFoodIndex(" + i + ")'>" + foodList[i].icon + " " + foodList[i].name;
}

// Not implemented yet
function NavigateToHome() {
    alert("This button has no function yet :D");
}

// If localStorage is empty, foodList will get the defaultFoodList value and the new foodList value will be set into localStorage, if localStorage is not empty, foodList will get the localStorage value
function LoadUserLists() {
    if (localStorage.getItem("foodLists") == null || localStorage.getItem("foodLists") == "") {
        foodList = defaultFoodList;
        UpdateUserLists();
    }
    foodList = JSON.parse(localStorage.getItem("foodLists"));
}

// When foodList changes, the changes will be updated to localStorage
function UpdateUserLists() {
    localStorage.setItem("foodLists", JSON.stringify(foodList));
}

// If FoodPicker is active, the current icon + name will be put inside the header container, the description inside the description container, if FoodEditor or FoodAdder is active -> TryCloseFoodEditor() / TryCloseFoodAdder()
function SetFoodIndex(index) {
    if (foodPicker.classList.contains("first","active")) {
        foodIndex = index;
        foodHeader.innerHTML = foodList[foodIndex].icon + " " + foodList[foodIndex].name;
        foodDesc.innerHTML = foodList[foodIndex].desc;
        foodResult.innerHTML = "<i class='fa-solid fa-clipboard-question'></i>";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
        if (foodEditor.classList.contains("first","active")) TryCloseFoodEditor();
        else if (foodAdder.classList.contains("first","active")) TryCloseFoodAdder();
    }
}

// Pick a random list item from current list and insert it into food result container
function GetRandomFood() {
    let foodItemList = foodList[foodIndex].list;
    foodResult.innerHTML = foodItemList[Math.floor(Math.random() * foodItemList.length)];
}

// If FoodAdder is active, but the input fields are empty -> OpenFoodEditor(), otherwise a warning dialog will pop up
function TryOpenFoodEditor() {
    if (addHeaderInput.value == "" && addDescInput.value == "" && addListInput.value == "") OpenFoodEditor();
    else OpenDoublePopup('Warning', 'Warning!', 'Do you really want to quit the editor? Your changes will not be saved!', 'Cancel', 'Proceed', 'ClosePopup()', 'CloseFoodAdder(); OpenFoodEditor()');
}

// The input fields get the values of the current food list, the current icon will get the primary color; FoodPicker and FoodAdder get their "active"-class removed
function OpenFoodEditor() {
    let listName = foodList[foodIndex].name;
    let listDesc = foodList[foodIndex].desc;
    editIconInput.innerHTML = "";
    
    console.log(foodList[foodIndex].icon)
    for (let i = 0; i < iconList.length; i++) {
        if (foodList[foodIndex].icon == ("<i class='" + iconList[i][0] + "'></i>")) {
            editIconInput.innerHTML += '<div onclick="SetIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + " active" + '" title="' + iconList[i][2] + '"></div>';
        } else {
            editIconInput.innerHTML += '<div onclick="SetIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + '" title="' + iconList[i][2] + '"></div>';
        }
    }

    foodPicker.classList.remove("first","active");
    foodEditor.classList.add("first","active");
    foodAdder.classList.remove("first", "active");

    editHeaderInput.value = listName;
    editDescInput.value = listDesc;
    editListInput.value = foodList[foodIndex].list.join(", ");
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// When the user clicks on an icon, the value will be stored inside a variable and the color will change as well
function SetIcon(index) {
    editedIcon = "<i class='" + iconList[index][0] + "'></i>";

    editIconInput.innerHTML = "";
    for (let i = 0; i < iconList.length; i++) {
        if (editedIcon == ("<i class='" + iconList[i][0] + "'></i>")) {
            editIconInput.innerHTML += '<div onclick="SetIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + " active" + '" title="' + iconList[i][2] + '"></div>';
        } else {
            editIconInput.innerHTML += '<div onclick="SetIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + '" title="' + iconList[i][2] + '"></div>';
        }
    }
}

// If the values remain the same -> CloseFoodEditor(), otherwise a warning will show up
function TryCloseFoodEditor() {
    let listOrg = foodList[foodIndex].list.join(", ");
    let listComparison = editListInput.value;

    if (foodList[foodIndex].name != editHeaderInput.value || foodList[foodIndex].desc != editDescInput.value || listOrg != listComparison) {
        OpenDoublePopup('Warning', 'Warning!', 'Do you really want to quit the editor? Your changes will not be saved!', 'Cancel', 'Proceed', 'ClosePopup()', 'CloseFoodEditor()');
    }
    else CloseFoodEditor();
}

// All input fields will get cleared, the FoodPicker will show up, the variable of the edited icon will be set to null
function CloseFoodEditor() {
    editHeaderInput.value = "";
    editDescInput.value = "";
    editListInput.value = "";

    foodPicker.classList.add("first","active");
    foodEditor.classList.remove("first","active");
    foodAdder.classList.remove("first", "active");
    if (popup.classList.contains("active")) popup.classList.remove("active");
    SetFoodIndex(foodIndex);
    editedIcon = null;
}

// If there's one list remaining, an warning dialog will show up, otherwise DeleteList() will be called
function TryDeleteList() {
    if (foodList.length > 1) DeleteList();
    else {
        ClosePopup();
        OpenPopup("Error", "Error", "There should be at lease one list in your storage!", "Okay", "ClosePopup()");
    }
}

// If the last list gets deleted, the previous one will become the foodIndex, otherwise the next one will replace the deleted list, open FoodPicker
function DeleteList() {
    if (foodIndex == foodList.length - 1) {
        foodList.splice(foodIndex, 1);
        foodIndex--;
    }
    else foodList.splice(foodIndex, 1);

    UpdateUserLists();
    CloseFoodEditor();
    UpdateNavbar();
    SetFoodIndex(foodIndex);
    if (popup.classList.contains("active")) popup.classList.remove("active");
    OpenPopup('Success', 'Success!', 'Your list has been deletet successfully!', 'Okay!', 'ClosePopup()');
}

// If values have changed, the user will be asked if he really wants to apply his changes, otherwise CloseFoodEditor() will be called
function TryApplyChanges() {
    let listOrg = foodList[foodIndex].list.join(", ");
    let listEdited = editListInput.value

    if (foodList[foodIndex].name != editHeaderInput.value || editedIcon != null || foodList[foodIndex].desc != editDescInput.value || listOrg != listEdited) {
        OpenDoublePopup('Warning', 'Warning!', 'Do you really want to apply your changes?', 'Cancel', 'Proceed', 'ClosePopup()', 'ApplyChanges()');
    }
    else CloseFoodEditor();
}

// The values of the current list will be updated, the FoodPicker will show up with the current list
function ApplyChanges() {
    let newIcon = "";
    if (editedIcon != null) newIcon = editedIcon;
    else newIcon = foodList[foodIndex].icon;
    foodList[foodIndex].name = editHeaderInput.value;
    foodList[foodIndex].icon = newIcon;
    foodList[foodIndex].desc = editDescInput.value;
    foodList[foodIndex].list = editListInput.value.split(", ");
    

    UpdateUserLists();
    UpdateNavbar();
    CloseFoodEditor();
    UpdateNavbar();
    SetFoodIndex(foodIndex);
    if (popup.classList.contains("active")) popup.classList.remove("active");
    SetFoodIndex(foodIndex);
    OpenPopup('Success', 'Success!', 'Your changes were saved successfully!', 'Okay!', 'ClosePopup()');
}

// If the FoodEditor is not active or the FoodEditor is active but the values are still the same -> OpenFoodAdder() (+CloseFoodEditor()), otherwise a warning will show up
function TryOpenFoodAdder() {
    let currentList = foodList[foodIndex].list.join(", ");
    
    if (!(foodEditor.classList.contains("first", "active"))) {
        OpenFoodAdder();
    } 
    else if (editHeaderInput.value == foodList[foodIndex].name && editDescInput.value == foodList[foodIndex].desc && editListInput.value == currentList) {
        CloseFoodEditor();
        OpenFoodAdder();
    }
    else {
        OpenDoublePopup('Warning', 'Warning!', 'Do you really want to quit the editor? Your changes will not be saved!', 'Cancel', 'Proceed', 'ClosePopup()', 'CloseFoodEditor(); OpenFoodAdder()');
    }
}

// The icons from the icon container will be updated, FoodPicker and FoodEditor get their "active"-class removed, FoodAdder gets active instead
function OpenFoodAdder() {
    addIconInput.innerHTML = "";
    for (let i = 0; i < iconList.length; i++) addIconInput.innerHTML += '<div onclick="AddNewIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + '" title="' + iconList[i][2] + '"></div>';

    foodPicker.classList.remove("first","active");
    foodEditor.classList.remove("first","active");
    foodAdder.classList.add("first", "active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// When the user selects an icon, it will be stored inside a variable, the color changes inside the container
function AddNewIcon(i) {
    newListIcon = "<i class='" + iconList[i][0] + "'></i>";
    console.log(newListIcon);

    addIconInput.innerHTML = "";
    for (let i = 0; i < iconList.length; i++) {
        if (newListIcon == ("<i class='" + iconList[i][0] + "'></i>")) {
            addIconInput.innerHTML += '<div onclick="AddNewIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + " active" + '" title="' + iconList[i][2] + '"></div>';
        } else {
            addIconInput.innerHTML += '<div onclick="AddNewIcon(' + "'" + i + "')" + '" class="' + iconList[i][1] + '" title="' + iconList[i][2] + '"></div>';
        }
    }
}

// If the user didn't put something inside the input fields -> CloseFoodAdder(), otherwise a warning will show up
function TryCloseFoodAdder() {
    if (addHeaderInput.value == "" && addDescInput.value == "" && addListInput.value == "") {
        CloseFoodAdder();
    } else {
        OpenDoublePopup('Warning', 'Warning!', 'Do you really want to reject this new list?', 'Cancel', 'Proceed', 'ClosePopup()', 'CloseFoodAdder()');
    }
}

// All the input fields get their values removed, the new icon variable will be set to null, FoodPicker will be set to "active"
function CloseFoodAdder() {
    addHeaderInput.value = "";
    addDescInput.value = "";
    addListInput.value = "";
    newListIcon = null;

    foodPicker.classList.add("first","active");
    foodEditor.classList.remove("first","active");
    foodAdder.classList.remove("first", "active");
    if (popup.classList.contains("active")) popup.classList.remove("active");
}

// If at lease one value of the input fields is empty, an error dialog will show up, otherwise -> AddNewList()
function TryAddNewList() {

    if (addHeaderInput.value == "" || addDescInput.value == "" || addListInput.value == "") {
        OpenPopup('Error', 'Error!', 'You have to give your list a name, a description and add at least one item!', 'Okay!', 'ClosePopup()');
    }
    else {
        AddNewList();
    }
}

// A new list gets added to the storage, FoodPicker will open up with the new list
function AddNewList() {
    foodIndex = foodList.length;
    let newIcon = "";
    if (newListIcon != null) newIcon = newListIcon;
    else newIcon = "<i class='fa-solid fa-file'></i>";
    let newList = addListInput.value.split(", ");

    foodList[foodIndex] = {name: addHeaderInput.value, icon: newIcon, desc: addDescInput.value, list: newList};

    UpdateUserLists();
    CloseFoodAdder();
    UpdateNavbar();
    SetFoodIndex(foodIndex);
    OpenPopup('Success', 'Success!', 'Your new list has been added successfully!', 'Okay!', 'ClosePopup()');
}


// Popup
let popup = document.getElementById("popup");
let popupIconContainer = document.getElementById("popup-icon-container");
let popupSuccessIcon = document.getElementById("popup-success-icon");
let popupWarningIcon = document.getElementById("popup-warning-icon");
let popupErrorIcon = document.getElementById("popup-error-icon");
let popupTitle = document.getElementById("popup-title");
let popupDescription = document.getElementById("popup-description");
let popupButtonContainer = document.getElementById("popup-button-container");

// Open a popup with one button
function OpenPopup(type, title, description, button, func) {
    switch (type) {
        case "Success":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
            break;
        case "Warning":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i>";
            break;
        case "Error":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-xmark'></i>";
            break;
    }
    popupTitle.innerHTML = title;
    popupDescription.innerHTML = description;
    popupButtonContainer.innerHTML = "<button onclick='" + func + "' class='btn solid'>" + button + "</button>";
    popup.classList.add("active");
}

// Open a popup with two buttons
function OpenDoublePopup(type, title, description, button_1, button_2, func_1, func_2) {
    switch (type) {
        case "Success":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
            break;
        case "Warning":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i>";
            break;
        case "Error":
            popupIconContainer.innerHTML = "<i class='fa-solid fa-circle-xmark'></i>";
            break;
    }
    popupTitle.innerHTML = title;
    popupDescription.innerHTML = description;
    popupButtonContainer.innerHTML = "<button onclick='" + func_1 + "' class='btn transparent'>" + button_1 + "</button>";
    popupButtonContainer.innerHTML += "<button onclick='" + func_2 + "' class='btn solid'>" + button_2 + "</button>";
    popup.classList.add("active");
}

// Close the popup
function ClosePopup() {
    popupSuccessIcon.style.display = "none";
    popupWarningIcon.style.display = "none";
    popupErrorIcon.style.display = "none";
    popupTitle.innerHTML = "";
    popupDescription.innerHTML = "";
    popupButtonContainer.innerHTML = "";
    popup.classList.remove("active");
}