export const type =(e, strict) => {
    if (strict) {
        return Object.prototype.toString.call(e)
    }
    return typeof e;
}

export const isObject= (e) => {
    return Object.prototype.toString.call(e) === '[object Object]';
}
export const isArray =(e)  =>{
    return Object.prototype.toString.call(e) === '[object Array]';
}
 export const isString =( e)  =>{
    return Object.prototype.toString.call(e) === '[object String]';
}
 export const isNumber = ( e)  =>{
    return Object.prototype.toString.call(e) === '[object Number]';
}