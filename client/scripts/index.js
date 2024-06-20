const url = 'http://localhost:3000/api/monster'

const items = document.querySelector('.items')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal')





async function apiCall(url){
  try{
    const response = await axios.get(url)


    return response.data

  }
  catch(e){
    console.log(e);
  }
}

async function htmlContent(url){
  try{
    const response =  await apiCall(url)
    const data = response.data
    console.log(response);
    const htmlData = data.map((Element)=> {
      

        return `<a href="viewMonster.html?name=${Element.name}" class="item " data-name="${Element.name}" style="border: 2px solid ${Element.color}; " onmouseover="this.style.
        boxShadow=' 3px 6px 19px 4px ${Element.color}'  " onmouseout="this.style.boxShadow=''" >
        <picture data-name="${Element.name}">
          <img src="${Element.image_url}" alt="" data-name="${Element.name}">
        </picture>
          <h3 data-name="${Element.name}" style="color: ${Element.color}">${Element.name}</h3 >

        </a>`


    }).join('')

    items.insertAdjacentHTML('beforeend', htmlData)

  }
  catch(e)
  {
    console.log(e);
  }
}

async function getAmount(url){
  try {
    await htmlContent(url)
    const item = document.querySelectorAll('.item')


    item.forEach(async(element) => {
        const monsterName = element.dataset.name
        const response = await axios.get(url + '/'+ monsterName)
        const data = response.data[0]
        const divElement = document.createElement('div')
        const htmlCode = `<h3 class="amount briem-hand">Cantidad total: <span class="finalAmount">${data.amount}</span> </h3>`

        element.insertAdjacentHTML('beforeend', htmlCode)








    });

    
  } catch (error) {
    console.log(error);
  }
}
getAmount(url)

const item = document.querySelectorAll('.item')

