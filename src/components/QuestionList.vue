<template>
    <div>
        <div v-show="score !== null">
            <b-row>
                <b-col class="text-center">
                    <p class="lead"><u>Results</u></p>
                    <p class="mb-0">{{ scoreDetails }}</p>
                    <p class="font-weight-bold" :class="score >= 70 ? 'text-success' : 'text-danger'">{{ scorePercentage }}</p>
                </b-col>
            </b-row>
        </div>
        <QuestionItem
         v-for="question in questions" 
         :key="question.id"
         :question="question"
         
        />

    <b-row>
        <b-col class="text-center">
            <b-button @click="submitQuiz" :disabled="score !== null" variant="success">Submit</b-button>
            <p class="text-danger">Answer all questions before submitting. Unanswered questions are displayed in yellow.</p>
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
        questions.map((question, i) => {
            question.id = i;
            question.selectedAnswer = null
        })
        return {
            questions,
            answersCorrect: 0,
            score: null
        }
    },
    computed: {
        scoreDetails() {
            return `You got ${this.answersCorrect} of ${questions.length} correct`
        },
        scorePercentage() {
            return `${Math.floor((this.answersCorrect / questions.length) * 100)}%`
        }
    },
    methods: {
        submitQuiz() {
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
        }
    }
}
</script>