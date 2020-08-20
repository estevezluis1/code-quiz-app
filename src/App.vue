<template>
  <div id="app">
    <Nav/>
    <b-container>
      <h1 class="my-3">Quiz 1 - HTML / CSS / JS Practice</h1>
      <QuestionsList />
    </b-container>
  </div>
</template>

<script>
import Nav from './components/Nav';
import QuestionsList from './components/QuestionList';

export default {
  name: 'App',
  components: {
    Nav,
    QuestionsList
  }
}
</script>

<style>
body {
  background-color: #f4f6f8;
}
</style>
