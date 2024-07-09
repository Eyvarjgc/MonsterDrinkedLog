
const urlParams = new URLSearchParams(window.location.search)
const monsterName = urlParams.get('name')
const url =  'https://monsterdrinkedlog.onrender.com/api/monster/info'
const content = document.querySelector('.container')
const updateItem = document.querySelector('.update-item')
const updateButton = document.querySelector('.updateButton')
const itemInfo = document.querySelector('.itemInfo')
const mainHero= document.querySelector('.main-hero')
const closeModal= document.querySelector('.closeModal')

// blur


console.log(monsterName);


async function callApi(url, name){
  try {
    const res = await axios.get(url + `/${name}`)
    const data = res.data
    console.log(res);
    const html = data.map((information) =>{
      let comprobation = ''
      information.date_drinked == null ? comprobation = '2024-02-21' :  information.date_drinked

      let date = comprobation.slice(0,10)

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

      <div class='buttons'>
          <svg class="delete" data-id=${information.id} xmlns="http://www.w3.org/2000/svg" width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg>

            <svg  class="identifier edit" data-id=${information.id} xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
      </div>



    </div>`
    }).join('')
    content.insertAdjacentHTML('beforeend',html)

    return data

  } catch (error) {
    console.log(error);
  }
}

async function getInfoById(url,id){
  try {
    
    const res = await axios.get(url + `/` + id)

    return res

  } catch (error) {
    console.log(error);
  }
}


async function init(url){
  try{
    await callApi(url, monsterName)
    const identifier = document.querySelectorAll('.identifier')
    const deleteItem = document.querySelectorAll('.delete')

    deleteItem.forEach(element => {
      element.addEventListener('click', async(e) => {
        try {
          const identifierID = element.dataset.id
          
          await deleteMonter(identifierID)


        } catch (error) {
          console.log(error);
        }
      })
    }) 
    
    identifier.forEach(element => {
      element.addEventListener('click', async(e) => {
    

        try{
          content.classList.add('blur')
          mainHero.classList.add('blur')
          const identifierID = element.dataset.id
          console.log(identifierID);
          const data = await getInfoById(url,identifierID)
          

          updateItem.classList.remove('close-item')
          const html = data.data.map(element => {
            return `<label for="">Calificacion</label>
          <input type="number" value=${element.rate} class="inputNumber">
    
          <label for="">Fecha consumida</label>
          <input type="date" value='2024-02-21' class="inputDate">
    
          <label for="">descripcion</label>
          <textarea class="inputDescription" type="text" name="" id=""  >${element.description}</textarea> `
          }).join('')
          
          
          itemInfo.insertAdjacentHTML('beforeend', html)
        
          const inputNumber = itemInfo.querySelector('.inputNumber')
          const inputDate = itemInfo.querySelector('.inputDate')
          const inputDescription = itemInfo.querySelector('.inputDescription')
          



          updateButton.addEventListener('click', async(e) => {
            try{
              e.preventDefault()

              const body = JSON.stringify({
                rate: inputNumber.value,
                drinked_date: inputDate.value,
                description:inputDescription.value ,
              })

              console.log(body);

              await updateMonster(url, body, identifierID)
              
            }catch(err){
              console.log(err);
            }

          })

  
          // close-item
        }catch(er){
          console.log(er);
        }
      })
    });

    
  }catch(e){
    console.log(e);
  }
}

async function updateMonster(url, body, id){
  try {
    
    const response = await axios.patch(url + '/' + id , body ,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })

    console.log(response);
    location.reload();
  } catch (error) {
    console.log(error);
  }

}


async function deleteMonter(id){
  try {
    
    const response = await axios.delete(`http://localhost:3000/api/monster/${id}`)

    location.reload()
    

  } catch (error) {
    console.log(error);
  }
}

init(url)
closeModal.addEventListener('click', (e) => {
  updateItem.classList.add('close-item')
  mainHero.classList.remove('blur')
  content.classList.remove('blur')

})

