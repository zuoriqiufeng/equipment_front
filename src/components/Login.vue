<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div> -->

      <!-- <el-tabs type="border-card"
        :stretch="true"
        height="100%"
        @tab-click="handleLogin"
      >
        <el-tab-pane label="密码登录" name="passLogin"> -->
    <!-- 登录表单区域 -->
        <!-- <el-form
          :model="loginForm"
          label-width="0px"
          class="login_from"
          :rules="loginFormRules"
          ref="loginFromRef"
        >

            <el-form-item label="" prop="username">
              <el-input
                prefix-icon="el-icon-user"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>

            <el-form-item label="" class="btns">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane> -->

        <!-- <el-tab-pane label="微信扫码登录" name="weixinLogin" > -->
          <div id="weixinLogin" ></div>
        <!-- </el-tab-pane>
    </el-tabs> -->

    </div>
  </div>


</template>

<script>
import userInfo from '@/api/user';
import cookie from "js-cookie";
export default {
  data() {
    return {
      // 这是登录表单存储的数据
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
      loginType: 'passLogin'
    }
  },
  methods: {
    //重置表单
    resetLoginForm() {
      this.$refs.loginFromRef.resetFields()
    },
    //登录表单
    login() {
      this.$refs.loginFromRef.validate(async (valid) => {
        if (!valid) return
        // console.log(this.loginForm);
        // const { data: res } = await this.$http.post('admin/user/login', this.loginForm)
        userInfo.login(this.loginForm)
        .then(response =>{
          if (response.code!== 200) return this.$message.error('登录失败')
          this.$message.success('登录成功')
          // 将信息存入cookie
          this.setCookies(this.loginForm.username, response.data.token)
          this.$router.push('/home')
        })
        // console.log(res.code)
        // 1.将登录成功之后的token，保存到客户端的sessionStorage中
        //  1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2token只应在当前在网站打开期间生效，所以将token保存在sessionStorage中
        // window.sessionStorage.setItem('token', res.data.token)
        // 2.通过编程式导航跳转到后台主页，路由地址是/home

      })
    },
    	// 设置cookie
		setCookies(name, token) {
			cookie.set("token", token, { domain: "localhost" });
			cookie.set("name", name, { domain: "localhost" });
		},
    // 选取登录方式
    handleLogin(loginType) {
      if(loginType.name == 'weixinLogin') {
        this.getLoginParam()
      }
    },
    getLoginParam() {
      // 获取二维码参数
      userInfo.getLoginParam().then(response => {
        // console.log(response)
        // console.log(response.data.redirectUri)
        var obj = new WxLogin({
          self_redirect: false,
					id: "weixinLogin", // 需要显示的容器id
					appid: response.data.appid, // 公众号appid wx*******
					scope: response.data.scope, // 网页默认即可
					redirect_uri: response.data.redirectUri, // 授权成功后回调的url
					state: response.data.state, // 可设置为简单的随机数加session用来校验
					style: "black", // 提供"black"、"white"可选。二维码的样式
					href: "" // 外部css文件url，需要https
        })
      });


    },
     // 微信回调方法
        loginCallback(name, token, openid) {
            // 打开手机登录层，绑定手机号，改逻辑与手机登录一致
            if(openid != '') {
                this.userInfo.openid = openid
            } else {
                this.setCookies(name, token)
            }
        },

  },
  mounted() {
     //初始化微信js
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";
      document.body.appendChild(script);
      // 微信回调处理
      this.getLoginParam()
  }
}
</script>

<style lang="less" scoped>
#weixinLogin{
  margin-left: 15%;
}
.login_container {
  background-color: #2b4b69;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_from {
  margin-top: 50px;
  bottom: 0;
  width: 100%;
  padding: 0 10px;

}
.btns {
  // 弹性盒子
  display: flex;
  // 尾部对齐
  justify-content: flex-end;
}
</style>