const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('phonebooks.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom route to handle POST requests
server.post('/phonebook', (req, res) => {
  const phonebooks = router.db.get('phonebooks');
  const newEntry = req.body;
  if (!newEntry || !newEntry.name || !newEntry.surname || !newEntry.phoneNumber) {
    res.status(400).json({ error: 'Name, surname, and phone number are required.' });
  } else {
    // Get the highest existing 'id' and create a new 'id' for the new entry
    const maxId = phonebooks.reduce((max, entry) => (entry.id > max ? entry.id : max), 0);
    newEntry.id = maxId + 1;

    phonebooks.push(newEntry);
    router.db.write();
    res.status(201).json(newEntry);
  }
});

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
