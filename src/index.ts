import express, {Express} from "express";
import { PORT } from "./config";

const app: Express = express();

require('./startup/db')();
require('./startup/routes')(app);

const port = PORT || 3000;

// Define the catch-all route (404 Not Found)
app.all('*', (req, res) => {
    res.status(404).json({
        error: true,
        status: 404,
        message: "The requested resource was not found on this server."
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});