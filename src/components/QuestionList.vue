<template>
    <div>
        <div v-show="score !== null">
            <b-row>
                <b-col class="text-center">
                    <p class="lead">Results</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
                    {{ scoreDetails() }}
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center" :class="[ score >= 70 ? 'text-success' : 'text-danger' ]">
                    {{ scorePercentage() }}
                </b-col>
            </b-row>
        </div>
        <QuestionItem
         v-for="(question, index) in questions" 
         :key="index"
         :ref="index"
         :question="question"
         :title="questionTitle(question.question, index)"
         
        />

    <b-row>
        <b-col class="text-center">
            <b-button @click="submitQuiz" :disabled="score !== null" variant="success">Submit</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col class="text-center text-danger">
            Answer all questions before submitting. Unanswered questions are displayed in yellow.
        </b-col>
    </b-row>
    </div>
</template>

<script>
import questions from '../assets/questions.json'
import QuestionItem from './QuestionItem'

export default {
    name: 'QuestionList',
    props: {},
    components: {
        QuestionItem
    },
    data: () => {
        questions.map((question) => {
            question.selectedAnswer = null
        })
        return {
            questions,
            answersCorrect: 0,
            score: null
        }
    },
    methods: {
        questionTitle (question, index) {
            return `${index + 1}. ${question}`
        },
        submitQuiz () {
            let quizCompleted = true

            for (let i = 0; i < questions.length; i++) {
                if (questions[i].selectedAnswer === null) {
                    questions[i].error()
                    quizCompleted = false
                }
            }
            if (quizCompleted) {

                for (let i = 0; i < questions.length; i++) {
                    const isCorrect = questions[i].selectedAnswer === questions[i].answer
                    questions[i].showResults(isCorrect)

                    if (isCorrect) {
                        this.answersCorrect++
                    }
                }

                this.score = Math.floor((this.answersCorrect / questions.length) * 100)
            }
        },
        scoreDetails() {
            return `You got ${this.answersCorrect} of ${questions.length} correct`
        },
        scorePercentage() {
            return `${Math.floor((this.answersCorrect / questions.length) * 100)}%`
        }
    }
}
</script>