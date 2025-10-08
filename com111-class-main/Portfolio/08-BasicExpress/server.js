const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    
    if (isNaN(weight) || isNaN(height) || height <= 0) {
        return res.send('Error: Please enter valid numbers for weight and height. <a href="/">Go back</a>');
    }
    
    const bmi = (weight / (height * height)) * 10000;
    const roundedBMI = bmi.toFixed(2);
    
    res.send(`Your BMI is: ${roundedBMI} <br><a href="/">Calculate again</a>`);
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});