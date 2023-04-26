<template>
    <form @submit="validate">
        <p>
            Votre projet :
        </p>
        <p>
            Souhaits de prestations (plusieurs réponses possibles) :
        </p>
        <div v-for="service in serviceList" :key="service">
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
        <div v-else>
            <input
                type="checkbox"
                name="present"
                id="present"
                v-model="isPresent"
            />
            <label for="present">
                Je souhaite faire un cadeau
            </label>
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
            servicesSelected: [],
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