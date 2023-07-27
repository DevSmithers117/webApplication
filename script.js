// references to HTML elements
const contactForm = document.getElementById('contactForm');
const phonebookDiv = document.getElementById('phonebook');
const searchBar = document.getElementById('searchBar');

// Array to store the contacts which is set to empty
let contacts = [];

const jsonServerURL = 'http://localhost:3000'; // this is the Node.js server's URL as a const

// Function to fetch contacts from the Node.js server
function fetchContacts() {
  fetch(`${jsonServerURL}/contacts`)
    .then(response => response.json())
    .then(data => {
      contacts = data;
      displayContacts();
    })
    .catch(error => {
      console.error('Error fetching contacts:', error);
    });
}

// Function to add a contact to the Node.js server
async function addContact(name, phone, phoneType) {
  try {
    const contact = { name, phone, phoneType };
    
    // Check if the phone number is exactly 10 digits long 
    if (phone.length !== 10) {
      alert('Please enter a 10-digit phone number.');
      return;
    }
    
    const response = await fetch(`${jsonServerURL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    const data = await response.json();
    contacts.push(data);
    displayContacts();
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

// Function to search contacts by filtering
function filterContacts(searchInput) {
  const filteredContacts = contacts.filter((contact) => {
    const name = contact.name.toLowerCase();
    const phone = contact.phone.toLowerCase();
    const phoneType = contact.phoneType?.toLowerCase() || ''; // Uses a empty string if phoneType is undefined
    return (
      name.includes(searchInput) ||
      phone.includes(searchInput) ||
      phoneType.includes(searchInput)
    );
  });

  displayContacts(filteredContacts);
}

// Function to display contacts
function displayContacts(filteredContacts = contacts) {
  phonebookDiv.innerHTML = '';

  filteredContacts.forEach((contact) => {
    const contactDiv = document.createElement('div');
    contactDiv.innerHTML = `<strong>${contact.name}</strong>: ${contact.phone} (${contact.phoneType})`;
    phonebookDiv.appendChild(contactDiv);
  });
}

// Event listener for form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const phoneTypeSelect = document.getElementById('phoneType');
  const name = nameInput.value;
  const phone = phoneInput.value;
  const phoneType = phoneTypeSelect.value;

  addContact(name, phone, phoneType);

  // Clear form after submission
  nameInput.value = '';
  phoneInput.value = '';
});

// Event listener for search bar input
searchBar.addEventListener('input', (e) => {
  const searchInput = e.target.value.trim().toLowerCase();
  filterContacts(searchInput);
});

// Fetch contacts when the script is loaded
fetchContacts();
