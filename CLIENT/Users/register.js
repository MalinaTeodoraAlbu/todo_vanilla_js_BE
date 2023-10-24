import { users } from '../Database/users.js'

export function register(e) {
    console.log('vrei sa te inregistrezi')
    e.preventDefault()

    let registerEmail = document.getElementById('registerEmail').value

    if (users.find(element => element.email === registerEmail)) {
        console.log('Exista deja un utilizator cu aceasta adresa de email')
    } else {
        let username = document.getElementById('registerUsername').value
        let password = document.getElementById('registerPassword').value
        let newId = users[users.length-1].id + 1

        let newUser = {
            id: newId,
            name: username,
            email: registerEmail,
            password: password
        }

        users.push(newUser)
        console.log(users)
    }
}