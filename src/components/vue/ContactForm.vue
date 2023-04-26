<template>
    <div id="contact-form">
        etape {{currentStep}}
        <ClientTypeStep v-if="currentStep === ContactFormSteps.CLIENT_TYPE" @stepValid="nextStep" />
        <ClientInfoStep v-if="currentStep === ContactFormSteps.CLIENT_INFO" @stepValid="nextStep" @stepBack="previousStep"/>
        <ClientProjectStep v-if="currentStep === ContactFormSteps.PROJECT" @stepValid="sendData" @stepBack="previousStep"/>
        <p v-if="errorMsg" class="m-form-error">
            Erreur : {{errorMsg}}
        </p>
    </div>
</template>
<script>
import ClientTypeStep from './ClientTypeStep.vue'
import ClientInfoStep from './ClientInfoStep.vue'
import ClientProjectStep from './ClientProjectStep.vue'
import {mapStores} from '@nanostores/vue'
import {currentStep, errorMsg} from '../../store/contact-form'
import {ContactFormSteps} from '../../class/ContactFormSteps'

export default {
    name: 'ContactForm',
    components: {ClientTypeStep, ClientInfoStep, ClientProjectStep},
    setup() {
        return {
            ...mapStores({currentStep, errorMsg})
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
        sendData(){

        }
    }
}
</script>