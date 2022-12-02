<script  lang="ts">
  import { UserService } from './services/user.service';
  import type { User } from '@/classes/user';

  import RegisterVue from './components/Register.vue';
  import SecurityVue from './components/Security.vue';

  export default {
    data(){
      return {
        user: null as User | null
      }
    },
    setup() {
      const userService: UserService = new UserService();

      return {
        userService,
      };
    },
    created(){
      this.user = this.userService.getUser();
    },
    methods:{
      getUser(user: User){
        this.user = user;
      }
    },
    components:{
      RegisterVue,
      SecurityVue
    }
  };
</script>

<template>
  <header>

    <div class="wrapper">
      <!--optionnalcomponentwellsee-->
    </div>
  </header>

  <main>
    <div class="wrapper" v-if="!user">
      <RegisterVue :userService="userService" @user="getUser"></RegisterVue>
    </div>
    <div class="wrapper" v-else>
      <SecurityVue :user="user"></SecurityVue>
    </div>
  </main>
</template>

<style scoped>

</style>
