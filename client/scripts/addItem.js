const url = 'http://localhost:3000/api/monster'

const monsterName =  document.querySelector('.monsterName')
const monsterColor =  document.querySelector('.monsterColor')
const monsterImage =  document.querySelector('.monsterImage')
const monsterDate =  document.querySelector('.monsterDate')
const monsterDescription =  document.querySelector('.monsterDescription')
const formSave  =  document.querySelector('.form')
const alertItem  =  document.querySelector('.alert')
const monsterRate =  document.querySelector('.monsterRate')


async function postMonster(url, body){
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    

    if(response.data.success){
      const htmlCode = `<p class="saved">Item guardado</p>`
        alertItem.insertAdjacentHTML('beforeend', htmlCode)
        const pAlert =  alertItem.querySelector('.saved')

        setTimeout(() => {
          pAlert.innerHTML = ''
        }, 3000);
    }
    else {
      console.log('Error: ', response);
      alertItem.insertAdjacentHTML('beforeend', `<p class="error">Error guardando el item: ${response}</p>`);

      setTimeout(() => {
        alertItem.querySelector('.error').innerHTML = '';
      }, 3000);

  } }
  catch (error) {
    console.log(error);
  }
}

formSave.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const body = JSON.stringify({
    name:monsterName.value, 
    image_url: monsterImage.value, 
    color:monsterColor.value,
    date_drinked:monsterDate.value,
    description:monsterDescription.value,
    rate:monsterRate.value
  })
  postMonster(url, body)
  console.log(url); 
  console.log(body);
})