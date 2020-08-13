<template>
  <div id="app">
    <Nav/>
    <b-container>
      <h2 class="display-4">Quiz 1 - HTML / CSS / JS Practice</h2>
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
