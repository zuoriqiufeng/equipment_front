<template>
  <div>
    <!-- 面包屑区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input clearable  placeholder="设备名称" v-model="queryInfo.name"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-search" @click="getEquipmentList">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="goAddpage" style="float:right">添加设备</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-top:10px">
        <el-col :span="5">
          <el-select v-model="queryInfo.status" placeholder="设备状态" clearable style="width:100%">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" width="100%">
          <el-select v-model="queryInfo.type" placeholder="设备类型" clearable style="width:100%">
            <el-option
              v-for="item in equipType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" icon="el-icon-search" @click="getEquipmentList">筛选</el-button>
        </el-col>
        <el-col :span="9">
          <el-button type="primary" icon="el-icon-download" @click="equipDownload" style="float:right">数据导出</el-button>
        </el-col>
      </el-row>

      <!-- Tba表格区 -->
      <el-table :data="this.equipmentList" border stripe>
        <el-table-column width="100px" label="编号" prop="id"></el-table-column>
        <el-table-column width="200px" label="设备名称" prop="name"></el-table-column>
        <el-table-column width="100px" label="设备编号" prop="deviceId"></el-table-column>
        <el-table-column width="100px" label="价格(元)" prop="price"></el-table-column>
        <el-table-column width="90px" label="设备状态" prop="param.statusString"></el-table-column>
        <el-table-column width="90px" label="类型" prop="param.equipType"></el-table-column>
        <el-table-column width="90px" label="负责人" prop="principal"></el-table-column>
        <el-table-column width="100px" label="经费来源" prop="moneySource"></el-table-column>
        <el-table-column width="100px" label="品牌名" prop="brandName"></el-table-column>
        <el-table-column width="100px" label="价值" prop="value"></el-table-column>
        <el-table-column width="100px" label="项目号" prop="itemNo"></el-table-column>
        <el-table-column width="140px" label="采购日期" prop="buyDate"></el-table-column>
        <el-table-column width="100px" label="资产系统_验收单编号" prop="eamReceiptNo"></el-table-column>
        <el-table-column width="100px" label="资产系统_资产分类" prop="eamClassification"></el-table-column>
        <el-table-column width="100px" label="资产系统_资产编号" prop="eamNo"></el-table-column>
        <el-table-column width="100px" label="资产系统_资产名称" prop="eamName"></el-table-column>
        <el-table-column width="100px" label="资产系统_取得日期" prop="eamGainDate"></el-table-column>
        <el-table-column width="100px" label="资产系统_使用人" prop="eamUser"></el-table-column>
        <el-table-column width="100px" label="资产系统_管理部门" prop="eamDeptManage"></el-table-column>
        <el-table-column width="100px" label="资产系统_存放地点" prop="eamDepositArea"></el-table-column>
        <el-table-column width="100px" label="资产系统_采购组织形式" prop="eamBuyForm"></el-table-column>
        <el-table-column width="100px" label="资产系统_记账日期" prop="eamChargeDate"></el-table-column>
        <el-table-column width="100px" label="资产系统_具体位置" prop="eamDefiniteArea"></el-table-column>
        <el-table-column label="操作" width="270px" fixed="right" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showDialog(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeEquipById(scope.row.id)"
            >删除</el-button>
            <el-button size="mini" type="success" icon="el-icon-plus" @click="goAddpage">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="this.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
      <el-dialog title="修改设备信息" :visible.sync="dialogVisible" center>
        <div>
          <el-form ref="form" :model="editEquipForm" label-width="170px">
            <el-form-item label="设备名称">
              <el-input v-model="editEquipForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
              <el-input v-model="editEquipForm.price"></el-input>
            </el-form-item>
            <el-form-item label="设备状态">
              <el-select v-model="this.statusString" >
                <el-option label="空闲" value="0"></el-option>
                <el-option label="使用中" value="1"></el-option>
                <el-option label="已损坏" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select  v-model="this.equipType">
                <el-option label="个人设备" value="0"></el-option>
                <el-option label="未入库设备" value="1"></el-option>
                <el-option label="已入库设备" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="editEquipForm.principal"></el-input>
            </el-form-item>
            <el-form-item label="经费来源">
              <el-input v-model="editEquipForm.moneySource"></el-input>
            </el-form-item>
            <el-form-item label="品牌名">
              <el-input v-model="editEquipForm.brandName"></el-input>
            </el-form-item>
            <el-form-item label="价值">
              <el-input v-model="editEquipForm.value"></el-input>
            </el-form-item>
            <el-form-item label="项目号">
              <el-input v-model="editEquipForm.itemNo"></el-input>
            </el-form-item>
            <el-form-item label="采购日期">
              <el-date-picker
                v-model="editEquipForm.buyDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="资产系统_验收单编号">
              <el-input v-model="editEquipForm.eamReceiptNo"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_资产分类">
              <el-input v-model="editEquipForm.eamClassification"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_资产编号">
              <el-input v-model="editEquipForm.eamNo"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_资产名称">
              <el-input v-model="editEquipForm.eamName"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_取得日期">
              <el-date-picker
                v-model="editEquipForm.eamGainDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="资产系统_使用人">
              <el-input v-model="editEquipForm.eamUser"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_管理部门">
              <el-input v-model="editEquipForm.eamDeptManage"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_存放地点">
              <el-input v-model="editEquipForm.eamDepositArea"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_采购组织形式">
              <el-input v-model="editEquipForm.eamBuyForm"></el-input>
            </el-form-item>
            <el-form-item label="资产系统_记账日期">
              <el-date-picker
                v-model="editEquipForm.eamChargeDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="资产系统_具体位置">
              <el-input v-model="editEquipForm.eamDefiniteArea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateEquipInfo">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import equip from '@/api/equipment'

export default {
	data() {
		return {
      status: [
        {
          value:0,
          label:'空闲'
        },
        {
          value:1,
          label:'使用中'
        },
        {
          value:2,
          label:'已损坏'
        },
      ],
      equipType: [
        {
          value:0,
          label:'个人设备'
        },
        {
          value:1,
          label:'未入库设备'
        },
        {
          value:2,
          label:'已入库设备'
        },
      ],
			// 商品列表
			equipmentList: [],
			// 查询参数对象
			queryInfo: {},
			// 总数据条数
			total: 0,
			pagenum: 1,
			pagesize: 20,
			// dialog显示
			dialogVisible: false,
			// 设备修改信息
			editEquipForm: {
			},
      statusString:null,
      equipType:null,
		}
	},
	created() {
		this.getEquipmentList()
	},
	methods: {
		// 根据分页获取对应的商品列表
		getEquipmentList() {
			equip
				.getEquipmentList(this.pagenum, this.pagesize, this.queryInfo)
				.then(response => {
					if (response.code !== 200) {
						return this.$message.error('获取列表数据失败')
					}
					this.$message.success('获取设备列表成功')
					this.equipmentList = response.data.records
					this.total = response.data.total
				})
			// console.log(res.data)
		},
		handleSizeChange(newSize) {
			this.pagesize = newSize
			this.getEquipmentList()
		},
		handleCurrentChange(newPage) {
			this.pagenum = newPage
			this.getEquipmentList()
		},
		// 根据Id删除商品
		removeEquipById(id) {
			this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					// 确定时调用方法
					// 调用删除方法
					equip.removeByid(id).then(response => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.getEquipmentList()
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		// 展示修改弹框
		showDialog(equipment) {
			this.editEquipForm = equipment
      this.statusString = equipment.param.statusString
      this.equipType = equipment.param.equipType
			this.dialogVisible = true
		},
		// 监听修改弹框关闭
		// 监听修改对话框的关闭时件
		editDialogClosed() {
			this.dialogVisible = false
			this.editEquipForm = {}
		},
		// 更新设备信息
		updateEquipInfo() {
      switch(this.statusString) {
        case 0:
          this.editEquipForm.status = 0
          break;
        case 1:
          this.editEquipForm.status = 1
          break;
        case 2:
          this.editEquipForm.status = 2
          break;
      }
      switch(this.equipType) {
        case 0:
          this.editEquipForm.type = 0
          break;
        case 1:
          this.editEquipForm.type = 1
          break;
        case 2:
          this.editEquipForm.type = 2
          break;
      }
			equip.updateEquipInfo(this.editEquipForm).then(response => {
				if (response.code !== 200) {
					return this.$message('更新失败')
				}
				this.$message({
					type: 'success',
					message: '更新成功!'
				})
				this.dialogVisible = false
			})
		},
		// 添加设备
		goAddpage() {
			this.$router.push('/equipment/add')
		},

    // 设备数据导出
    equipDownload() {
        window.location.href = "http://localhost:8101/admin/equip/exportData"
    }
	}
}
</script>

<style>
</style>