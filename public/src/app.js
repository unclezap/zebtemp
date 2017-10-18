const URL = 'http://localhost:3000/beers'

class App {
  constructor() {
    this.url = URL
    this.list = document.getElementById('list-group')
    this.list.addEventListener('click', e => this.selectBeer(e))
    this.showDetailsSide = document.getElementById("beer-detail")
  }

  selectBeer(e) {
    let id = event.target.id
    fetch(URL + `/${id}`)
    .then(res => res.json())
    .then(jsonRes => this.showBeer(jsonRes))
  }

  showBeer(beerJSON) {
    debugger
    let newBurr = new Beer(beerJSON.id, beerJSON.name, beerJSON.tagline, beerJSON.description, beerJSON.image_url, beerJSON.food_pairing)
    this.showDetailsSide.innerHTML = newBurr.details()
  }

  getBeers() {
    fetch(URL)
    .then(res => res.json())
    .then(jsonRes => this.makeBeers(jsonRes))
  }

  makeBeers(beerJSON) {
    const allBeers = beerJSON.map(beer => {
      let newBurr = new Beer(beer.id, beer.name, beer.tagline, beer.description, beer.image_url, beer.food_pairing)
      return newBurr.render()
    })
    this.listBeers(allBeers)
  }

  listBeers(beers) {
    this.list.innerHTML = beers.join("")
  }

  render() {
    this.getBeers()
  }

}
