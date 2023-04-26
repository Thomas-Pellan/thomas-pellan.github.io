<template>
    <form @submit="validate">
        <p>
            Votre projet :
        </p>
        <div>
            <input
                type="radio"
                name="buying"
                id="buying"
                v-model="serviceChoice"
                value="buying"
            />
            <label for="company">Je suis intéréssé par une prestation</label>
            <input
                type="radio"
                name="other"
                id="other"
                v-model="serviceChoice"
                value="other"
            />
            <label for="company">J'ai une autre demande</label>
        </div>
        <p>
            Dites m'en plus sur votre souhait :
        </p>
        <div v-if="serviceChoice === buying">
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
                <p>
                    Votre Evènement :
                </p>
                <div>
                    <label for="phone">Nombre de participants *</label>
                    <input
                        name="attendees"
                        id="attendees"
                        v-model="attendees"
                        maxlength="10"
                        required
                    />
                </div>
                <p>
                    Votre budget
                </p>
                <div>
                    <label for="budgetMin">Min *</label>
                    <input
                        type="number"
                        name="budgetMin"
                        id="budgetMin"
                        v-model="budgetData.min"
                        maxlength="5"
                        required
                    />
                </div>
                <div>
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
        <div v-else-if="serviceChoice === 'other'">
            <label for="otherText">
                Ecrivez moi un message *<small>({{comment.length}}/500 caractères)</small>
            </label>
            <input
                type="text"
                name="otherText"
                id="otherText"
                v-model="comment"
                maxlength="500"
            />
        </div>
        <button type="button" @click="validate">
            Sauvegarder et Envoyer
        </button>
        <button type="button" @click="$emit('step-back')">
            Retour
        </button>
    </form>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {clientType, project} from '../../store/contact-form'
import {CompanyServices, CustomerServices} from '../../class/ServicesList'

export default {
    name: 'ClientInfoStep',
    setup() {
        return {
            ...mapStores({clientType, project})
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
    },
    methods: {
        validate(){
            this.$emit('step-valid')
        },
    }
}
</script>