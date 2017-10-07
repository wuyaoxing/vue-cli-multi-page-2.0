<template>
    <div class="epm-sign-in">
        <div>
            <h3>{{$t('message.title')}}</h3>
            <input :placeholder="$t('message.userName')"
                   type="text"
                   v-model="userName"></input>
            <input :placeholder="$t('message.password')"
                   type="password"
                   v-model="password"></input>
            <p class="epm-login-error">{{errorMsg}}</p>
            <epm-button type="primary"
                        :disabled="!userName || !password"
                        @click="loginIn">{{$t("message.action")}}</epm-button>
        </div>
    </div>
</template>
<script>
import epmButton from 'base/button/button'
// import { POST } from 'core/ajax'
import md5 from 'blueimp-md5'

export default {
    name: 'epm-login',
    components: {
        epmButton,
    },
    data () {
        return {
            logoSrc: require('images/logo.png'),
            userName: '',
            password: '',
            errorMsg: '',
        }
    },
    methods: {
        loginIn () {
            const hash = window.location.hash
            const body = {
                loginName: this.userName,
                password: md5(this.password)
            }
            console.log(body)
            window.location.href = `/easypm/${hash}`
            // POST('/login', body).then(data => {
            //     if (data.go) {
            //         window.location.href = data.go + hash
            //     }
            // }).catch(error => {
            //     if (error) this.errorMsg = error.message
            // })
        },
    }
}
</script>
<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.epm- {
    &login {
        &-error {
            padding-top: 5px;
            text-align: left;
            font-size: 12px;
            color: red;
        }
    }
    &sign-in {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        border-radius: 2px;
        background: #f5f5f5;
        input {
            display: block;
            width: 100%;
            height: 45px;
            padding: 0 15px;
            margin-top: 15px;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 2px;
            box-sizing: border-box;
            &:focus {
                border-color: #2fb791;
            }
        }
        button {
            display: block;
            margin: 0 auto;
            height: 45px;
            width: 100%;
            font-size: 16px;
            margin-top: 35px;
        }
    }
}
</style>
