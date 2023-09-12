const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.ocupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

populateUI();

let tickedPrice = Number(movieSelect.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selected-movie-index", movieIndex);
  localStorage.setItem("selected-movie-price", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // Copy selected seats into array
  // Map through array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selected-seats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickedPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selected-seats"));

  if (selectedSeats !== null && selectedSeats.length >= 0)
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add("selected");
    });

  const selectedMovieIndex = localStorage.getItem("selected-movie-index");

  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
}

// Event listeners
// Movie select
movieSelect.addEventListener("change", (e) => {
  tickedPrice = Number(e.target.value);

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("ocupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total
updateSelectedCount();
