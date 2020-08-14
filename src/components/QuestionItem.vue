<template>
  <b-card
    class="shadow-sm rounded mb-4"
    :class="quizHasErrors && selectedAnswer === null ? 'border-warning' : `border-${resultStyle}`"
    :title="questionTitle">
    <b-form-group class="pl-4 mb-0">
      <b-form-radio
        v-for="(option, index) in question.options"
        :key="index"
        :disabled="quizCompleted"
        v-model="selectedAnswer"
        :name="question.question"
        :class="{ 'bg-success rounded': displayCorrectAnswer(index) }"
        :value="index"
        @change="$emit('question-answer', $event, questionIndex)"
      >
        <div :class="{'text-white': displayCorrectAnswer(index) }">{{ option }}</div>
      </b-form-radio>
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
  name: "QuestionItem",
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
      return `${this.questionIndex + 1}. ${this.question.question}`;
    },
    result() {
      return this.correctItem.correct ? "Correct" : "Wrong";
    },
    resultStyle() {
      if (!this.quizCompleted) {
        return "";
      }

      return this.correctItem.correct ? "success" : "danger";
    }
  },
  methods: {
    displayCorrectAnswer(index) {
      return (
        this.quizCompleted &&
        !this.correctItem.correct &&
        this.correctItem.correctAnswer === index
      );
    }
  }
};
</script>