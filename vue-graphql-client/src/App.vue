<template>
  <div id="app">   
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { GraphQLClientService } from './services/graphql-client-service';
@Component({})
export default class App extends Vue {
  @Provide('graphQLClientService')
  public graphQLClientService: GraphQLClientService = new GraphQLClientService();
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
