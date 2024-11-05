<template>
    <form @submit="validate" class="m-form">
        <p class="m-form-title">
            Votre projet :
        </p>
        <div class="m-form-checkbox">
            <input
                type="radio"
                name="buying"
                id="buying"
                v-model="serviceChoice"
                value="buying"
            />
            <label for="buying">Je suis intéréssé par une prestation</label>
        </div>
        <div class="m-form-checkbox">
            <input
                type="radio"
                name="other"
                id="other"
                v-model="serviceChoice"
                value="other"
            />
            <label for="other">J'ai une autre demande</label>
        </div>
        <p v-if="serviceChoice === 'buying'" class="m-form-title">
            Par quelle(s) prestation(s) etes vous intéréssés :
        </p>
        <div v-if="serviceChoice === 'buying'">
            <div v-for="(service, index) in serviceList" :key="index" class="m-form-checkbox">
                <input
                    type="checkbox"
                    :name="`service-${index}`"
                    :id="`service-${index}`"
                    v-model="servicesSelected"
                    :value="service"
                />
                <label :for="`service-${index}`">
                    {{service}}
                </label>
            </div>
        </div>
        <div v-if="serviceChoice" class="m-form-field">
            <label for="otherText" class="m-form-title">
                <span v-if="isOtherDemand">
                    Ecrivez moi un message *
                </span>
                <span v-else>
                    Commentaire ou question
                </span>
                <small>({{comment.length}}/500 caractères)</small>
            </label>
            <textarea
                name="otherText"
                id="otherText"
                rows="5"
                cols="50"
                v-model="comment"
                :required="isOtherDemand"
                maxlength="500"
            />
        </div>
        <div>
            <button type="button" @click="validate" v-if="serviceChoice">
                Sauvegarder et Envoyer
            </button>
            <button type="button" @click="handleBack">
                Retour
            </button>
        </div>
    </form>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {project, errorMsg} from '../../store/contact-form'
import {CustomerServices} from '../../class/ServicesList'
import Project from '../../class/Project'

export default {
    name: 'ClientInfoStep',
    setup() {
        return {
            ...mapStores({project, errorMsg})
        }
    },
    data() {
        return {
            serviceChoice: null,
            servicesSelected: [],
            comment: '',
        }
    },
    watch: {
        serviceChoice() {
            errorMsg.set(null)
        }
    },
    created() {
        window.scrollTo(0,0)
    },
    computed: {
        serviceList(){
            return CustomerServices
        },
        isOtherDemand() {
            return this.serviceChoice === 'other'
        }
    },
    methods: {
        validate(){
            errorMsg.set(null)
            if(this.serviceChoice !== 'other' && (!this.servicesSelected || this.servicesSelected.length <= 0)){
                errorMsg.set('Merci de cocher au moins un service, ou de passer par la case \'autre demande\'.')
                return
            }
            if(this.serviceChoice === 'other' && (!this.comment || this.comment.trim().length <= 0)){
                errorMsg.set('Merci d\'ecrire un message.')
                return
            }
            project.set(new Project(this.servicesSelected, this.attendees, null, null, this.comment))
            this.$emit('step-valid')
        },
        handleBack(){
            if(!this.serviceChoice){
                this.$emit('step-back')
            } else {
                this.serviceChoice = null
            }
        }
    }
}
</script>