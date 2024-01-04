<template>
  <router-view/>
</template>

<script>
import axios from 'axios'
 export default{
    name: 'App',
    beforeCreate(){
      this.$store.commit("initializeStore")

      const access = this.$store.state.access

      if(access){
         axios.defaults.headers.common['Authorization'] = "JWT " + access

      }else{
         axios.defaults.headers.common['Authorization'] = ''
      }
    },

    mounted(){
      setInterval(() => {
        this.getAccess()
      },5000)
    },

    methods: {
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


<style lang="scss">
body{
  background-color: #008080;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
