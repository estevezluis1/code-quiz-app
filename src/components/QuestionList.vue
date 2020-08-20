<template>
  <div>
    <div v-show="quizCompleted">
      <b-row>
        <b-col class="h4 text-center">
          <p><u>Results</u></p>
          <span class="mb-0">{{ scoreDetails }}</span>
          <br />
          <span class="font-weight-bold" :class="percentageClass">{{ scorePercentage }}%</span>
        </b-col>
      </b-row>
    </div>
    <QuestionItem
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      :question-index="index"
      :correct-item="itemScore(question, index)"
      @question-answer="updateSelectedAnswer"
      :quiz-has-errors="quizHasErrors"
      :quiz-completed="quizCompleted"
    />

    <b-row>
      <b-col class="text-center">
        <b-button class="border border-dark" @click="submitQuiz" variant="success">Submit</b-button>
        <p class="text-danger mt-3">Answer all questions before submitting. Unanswered questions are displayed in yellow.</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import questions from "../assets/questions.json"
import QuestionItem from "./QuestionItem"

const submittedAnswers = Array(questions.length).fill(null)

export default {
  name: 'QuestionList',
  props: {},
  components: {
    QuestionItem
  },
  created() {},
  data: () => {
    return {
      questions,
      submittedAnswers,
      quizHasErrors: false,
      quizCompleted: false
    };
  },
  computed: {
    correctAnswers() {
      return this.submittedAnswers.filter((answer, index) => {
        return answer === this.questions[index].answer
      }).length
    },
    scoreDetails() {
      return `You got ${this.correctAnswers} of ${questions.length} questions correct`
    },
    scorePercentage() {
      return Math.floor((this.correctAnswers / questions.length) * 100)
    },
    percentageClass() {
      return this.scorePercentage >= 70 ? 'text-success' : 'text-danger'
    }
  },
  methods: {
    itemScore(question, index) {
      const submittedAnswer = this.submittedAnswers[index]
      return {
        correct: question.answer === submittedAnswer,
        correctAnswer: question.answer
      };
    },
    updateSelectedAnswer(answer, index) {
      this.$set(this.submittedAnswers, index, answer)
    },
    submitQuiz() {
      if (this.submittedAnswers.indexOf(null) === -1) {
        this.quizCompleted = true
        this.quizHasErrors = false
        return
      }
      this.quizHasErrors = true
      this.quizCompleted = false
    }
  }
};
</script>