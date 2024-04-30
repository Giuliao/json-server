
import express, { Request, Response } from "express";
import fs from "node:fs";
import { promisify } from 'node:util'

const app = express();
const port = 6001;
const host = "0.0.0.0";


let cachedData: any = {};

app.use(express.json());

const API_LIST = [
    {
        api: '/api/v1/libs',
        file: 'public/libs.json',
    },
    {
        api: '/api/v1/def_libs',
        file: 'public/def_lib.json',
    },
    {
        api: '/api/v1/apps',
        file: 'public/app.json',
    },
    {
        api: '/api/v1/lib_deps',
        file: 'public/lib_deps2.json',
    },
    {
        api: '/api/v1/plats',
        file: 'public/plats.json',
    },
    {
        api: '/api/v1/arches',
        file: 'public/arch.json',
    }
]

API_LIST.forEach((api) => {
    app.get(api.api, async (req: Request, res: Response): Response => {
        if (cachedData[api.api]) {
            return res.json(cachedData[api.api]);
        }

        const data = await promisify(fs.readFile)(api.file, "utf8")
        let libData = {};
        try {
            libData = JSON.parse(data);

        } catch (error) {
            console.error(error);
        }

        return res.json(libData);
    });

})


const start = async (): Promise<void> => {
    try {
        app.listen(port, host, () => {
            console.log(`Server started on  ${host}:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start()