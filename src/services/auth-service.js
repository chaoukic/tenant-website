import axios from 'axios';
class AuthService {
  login(user) {
    return axios
      .post('/api/tenants/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if(response.data.data.status){
            //Hash the key before storing it in the localstorage
            localStorage.setItem('value', JSON.stringify(response.data.data.token))
            //Hash the key and the value in the localstorage to not make it visible to the user -- TBD later along the project
            localStorage.setItem('user',JSON.stringify(response.data.data.user))
            //navigate('/dashboard', { replace: true });
          }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('value')
  }

  register(user) {
    return axios.post('/api/tenants/register', {
      email: user.email,
      password: user.password
    }).then( response => {
        if (response.data.data.status){
            //Hash the key before storing it in the localstorage
            localStorage.setItem('value',JSON.stringify(response.data.data.token))
            //Hash the key and the value in the localstorage to not make it visible to the user -- TBD later along the project
            localStorage.setItem('user',JSON.stringify(response.data.data.token))
            //navigate('/dashboard', { replace: true });
        }
        return response.data.data
    });
  }
}

export default new AuthService();