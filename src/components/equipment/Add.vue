<template>
  <div>
    <!-- 面包屑区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加设备</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <div style="float:left;margin-top:-13px">
        <span style="font-size:20px">填写设备信息</span>
      </div>
      <div style="float:right; margin-top:-17px">
        <el-button size="small" icon="el-icon-plus" type="primary" @click="importData">数据导入</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过10Mb</div> -->
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top:5px">
      <el-form
        ref="equipmentForm"
        :model="equipment"
        label-width="170px"
        :rules="addFormRules"
        label-position="right"
        status-icon
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="equipment.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格(元)" prop="price">
              <el-input v-model="equipment.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="设备状态" prop="status">
              <el-select v-model="equipment.status">
                <el-option label="空闲" value="0"></el-option>
                <el-option label="使用中" value="1"></el-option>
                <el-option label="已损坏" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="type">
              <el-select v-model="equipment.type">
                <el-option label="个人设备" value="0"></el-option>
                <el-option label="未入库设备" value="1"></el-option>
                <el-option label="已入库设备" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="负责人" prop="principal">
              <el-input v-model="equipment.principal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经费来源">
              <el-input v-model="equipment.moneySource"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品牌名">
              <el-input v-model="equipment.brandName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价值">
              <el-input v-model="equipment.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="项目号">
              <el-input v-model="equipment.itemNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采购日期" prop="buyDate">
              <el-date-picker
                v-model="equipment.buyDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="资产系统_取得日期">
              <el-date-picker
                v-model="equipment.eamGainDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产系统_记账日期">
              <el-date-picker
                v-model="equipment.eamChargeDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="资产系统_验收单编号">
          <el-input v-model="equipment.eamReceiptNo"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_资产分类">
          <el-input v-model="equipment.eamClassification"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_资产编号">
          <el-input v-model="equipment.eamNo"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_资产名称">
          <el-input v-model="equipment.eamName"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_使用人">
          <el-input v-model="equipment.eamUser"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_管理部门">
          <el-input v-model="equipment.eamDeptManage"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_存放地点">
          <el-input v-model="equipment.eamDepositArea"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_采购组织形式">
          <el-input v-model="equipment.eamBuyForm"></el-input>
        </el-form-item>
        <el-form-item label="资产系统_具体位置">
          <el-input v-model="equipment.eamDefiniteArea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addEquipment('equipmentForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 设备数据导入 -->
    <el-dialog
      title=""
      :visible.sync="importDialogVisible"
      width="480px">
      <div>
        <el-form label-position="right" label-width="170px">
          <el-form-item label="文件">

            <!--
              el-upload 用来弹出文件选择框选中文件
              :multiple 单项绑定这个属性表示是否支持传输多个文件 true支持 false表示不支持
              :on-success="onUploadSuccess" 单项绑定表示上传成功之后调用那个方法
              :action 单项绑定属性表示文件上传成功并且确认之后,传输到那个地址
            -->
            <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8104/admin/equip/importData'"
            class="upload-demo"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
      </el-form>
      </div>
      <div slot="footer">
        <el-button @click="importDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import equip from '@/api/equipment'
export default {
	data() {
		var checkPrice = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('价格不能为空！'))
			}
			setTimeout(() => {
				if (value === '') {
					return callback()
				} //这是用来判断如果不是必须输入的，则直接跳出
				const r = /^\+?[1-9][0-9]*$/ // 正整数
				// 如果判断不符合正则，则不是正整数不能提交
				if (!r.test(value)) {
					return callback(new Error('数量必须为正整数'))
				} else {
					return callback()
				}
			}, 1000)
		}

		return {
      // 导入数据弹框
      importDialogVisible:false,
			activIndex: '0',
			//   添加设备的表单数据对象
			equipment: {
				name: null,
				principal: null,
				brandName: null,
				price: null,
				value: null,
				type: null,
				buyDate: null,
				moneySource: null,
				itemNo: null,
				status: null,
				eAmReceiptNo: null,
				eAmClassification: null,
				eAmNo: null,
				eAmName: null,
				eAmGainDate: null,
				eAmUser: null,
				eAmDeptManage: null,
				eAmDepositArea: null,
				eAmBuyForm: null,
				eAmChargeDate: null,
				eAmDefiniteArea: null
			},
			//   添加表单校验
			addFormRules: {
				name: [
					{
						required: true,
						message: '请输入设备名称',
						trigger: 'blur'
					}
				],
				principal: [
					{
						required: true,
						message: '请输入负责人名称',
						trigger: 'blur'
					}
				],
				status: [
					{
						required: true,
						message: '请选择设备状态',
						trigger: 'blur'
					}
				],
				type: [
					{
						required: true,
						message: '请选择设备类型',
						trigger: 'blur'
					}
				],
				price: [{ validator: checkPrice, trigger: 'blur' }],
				buyDate: [
					{
						required: true,
						message: '请选择采购日期',
						trigger: 'blur'
					}
				]
			}
		}
	},
	created() {},
	methods: {
		// 添加设备
		addEquipment(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					equip.addEquipment(this.equipment).then(response => {
						if (response.code != 200) {
							return this.$message.error('设备添加失败')
						}
						this.$message({
							type: 'success',
							message: '设备添加成功'
						})
					})
				} else {
					return false
				}
			})
		},
    importData() {
      this.importDialogVisible = true;
    },
    // 设备数据上传成功调用的方法
    // 上传成功调用的方法
    onUploadSuccess() {
      // 关闭弹框
      this.importDialogVisible = false
	  }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
	margin: 0 10px 0 0 !important;
}
.previewImg {
	width: 100%;
}
.btnAdd {
	margin: 15px;
}
</style>
