<template>
  <div id="login-container" class="full-container">
    <div id="background-shadow" class="full-container"></div>
    <div id="login-form-wrapper" class="full-container flex flex-horizontal align-center justify-center">
      <div id="login-form" class="px-14 py-8 flex flex-vertical">
        <a href="#"><img src="./../assets/images/logo.png" alt="OfficeSmart Dashboard Logo"></a>
        <el-form size="small" class="mt-6 mb-3">
          <el-form-item>
            <el-input placeholder="用户名 / 邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="full-width">登 录</el-button>
          </el-form-item>
        </el-form>
        <div class="text-14">
          <span class="standard-text">没有账户? </span>
          <el-button type="text">
            <span class="primary-text">创建一个! </span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped lang="scss">
  #login-container {
    background: url("./../assets/images/login/bg.jpg") no-repeat center;
    background-size: cover;
    position: relative;
    #background-shadow {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, .2);
    }
    #login-form-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      #login-form {
        width: $-login-form-width-;
        box-sizing: border-box;
        border-radius: 3px;
        background: white;
      }
    }
  }
</style>
