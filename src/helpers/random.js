
const randomStranger = (arr) => {
    const random = Math.floor(Math.random() * arr.length);
    return random
     
}
const randomObject = () => {


    var result;
    var count = 0;
    for (var key in obj)
        if (Math.random() < 1 / ++count)
            result = obj[key];

    return result;

}
module.exports = {
    randomStranger,
    randomObject
}