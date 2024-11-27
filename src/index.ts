import express from 'express';

const app = express();

//Routing 
app.get('/', (req, res) => {
  res.send('Hello World in express | TypoScript');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
