<template>
    <div class="nlist">
        <button @click="goPreviousPage">Back</button>
        <div class="listContainer">
          <div class="listIconTextContainer">
              <div class="listIconContainer">
                  <img src="@/assets/clipboard.png" alt="listImg">
              </div>
              <div class="listTextContainer">
                  <p>New List</p>
              </div>
          </div>
  
          <div class="listFormContainer">
              <form @submit.prevent="makeList" >
                  <label for="title">
                      <p>Title:</p>
                      <input type="text" v-model="title" required>
                  </label>
                  <label for="boardName">
                      <p>Board:</p>
                        <input type="text" v-model="boardName" />
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
        name: 'NewListView',
        data(){
            return{
                title: '',
                boardId: '',
                boardName: '',
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
        methods:{
            async makeList(){
                    await this.fetchBoardId(this.boardName)

                    await this.createBoard()

            },
            async fetchBoardId(name){
                await axios.get(`/trello/get/board/${name}/`)
                           .then(response =>{
                                console.log(response.data)
                                this.boardId = response.data.id


                           }) 
            },
            async createBoard(){
                const form = {
                     title: this.title,
                     board: this.boardId
                }

                await axios.post(`/trello/create/list/`, form)
                     .then( response => {
                            console.log(response.data)
                        
                            this.$router.push('/board/detail')
                    })
                    .catch(error => {
                        alert("pay attention\nenter board name correctly!!")
                            console.log(error)
                    })

            },
            goPreviousPage(){
                this.$router.push('/board/detail')
            }

        }
    }

</script>

<style>
  
    .nlist{
      display: flex;
      flex-direction: column;
      margin-top: 100px;
    }

    .nlist > button{
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
  
    .listContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .nlist > .listContainer > .listIconTextContainer{
      display: flex;
      align-items: center;
    }
  
    .nlist > .listContainer > .listFormContainer{
      padding: 40px;
      width: 400px;
      height: 300px;
      border: 2px solid #333333;
      font-weight: Bold;
      font-size: 20px;
  
    }
  
    .nlist > .listContainer > .listFormContainer > form > button{
      margin-top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background-color: #acbaba;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  
    .nlist > .listContainer > .listFormContainer > form > label > input{
       width: 300px;
       height: 30px;
       font-size: 20px;
       background-color: #acbaba;
    }

    .nlist > .listContainer > .listIconTextContainer > .listIconContainer > img{
      width: 70px;
      height: 70px;
    }
  
    .nlist > .listContainer > .listIconTextContainer > .listTextContainer{
       font-size: 30px;
       font-weight: bold;
    }
  
  </style>