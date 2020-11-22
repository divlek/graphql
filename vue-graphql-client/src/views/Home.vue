<template>
  <div class="home">
    <img alt="Graphql logo" src="../assets/graphql.png" />
    <DemoTitle msg="Graphql client demo" />
    <Demo />
  </div>
</template>

<script>
// @ is an alias to /src
import Demo from '@/components/Demo/Demo.vue';
import DemoTitle from '@/components/DemoTitle.vue';

export default {
  name: 'Home',
  components: {
    Demo,
    DemoTitle
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 120px;
}
</style>
