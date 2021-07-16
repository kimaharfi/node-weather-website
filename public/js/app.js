const waetherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


waetherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    
    const location = search.value
    
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageOne.textContent = data.forecast
            }
        })
    })
})