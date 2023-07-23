const form = document.getElementById('phonebookForm');
const phonebookEntries = document.getElementById('phonebookEntries');

let phonebookData = [];

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name').value;
  const surnameInput = document.getElementById('surname').value;
  const phoneNumberInput = document.getElementById('phoneNumber').value;

  const entry = {
    name: nameInput,
    surname: surnameInput,
    phoneNumber: phoneNumberInput,
  };

  try {
    const response = await fetch('http://localhost:3000/phonebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const newEntry = await response.json();
    phonebookData.push(newEntry);
    displayEntry(newEntry);
    form.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the entry. Please try again.');
  }
});

async function fetchPhonebookData() {
  try {
    const response = await fetch('http://localhost:3000/phonebooks');
    phonebookData = await response.json();
    phonebookData.forEach((entry) => {
      displayEntry(entry);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayEntry(entry) {
  const listItem = document.createElement('li');
  listItem.textContent = `${entry.name} ${entry.surname}: ${entry.phoneNumber}`;
  phonebookEntries.appendChild(listItem);
}

fetchPhonebookData();
