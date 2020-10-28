const movieList = document.querySelector('.list');
const movies = document.querySelectorAll('.movie');
const pageMovie = document.querySelector('.page__movie');
const pageAbout = document.querySelector('.page__about');
const pageBook = document.querySelector('.page__book');
const seatsBox = document.querySelector('.seats__box');

const displayMoviesFromDb = () => {
    for(let i = 0; i < data.length; i++) {
        createMovieForList(data[i]);
    }
}

const createMovieForList = (movie) => {
    const movieDiv = document.createElement('div');
    const {id, name, img, genre, rating, price, director, stars, action} = movie;
    
    movieDiv.classList.add('movie');
    movieDiv.setAttribute("id", `${id}`);

    movieDiv.innerHTML = `
                    <div class="movie__price">
                        ${price}
                    </div>
                    
                    <img src="${img}" alt="movie" class="movie__img">
                    
                    <div class="content">
                        <h3 class="heading heading__third">${name}</h3>
                        <div class="movie__about">
                            <span class="strong">
                                Genre:
                            </span>
                            ${loopArr(genre)}
                        </div>

                        <div class="movie__about">
                            <span class="strong">
                                Rating:
                            </span>
                            ${rating}
                        </div>

                        <div class="movie__about">
                            <span class="strong">
                                Director:
                            </span>
                            ${director}
                        </div>

                        <div class="movie__about">
                            <span class="strong">
                                Stars:
                            </span>
                            ${loopArr(stars)}
                        </div>
                    </div>

                    <div class="actions actions__movie">
                        <a href="#" class="btn btn__white more">more</a>
                        <a href="#" class="btn btn__pink book">book now</a>
                    </div>
    `

    movieList.appendChild(movieDiv);
}



const loopArr = (arr) => {
    let stringedArr = '';
    arr.forEach(el => {
        stringedArr += ` ${el},`
    });

    return stringedArr.slice(0, -1);
}

const showAboutPageWithMovie = (id) =>  {
    const movie = data.find(el => el.id === id);
    const {name, img, genre, rating, price, director, stars, action} = movie;

    document.getElementById('about_img').src = img;
    document.getElementById('about_title').innerText = name;
    document.getElementById('about_action').innerText = action;
    document.getElementById('about_genre').innerText = loopArr(genre);
    document.getElementById('about_rating').innerText = rating;
    document.getElementById('about_director').innerText = director;
    document.getElementById('about_stars').innerText = loopArr(stars);
}

const showBookPageWithSeats = (id) => {
    const movie = data.find(el => el.id === id);
    
    const bookTitle = document.getElementById('book_title');
    const bookImg = document.getElementById('book_img');
    const bookPrice = document.getElementById('book_price');

    const {name, img, price} = movie;

    bookTitle.innerText = name;
    bookImg.src = img;
    bookPrice.innerText = price;
}

// Update total price based on movie seats and price
const updateTotalPrice = () => {
    const seats = seatsBox.querySelectorAll('SVG .seats__seat--selected').length;
    const price = +pageBook.querySelector('#book_price').innerText.substring(1);
    const total = pageBook.querySelector('#book_total');
    const tickets = pageBook.querySelector('#book_count');
    const totalNum = seats * price;
    
    tickets.innerText = seats;
    total.innerText = '$' + totalNum;
}

// ####################### LISTENERS #########################

// Open page about with movie dets
movieList.addEventListener('click', function(e) {
    
    const movieId = e.target.parentElement.parentElement.id;
    if(e.target.classList.contains('more')){
        pageAbout.classList.add('active');
        pageMovie.classList.remove('active');
        pageBook.classList.remove('active');

        showAboutPageWithMovie(movieId)
    } else if(e.target.classList.contains('book')){
        pageBook.classList.add('active');
        pageMovie.classList.remove('active');
        pageAbout.classList.remove('active');
        
        
        showBookPageWithSeats(movieId);

    }
    e.preventDefault();
})

// Back from page about to movie list 
document.querySelector('.back').addEventListener('click', function() {
    pageMovie.classList.add('active');
    pageAbout.classList.remove('active');
});

// Toogle seats on click
seatsBox.querySelectorAll('svg').forEach(el => {
    el.addEventListener('click', function(e){
        if(!(e.target.classList.contains('seats__seat--booked') || e.target.parentElement.classList.contains('seats__seat--booked'))){
            e.target.classList.toggle('seats__seat--selected');
            updateTotalPrice();
        }
    })
});

// Back to main
document.querySelector('.header__back').addEventListener('click', function(){
    pageBook.classList.remove('active');
    pageMovie.classList.add('active');
})

displayMoviesFromDb();
