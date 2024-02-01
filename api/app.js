const e = require('express');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('PhotoMong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.static('public'));