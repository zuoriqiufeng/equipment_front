<template>
  <el-container class="home_container">
    <!-- 头部 -->
    <el-header style="height:40px;">
      <div style="height:20px;">
        <img src="../assets/jsjxy.png" width="40px" alt />
        <span>设备管理系统</span>
      </div>
   <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
        <!-- 侧边栏菜单区 -->
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
		background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
		  :width="'200px'"
        >
		<div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1" @click="saveNavState('users')">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item index="2-1" @click="saveNavState('equipment')">设备列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>借用记录管理</span>
            </template>
            <el-menu-item index="3-1" @click="saveNavState('orders')">记录列表</el-menu-item>
          </el-submenu>
        </el-menu>
      <!-- 右侧边栏 -->

		<el-main>
        <!--路由占位符  -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
	data() {
		return {
			iconsObj: [
				'#icon-yonghuguanli',
				'#icon-quanxianguanli',
				'#icon-lock',
				'#icon-dingdanguanli',
				'#icon-shujutongji'
			],
			isCollapse: false,
			activePath: ''
		}
	},
	created() {
	},
	methods: {
		//
		logout() {
			this.$router.push('/login')
		},
		// 点击按钮，菜单切换折叠与展开
		toggleCollapse() {
			this.isCollapse = !this.isCollapse
		},
		// 点击链接激活的状态
		saveNavState(activePath) {
			this.$router.push('/' + activePath)
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		}
	}
}
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.home_container {
	height: 100%;
}
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding: 0;
	align-items: center;
	color: #fff;
	font: 20px;
	> div {
		display: flex;
		align-items: center;
		span {
			margin-left: 15px;
		}
	}
}
.el-aside {
	background-color: #333744;
	.el-menu {
		border-right: none;
	}
}
.el-main {
	background-color: #eaedf1;
}
.icon {
	width: 1.2em;
	height: 1.2em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	margin: 0 5px;
}
.toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
}
</style>