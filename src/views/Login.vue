<template>
    <div>
<!--        这里：model是必要的，绑定loginform才能知道数据有没有-->
        <el-form ref="loginform" :rules="rules" class="LoginContainer" :model="loginform">
            <h3 class="loginTitle">系统登录</h3>
<!--           prop是和rules里面绑定的，但是rule是要知道这个地方有没有数据，所以prop和loginform中的数据也应该是绑定上的-->
            <el-form-item prop="username">
                <el-input  type="text" auto-complete="false" v-model="loginform.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginform.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input class="LoginCode"  type="text" auto-complete="false" v-model="loginform.code" placeholder="点击图片更换验证码"/>
                <img :src="captureUrl" @click="changecode">
            </el-form-item>

            <el-checkbox class="LoginRememberMe"  v-model="rememberme">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitForm">登录 </el-button>
        </el-form>
    </div>

</template>

<script>


    export default {
        name: "Login",
        data(){
            return{
                loginform:{
                    username:'admin',
                    password:'123',
                    code:''
                },
                rememberme:true,
                captureUrl:'api/captcha?time'+new Date(),
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        {  required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            changecode(){
                this.captureUrl = 'api/captcha?time' + new Date()
            },
            submitForm(){
                // 验证有无未填项,设置回调接口
                this.$refs.loginform.validate((valid) => {
                    if (valid) {
                        this.postRequest("/login",this.loginform).then(resp=>{
                            if (resp){
                                //存储用户token，携带在request拦截器上
                                const tokenStr = resp.obj.tokenHead+' ' + resp.obj.token;
                                window.sessionStorage.setItem("tokenStr",tokenStr);
                                console.log(tokenStr);

                                let path=this.$route.query.redirect;
                                //判断有无redirect
                                this.$router.replace(
                                    path==undefined||path=='/'?'/home':path);
                            }
                        })
                    } else {
                        this.$message.error("请输入所有字段")
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .LoginContainer{
        margin: 180px auto;
        width: 350px;
        background-color: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        padding: 15px  35px 15px 35px;
        background-clip: padding-box;
        border-radius: 15px;
    }

    .loginTitle{
        margin: 10px auto 30px auto;
        text-align: center;
    }

    .LoginRememberMe{
        text-align: left;
        margin: 0px 0px 15px 0px
    }

    .LoginCode{
        width:250px;
        margin-right: 10px
    }
    .el-form-item__content{
        display: flex;
        align-items: center;

    }

</style>