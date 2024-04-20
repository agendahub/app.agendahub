export function* loadTypes() {
    yield void 0;
}

String.prototype.toLowerCapital = function(this: string) {
    return this[0].toLowerCase() + this.slice(1);
}
  
String.prototype.toUpperCapital = function(this: string) {
    return this[0].toUpperCase() + this.slice(1);
}
  
export function defer(cb: () => void, delay = 0) {
    setTimeout(() => {
        cb && cb();
    }, delay);
}