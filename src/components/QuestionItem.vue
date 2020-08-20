<template>
  <b-card
    class="shadow-sm border border-bottom rounded mb-4"
    :class="quizHasErrors && selectedAnswer === null ? 'border-warning' : `border-${resultStyle}`">
    
    <span>{{questionTitle}}</span>
  
    <b-card-text v-if="question.snippet" class="pl-4 mb-0 mt-2">
      <pre><code class="code">{{ question.snippet }}</code></pre>
    </b-card-text>

    <b-form-group class="pl-2 mb-0">
      <div 
        class="py-2"
        v-for="(option, index) in question.options"
        :key="index"
        :class="{ 'border-answer': displayCorrectAnswer(index) }">

        <b-form-radio
        :disabled="quizCompleted"
        v-model="selectedAnswer"
        :name="question.question"
        class="ml-3"
        :value="index"
        @change="$emit('question-answer', $event, questionIndex)">
        <div :class="{'text-white': displayCorrectAnswer(index) }">{{ option }}</div>
        </b-form-radio>
      </div>
    </b-form-group>
    <b-row v-show="quizCompleted">
      <b-col>
        <p class="text-right my-0 py-0" :class="`text-${resultStyle}`">{{ result }}</p>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'QuestionItem',
  props: {
    question: Object,
    questionIndex: Number,
    itemDisabled: Boolean,
    correctItem: Object,
    quizHasErrors: Boolean,
    quizCompleted: Boolean
  },
  data() {
    return {
      selectedAnswer: null
    };
  },
  computed: {
    questionTitle() {
      return `${this.questionIndex + 1}. ${this.question.question}`
    },
    result() {
      return this.correctItem.correct ? 'Correct' : 'Wrong'
    },
    resultStyle() {
      if (!this.quizCompleted) {
        return ''
      }

      return this.correctItem.correct ? 'success' : 'danger'
    }
  },
  methods: {
    displayCorrectAnswer(index) {
      return (
        this.quizCompleted &&
        !this.correctItem.correct &&
        this.correctItem.correctAnswer === index
      )
    }
  }
};
</script>


<style>
div.card {
  border-width: medium !important;
}
.code {
  color:#e94e95;
}
.border-warning {
  border-color: #e4e575 !important;
}
.border-answer {
  border: 2px solid #dee2e6 !important; /* border */
  border-color: #343a40 !important; /* border-dark */
  background-color: #28a745 !important; /* bg-success */
  border-radius: .5rem !important; /* rounded */
}
</style>