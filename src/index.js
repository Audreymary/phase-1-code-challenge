// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const posterImage = document.getElementById("poster");
    const titleElement = document.getElementById("title");
    const runtimeElement = document.getElementById("runtime");
    const filmInfoElement = document.getElementById("film-info");
    const showtimeElement = document.getElementById("showtime");
    const ticketNumElement = document.getElementById("ticket-num");
    const buyTicketButton = document.getElementById("buy-ticket");
  
    // fetch event
    fetch("http://localhost:3001/films")
      .then((response) => response.json())
      .then((films) => {
        films.forEach(film => {
          const li = document.createElement("li");
          li.className = "film item";
          li.innerText = film.title;
          li.dataset.id = film.id;
  
          // display event
          li.addEventListener("click", () => displayFilmDetails(film));
          filmList.appendChild(li);
        });
      });
  
    // Function to display film details
    function displayFilmDetails(film) {
      const availableTickets = film.capacity - film.tickets_sold;
      posterImage.src = film.poster;
      titleElement.innerText = film.title;
      runtimeElement.innerText = `${film.runtime} minutes`;
      filmInfoElement.innerText = film.description;
      showtimeElement.innerText = film.showtime;
      ticketNumElement.innerText = availableTickets;
  
      // Enable/disable the buy ticket button 
      buyTicketButton.innerText = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
      buyTicketButton.disabled = availableTickets === 0;
  
      // Handle ticket purchase
      buyTicketButton.onclick = () => {
        if (availableTickets > 0) {
          buyTicket(film);
        }
      };
    }
   
    // Function to buy a ticket
    function buyTicket(film) {
      const newTicketsSold = film.tickets_sold + 1;
  
      // Update tickets sold on the server
      fetch(`http://localhost:3001/films/${film.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ tickets_sold: newTicketsSold }),
      })
        .then(response => response.json())
        .then(updatedFilm => {
          // Update the display with the new film details
          displayFilmDetails(updatedFilm);
        })

          fetch(`http://localhost:3001/films/${film.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(updatedFilm),
          })
          .then(response => response.json())
          .then(updatedFilm => {
            // Update the display with the new film details
            displayFilmDetails(updatedFilm);
  
          // POST new ticket to the tickets endpoint
          fetch("http://localhost:3001/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              film_id: film.id,
              number_of_tickets: 1,
            }),
          });
        });
    }
  
    // Function to delete a film
    function deleteFilm(filmId) {
      // Function to fetch film data from the API
      async function fetchFilms() {document.addEventListener("DOMContentLoaded", () => {
        const filmList = document.getElementById("films");
        const posterImage = document.getElementById("poster");
        const titleElement = document.getElementById("title");
        const runtimeElement = document.getElementById("runtime");
        const filmInfoElement = document.getElementById("film-info");
        const showtimeElement = document.getElementById("showtime");
        const ticketNumElement = document.getElementById("ticket-num");
        const buyTicketButton = document.getElementById("buy-ticket");
      
        // fetch event
        fetch("http://localhost:3000/films")
          .then((response) => response.json())
          .then((films) => {
            films.forEach(film => {
              const li = document.createElement("li");
              li.className = "film item";
              li.innerText = film.title;
              li.dataset.id = film.id;
      
              // display event
              li.addEventListener("click", () => displayFilmDetails(film));
              filmList.appendChild(li);
            });
          });
      
        // Function to display film details
        function displayFilmDetails(film) {
          const availableTickets = film.capacity - film.tickets_sold;
          posterImage.src = film.poster;
          titleElement.innerText = film.title;
          runtimeElement.innerText = `${film.runtime} minutes`;
          filmInfoElement.innerText = film.description;
          showtimeElement.innerText = film.showtime;
          ticketNumElement.innerText = availableTickets;
      
          // Enable/disable the buy ticket button 
          buyTicketButton.innerText = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
          buyTicketButton.disabled = availableTickets === 0;
      
          // Handle ticket purchase
          buyTicketButton.onclick = () => {
            if (availableTickets > 0) {
              buyTicket(film);
            }
          };
        }
      
        // Function to buy a ticket
        function buyTicket(film) {
          const newTicketsSold = film.tickets_sold + 1;
      
          // Update tickets sold on the server
          fetch(`http://localhost:3001/films/${film.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({ tickets_sold: newTicketsSold }),
          })
            .then(response => response.json())
            .then(updatedFilm => {
              // Update the display with the new film details
              displayFilmDetails(updatedFilm);
            })
    
              fetch(`http://localhost:3001/films/${film.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(updatedFilm),
              })
              .then(response => response.json())
              .then(updatedFilm => {
                // Update the display with the new film details
                displayFilmDetails(updatedFilm);
      
              // POST new ticket to the tickets endpoint
              fetch("http://localhost:3001/tickets", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                },
                body: JSON.stringify({
                  film_id: film.id,
                  number_of_tickets: 1,
                }),
              });
            });
        }
      
        // Function to delete a film
        function deleteFilm(filmId) {
          fetch(`http://localhost:3001/films/${filmId}`, {
            method: "DELETE",
          })
            .then(() => {
              // Remove the film from the list 
              const filmItem = document.querySelector(`[data-id='${filmId}']`);
              if (filmItem) {
                filmList.removeChild(filmItem);
              }
            });
        }
        filmList.addEventListener("click", (event) => {
          if (event.target.classList.contains("delete-button")) {
            const filmId = event.target.parentElement.dataset.id;
            deleteFilm(filmId);
          }
        });
      });
          try {
              const response = await fetch('http://localhost:3001/films'); // Update the URL as needed
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return await response.json();
          } catch (error) {
              console.error('Error fetching films:', error);
              return [];
          }
      }
      
      // Function to display the list of films
      async function displayFilmList() {
          const films = await fetchFilms();
          const filmsList = $('#films');
          filmsList.empty(); 
      
      films.forEach(film => {
          const li = $('<li>').addClass('film item').data('id', film.id);
          li.text(film.title);
      
          // Create a delete button
          const deleteButton = $('<button>')
              .addClass('ui red button')
              .text('Delete')
              .on('click', (e) => {
                  e.stopPropagation(); // Prevent the click from triggering the film details display
                  deleteFilm(film.id); // Call the delete function
              });
      
          li.append(deleteButton);
          filmsList.append(li);
      
          li.on('click', () => displayFilmDetails(film.id));
      });
      
      if (films.length > 0) {
          displayFilmDetails(films[0].id);
      }
      }
      
      // Function to delete a film
      async function deleteFilm(id) {
          try {
              const response = await fetch(`http://localhost:3001/films/${id}`, {
                  method: 'DELETE'
              });
              if (!response.ok) {
                  throw new Error('Failed to delete the film');
              }
              // Refresh the film list after deletion
              displayFilmList();
          } catch (error) {
              console.error('Error deleting film:', error);
          }
      }
      
      async function displayFilmDetails(id) {
          const films = await fetchFilms();
          const film = films.find(f => f.id === id);
          if (!film) return;
      
      $('#title').text(film.title);
      $('#runtime').text(`${film.runtime} minutes`);
      $('#film-info').text(film.description);
      $('#showtime').text(film.showtime);
      
      const availableTickets = film.capacity - film.tickets_sold;
      $('#ticket-num').text(`${availableTickets}`);
      $('#buy-ticket').prop('disabled', availableTickets <= 0);
      
      $('#poster').attr('src', film.poster); 
      }
      
      $('#buy-ticket').on('click', async function () {
          const filmId = $('#films .item.selected').data('id');
          const films = await fetchFilms();
          const film = films.find(f => f.id === filmId);
      
      if (film) {
          const availableTickets = film.capacity - film.tickets_sold;
          if (availableTickets > 0) {
              film.tickets_sold++;
              
              await fetch(`http://localhost:3001/films/${filmId}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ tickets_sold: film.tickets_sold })
              });
      
              alert(`Ticket purchased for ${film.title}!`);
              displayFilmDetails(filmId); 
          } else {
              alert("Sorry, this movie is sold out!");
          }
      }
      });
      
      displayFilmList();
      fetch(`http://localhost:3001/films/${filmId}`, {
        method: "DELETE",
      })
        .then(() => {
          // Remove the film from the list 
          const filmItem = document.querySelector(`[data-id='${filmId}']`);
          if (filmItem) {
            filmList.removeChild(filmItem);
          }
        });
    }
    filmList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-button")) {
        const filmId = event.target.parentElement.dataset.id;
        deleteFilm(filmId);
      }
    });
  });
  