<template>
  <div class="home">
        <div id="title">
            <button @click="goSignUpPage">sign up</button>
            <button @click="goLoginPage">log in</button>
            <transition appear>
              <p>Welcome To Trello</p>
            </transition>
        </div>
        <div>
            <h1>Project management</h1>
            <p>{{ feature1 }}</p>
        </div>
        <div>
            <h1>Meetings and meetings</h1>
            <p>{{ feature2 }}</p>
        </div>
        <div>
            <h1>Onboarding</h1>
            <p>{{ feature3 }}</p>
        </div>
        <div>
            <h1>Task management and task management</h1>
            <p>{{ feature4 }}</p>
        </div>
        <div>
            <h1>Brain storms</h1>
            <p>{{ feature5 }}</p>
        </div>
        <div>
            <h1>Resource hub</h1>
            <p>{{ feature6 }}</p>
        </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
            return {
            feature1: "Keep tasks in order, deadlines on track, and team members aligned with Trello.",
            feature2: "Let your team meetings become more productive, powerful and fun.",
            feature3: "Onboarding with a new company or project is a breeze thanks to Trello’s visual layout of tasks, resources and progress tracking.",
            feature4: "Use Trello to track, manage, complete and bring together tasks, such as the pieces of a puzzle, and make your team’s projects a coherent success every time.",
            feature5: "Give your team’s creativity space and keep ideas visible, suitable for collaboration and performable.",
            feature6: "Save time with a well-designed hub where teams can find information easily and quickly."
        }
    },
  methods:{
    goLoginPage(){
      this.$router.push('/login')
    },
    goSignUpPage(){
      this.$router.push('/first/signup/')
    }
  }
}
</script>

<style>
    #app > .home > #title{
    width: 100vw;
    grid-column: 1/ span 3;
    }

    #app > .home > #title > p{
     text-align: center;
     border-top: none;
     text-transform: uppercase;
     color: black;
     font-size: 40px;
     font-weight: bold;
     padding-bottom: 20px;
    }

    .v-enter-active {
      animation: swirlAdded 2s;
    }

    @keyframes swirlAdded {
    from {
      opacity: 0;
      rotate: 0;
      scale: 0.1;
    }
    to {
      opacity: 1;
      rotate: 360deg;
      scale: 1;
    }
  }
   
    #app > .home > #title > button{
            border-radius: 15px;
            width: 80px;
            height: 40px;
            margin-right: 5px;
            background-color: #acbaba;
            cursor: pointer;
            font-size: 15px;
            font-weight: bold;

    }
    #app > .home > #title > button > a{
      text-decoration: none;
    }
    #app > .home{
    display: grid;
    grid-template-columns: auto auto auto;
    gap:20px;
    padding: 5px;
  }
  #app > .home > div{
    background-color: #333333;
    padding: 20px 0;
   
  }
  #app > .home > div > h1{
    margin-left: 5px;
    font-size: 30px;
    margin-top: -2px;
   
  }
  #app > .home > div > p{
    border-top: solid #008080 2px;
    padding: 10px;
    margin-left: 5px;
    font-size: 18px;
    color: #cccccc
  }

</style>
