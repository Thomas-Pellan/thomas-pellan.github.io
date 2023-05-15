<template>
    <div id="contact-form">
        <ClientTypeStep v-if="display && currentStep === ContactFormSteps.CLIENT_TYPE" @stepValid="nextStep" />
        <ClientInfoStep v-if="display && currentStep === ContactFormSteps.CLIENT_INFO" @stepValid="nextStep" @stepBack="previousStep"/>
        <ClientProjectStep v-if="display && currentStep === ContactFormSteps.PROJECT" @stepValid="sendData" @stepBack="previousStep"/>
        <p v-if="errorMsg" class="m-form-error">
            Erreur : {{errorMsg}}
        </p>
        <p v-if="isValidating" >
            Envoi de vos informations, veuillez patienter...
        </p>
        <div v-else-if="isCompleted" class="m-form-success">
            <p class="m-form-success-msg">
                Merci ! Vos informations ont bien été envoyées, je vous contacterai dans les prochains jours.
            </p>
        </div>
    </div>
</template>
<script>
import ClientTypeStep from './ClientTypeStep.vue'
import ClientInfoStep from './ClientInfoStep.vue'
import ClientProjectStep from './ClientProjectStep.vue'
import {mapStores} from '@nanostores/vue'
import {currentStep, errorMsg, sendContact} from '../../store/contact-form'
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
            isValidating: false,
            isCompleted: false,
        }
    },
    computed: {
        display() {
            return !this.isCompleted && !this.isValidating
        },
        ContactFormSteps() {
            return ContactFormSteps
        }
    },
    methods: {
        nextStep(){
            currentStep.set(currentStep.get() +1)
        },
        previousStep(){
            currentStep.set(currentStep.get() -1)
        },
        async sendData(){
            window.scrollTo(0,0)
            this.isValidating = true
            await sendContact().then((value) => this.isCompleted = value)
            this.isValidating = false
        }
    }
}
</script>