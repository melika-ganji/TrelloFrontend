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
