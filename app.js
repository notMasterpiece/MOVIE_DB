window.addEventListener('DOMContentLoaded', () =>{
  const API_KEY = '8b618207d1de51ee9840b0f8b73d0257';
  const moviesWrap = document.body.querySelector('#movies');
  const movieWrap = document.body.querySelector('#movie-wrap');
  const recWrap = document.body.querySelector('#recoment-wrap');
  const searchForm = document.body.querySelector('#search-form');
  const search = document.body.querySelector('#search');


  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
        new Movies(data.results, movieWrap);
      });





  searchForm.addEventListener('submit', e => {
    e.preventDefault();

    if( !search.value) return;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search.value}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => {
          movieWrap.innerHTML = '';
          search.value = '';

          new Movies(data.results, movieWrap);
        })
  });




  moviesWrap.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;

    const link = e.target.closest('.movie-link');

    if(!link) return;

    const id = link.getAttribute('href');

    if(!id) return;



      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
          .then(response => response.json())
          .then(data => {

              movieWrap.innerHTML = '';
              new Movies(data, movieWrap);



              fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
                  .then(response => response.json())
                  .then(data => {
                    recWrap.innerHTML = '';
                    new Movies(data.results, recWrap);
                  })



          })




    });

});




class Movies {

  constructor (movies, node) {
    this.movies = movies;
    this.node = node;
    this.render();
  }



  render() {
    this.fragment = document.createDocumentFragment();



    if (Array.isArray(this.movies)) {
      this.movies.forEach(movie => {

        const block = document.createElement('div');
        block.className += 'movie-item';

        block.innerHTML = `
            <a href="${movie.id}" class="movie-link">
                <img src=https://image.tmdb.org/t/p/w300${movie.poster_path} alt="">
            </a>
            <h2>${movie.original_title}</h2>
            <p>${movie.overview}</p>
      `;

        this.fragment.appendChild(block);
        this.node.appendChild(this.fragment);


      })
    } else  {
      const block = document.createElement('div');
      block.className = 'single-movie';

      block.innerHTML = `
            <a href="${this.movies.id}" class="movie-link">
                <img src=https://image.tmdb.org/t/p/w300${this.movies.poster_path} alt="">
            </a>
            <h2>${this.movies.original_title}</h2>
            <p>${this.movies.overview}</p>
      `;

      this.node.appendChild(block);
    }


  }

};









