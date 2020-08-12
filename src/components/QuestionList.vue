<template>
    <div>
        <QuestionItem
         v-for="(question, index) in questions" 
         :key="index" 
         :question="question.question" 
         :options="question.options"
        />
    </div>
</template>

<script>
import questions from '../assets/questions.json';
import QuestionItem from './QuestionItem';

export default {
    name: 'QuestionList',
    props: {},
    components: {
        QuestionItem
    },
    data: () => {
        return { questions };
    },
    methods: {
        questionTitle (question, index) {
            return `${index + 1}. ${question}`;
        }
    }
}
</script>