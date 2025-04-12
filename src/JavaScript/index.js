//import of main resources and libraries
import axios from "axios";
import _ from "lodash";
import _get from 'lodash.get';
import '../css/style.css';

//event listener for the button 
const buttonClick = document.getElementById('searchBtn').addEventListener('click', fetchBooks);

//two functions for the loading animation

//it sets the function showLoader to display the loader when loading
function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block'; 
}

//it sets the function hideLoader to hide the loader when loading is done
function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

// Function for calling Open Library API with Axios
async function fetchBooks() {

  try {

    //call the function showLoader to display the loader
    showLoader();

    const category = document.getElementById('genre').value.trim().toLowerCase().replace(/[\W_]/g, "");
    if (!category) {
      alert('Please enter a valid category');

      return;
    }
    const url = 'https://openlibrary.org/subjects/' + category + '.json';
    const response = await axios.get(url);
    let books = response.data.works;
    let resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    // Check if category typed by the user exists"
    if (_.isEmpty(books)) {
      alert('No books found in the selected category, please try another word');
    } else {
      // Loop for each book and create a div with information within it
      books.forEach(async book => {
        let title = book.title;
        let authors = (book.authors && book.authors.length > 0) ? book.authors.map(author => author.name).join(', ') : 'N/A';
        
        // Create a div for each book
        let bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        resultsContainer.appendChild(bookDiv);

        // Create a title for each book
        let bookTitle = document.createElement('h3');
        bookTitle.textContent = title;
        bookTitle.className = 'bookTitle';
        bookDiv.appendChild(bookTitle);

        // Create a paragraph for each book with the information about its author
        let bookAuthors = document.createElement('p');
        bookAuthors.textContent = 'Author(s): ' + authors;
        bookAuthors.className = 'bookAuthors';
        bookDiv.appendChild(bookAuthors);

        // Create a button for each book that's used to open the description
        let btnDescription = document.createElement('button');
        btnDescription.textContent =  'More information';
        btnDescription.className = 'btnDescription';
        bookDiv.appendChild(btnDescription);

        //Create a new div for the description
        let bookDescriptionDiv = document.createElement('div');
        bookDescriptionDiv.className = 'bookDescription';
        btnDescription.setAttribute('data-book-key', book.key);
        bookDiv.appendChild(bookDescriptionDiv);

        // Add an event listener to the button that will fetch the description
        btnDescription.addEventListener('click', (event)=> {
          const bookKey = event.target.getAttribute('data-book-key');
          fetchBookDescription(bookKey, bookDescriptionDiv);
        });

      });
      //call the function hideLoader to hide the loader after the end of the loading
      hideLoader();
    } 
    } catch (error) {
    console.error('An error occurred while fetching books:', error);
  }
}


// Function for fetching the description
async function fetchBookDescription(bookKey, bookDescriptionDiv) {
  try {
   
    // This constructs the url of the API using the book key
    let url = 'https://openlibrary.org' + bookKey + '.json';
    
    const response = await axios.get(url);
    const descriptionValue = _.get(response.data, 'description.value', 'N/A');
    //it converts the description to a string JSON
    const description = JSON.stringify(descriptionValue, null, 2);

    bookDescriptionDiv.textContent = description;
    
  } catch (error) {
    console.error('An error occurred while fetching book description:', error);
  }
}
