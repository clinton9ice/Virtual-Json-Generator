
import {isString} from "./conditions";

export const generator = (e = 10) =>{
    let max = isString(e) ? 6 : e;
    let chars = 'abcdefghijklmnopqrstuvwxyz123456789',
        i = "";
    let charLength = chars.length

    for (let index = 0; index < max; index++) {
        i += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return i;
}