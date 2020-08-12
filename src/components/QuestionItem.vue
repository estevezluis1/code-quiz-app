<template>
    <b-card class="shadow-sm rounded mb-4" :class="[ hasError && question.selectedAnswer === null ? 'border-warning' : borderStyle ]" :title="title">
        <b-form-group class="pl-4">
          <b-form-radio
          v-for="(option, index) in question.options"
          :key="index"
          v-model="question.selectedAnswer"
          :disabled="disabled"
          :name="question.question"
          :class="{ 'bg-success rounded': disabled && question.answer === index && !isCorrect }"
          :value="index"><div :class="{'text-white': disabled && question.answer === index && !isCorrect}">{{ option }}</div>
          
          </b-form-radio>
        </b-form-group>
      </b-card>
</template>

<script>
export default {
    name: 'QuestionItem',
    props: {
        title: String,
        question: Object
    },
    data() {
      return { hasError: false, disabled: false, isCorrect: false, borderStyle: '' }
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
        if (isCorrect) {
          this.borderStyle = 'border-success'
          return
        }
        this.borderStyle = 'border-danger'

      }
    }

    
}
</script>