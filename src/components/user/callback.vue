<template>
    <p>adsadsadassda</p>
</template>
<script>
import cookie from "js-cookie";
export default {

    data() {
        return{}
    },
    created() {
        // 这能得到url后面拼接的内容
		let token = this.$route.query.token;
		let name = this.$route.query.name;
		let openid = this.$route.query.openid;
        this.loginCallback(name, token)
    },
    // 微信回调方法
   methods: {
        loginCallback(name, token, openid) {
        // 打开手机登录层，绑定手机号，改逻辑与手机登录一致
        this.setCookies(name, token)
        this.$router.push('/users')
        },
    setCookies(name, token) {
        cookie.set("token", token, { domain: "localhost" });
        cookie.set("name", name, { domain: "localhost" });
    },
   }


}

</script>
