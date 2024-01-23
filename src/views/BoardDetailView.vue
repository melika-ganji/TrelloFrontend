<template>
    <div class="detail">
        <div>
            <button @click="goPreviousPage">Back</button>
            <button @click="goProfilePage" >Profile</button>
            <button @click="newList" class="new">New List</button>
            <button @click="newCard" class="new">New Card</button>
        </div>


        <ul>
            <div v-if="details">
                <li v-for="detail in details"  :key="detail.id">
                    <span id="title"> {{ detail.title }} </span>
                    <br>
                    <br>
                    <span><strong>Admin:</strong>  {{ detail.admin.first_name }} {{ detail.admin.last_name }} </span>
                    <ul v-for="user in detail.users" :key="user.id" >
                        <li> 
                            <span> {{ user.first_name }} {{ user.last_name }} </span> 
                        </li>
                    </ul>
        
                    <ul v-if="detail.lists.length > 0" class="list">
                        <div>
                            
                            <span>Lists:</span>
                            
                            <li v-for="list in detail.lists" :key="list.id">
                                <span id="title">Subject: {{ list.title }} </span>    
                                
                                <ul v-if="list.cards.length > 0" class="card">
                                    <div>
                                        <p>Cards:</p><br>
                                        <li v-for="card in list.cards" :key="card.id">
                                            <div>
                                                <button v-if="show[card.id]" @click="toggleComments(card.id)">close</button>
                                                <button v-if="!show[card.id]" @click="toggleComments(card.id)">Comments</button><br>
                                                <span id="title">Task: {{ card.title }} </span>
                                                <img v-if="card.is_finished"   src="@/assets/5957003_accept_check_mark_ok_tick_icon.png"  alt="checkIcon">
                                                <img v-if="!card.is_finished && checkDeadLine" src="@/assets/icons8-no-50.png" alt="checkIcon">
                                                <br><br>
                                                <span v-if="checkDeadLine(card.deadline)" id="deadline">The deadline is over</span>
                                            </div><br>
                                            <span id="user">Assigned to: {{ card.users.first_name }} {{ card.users.last_name }}</span><br><br>
                                            <span id="span1">Deadline:</span><br>
                                            <span id="span2"> {{ card.deadline }} </span>
                                            <parent-comment v-if="show[card.id]" :cardId="card.id" @create-signal-to-board="handleCommentCreated"/>
                                                
                                             
                                        </li>
                                    </div>
                                </ul>
                            
                            </li>
                        </div>
                    </ul>        
                </li>
            </div>
        </ul>
    </div>       

</template>

<script>
    import axios from "axios"
    import ParentComment from '@/components/ParentComment.vue';

    export default{
        name: 'BoardDetailView',
        components: {
            ParentComment,
        },
        data(){
            return{
                details: [],
                show: {},
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
            this.getDetailBoard()
        },
        methods:{
            getDetailBoard(e){
                
                axios.get('trello/board/detail/')
                     .then( response => {
                        console.log(response.data)
                        this.details = response.data
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })

            },
            goProfilePage(){
                this.$router.push('/profile')
            },
            goPreviousPage(){
                this.$router.push('/board/info')
            },
            newList(){
                this.$router.push('/new/list')
            },
            newCard(){
                this.$router.push('/new/card')
            },
            handleCommentCreated(){
                console.log("work!");
                window.location.reload();
            },
            checkDeadLine(deadLine){
                const now = new Date();
                const deadline = new Date(deadLine);

                if (now > deadline) {
                    return true;
                }
            },
            toggleComments(cardId) {
                this.show[cardId] = !this.show[cardId]


            },
            }

        }
            
    
</script>

<style>

    .detail{
        display: flex;
        flex-direction: column;
    }

    .detail > div > button{
        
        width: 80px;
        height: 40px;
        border-radius: 10px;
        background-color: #acbaba;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        order: -1;
        margin-right: 10px;
        margin-bottom: 50px;
        
    }

    .detail > div > .new{
        
        width: 100px;
        height: 40px;
        border-radius: 10px;
        background-color: #acbaba;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        order: -1;
        margin-right: 10px;
    }


    .detail > ul > div {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin-left: 20px;
        

    }

    .detail > ul > div >li{
        padding-top: 10px;
        border: 5px solid #333333;
        margin-top: 10px;
        margin-right: 30px;
        width: 800px;
        height: max-content;
        background-color: #7c9191;
        
    }

    .detail > ul > div >li > #title{
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 10px;
        margin-left: 20px;
    }

    .detail > ul > div >li > span{
        margin-left: 30px;
        font-size: 20px;

    }

    .detail > ul > div > li > ul > li{
        list-style-type: square;
        margin-left: 10px;
    }

    .detail > ul > div > li > ul > li > span{
        font-size: 20px;
    }

    .detail > ul > div > li > .list{
        list-style-type: none;
        margin-top: 20px;
        
    }

    .detail > ul > div > li > .list > div{
        display: flex;
        flex-direction: column;
    }

    .detail > ul > div > li > .list > div > span{
        font-weight: bold;
        font-size: 20px;
        margin-right: 10px;
    }


    .detail > ul > div > li > .list > div > li{
        width: max-width;
        height: max-content;
        margin-bottom: 10px;
        margin-right: 10px;
        padding-left: 5px;
        padding-top: 5px;
        border: 3px solid #333333;
    }

    .detail > ul > div > li > .list > div > li > span{
        font-size: 20px;
        font-weight: bold;
    }


    .detail > ul > div > li > .list > div > li > .card{
        list-style-type: none;
    }

    .detail > ul > div > li > .list > div > li > .card > div {
        display: grid;
        justify-content: space-around;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

    }


    .detail > ul > div > li > .list > div > li > .card > div > p {
        font-weight: bold;
        font-size: 20px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li{
        width: max-width;
        height: max-content;
        margin-bottom: 10px;
        padding-left: 5px;
        padding-top: 5px;
        border: 3px solid #333333;
        margin-right: 10px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li > div > span {
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li > div > button{
        width: 100px;
        height: 40px;
        border-radius: 10px;
        background-color: #c5d5d5;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        order: -1;
        margin-right: 10px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li > div > #deadline {
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
        color: #ad1010;
    }


    .detail > ul > div > li > .list > div > li > .card > div > li > div > img {
        width: 30px;
        height: 30px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li > #span1{
        font-size: 18px;
    }
    .detail > ul > div > li > .list > div > li > .card > div > li > #span2{
        font-size: 15px;
    }

    .detail > ul > div > li > .list > div > li > .card > div > li > #user{
        font-size: 18px;
    }

</style>