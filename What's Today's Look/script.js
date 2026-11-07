const pullovers = [
    { name: 'White Coat', src: 'white coat place holder.jpeg'},
    { name: 'Pink Jacket', src: 'pink jacket place holder.jpeg'},
    {name: 'Band Jacket', src: 'band jacket place holder.jpeg'}
];

const tops = [
    {name: 'White T', src: 'white t place holder.jpeg'},
    {name: 'Pink T', src: 'pink t place holder.jpeg'},
    {name: 'Alt Tank', src: 'alt tank place holder.jpeg'}
];

const bottoms = [
    {name: 'Bell Bottoms', src: 'bell bottoms place holder.jpeg'},
    {name: 'White Skirt', src: 'white skirt place holder.jpeg'},
    {name: 'Black Skirt', src: 'black skirt place holder.jpeg'}
];


let currentTop = 0;
let currentBottom = 0;
let currentPullover = 0;

function displayOutfit() {
    document.getElementById('top').src = tops[currentTop].src;
    document.getElementById('bottom').src = bottoms[currentBottom].src;
    document.getElementById('pullover').src = pullovers[currentPullover].src;
}

document.getElementById('change-top').addEventListener('click', () => {
    currentTop = (currentTop + 1) % tops.length;
    displayOutfit();
});

document.getElementById('change-bottom').addEventListener('click', () => {
    currentBottom = (currentBottom + 1) % bottoms.length;
    displayOutfit();
});

document.getElementById('change-pullover').addEventListener('click', () => {
    currentPullover = (currentPullover + 1) % pullovers.length;
    displayOutfit();
});

// Function to add new clothing pieces
document.getElementById('add-clothing').addEventListener('click', () => {
    const input = document.getElementById('clothing-input');
    const nameInput = document.getElementById('clothing-name');
    const file = input.files[0];
    const category = document.getElementById('clothing-category').value; //Get selected category

    if (file && nameInput.value.trim() !== '') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newClothingPiece = { name: nameInput.value.trim(), src: e.target.result }; //Create new object

            if (category === 'top') {
                tops.push(newClothingPiece); //Add to tops
            } else if (category === 'bottom') {
                bottoms.push(newClothingPiece); //Add to bottoms
            } else if (category === 'pullover') {
                pullovers.push(newClothingPiece); //Add to pullovers
            }
            alert('New clothing piece added to ' + category + '!');
            nameInput.value = ''; //Clear the name input
            input.value = ''; //Clear the file input
            updateRemoveOptions(); //Update remove options
        };
        reader.readAsDataURL(file);
    } else {
        alert('Select an image file and enter a name!');
    }
});

function updateRemoveOptions() {
    const category = document.getElementById('remove-category').value;
    const removeItemSelect = document.getElementById('remove-item');
    removeItemSelect.innerHTML = ''; //Clear previous options

    let items = [];
    if (category === 'top') {
        items = tops;
    } else if (category === 'bottom') {
        items = bottoms;
    } else if (category === 'pullover') {
        items = pullovers;
    }

    items.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index; //Use index to indentify the item
        option.textContent = item.name; //Display the name of the item
        removeItemSelect.appendChild(option);
    });
}

document.getElementById('remove-category').addEventListener('change', updateRemoveOptions);

document.getElementById('remove-clothing').addEventListener('click', () => {
    const category = document.getElementById('remove-category').value;
    const index = document.getElementById('remove-item').value;

    if (category === 'pullover') {
        pullovers.splice(index, 1); //Remove from pullovers
    } else if (category === 'top') {
        tops.splice(index, 1); //Remove from tops
    } else if (category === 'bottom') {
        bottoms.splice(index, 1); //Remove from bottoms
    }

    alert('Clothing piece removed from ' + category +'!');
    updateRemoveOptions(); //Update the options after removal
});

updateRemoveOptions();

// Inital display
displayOutfit();

function saveClothingData() {
    localStorage.setItem('pullovers', JSON.stringify(pullovers));
    localStorage.setItem('tops', JSON.stringify(tops));
    localStorage.setItem('bottoms', JSON.stringify(bottoms));
}

function loadClothingData() {
    const savedPullovers = localStorage.getItem('pullovers');
    const savedTops = localStorage.getItem('tops');
    const savedBottoms = localStorage.getItem('bottoms');

    if (savedTops) {
        tops.push(...JSON.parse(savedTops));
    }
    if (savedBottoms) {
        bottoms.push(...JSON.parse(savedBottoms));
    }
    if (savedPullovers) {
        pullovers.push(...JSON.parse(savedPullovers));
    }
}

//Call loadClothingData when the game starts
loadClothingData();

//Add and event listener for the save button
document.getElementById('save-clothing').addEventListener('click', saveClothingData);