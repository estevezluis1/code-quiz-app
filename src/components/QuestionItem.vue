<template>
    <b-card class="shadow-sm rounded mb-4" :title="question">
        <b-form-group class="pl-4">
          <b-form-radio v-for="(option, index) in options" :key="index" v-model="selected" :name="question" :value="option">{{ option }}</b-form-radio>
        </b-form-group>
      </b-card>
</template>

<script>
export default {
    name: 'QuestionItem',
    props: {
        question: String,
        options: Array
    }
}
</script>