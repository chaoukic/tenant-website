const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem('key');
};
  
const getCurrentUser = () => {
    if (localStorage.getItem('key') ){
        return JSON.parse(localStorage.getItem("user"))
    }
    else{
        return {}
    }
};

module.exports = {
    logout,
    getCurrentUser

}