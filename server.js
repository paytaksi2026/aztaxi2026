const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/passenger', express.static(path.join(__dirname, 'passenger')));
app.use('/driver', express.static(path.join(__dirname, 'driver')));

app.get('/', (req,res)=>{
  res.send('AzTaxi server işləyir');
});

app.listen(PORT, ()=>{
  console.log('AzTaxi server started on port ' + PORT);
});
