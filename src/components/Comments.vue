<template>
    <div class="comment">
      <span>{{ comment.user.first_name }} {{ comment.user.last_name }}
         => {{ comment.text }}</span>
      <p @click="createReplyFlag">Reply</p>
  
      <div v-if="createReply">
        <form @submit.prevent="createComment(comment.id)">
          <input type="text" v-model="replyText" required>
          <button type="submit">Submit</button>
        </form>
      </div>
  
      <div v-if="comment.replies.length > 0">
        <ul>
          <li v-for="reply in comment.replies" :key="reply.id">
            <comments :comment="reply" :cardId="this.cardId" 
            @create-signal-to-list="handleComment"/>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      comment: Object,
      cardId: Number,
    },
    data() {
      return {
        createReply: false,
        replyText: '',
        userId: '',
      };
    },
    methods: {
      createReplyFlag() {
        this.createReply = !this.createReply;
      },
      async createComment(id){

            await this.getUser();

            await this.makeComment(id);
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
        async makeComment(id){
            const form = {
                replies : {},
                text: this.replyText,
                card: this.cardId,
                parent_comment: id,
                user: this.userId,
                
            }


            await axios.post('trello/comment/', form)
                       .then(response =>{
                            
                        this.handleComment();
                            
                       })
                       .catch(error => {
                                console.log(error);
                        })

                       
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

                            
        },

        handleComment(){
          this.$emit('create-signal-to-list');
        },
    },
  };
  </script>
  
  <style>

    .comment{
      background-color: #004F4F;
      padding: 10px;
      margin-right: 10px;
    }
    .comment > span{
      font-weight: bold;
      color: rgb(170, 192, 192);
    }

    .comment > p{
      font-weight: bold;
    }

    .comment > div > ul {
      list-style-type: circle;
    }

    .comment > div > form > input{
      background-color: #acbaba
    }

    .comment > div > form > button{
        margin-left: 3px;
        border-radius: 20px;
        background-color: #acbaba;
        font-weight: bold;
        font-size: 13px;
        cursor: pointer;
    }

    .comment > div > ul > li > hr {
      border: 0.5px solid black;
    }
  </style>
  