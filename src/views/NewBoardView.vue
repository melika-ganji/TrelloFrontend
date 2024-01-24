<template>
    <div class="nboard">
        <button @click="goPreviousPage">Back</button>
        <div class="nboardContainer">
          <div class="niconTextContainer">
              <div class="niconContainer">
                  <img src="@/assets/whiteboard.png" alt="boardImg">
              </div>
              <div class="ntextContainer">
                  <p>New Board</p>
              </div>
          </div>
  
          <div class="nformContainer">
              <form @submit.prevent="makeBoard" >
                  <label for="title">
                      <p>Title:</p>
                      <input type="text" v-model="title" required>
                  </label>
                  <label for="users">
                      <p>Users:</p>
                        <input type="textarea" v-model="users" />
                  </label>
                  <button type="submit">Submit</button>
              </form>
          </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'NewBoardView',
        data(){
            return{
                title: '',
                users: '',
                userId: []
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
            async makeBoard(e){

                const list = this.users.split(',')
                for(let user in list){
                    let cleanedUsernames = list[user].replace(/['"]+/g, '');
                    cleanedUsernames = cleanedUsernames.trim()
                    await this.fetchUserId(cleanedUsernames)
                              
                }
                console.log(this.userId, this.title)

                await this.createBoard()
                
                
            },
            async fetchUserId(cleanedUsernames){
                 await axios.get(`trello/user/get/${cleanedUsernames}/`)
                           .then( response => {
                              this.userId.push(response.data.id)
                            })
            },
            async createBoard(){
                const form = {
                     title: this.title,
                     users: this.userId
                }

                await axios.post(`/trello/create/board/`, form)
                     .then( response => {
                            console.log(response.data)
                        
                            this.$router.push('/board/info')
                    })
                    .catch(error => {
                        alert("pay attention\nenter user email and separate them by /',' ")
                            console.log(error)
                    })

            },
            goPreviousPage(){
                this.$router.push('/board/info')
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
  
    .nboard{
      display: flex;
      flex-direction: column;
      margin-top: 100px;
    }

    .nboard > button{
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
  
    .nboardContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .nboard > .nboardContainer > .niconTextContainer{
      display: flex;
      align-items: center;
    }
  
    .nboard > .nboardContainer > .nformContainer{
      padding: 40px;
      width: 400px;
      height: 300px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }
  
    .nboard > .nboardContainer > .nformContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .nboard > .nboardContainer > .nformContainer > form > label > input{
       width: 300px;
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
    }

    .nboard > .nboardContainer > .niconTextContainer > .niconContainer > img{
      width: 70px;
      height: 70px;
    }
  
    .nboard > .nboardContainer > .niconTextContainer > .ntextContainer{
       font-size: 30px;
       font-weight: bold;
    }
  
  </style>