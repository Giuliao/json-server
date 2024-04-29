
import express, { Request, Response } from "express";
import fs from "node:fs";

const app = express();
const port = 6001;
const host = "0.0.0.0";


let libData: any;

app.use(express.json());

app.get("/api/v1/libs", (req: Request, res: Response): Response => {
    return res.json(libData);
});

const initFiles = () => {
    fs.readFile("public/lib.json", "utf8", (err, data) => {
        try {
            libData = JSON.parse(data);
        } catch (error) {
            console.error(error);
        }
    });
}

const start = async (): Promise<void> => {
    try {
        initFiles();
        app.listen(port, host, () => {
            console.log(`Server started on  ${host}:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start()