<template>
    <div class="profile">
        <button @click="goPreviousPage">Back</button>
        <div class="profileContainer">
          <div class="iconTextContainer">
              <div class="iconContainer">
                  <img src="@/assets/3994415_account_avatar_person_profile_user_icon.png" alt="profile">
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
                  <div class="nameContainer">
                      <div class="name">
                            <p>Firstname:</p>
                            <div> 
                                <span> {{ firstname }} </span>
                            </div>
                      </div>
                      <div class="name">
                            <p>lastname:</p>
                            <div> 
                                <span> {{ lastname }} </span>
                            </div>
                      </div>
                  </div>
                  <div class="nameContainer">
                      <div class="name">
                            <p>JobTitle:</p>
                            <div> 
                                <span> {{ jobtitle }} </span>
                            </div>
                      </div>
                      <div class="name">
                            <p>Company:</p>
                            <div> 
                                <span> {{ company }} </span>
                            </div>
                      </div>
                  </div>
              
        
        </div>
          </div>
    </div>
</template>

<script>
import axios from "axios"

    export default ({
        name: 'ProfileView',
        data(){
            return{
                username: '',
                firstname: '',
                lastname: '',
                jobtitle: '',
                company: ''
            }
        },
        created(){
            if (!this.$store.state.access) {

                this.$store.dispatch('refresh')
                .then(() => {
                    this.getInfo()
                })
                .catch(error => {
                    console.error('Token refresh failed:', error);
                });
            }
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


                axios.get('/trello/user/profile/')
                    .then( response => {
                        console.log(response)
                        this.firstname = response.data.first_name
                        this.lastname = response.data.last_name
                        this.jobtitle = response.data.jobTitle
                        this.company = response.data.company
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            goPreviousPage(){
                this.$router.push('/board/info')
            }
        }

       
    })
</script>


<style>
  
    .profile{
      display: flex;
      flex-direction: column;
      margin-top: 100px;
    }
  
    .profileContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .profile > button{
        top: 0; 
        left: 0; 
        margin: 10px;
        position: absolute;
        margin-top: 50px;
        width: 100px;
        height: 40px;
        border-radius: 20px;
        background-color: #acbaba;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
    }
  
    .profile> .profileContainer > .iconTextContainer{
      display: flex;
      align-items: center;
    }
  
    .profile > .profileContainer > .formContainer{
      padding: 40px;
      width: 400px;
      height: 300px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }

    .profile > .profileContainer > .formContainer > #username > div{
        border: 2px solid #333333;
        height: 30px;
        background-color: #acbaba;
        display: flex;
        align-items: center;
    }
  
    .profile > .profileContainer > .iconTextContainer > .iconContainer > img{
      width: 50px;
      height: 50px;
    }
  
    .profile > .profileContainer > .iconTextContainer > .textContainer{
       font-size: 30px;
       font-weight: bold;
    }

    .profile > .profileContainer > .formContainer > .nameContainer {
        display: flex;
    }
    
    .profile > .profileContainer > .formContainer > .nameContainer > div{
        margin-right: 80px;
    }

    .profile > .profileContainer > .formContainer > .nameContainer > .name > div {
        border: 2px solid #333333;
        height: 30px;
        background-color: #acbaba;
    }

    .profile > .profileContainer > .formContainer > .nameContainer > .name > div{
        border: 2px solid #333333;
        height: 30px;
        background-color: #acbaba;
        width: 170px;
        display: flex;
        align-items: center;
    }

</style>
