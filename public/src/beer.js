class Beer {

  constructor(id, name, tagline, description, image_url, food_pairing) {
    this.id = id
    this.name = name
    this.tagline = tagline
    this.description = description
    this.image_url = image_url
    this.food_pairing = food_pairing
  }

  details() {
    let foods = this.food_pairing.map(pair => `<li>${pair}</li>`).join("")
    return (
      `<h1>${this.name}</h1>
      <img src=${this.image_url} height=${200}></img>
      <h2>${this.tagline}</h2>
      <p>${this.description}</p>
      <ol>
        ${foods}
      </ol>`
    )
  }

  render() {
    let foods = this.food_pairing.map(pair => `<li>${pair}</li>`).join("")
    return (
      `<li class="list-group-item" id=${this.id}>
        <h4 id=${this.id}>${this.name}</h4>
      </li>`
    )
  }

}
