<template>
    <div class="board">
        <div>
            <button @click="goPreviousPage">Home</button>
            <button @click="goProfilePage" >Profile</button>
            <button @click="goBoardDetailPage" >Details</button>
            <button @click="newBoard" >New</button>
        </div>
        <ul>
            <div v-if="boards">
                <li v-for="board in boards"  :key="board.id">
                    <span id="title"> {{ board.title }} </span>
                    <br>
                    <br>
                    <span><strong>Admin:</strong>  {{ board.admin.first_name }} {{ board.admin.last_name }} </span>
                    <ul v-for="user in board.users" :key="user.id" >
                        <li> 
                            <span> {{ user.first_name }} {{ user.last_name }} </span> 
                        </li>
                    </ul>
                </li>
            </div>
        </ul>
    </div>

</template>

<script>
    import axios from "axios"
    export default{
        name: 'BoardInfoView',
        data(){
            return{
                boards: [],
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
            this.getBoard()
        },
        methods:{
            getBoard(e){
                
                axios.get('trello/board/')
                     .then( response => {
                        console.log(response.data)
                        this.boards = response.data
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })

            },
            newBoard(){
                this.$router.push('/new/board')
            },
            goProfilePage(){
                this.$router.push('/profile')
            },
            goBoardDetailPage(){
                this.$router.push('/board/detail')
            },
            goPreviousPage(){
                this.$router.push('/')
            }

        }
            
    }
</script>

<style>

    .board{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-x: auto;
        width: max-content;
        
    }

    .board > div > button{
        
        width: 80px;
        height: 40px;
        border-radius: 10px;
        background-color: #acbaba;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        order: -1;
        margin-right: 10px;
        cursor: pointer;
    }

    .board > ul{
        margin-top: 100px;
    }

    .board > ul > div {
        display: flex;
        list-style-type: none;
        margin-left: 20px;
        margin-top: 50px;
        white-space: nowrap;
        

    }

    .board > ul > div >li{
        padding-top: 10px;
        border: 5px solid #333333;
        margin-top: 10px;
        margin-right: 30px;
        width: 250px;
        height: 300px;
        background-color: #7c9191;
        
    }

    .board > ul > div >li > #title{
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 10px;
        margin-left: 20px;
    }

    .board > ul > div >li > span{
        margin-left: 30px;
        font-size: 20px;

    }

    .board > ul > div > li > ul > li{
        list-style-type: square;
        margin-left: 10px;
    }

    .board > ul > div > li > ul > li > span{
        font-size: 20px;
    }

</style>