import { createLoader } from "./utils.js";

function main() {
    createLoader().then((loader) => {
        console.log(loader);
    });
} main()