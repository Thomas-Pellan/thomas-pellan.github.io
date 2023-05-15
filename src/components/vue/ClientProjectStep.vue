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
            <label for="company">Je suis intéréssé par une prestation</label>
        </div>
        <div class="m-form-checkbox">
            <input
                type="radio"
                name="other"
                id="other"
                v-model="serviceChoice"
                value="other"
            />
            <label for="company">J'ai une autre demande</label>
        </div>
        <p v-if="serviceChoice === 'buying'" class="m-form-title">
            Par quelle(s) prestation(s) etes vous intéréssés :
        </p>
        <div v-if="serviceChoice === 'buying'">
            <div v-for="service in serviceList" :key="service" class="m-form-checkbox">
                <input
                    type="checkbox"
                    name="services"
                    id="services"
                    v-model="servicesSelected"
                    :value="service"
                />
                <label for="consent">
                    {{service}}
                </label>
            </div>
            <div v-if="isCompany">
                <p class="m-form-title">
                    Votre Evènement :
                </p>
                <div class="m-form-line">
                    <label for="phone">Nombre de participants *</label>
                    <input
                        name="attendees"
                        id="attendees"
                        v-model="attendees"
                        maxlength="10"
                        required
                    />
                </div>
                <p class="m-form-title">
                    Votre budget :
                </p>
                <div class="m-form-line">
                    <label for="budgetMin">Min *</label>
                    <input
                        type="number"
                        name="budgetMin"
                        id="budgetMin"
                        v-model="budgetData.min"
                        maxlength="5"
                        required
                    />
                    <label for="budgetMax">Max *</label>
                    <input
                        type="number"
                        name="budgetMax"
                        id="budgetMax"
                        v-model="budgetData.max"
                        maxlength="5"
                        required
                    />
                </div>
                <p>
                    Ces informations nous permettent de vous proposer un évènement le plus proche de vos besoins.
                </p>
            </div>
            <div v-else class="m-form-checkbox">
                <input
                    type="checkbox"
                    name="present"
                    id="present"
                    required
                    v-model="isPresent"
                />
                <label for="present">
                    Je souhaite faire un cadeau (cocher également les prestations souhaitées)
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
            <button type="button" @click="$emit('step-back')">
                Retour
            </button>
        </div>
    </form>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {clientType, project, errorMsg} from '../../store/contact-form'
import {CompanyServices, CustomerServices} from '../../class/ServicesList'

export default {
    name: 'ClientInfoStep',
    setup() {
        return {
            ...mapStores({clientType, project, errorMsg})
        }
    },
    data() {
        return {
            serviceChoice: null,
            servicesSelected: [],
            comment: '',
            budgetData: {
                min: 0,
                max: 0
            },
            attendees: 1,
            isPresent: false,
        }
    },
    computed: {
        isCompany() {
            return clientType.get() === 'company'
        },
        serviceList(){
            if(this.isCompany){
                return CompanyServices
            }
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
            if(this.clientType === 'company' && !this.validateCompanyProject()){
                return
            }
            if(this.serviceChoice === 'other' && (!this.comment || this.comment.trim().length <= 0)){
                errorMsg.set('Merci d\'ecrire un message.')
                return
            }
            this.$emit('step-valid')
        },
        validateCompanyProject() {
            //Only validate for services, not for other
            if(this.serviceChoice === 'other'){
                return true
            }
            if(!this.budgetData.min || !this.budgetData.max || this.budgetData.min > this.budgetData.max){
                errorMsg.set('Merci d\'indiquer votre budget, pour un devis au plus proche de vos attentes.')
                return false
            }
            if(!this.attendees){
                errorMsg.set('Merci d\'indiquer un nombre de participants approximatif.')
                return false
            }
            return true
        },
    }
}
</script>