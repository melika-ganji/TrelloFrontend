<template>
    <div class="signup">
       <div class="signupContainer">
          <div class="iconTextContainer">
              <div class="iconContainer">
                  <img src="@/assets/add-user.png" alt="loginImg">
              </div>
              <div class="textContainer">
                  <p>Trello</p>
              </div>
          </div>
  
          <div class="formContainer">
              <div id="username">
                    <p>Email:</p>
                    <div> 
                        <span :src="username"> {{ username }} </span>
                    </div>
              </div>
              <form>
                  <div class="nameContainer">
                      <label for="firstname">
                            <p>Firstname:</p>
                            <input type="text" v-model="first_name">
                      </label>
                      <label for="lastname">
                            <p>Lastname:</p>
                            <input type="text" v-model="last_name">
                      </label>
                  </div>
                  <div class="nameContainer">
                      <label class="name" for="jobtitle">
                            <p>Job Title:</p>
                            <input type="text" v-model="jobTitle">
                      </label>
                      <label class="name" for="company">
                            <p>Company:</p>
                            <input type="text" v-model="company">
                      </label> 
                 </div>
                 <br>
                  <button @click.prevent="signup2">Submit</button>
              </form>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  
  export default {
    name: 'SecondSignUpView',
    data(){
      return{
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        jobTitle: '',
        company: '',
      };
    },
    mounted(){
        this.getInfo()
    },
    methods: {
        getInfo(e){
            axios.get('/api/token/users/me/')
                     .then(response => {
                        console.log(response)
                        this.username = response.data.username
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
        signup2(e){

          const form = {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            jobTitle: this.jobTitle,
            company: this.company
          }

          

          axios.post('/trello/user/profile/', form)
                .then(response => {
                    console.log(response)

                })
                .catch(error => {
                  alert("please fill correct answer!")
                  console.log(error)
                })

                this.$router.push('/board/info')
           
        }
    }
  }
  </script>
  
  <style>
  
    .signup{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    }
  
    .signupContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .signup > .signupContainer > .iconTextContainer{
      display: flex;
      align-items: center;
    }

    .signup > .signupContainer > .formContainer > #username > div{
        border: 2px solid #333333;
        height: 30px;
        background-color: #acbaba;
        width: 470px;
    }
  
    .signup > .signupContainer > .formContainer{
      padding: 40px;
      width: 500px;
      height: 400px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }
  
    .signup > .signupContainer > .formContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .signup > .signupContainer > .formContainer > form > label > input{
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
       border: 2px solid #333333;

    }

    .signup > .signupContainer > .formContainer > form > div > label > input{
       height: 30px;
       font-size: 20px;
       border: 2px solid #333333;
    }
  
    .signup > .signupContainer > .iconTextContainer > .iconContainer > img{
      width: 50px;
      height: 50px;
    }
  
    .signup > .signupContainer > .iconTextContainer > .textContainer{
       font-size: 30px;
       font-weight: bold;
    }


    .signup > .signupContainer > .formContainer > form > #name > input{
       width: 300px;
    }
    
    .signup > .signupContainer > .formContainer > form > .nameContainer > label > input{
        width: 180px;
        background-color: #acbaba;
    }

    .signup > .signupContainer > .formContainer > form > .nameContainer{
        display: flex;
    }

    .signup > .signupContainer > .formContainer > form > .nameContainer > label{
        margin-right: 100px;
    }
  
  </style>
  
  
  