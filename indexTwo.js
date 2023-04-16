const deleteAllBtn = document.getElementById("delete-all-btn-2")
const inventorySection = document.getElementById("inventory-section-2")
let submitBtn = document.getElementById("submit-btn-2")
let nameInput = document.getElementById("item-name-input-2")
let countInput= document.getElementById("count-input-2")
let notesInput= document.getElementById("notes-input-2")
let manInput= document.getElementById("man-input-2")
let dateInput= document.getElementById("date-input-2")
let inventory = []

submitBtn.addEventListener("click", createInventoryItem)
deleteAllBtn.addEventListener("click", deleteAllInventory)

//////////// Function to delete all of the inventory //////////////////

function deleteAllInventory() {
    inventory = []
    localStorage.removeItem("inventory-2")
    inventorySection.innerHTML = ``
}

//////////// Function to create a new item to be added to the inventory array ////////////////

function createInventoryItem() {
    if (!inventory) {
        inventory = []
    }  
    const newItem = {
        name: nameInput.value,
        count: countInput.value,
        notes: notesInput.value,
        man: manInput.value,
        date: dateInput.value
    }

    if(!newItem.name || !newItem.count || !newItem.man || !newItem.date) {
        window.alert("Please fill out all fields (notes are optional)")
        return
    }
    
    inventory.push(newItem)
    localStorage.setItem("inventory-2", JSON.stringify(inventory))
    showInventoryHtml()
    clearInputFields()
}

//////////////// function to increase the count of a given inventory item /////////////

function increaseInventory() {
    const id = event.target.dataset.id
    let inventoryCount = inventory[id].count
    inventoryCount ++
    if (inventoryCount <= 0) {
        inventoryCount = 0
    }
    const newItemUpdated = {
        name: inventory[id].name,
        count: JSON.stringify(inventoryCount),
        notes: inventory[id].notes,
        man: inventory[id].man,
        date: inventory[id].date
    }
    inventory.splice(id, 1, newItemUpdated)
    localStorage.setItem('inventory-2', JSON.stringify(inventory))
    showInventoryHtml()
}

/////////////////////// function to decrease the count of given inventory item ////////////////

function decreaseInventory() {
    const id = event.target.dataset.id
    let inventoryCount = inventory[id].count
    inventoryCount --
    if (inventoryCount <= 0) {
        inventoryCount = 0
    }
    const newItemUpdated = {
        name: inventory[id].name,
        count: JSON.stringify(inventoryCount),
        notes: inventory[id].notes,
        man: inventory[id].man,
        date: inventory[id].date
    }
    inventory.splice(id, 1, newItemUpdated)
    localStorage.setItem('inventory-2', JSON.stringify(inventory))
    showInventoryHtml()
}

////////////////////////// A function that removes a given item ///////////////////

function removeItem() {
    const id = event.target.dataset.id
    inventory.splice(id, 1)
    localStorage.setItem('inventory-2', JSON.stringify(inventory))
    showInventoryHtml()
}




///////////////// function to clear the input fields after the user submits the info //////////////

function clearInputFields() {
    nameInput.value = ""
    countInput.value = ""
    notesInput.value = ""
    manInput.value = ""
    dateInput.value = ""
}

/////////////////// A function that displays the HTML for the inventory items /////////////////

function showInventoryHtml() {
    let html = ``
    inventory.forEach((item, index) => {
     html +=`
        <div class="item-container">
            <div class="item-top">
                <h2 class="item-name"> ${item.name}</h2>
                <p class="count" id="count"> ${item.count}</p>
                <button class="add-btn-2" data-id="${index}"> + </button>
                <button class="subtract-btn-2" data-id="${index}"> - </button>
                <button class="remove-item-btn-2" data-id="${index}"> Remove Item </button>
            </div>
            <div class="item-bottom">
                <p class="notes"> ${item.notes} </p>
                <div class="man"> 
                    <p class="man-title"> Manufacturer:</p>
                    <p class="man-content"> ${item.man} </p>
                </div>
                <div class="exp">
                    <p class="exp-title"> Expiration: </p>
                    <p class="exp-content"> ${item.date} </p>
                </div>
            </div>
        </div>`
        
    })
    inventorySection.innerHTML = html
    const allAddButtons = document.querySelectorAll(".add-btn-2")
    allAddButtons.forEach(btn => {
        btn.addEventListener("click", increaseInventory)
    })
    const allSubtractButtons = document.querySelectorAll(".subtract-btn-2")
    allSubtractButtons.forEach(btn => {
        btn.addEventListener("click", decreaseInventory)
    })
    const allRemoveItemButtons = document.querySelectorAll(".remove-item-btn-2")
    allRemoveItemButtons.forEach(btn => {
        btn.addEventListener("click", removeItem)
    })
}


/////////////// A function that loads and displays the local storage upon a page reload //////////

function loadInventory() {
    inventory = JSON.parse(localStorage.getItem("inventory-2"))
    if (inventory) {
        showInventoryHtml()
    }
}   

loadInventory()

