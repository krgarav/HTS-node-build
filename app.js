const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const builtPath = path.join(__dirname, "./build");

app.use(cors({
    origin: '*',
    methods: ['OPTIONS', 'POST', 'GET', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Origin-Agent-Cluster', 'true');
    next();
});


app.use(express.static(builtPath));


app.get('*', (req, res) => {
    res.sendFile(path.join(builtPath, "index.html"));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
