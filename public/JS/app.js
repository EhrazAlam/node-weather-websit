const form = document.querySelector('Form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value

    message1.textContent = 'Loading....'
    message2.textContent = ''

    fetch('/weather?search=' + location).then((response) => {
        console.log(location)
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                message1.textContent = data.error
            }
            else {
                // console.log(data.place)
                // console.log(data.forecast)
                message1.textContent = data.place
                message2.textContent = data.forecast
            }
        })
    })
})