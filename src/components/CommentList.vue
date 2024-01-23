<template>
    <div>
      <comments v-for="comment in comments" :key="comment.id" 
      :comment="comment" :cardId="this.cardId"  
      @create-signal-to-list="passToParent"/>
    </div>
  </template>
  
  <script>
  import Comments from '@/components/Comments.vue';
  
  export default {
    components: {
      Comments,
    },
    props: {
      comments: Array,
      cardId: Number
    },
    methods:{
        passToParent(){
            this.$emit('create-signal-to-parent');
        }
    }

  };
  </script>
  