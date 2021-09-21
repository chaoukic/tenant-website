export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('value'))
    if (user && token) {
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }