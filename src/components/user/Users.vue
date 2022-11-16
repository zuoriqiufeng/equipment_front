<template>
  <div>
    <!-- 面包屑区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 条件搜索栏 -->
      <el-row :gutter="6">
        <el-col :span="5">
          <el-input placeholder="用户名" v-model="queryInfo.name" clearable @clear="getUserList"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="学号/工号" v-model="queryInfo.no" clearable @clear="getUserList"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="学院" v-model="queryInfo.college" clearable @clear="getUserList"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="系部/专业" v-model="queryInfo.dept" clearable @clear="getUserList"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="getUserList()">搜索</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="6" style="margin-top:5px;">
        <el-col :span="4">
          <el-select v-model="queryInfo.sex" clearable placeholder="性别" style="margin-left=10px">
            <el-option v-for="item in sex" :key="item.no" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="queryInfo.identity" clearable placeholder="身份">
            <el-option
              v-for="item in identity"
              :key="item.no"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="queryInfo.status" clearable placeholder="账户类型">
            <el-option
              v-for="item in status"
              :key="item.no"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="queryInfo.authStatus" clearable placeholder="账号状态">
            <el-option
              v-for="item in authStatus"
              :key="item.no"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryInfo.accountType" clearable placeholder="认证状态">
            <el-option
              v-for="item in accountType"
              :key="item.no"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="getUserList()">筛选</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 用户列表 -->
    <el-table :data="userList" border stripe>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="性别" prop="param.sexString" align="center"></el-table-column>
      <el-table-column label="电话号码" prop="phone" align="center"></el-table-column>
      <el-table-column label="身份" prop="param.identityString" align="center"></el-table-column>
      <el-table-column label="账户类型" prop="param.accountType" align="center"></el-table-column>
      <el-table-column label="学院" prop="college" align="center"></el-table-column>
      <el-table-column label="工号/学号" prop="no" align="center"></el-table-column>
      <el-table-column label="系部/专业" prop="dept" align="center"></el-table-column>
      <el-table-column label="账户状态" prop="param.statusString" align="center"></el-table-column>
      <el-table-column label="认证状态" prop="param.authStatus" align="center"></el-table-column>
      <el-table-column label="上次登录时间" prop="lastLoginTime" width="145px" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="300px">
        <template slot-scope="scope">
          <!-- 禁用按钮 -->
          <el-button
            v-if="scope.row.status == 1"
            type="warning"
            icon="el-icon-lock"
            @click="lockUser(scope.row.id, 0)"
            size="mini"
          >锁定</el-button>
          <el-button
            v-if="scope.row.status == 0"
            type="warning"
            icon="el-icon-unlock"
            @click="lockUser(scope.row.id, 1)"
            size="mini"
          >取消锁定</el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUserById(scope.row.id)"
          >删除</el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showDialog(scope.row.id, scope.row.name)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 10]"
        :page-size="this.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

	 <el-dialog  title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
	  top="200px"
	  center="true"
    >
	  <el-form ref="addFormRef" :model="editForm" label-position="left">
		<el-form-item label="姓名:" label-width="72px">
			<el-input style="width:220px" :placeholder="this.editForm.name" disabled></el-input>
		</el-form-item>
        <el-form-item label="账户类型:">
          <el-select v-model="editForm.accountType" >
            <el-option label="普通用户" value="0" ></el-option>
            <el-option label="管理员" value="1" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份类型:">
			<el-select v-model="editForm.identity" >
				<el-option label="教职人员" value="1"></el-option>
          		<el-option label="学生" value="0"></el-option>
			</el-select>
        </el-form-item>
			<el-button type="primary" @click="editUserInfo()">确定</el-button>
			<el-button  @click="editDialogVisible = false">取消</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import userInfo from '@/api/user'

export default {
	data() {
		//验证邮箱的规则
		var checkEmail = (rule, value, cb) => {
			// 验证邮箱对的正则表达式
			const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
			if (regEmail.test(value)) {
				// 合法的邮箱
				return cb()
			}
			cb(new Error('请输入合法的邮箱'))
		}
		//验证手机号的规则
		var checkMobile = (rule, value, cb) => {
			// 验证手机号码的正则表达式
			const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
			if (regMobile.test(value)) {
				return cb()
			}
			cb(new Error('请输入正确的号码'))
		}
		return {
			// 性别
			sex: [
				{
					value: 0,
					label: '女'
				},
				{
					value: 1,
					label: '男'
				}
			],
			// 身份
			identity: [
				{
					value: 1,
					label: '教职人员'
				},
				{
					value: 0,
					label: '学生'
				}
			],
			// 账户类型
			accountType: [
				{
					value: 1,
					label: '管理员'
				},
				{
					value: 0,
					label: '普通用户'
				}
			],
			status: [
				{
					value: 0,
					label: '禁用'
				},
				{
					value: 1,
					label: '正常'
				}
			],
			// 认证状态
			authStatus: [
				{
					value: 0,
					label: '未认证'
				},
				{
					value: 1,
					label: '已认证'
				}
			],
			pagenum: 1,
			pagesize: 20,
			// 获取用户列表参数
			queryInfo: {},
			userList: [],
			total: 0,
			// 编辑对话框显示与隐藏
			editDialogVisible: false,
			// 编辑用户信息
			editForm: {},
			// 添加表单的验证规则对象
			addFormRules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 10,
						message: '用户名在3~10个字符之间',
						trigger: 'blur'
					}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 15,
						message: '用户名在6~15个字符之间',
						trigger: 'blur'
					}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{
						validator: checkEmail,
						trigger: 'blur'
					}
				],
				mobile: [
					{ required: true, message: '请输入手机', trigger: 'blur' },
					{
						validator: checkMobile,
						trigger: 'blur'
					}
				]
			},
			// 修改表单验证规则
			editFormRules: {
				email: [
					{
						required: true,
						message: '请输入用户的邮箱',
						trigger: 'blur'
					},
					{
						validator: checkEmail,
						trigger: 'blur'
					}
				],
				mobile: [
					{
						required: true,
						message: '请输入用户手机',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					}
				]
			},
			// 控制分配角色对话框的显示与隐藏
			setRoleDialogVisible: false,
			// 所有的角色列表
			rolesList: [],
			// 已选择中的角色id值
			selectedRoleId: []
		}
	},
	created() {
	
		this.getUserList()
	},
	methods: {
		// 获取用户列表
		getUserList() {
			userInfo
				.getUserList(this.pagenum, this.pagesize, this.queryInfo)
				.then(response => {
					if (response.code !== 200) {
						return this.$message.error('用户列表获取失败')
					}
					this.userList = response.data.records
					this.total = response.data.total
				})
		},
		// 锁定用户状态
		lockUser(id, status) {
			this.$confirm('确定该操作吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					console.log('hello world')
					// promise
					// 点击确定，远程调用ajax
					return userInfo.lock(id, status)
				})
				.then(response => {
					this.getUserList()
					if (response.code) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
					}
				})
		},

		// 显示修改框
		showDialog(id, name){
			this.editDialogVisible = true
			this.editForm.id = id
			this.editForm.name = name
		},
		// 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.pagesize = newSize
			this.getUserList()
		},

		// 监听页码改变的
		handleCurrentChange(newPage) {
			this.pagenum = newPage
			this.getUserList()
		},
		// 监听修改对话框的关闭时件
		editDialogClosed() {
			this.editForm = {}
		},
		// 修改用户并提交
		editUserInfo() {
			userInfo.updateUserInfo(this.editForm).then(response => {
				if(response.code !== 200) {
					return this.$message.error('更新用户信息失败')
				}
				// 关闭对话框
				this.editDialogVisible = false
				// 更新列表
				this.getUserList()
				// 提示修改成功
				this.$message.success('更新用户信息成功')
			})
		},
		// 删除用户信息
		removeUserById(id) {
			//  弹框询问用户是否删除
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			// 如果用户确认删除,会返回一个字符串 confirm
			// 如果用户取消删除,会返回一个字符串 cancel
			}).then(() => {
				userInfo.removeUserById(id).then(response => {
					// 提示
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					// 刷新页面
					this.getUserList()
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		// 登录回调方法
        loginCallback(name, token, openid) {
            // 打开手机登录层，绑定手机号，改逻辑与手机登录一致
            this.setCookies(name, token)
        },
	}
}
</script>

<style lang="less" scoped>
</style>