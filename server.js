// references to HTML elements
const contactForm = document.getElementById('contactForm');
const phonebookDiv = document.getElementById('phonebook');

// Array to store the contacts which is set to empty
let contacts = [];

const jsonServerURL = 'http://localhost:3000'; // the node.js server as a const

// Function to fetch contacts from the Node.js server
async function fetchContacts() {
  try {
    const response = await fetch(`${jsonServerURL}/contacts`);
    const data = await response.json();
    contacts = data;
    displayContacts();
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

// Function to add a contact to the Node.js server
async function addContact(name, phone, phoneType) {
  try {
    const contact = { name, phone, phoneType };
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

// Function to display contacts
function displayContacts() {
  phonebookDiv.innerHTML = '';

  contacts.forEach((contact) => {
    const contactDiv = document.createElement('div');
    contactDiv.innerHTML = `<strong>${contact.name}</strong>: ${contact.phone} (${contact.phoneType})`;
    phonebookDiv.appendChild(contactDiv);
  });
}

// Event listener for form submit 
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

// Initialize the phonebook with exsisting data
fetchContacts();
