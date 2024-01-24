<template>
    <div class="ncard">
        <button @click="goPreviousPage">Back</button>
        <div class="cardContainer">
          <div class="cardIconTextContainer">
              <div class="cardIconContainer">
                  <img src="@/assets/icons8-list-50.png" alt="cardImg">
              </div>
              <div class="cardTextContainer">
                  <p>New Card</p>
              </div>
          </div>
  
          <div class="cardFormContainer">
              <form @submit.prevent="makeCard" >
                  <label for="title">
                      <p>Title:</p>
                      <input type="text" v-model="title" required/>
                  </label>
                  <label for="list">
                      <p>List:</p>
                        <input type="text" v-model="listName" required/>
                  </label>
                  <label for="listname">
                      <p>User:</p>
                      <input type="text" v-model="userName" required/>
                  </label>
                  <label for="deadLine">
                      <p>DeadLine:</p>
                      <input type="datetime-local" v-model="deadLine" required/>
                  </label>
                  <label for="tag">
                      <p>Tag:</p>
                      <input type="text" v-model="tag" required/>
                  </label>
                  <br>
                  <button type="submit">Submit</button>
              </form>
          </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'NewCardView',
        data(){
            return{
                title: '',
                listId: '',
                listName: '',
                userName: '',
                userId: '',
                deadLine: '',
                tag: '',
            }
        },
        created(){
            if (!this.$store.state.access) {

                this.$store.dispatch('refresh')
                .then(() => {
                    this.getBoard()
                })
                .catch(error => {
                    console.error('Token refresh failed:', error);
                });
            }
            
        },
        mounted(){
            setInterval(() => {
               this.getAccess()
            },5000)
        },
        methods:{
            async makeCard(){
                    await this.fetchListId(this.listName)

                    await this.fetchUserId(this.userName)

                    await this.createCard()

            },
            async fetchListId(name){
                await axios.get(`/trello/get/list/${name}/`)
                           .then(response =>{
                                console.log("listId",response.data)
                                this.listId = response.data.id


                           }) 
            },
            async fetchUserId(username){
                 await axios.get(`trello/user/get/${username}/`)
                           .then( response => {
                                console.log("userId", response.data)
                                this.userId = response.data.id
                            })
            },

            async createCard(){
                const form = {
                     title: this.title,
                     list: this.listId,
                     users: this.userId,
                     deadline: this.deadLine,
                     tag: this.tag
                }

                console.log("form", form)

                await axios.post(`/trello/create/card/`, form)
                     .then( response => {
                            console.log("form",response.data)
                        
                            this.$router.push('/board/detail')
                    })
                    .catch(error => {
                        alert("pay attention\nenter list name and username correctly!!")
                            console.log(error)
                    })

            },
            goPreviousPage(){
                this.$router.push('/board/detail')
            },
            getAccess(e){
                const accessdata = {
                    refresh: this.$store.state.refresh
                }

                axios 
                    .post('/api/token/jwt/refresh/', accessdata)
                    .then(response => {
                            const access = response.data.access

                            localStorage.setItem("access", access)
                            this.$store.commit("setAccess", access)
                    })
                    .catch(error => {
                            console.log(error)
                    })
            }

        }
    }

</script>

<style>
  
    .ncard{
      display: flex;
      flex-direction: column;
      margin-top: 100px;
    }

    .ncard > button{
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
  
    .cardContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .ncard > .cardContainer > .cardIconTextContainer{
      display: flex;
      align-items: center;
    }
  
    .ncard > .cardContainer > .cardFormContainer{
      padding: 40px;
      width: 400px;
      height: 600px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }
  
    .ncard > .cardContainer > .cardFormContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .ncard > .cardContainer > .cardFormContainer > form > label > input{
       width: 300px;
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
    }

    .ncard > .cardContainer > .cardIconTextContainer > .cardIconContainer > img{
      width: 70px;
      height: 70px;
    }
  
    .ncard > .cardContainer > .cardIconTextContainer > .cardTextContainer{
       font-size: 30px;
       font-weight: bold;
       margin-left: 20px;
    }
  
  </style>