<template>
    <div class="login">
       <div class="loginContainer">
          <div class="iconTextContainer">
              <div class="iconContainer">
                  <img src="@/assets/login.png" alt="loginImg">
              </div>
              <div class="textContainer">
                  <p>Trello</p>
              </div>
          </div>
  
          <div class="formContainer">
              <form @submit.prevent="login">
                  <label for="email">
                      <p>Email:</p>
                      <input type="email" v-model="username" required>
                  </label>
                  <label for="password">
                      <p>Password:</p>
                      <input type="password" v-model="password" required>
                  </label><br>
                  <button type="submit">Submit</button>
              </form>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'LoginView',
    data(){
      return{
        username: '',
        password: '',
      };
    },
    methods: {
        login(e){
          axios.defaults.headers.common['Authorization'] = ''
          localStorage.removeItem("access")

          const form = {
            username: this.username,
            password: this.password,
          }

          axios
                .post('/api/token/jwt/create/', form)
                .then(response => {
                    console.log(response)
                    
                    const access = response.data.access
                    const refresh = response.data.refresh


                    this.$store.commit("setAccess", access)
                    this.$store.commit("setRefresh", refresh)

                    axios.defaults.headers.common['Authorization'] = "JWT " + access

                    localStorage.setItem("access", access)
                    localStorage.setItem("refresh", refresh)

                    this.$router.push("/board/info")
                })
                .catch(error => {
                  alert("email or password is not correct!")
                  console.log(error)
                })
           
        }
    }
  }
  </script>
  
  <style>
  
    .login{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    }
  
    .loginContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .login > .loginContainer > .iconTextContainer{
      display: flex;
      align-items: center;
    }
  
    .login > .loginContainer > .formContainer{
      padding: 40px;
      width: 400px;
      height: 300px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }
  
    .login > .loginContainer > .formContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .login > .loginContainer > .formContainer > form > label > input{
       width: 300px;
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
    }
  
    .login > .loginContainer > .iconTextContainer > .iconContainer > img{
      width: 50px;
      height: 50px;
    }
  
    .login > .loginContainer > .iconTextContainer > .textContainer{
       font-size: 30px;
       font-weight: bold;
    }
  
  </style>
  
  
  