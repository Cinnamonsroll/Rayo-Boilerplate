import path from "path";
import fs from "fs";

export async function load(dir, cb, first = true) {
    try{
    const joined = first ? path.join(process.cwd(), dir) : dir;
    for (const entry of fs.readdirSync(joined)) {
        const joinedEntry = path.join(joined, entry);

        if (fs.lstatSync(joinedEntry).isDirectory())
            await load(joinedEntry, cb, false);
        else await cb(joinedEntry);
    }
}catch(err){
    console.error("I couldn't find any routes... But that's okay, take your time.")
}
}
