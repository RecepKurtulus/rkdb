let movieNameDOM=document.getElementById("movieName")
let searchBtnDOM=document.getElementById("search-button")
let result =document.getElementById("result")

//function to fetch data

let getMovie = () => {
    let movieName = movieNameDOM.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //if input field is empty

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie or show name </h3>`;
    }

    //if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    
                    
                <div class="row" style="margin-top: 30px;">
                <div class="col-sm-6">
                    <img src=${data.Poster} class="poster">
                    <div class="andDetails">
                    <h2>${data.Title}</h2>
                    <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                    <span class="badge genreBadges bg-black">${data.Genre.split(",").join(`</span><span class="badge genreBadges bg-black">`)}</span>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6" style="float:right"> 
                  <div class="rating">
                    
                    <h4>${data.imdbRating}</h4>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p></div>
                </div>
              
                `;
            }

            //if movie doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtnDOM.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);