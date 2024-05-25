const validateSignUp = (body) => {
    var message="";
    if(!body?.password){
        message += "Password is required"
    }
    return message;
}
module.exports = {
    validateSignUp,
}