
const urlParams = new URLSearchParams(window.location.search)
const monsterName = urlParams.get('name')
const url =  'http://localhost:3000/api/monster/info'
const content = document.querySelector('.container')
console.log(monsterName);


async function callApi(url, name){
  try {
    const res = await axios.get(url + `/${name}`)
    const data = res.data

    const html = data.map((information) =>{
      let date = information.date_drinked.slice(0,10)

      return `
      <div class="containerMonsterModal">
      <picture>
        <img src='${information.image_url}' alt="">
      </picture>
      <div class="info">
              <p class="monsterName frijole-regular">${information.name}</p>
      <p class="monsterDate">Consumida el: ${date}</p>
      <p class="monsterRate">Calififacion: ${information.rate}</p>
      <p class="monsterDescription">${information.description}</p>
      </div>

    </div>`
    }).join('')
    content.insertAdjacentHTML('beforeend',html)
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
}

callApi(url, monsterName)