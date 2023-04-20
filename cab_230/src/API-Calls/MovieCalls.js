/*
File for all API calls related to movies and people
*/

// API Call to fetch person data
export function fetchPerson(imdbID,token){
    const url = "http://sefdb02.qut.edu.au:3000/people/" + imdbID

    return fetch(url,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },

    })
    .then(res =>{
        return res.json()
    })
}

export function fetchMovies(pageNumber, movieTitle, releaseYear) {
    const url = "http://sefdb02.qut.edu.au:3000/movies/search/?";

    const params = {};

    if (pageNumber) {
        params.page = pageNumber;
    }

    if (movieTitle) {
        params.title = movieTitle;
    }

    if (releaseYear) {
        params.year = releaseYear;
    }

    return fetch(url + new URLSearchParams(params), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        return res.json();
    });
}