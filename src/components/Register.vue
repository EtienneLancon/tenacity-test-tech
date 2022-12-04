<script lang="ts">
    export default {
        props: ['userService'],
        data() {
            return {
                mail: "",
                login: "",
            };
        },
        methods:{
            connect(){
                this.userService.connect(this.login, this.mail);
            }
        }
    }
</script>

<template>
    <div id="loginform">
  
      <form @submit.prevent="connect">
        <label>
          Login
          <input type="text" v-model="login"/>
        </label>
        <label>
          Mail
          <input type="email" v-model="mail"/>
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
</template>

<style scoped>
    #loginform {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>