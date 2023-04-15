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