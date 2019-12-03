<template>
    <div class="passwordToggle">
        <div class="input-group" id="show_hide_password">
            <input class="form-control" :id="id" :type="isToggle?'text':'password'" autocomplete="false" :value="value" v-on:input="$emit('input', $event.target.value)" :readonly="readonly" :maxlength="maxlength">
            <div class="input-group-append" @click="toggle">
                <i class="material-icons input-group-text">
                    {{isToggle?"visibility":"visibility_off"}}
                </i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : "PasswordToggle",
        props: {
            readonly : {
                type : Boolean
            },
            value:{
                type: String
            },
            id:{
                type: String,
                default:'password'
            },
            maxlength: {
                type:Number,
                default:32
            }
        },
        data() {
            return {
                isToggle: false,
            }
        },
        methods: {
            toggle() {
                if(!this.readonly)
                this.isToggle = !this.isToggle;
            }
        }
    }
</script>

<style scoped>
  i {
        cursor: pointer;
    }
</style>