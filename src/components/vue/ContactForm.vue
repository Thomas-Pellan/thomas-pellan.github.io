<template>
    <div id="contact-form">
        <ClientTypeStep v-if="isCurrentStep(ContactFormSteps.CLIENT_TYPE)" @stepValid="nextStep" />
        <ClientInfoStep v-if="isCurrentStep(ContactFormSteps.CLIENT_INFO)" @stepValid="nextStep" @stepBack="previousStep"/>
        <ClientProjectStep v-if="isCurrentStep(ContactFormSteps.PROJECT)" @stepValid="sendData" @stepBack="previousStep"/>
    </div>
</template>
<script>
import ClientTypeStep from './ClientTypeStep.vue'
import ClientInfoStep from './ClientInfoStep.vue'
import ClientProjectStep from './ClientProjectStep.vue'
import {mapStores} from '@nanostores/vue'
import {currentStep} from '../../store/contact-form'
import {ContactFormSteps} from '../../class/ContactFormSteps'

export default {
    name: 'ContactForm',
    components: {ClientTypeStep, ClientInfoStep, ClientProjectStep},
    setup() {
        return {
            ...mapStores({currentStep})
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ContactFormSteps() {
            return ContactFormSteps
        }
    },
    created() {

    },
    methods: {
        nextStep(){
            currentStep.set(currentStep.get() +1)
        },
        previousStep(){
            currentStep.set(currentStep.get() -1)
        },
        isCurrentStep(value){
            return currentStep.get() === value
        },
        sendData(){

        }
    }
}
</script>