export const debouce = function (fn, delay = 200) {
    let _this = null;
    let timer = null;
    return function (...args) {
        _this = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, delay);
    };
};