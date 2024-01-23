<template>
    <div>
      <button id="newcomment" @click="createParentcommentFlag">New Comment</button>
        <div v-if="createP">
            <form @submit.prevent="createParentComment">
            <input  type="text" v-model="text" required>
            <button type="submit">Submit</button>
          </form>
        </div>

      <comment-list :comments="comments" :cardId="this.cardId" 
      @create-signal-to-parent="passToBoard" />
    </div>
  </template>
  
  <script>
  import CommentList from '@/components/CommentList.vue';
  import axios from 'axios';
  
  export default {
    components: {
      CommentList,
    },
    props: [
        'cardId',
    ],
    data() {
      return {
        comments: [],
        createP: false,
        text: '',
        userId: '',
      };
    },
    mounted() {
        this.showComment();
    },
    methods:{
        showComment(){
             axios.get(`/trello/comment/${this.cardId}/`)
                .then(response =>{
                    this.comments = response.data
                })

        },
        passToBoard(){
            this.$emit('create-signal-to-board');
        },
        async createParentComment(){
            await this.getUser();

            const form = {
                replies : {},
                text: this.text,
                card: this.cardId,
                parent_comment: null,
                user: this.userId,
                
            }

            console.log("form:", form)

            await axios.post('trello/comment/', form)
                       .then(response =>{

                            this.$emit('create-signal-to-board');
                       })

                       
        },
        createParentcommentFlag(){
            this.createP = ! this.createP
        },
        async getUser(){

            try{
              const response = await axios.get('/api/token/users/me/')
              const name = response.data.username

              this.userId = await this.fetchId(name)


            }catch (error) {
                console.error(error);
            }

        },
        async fetchId(name){
                return axios.get(`trello/user/get/${name}/`)
                           .then( response => {
                              return response.data.id
                              console.log("id:",this.userId)
                            })
                            .catch(error => {
                                console.log(error);
                            })

                            
        }
    }
  };
  </script>


<style>

  #newcomment{
    margin-top: 20px;
    margin-left: 3px;
    border-radius: 20px;
    width: 80px;
    height: 40px;
    background-color: #acbaba;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
  }

  div > form {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  div > form > input{
    background-color: #acbaba
  }

  div > form > button{
        margin-left: 3px;
        border-radius: 20px;
        background-color: #acbaba;
        font-weight: bold;
        font-size: 13px;
        cursor: pointer;
  }
</style>
  
  