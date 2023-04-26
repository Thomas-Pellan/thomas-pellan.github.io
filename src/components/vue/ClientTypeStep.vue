<template>
    <div class="m-form">
        <p class="m-form-title">
            Je suis :
        </p>
        <div class="m-form-checkbox">
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
        <div class="m-form-checkbox">
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
    </div>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {clientType, errorMsg} from '../../store/contact-form'

export default {
    name: 'ClientTypeStep',
    setup() {
        return {
            ...mapStores({clientType, errorMsg})
        }
    },
    data() {
        return {
            type: null,
        }
    },
    created() {
        if(clientType.get()){
            this.type = clientType.get()
        }
    },
    watch: {
        type(value){
            errorMsg.set(null)
            if(!value){
                errorMsg.set('Merci de cocher une case du formulaire')
                return
            }
            clientType.set(value)
            this.$emit('step-valid')
        }
    }
}
</script>