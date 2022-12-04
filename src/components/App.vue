<script lang="ts">
  import { UserService } from '../services/user.service';
  import type { User } from '@/classes/user';

  import type { Subscription } from 'rxjs';

  import RegisterVue from './Register.vue';
  import SecurityVue from './Security.vue';

  export default {
    data(){
      return {
        user: null as User | null,
        userSubscription: null as Subscription | null
      }
    },
    setup() {
      const userService: UserService = new UserService();

      return {
        userService,
      };
    },
    created(){
      this.userSubscription = this.userService.listen().subscribe((user: User | null) => {
        this.user = user;
      });
      this.userService.getLocalStorageUser();
    },
    unmounted(){
      this.userSubscription?.unsubscribe();
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
      <RegisterVue :userService="userService"></RegisterVue>
    </div>
    <div class="wrapper" v-else>
      <SecurityVue :userService="userService"></SecurityVue>
    </div>
  </main>
</template>

<style scoped>

</style>
