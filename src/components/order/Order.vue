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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="queryInfo.username" clearable clear="" placeholder="用户名">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="queryInfo.lendHuman" clearable clear="" placeholder="借出经办人">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="queryInfo.reHuman" clearable clear="" placeholder="返还经办人">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="getOrderList">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 设备数据列表 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="用户编号" prop="uid" align="center"></el-table-column>
        <el-table-column label="设备号" prop="equipId" align="center"></el-table-column>
        <el-table-column label="用户名" prop="username" align="center"></el-table-column>
        <el-table-column label="用户签字" prop="userSign" align="center"></el-table-column>
        <el-table-column label="借出经办人" prop="lendHuman" align="center"></el-table-column>
        <el-table-column label="借出经办人签字" prop="leHumanSign" width="150px" align="center">
          <template slot-scope="scope">
					<img :src="'data:image/jpeg;base64,' + scope.row.param.leHumanSignBase" width="120px"/>
				</template>
        </el-table-column>
        <el-table-column label="老师签字" prop="tecSign" align="center" width="150px" >
          <template slot-scope="scope">
					<img :src="'data:image/jpeg;base64,' + scope.row.param.tecSignBase" width="120px" />
				</template>
        </el-table-column>
        <el-table-column label="返还经办人" prop="reHuman" width="150px" align="center"></el-table-column>
        <el-table-column label="返还经办人签字" prop="reHumanSign" width="150px" align="center">
          <template slot-scope="scope">
					<img :src="'data:image/jpeg;base64,' + scope.row.param.reHumanSignBase" width="120px"/>
				</template>
        </el-table-column>
        <el-table-column label="返还人" prop="reUser" align="center"></el-table-column>
        <el-table-column label="返还人签字" prop="reUserSign" align="center" width="150px">
           <template slot-scope="scope">
					<img :src="'data:image/jpeg;base64,' + scope.row.param.reUserSignBase" width="120px"/>
				</template>
        </el-table-column>
        <el-table-column label="借出时间" prop="lendTime" align="center" width="120px"></el-table-column>
        <el-table-column label="返还时间" prop="returnTime" align="center" width="120px"></el-table-column>
        <el-table-column label="借用时间" prop="borrowTime" align="center" width="120px"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150px" align="center">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-location"
              size="mini"
              @click="removeOrder(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import order from '@/api/order'
export default {
  data() {
    return {
      queryInfo:{},
      pagenum:1,
      pagesize:20,
      total: 0,
      orderlist: [],
      //  控制修改对话框显示与隐藏
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
   async getOrderList() {
      order.getOrderList(this.pagenum, this.pagesize, this.queryInfo).then(response => {
        if(response.code != 200) {
          return this.$message.info("获取内容失败")
        }
        this.orderlist = response.data.records
        this.total = response.data.total
        this.$message.success('获取记录成功')
      })
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getOrderList()
    },
    // 删除记录
    removeOrder(id) {
      this.$confirm("此操作将永久删除记录，是否继续", '提示', {
        confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
      }).then(() => {
        order.removeById(id).then(response => {
          this.$message({
          type:'success',
          message:'删除成功'

        })
         this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    }

  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
el-table-cplimn {
  height: 150px;
}

</style>
