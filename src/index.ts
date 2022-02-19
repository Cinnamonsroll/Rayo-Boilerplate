import { join } from 'node:path';
import { load } from './utils';
import rayo from "rayo"
import send from "@rayo/send"
import bodyParser from "body-parser"
const delimiter = process.platform === 'win32' ? '\\' : '/', server = rayo({
    port: "1234"
});
(async () => {
    await load('./src/routes', async (file) => {
        let parents: string[] = file.split(delimiter);
        const index: number = parents.indexOf('routes');
        parents = parents.filter((_: string, i: number) => i > index);
        let route: string = parents.join('/');
        const { route: importedRoute } = await import(join(__dirname, 'routes', route));
        if (/\[.*\]/.test(route)) route = route.replace(/\[(.*)\]/g, ':$1');
        server
            .route(importedRoute.method.toUpperCase(), `/api/${route.replace(/\..+$/, "")}`, importedRoute.execute);
    });
})()
server
    .through(send(), bodyParser.json());
server.start(() => console.log("Woah, my brains are working!"));
