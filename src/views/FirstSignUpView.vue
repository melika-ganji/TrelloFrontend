<template>
    <div class="fsignup">
       <div class="fsignupContainer">
          <div class="ficonTextContainer">
              <div class="ficonContainer">
                  <img src="@/assets/add-user.png" alt="loginImg">
              </div>
              <div class="ftextContainer">
                  <p>Trello</p>
              </div>
          </div>
  
          <div class="fformContainer">
              <form @submit.prevent="signup1">
                  <label id="email" for="email">
                      <p>Email:</p>
                      <input type="email" v-model="username" required>
                  </label>
                  <label id="password" for="password">
                      <p>Password:</p>
                      <input type="password" v-model="password" required>
                  </label>
                 <br>
                  <button type="submit">Submit</button>
              </form>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  
  export default {
    name: 'FirstSignUpView',
    data(){
      return{
        username: '',
        password: '',
      };
    },
    methods: {
        signup1(e){

          const form = {
            username: this.username,
            password: this.password,
          }


          axios.post('/trello/user/create/', form)
                .then(response1 => {
                        console.log(response1)
                        axios.post('/api/token/jwt/create/', form)
                            .then(response2 => {
                                    console.log(response2)
                                
                                    const access = response2.data.access
                                    const refresh = response2.data.refresh


                                    this.$store.commit("setAccess", access)
                                    this.$store.commit("setRefresh", refresh)

                                    axios.defaults.headers.common['Authorization'] = "JWT " + access

                                    localStorage.setItem("access", access)
                                    localStorage.setItem("refresh", refresh)

                            this.$router.push('/second/signup')
                        })
                        .catch(error => {
                          console.log(error)
                        })     
                    
                })
                .catch(error => {
                  alert("password must conatin digits, letter, and symbol")
                  console.log(error)
                }) 
        }
    }
  }
  </script>
  
  <style>
  
    .fsignup{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    }
  
    .fsignupContainer {
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    .fsignup > .fsignupContainer > .fformContainer{
      padding: 40px;
      width: 500px;
      height: 600px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
    }

  
    .fsignup > .fsignupContainer > .ficonTextContainer{
      display: flex;
      align-items: center;
    }
    
    .fsignup > .fsignupContainer > .fformContainer{
        height: 300px;
    }
  
    .fsignup > .fsignupContainer > .fformContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .fsignup > .fsignupContainer > .fformContainer > form > label > input{
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
    }

    .fsignup > .fsignupContainer > .fformContainer > form > div > label > input{
       height: 30px;
       font-size: 20px;
    }
  
    .fsignup > .fsignupContainer > .ficonTextContainer > .ficonContainer > img{
      width: 50px;
      height: 50px;
    }
  
    .fsignup > .fsignupContainer > .ficonTextContainer > .ftextContainer{
       font-size: 30px;
       font-weight: bold;
    }

    .fsignup > .fsignupContainer > .fformContainer > form > #email > input{
       width: 400px;
    }

    .fsignup > .fsignupContainer > .fformContainer > form > #password > input{
       width: 300px;
    }
    
  
  </style>
  
  
  