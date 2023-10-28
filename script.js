/* 
    1. create the nav for - period
    2. create hover effects for the nav
    3. effect: the one period chosen should be selected
    4. use data json for filling the card information
    5. create hover effect for the card
    6. create hover effect for the dots icons
    7. create the dots icon functionality
*/

// Buttons
const checkboxes = document.querySelectorAll('.box');
const labelTime = document.querySelectorAll('.label');

// titles : work, play, study, exercise, social and self care
const title = document.querySelectorAll('.card__title');
const current = document.querySelectorAll('.card__hours');
const previous = document.querySelectorAll('.card__last');


// checkbox selections behaviour
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        // Uncheck all checkboxes
        checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });

});


// event listeners for checkboxes -> to change the color of the its label
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        checkedBox();
        fillData();
    });
});

    

// callback for checkboxes -> change the color of the label
const checkedBox = () => {
   for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
        labelTime[i].style.color = '#fff'; // change the color of the label

    } else {
        labelTime[i].style.color = ''; // update the color of the label back to the default
    }
   }
}




// default setting for 'daily' label
checkboxes[1].checked = true;
labelTime[1].style.color = '#fff';

// fetch the data.json
const fetchData = async (dataset) => {
    try {
        const res = await fetch(dataset);
        return res.json();
    } catch (err) {
        throw err;
    }
}

// populating data for title
const fillData = async () => {
    const data = await fetchData('data.json');
    for (let i = 0; i < data.length; i++) {
        title[i].innerHTML = data[i]['title'];
        if (checkboxes[0].checked) {
            current[i].innerHTML = data[i]['timeframes']['daily']['current'] + 'hrs';
            previous[i].innerHTML = 'Last Week - ' + data[i]['timeframes']['daily']['previous'] + 'hrs';
        } else if (checkboxes[1].checked) {
            current[i].innerHTML = data[i]['timeframes']['weekly']['current'] + 'hrs';
            previous[i].innerHTML = 'Last Week - ' + data[i]['timeframes']['weekly']['previous'] + 'hrs'; 
        } else if (checkboxes[2].checked) {
            current[i].innerHTML = data[i]['timeframes']['monthly']['current'] + 'hrs';
            previous[i].innerHTML = 'Last Week - ' + data[i]['timeframes']['monthly']['previous'] + 'hrs';
        }
    }       
}
fillData();



