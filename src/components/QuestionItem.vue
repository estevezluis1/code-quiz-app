<template>
    <b-card 
    class="shadow-sm rounded mb-4" 
    :class="hasError && question.selectedAnswer === null ? 'border-warning' : `border-${resultStyle}`" 
    :title="questionTitle"

    >
        <b-form-group class="pl-4 mb-0">
          <b-form-radio
          v-for="(option, index) in question.options"
          :key="index"
          v-model="question.selectedAnswer"
          :disabled="disabled"
          :name="question.id"
          :class="{ 'bg-success rounded': disabled && question.answer === index && !isCorrect }"
          :value="index">
            <div :class="{'text-white': disabled && question.answer === index && !isCorrect}">{{ option }}</div>
          
          </b-form-radio>
        </b-form-group>
        <b-row v-show="isCorrect !== null">
          <b-col><p class="text-right my-0 py-0" :class="`text-${resultStyle}`">{{ result }}</p></b-col>
        </b-row>
      </b-card>
</template>

<script>
export default {
    name: 'QuestionItem',
    props: {
        question: Object
    },
    data() {
      return { hasError: false, disabled: false, isCorrect: null, resultStyle: '' }
    },
    created() {
      this.question.error = () => {
        if (this.question.selectedAnswer === null) {
          this.hasError = true
          return
        }
        this.hasError = false
      }

      this.question.showResults = (isCorrect) => {
        if (this.hasError && this.question.selectedAnswer === null) return

        this.disabled = true
        this.isCorrect = isCorrect
        this.resultStyle = isCorrect ? 'success' : 'danger'
      }
    },
    computed: {
      questionTitle () {
            return `${this.question.id + 1}. ${this.question.question}`
      },
      result () {
        if (this.isCorrect === null) return ''
        return this.isCorrect ? 'Correct' : 'Wrong'
      }
    }
}
</script>