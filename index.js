const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/run-circuit', (req, res) => {
    exec('python3 circuit.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ success: false, message: 'Failed to execute circuit calculation.' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ success: false, message: stderr });
        }

        const results = JSON.parse(stdout);
        console.log(results);

        let maxEntry = null;
        let maxCount = 0;
        for (const [key, value] of Object.entries(results)) {
            if (value > maxCount) {
                maxCount = value;
                maxEntry = key;
            }
        }

        console.log(`Most occurred entry: ${maxEntry} with count: ${maxCount}`);
        res.json({ success: true, mostOccurred: maxEntry, count: maxCount });
    });
});

app.listen(8487, () => {
    console.log('Server started on port 8487');
});