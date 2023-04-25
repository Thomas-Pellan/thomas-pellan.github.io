<template>
    <fieldset>
        <legend>
            Je suis :
        </legend>
        <div>
            <input
                type="radio"
                name="company"
                id="company"
                v-model="type"
                value="company"
            />
            <label for="company">
                Une entreprise
            </label>
        </div>
        <div>
            <input
                type="radio"
                name="customer"
                id="customer"
                v-model="type"
                value="customer"
            />
            <label for="customer">
                Un particulier
            </label>
        </div>
        <p v-if="showError">
            Merci de cliquer sur une des deux options avant de valider
        </p>
        <button @click="validate">
            Suivant
        </button>
    </fieldset>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {clientType} from '../../store/contact-form'

export default {
    name: 'ClientTypeStep',
    setup() {
        return {
            ...mapStores({clientType})
        }
    },
    data() {
        return {
            type: null,
            showError: false,
        }
    },
    created() {
        if(clientType.get()){
            this.type = clientType.get()
        }
    },
    methods: {
        validate(){
            this.showError = false
            if(!this.type){
                this.showError = true
                return
            }
            clientType.set(this.type)
            this.$emit('step-valid')
        }
    }
}
</script>