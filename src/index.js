const beerUrl = 'http://localhost:3000/beers'


const beerDiv = document.getElementById("beer-detail")
const beerList = document.createElement('ul')
beerList.className = "list-group"
beerDiv.appendChild(beerList)


document.addEventListener("DOMContentLoaded", function () {
    console.log("hi hal")

    orderBeers()

})

function orderBeers() {
    fetch('http://localhost:3000/beers')
    .then((response) => {
        return response.json();
    })
    .then(function(data) {
        beerCards(data)
    })
    .catch((error) => {
        alert ("This error says we can't connect to the database.  How sad.");
        console.error('Error:', error);
    })
}

function beerCards(beers) {
   

    beers.forEach((beer) => {
        individualBeerCard(beer)
    })
}

function individualBeerCard(beer) {
    const thisBeer = document.createElement('li')
    thisBeer.className = "list-group-item"
    thisBeer.innerText = beer.name
    thisBeer.id = beer.id
    thisBeer.addEventListener('click', function(event) {
        event.preventDefault()
        drinkBeer(beer, thisBeer)
    })
    beerList.appendChild(thisBeer)
}

function drinkBeer(beer, beerLi) {
    const yesIAmDecidingAsADesignChoiceToRepeatTheBeerName = document.createElement('h1')
    yesIAmDecidingAsADesignChoiceToRepeatTheBeerName.innerText = beer.name
    beerLi.appendChild(yesIAmDecidingAsADesignChoiceToRepeatTheBeerName)

    const beerImage = document.createElement('img')
    beerImage.src = beer.image_url
    beerLi.appendChild(beerImage)

    const beerTagline = document.createElement('h3')
    beerTagline.innerText = beer.tagline
    beerLi.appendChild(beerTagline)

    const beerDescription = document.createElement('textarea')
    beerDescription.innerText = beer.description
    beerLi.appendChild(beerDescription)

    const beerButton = document.createElement('button')
    beerButton.id = "edit-beer"
    beerButton.className = "btn btn-info"
    beerButton.innerText = "Save"
    beerButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        editBeer(event, beer, beerDescription, beerLi);

    })
    beerLi.appendChild(beerButton)

}

function editBeer(event, beer, newBeerInfo, beerLi) {
    editFetch(beer, newBeerInfo, beerLi)    
}

function editFetch (beer, newBeerInfo, beerLi) {
    fetch(`${beerUrl}/${beer.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json' 
        },
        body: JSON.stringify({
            description: newBeerInfo.value
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        deleteOldCard(data);
        individualBeerCard(data);
// debugger;
//something to sort the children, otherwise the beer gets sent to the bottom of the list
//         let li = beerList.children;
        
//         let sortedLi = li.sort( function(beer, nextBeer) {
//             if (beer.id < nextBeer.id) {
    // return nextBeer
}
//         });
//         beerList.append(li);
// debugger;

//would also be possible to just rewrite the inner text
//but having trouble with that need to go help out group

    })
}

function deleteOldCard(beer) {
    const yesThisUlHasTwoConstantsNowSoWhat = document.getElementsByClassName("list-group");
    const beerToChug = document.getElementById(beer.id);
    beerToChug.parentNode.removeChild(beerToChug);
}