/*
File for all api calls involving user authentication
*/


// API call to register user
export function registerUser(formData){
    const url = "http://sefdb02.qut.edu.au:3000/user/register"

    return fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password
            
        })
    })
    .then(res =>{
        return res.json()
    })
}

// API call to login user
export function loginUser(formData){
    const url = "http://sefdb02.qut.edu.au:3000/user/login"
    return fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password
            
        })
    })
    .then(res =>{
        return res.json()
    })
}

export function PostRefreshToken(refreshToken){
    const url = "http://sefdb02.qut.edu.au:3000/user/refresh"
    return fetch(url,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refreshToken": refreshToken
        })

    })
    .then(res => {
        return res.json()
    })
}