<!-- 订单管理/商户订单管理 - 展示和管理商户的订单列表 -->
<template>
  <div class="order-merchant">
    <!-- 搜索表单 -->
    <el-card shadow="never" class="filter-container">
      <el-form :model="searchForm" label-position="left" inline class="multi-line-filter-form">
        <!-- 第一行筛选项 -->
        <div class="filter-line">
          <el-form-item label="时间：">
            <div class="time-filter-container">
              <el-select v-model="searchForm.timeType" placeholder="选择时间类型" style="width: 120px">
                <el-option label="自定义时间" value="custom" />
                <el-option label="今日" value="today" />
                <el-option label="昨日" value="yesterday" />
                <el-option label="最近7天" value="last7days" />
              </el-select>
              <el-date-picker
                v-if="searchForm.timeType === 'custom'"
                v-model="searchForm.timeRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 240px; margin-left: 8px;"
              />
            </div>
          </el-form-item>
          
          <el-form-item label="完成时间：">
            <el-date-picker
              v-model="searchForm.completeTimeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="date-range-picker"
            />
          </el-form-item>

          <el-form-item label="平台单号：">
            <el-input v-model="searchForm.orderNo" placeholder="请输入平台单号" class="input-large" clearable />
          </el-form-item>
          
          <el-form-item label="商户单号：">
            <el-input v-model="searchForm.merchantOrderNo" placeholder="请输入商户单号" class="input-large" clearable />
          </el-form-item>
        </div>

        <!-- 第二行筛选项 -->
        <div class="filter-line">
          <el-form-item label="商户ID：">
            <el-input v-model="searchForm.merchantId" placeholder="请输入商户ID" class="input-normal" clearable />
          </el-form-item>
          
          <el-form-item label="商户账户：">
            <el-input v-model="searchForm.merchantAccount" placeholder="请输入商户账户" class="input-normal" clearable />
          </el-form-item>
          
          <el-form-item label="商户名称：">
            <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称" class="input-normal" clearable />
          </el-form-item>
          
          <el-form-item label="上游单号：">
            <el-input v-model="searchForm.upstreamOrderNo" placeholder="请输入上游单号" class="input-large" clearable />
          </el-form-item>
        </div>

        <!-- 第三行筛选项 -->
        <div class="filter-line">
          <el-form-item label="订单金额：">
            <div class="amount-range-container">
              <el-input-number
                v-model="searchForm.minAmount"
                :min="0"
                :precision="2"
                controls-position="right"
                placeholder="最小金额"
                class="amount-input"
              />
              <el-button type="default" class="amount-separator">-</el-button>
              <el-input-number
                v-model="searchForm.maxAmount"
                :min="0"
                :precision="2"
                controls-position="right"
                placeholder="最大金额"
                class="amount-input"
              />
            </div>
          </el-form-item>

          <el-form-item label="支付产品：">
            <el-select v-model="searchForm.productName" placeholder="请选择" class="input-normal" clearable>
              <el-option label="全部产品" value="all" />
              <el-option label="支付产品A" value="productA" />
              <el-option label="支付产品B" value="productB" />
              <el-option label="支付产品C" value="productC" />
            </el-select>
          </el-form-item>

          <el-form-item label="支付产品编码：">
            <el-input v-model="searchForm.productCode" placeholder="请输入编码" class="input-normal" clearable />
          </el-form-item>

          <el-form-item label="供应商：">
            <el-select v-model="searchForm.supplier" placeholder="请选择" class="input-normal" clearable>
              <el-option label="全部供应商" value="all" />
              <el-option label="上游通道A" value="A" />
              <el-option label="上游通道B" value="B" />
              <el-option label="上游通道C" value="C" />
            </el-select>
          </el-form-item>
        </div>

        <!-- 第四行筛选项 -->
        <div class="filter-line">
          <el-form-item label="供应商通道：">
            <el-select v-model="searchForm.supplierChannel" placeholder="请选择" class="input-normal" clearable>
              <el-option label="全部通道" value="all" />
              <el-option label="通道A" value="A" />
              <el-option label="通道B" value="B" />
              <el-option label="通道C" value="C" />
            </el-select>
          </el-form-item>

          <el-form-item label="隔日补单：">
            <el-select v-model="searchForm.isNextDay" placeholder="请选择" class="input-normal" clearable>
              <el-option label="全部" value="" />
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </el-form-item>

          <el-form-item label="订单状态：">
            <el-select v-model="searchForm.orderStatus" placeholder="请选择" class="input-normal" clearable>
              <el-option label="全部状态" value="all" />
              <el-option label="订单创建" value="created" />
              <el-option label="交易成功" value="success" />
              <el-option label="待付款" value="pending" />
              <el-option label="交易失败" value="failed" />
              <el-option label="拉单失败" value="pull_failed" />
              <el-option label="交易撤销" value="canceled" />
              <el-option label="补单成功" value="reorder_success" />
              <el-option label="交易关闭" value="closed" />
            </el-select>
          </el-form-item>
        </div>

        <!-- 按钮操作行 -->
        <div class="filter-line filter-buttons-line">
          <div class="filter-buttons">
            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
            <el-button plain :icon="Refresh" @click="handleReset">重置</el-button>
          </div>
        </div>
      </el-form>
    </el-card>

    <!-- 统计信息区域 - 卡片样式 -->
    <div class="horizontal-stat-cards">
      <!-- 总跑量 -->
      <div class="mini-stat-card">
        <div class="stat-header">总跑量</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>

      <!-- 总成功单数 -->
      <div class="mini-stat-card">
        <div class="stat-header">总成功单数</div>
        <div class="stat-value">0</div>
      </div>

      <!-- 总入账金额（原总折扣金额） -->
      <div class="mini-stat-card">
        <div class="stat-header">总入账金额</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>

      <!-- 总利润 -->
      <div class="mini-stat-card">
        <div class="stat-header">总利润</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>

      <!-- 成功率 -->
      <div class="mini-stat-card">
        <div class="stat-header">成功率</div>
        <div class="stat-value">0.00%</div>
      </div>

      <!-- 成功金额 -->
      <div class="mini-stat-card">
        <div class="stat-header">成功金额</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>

      <!-- 成功单数 -->
      <div class="mini-stat-card">
        <div class="stat-header">成功单数</div>
        <div class="stat-value">0</div>
      </div>

      <!-- 补单单数 -->
      <div class="mini-stat-card">
        <div class="stat-header">补单单数</div>
        <div class="stat-value">0</div>
      </div>

      <!-- 总手续费（原商户折扣） -->
      <div class="mini-stat-card">
        <div class="stat-header">总手续费</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>

      <!-- 上游通道成本 -->
      <div class="mini-stat-card">
        <div class="stat-header">通道成本</div>
        <div class="stat-value">{{ formatAmount(0) }}</div>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-card shadow="never">
      <!-- 表格工具栏 -->
      <div class="table-toolbar">
        <div class="left">
          <span class="table-title">商户订单列表</span>
          <el-tag type="info" size="small" effect="plain">{{ pagination.total }}条记录</el-tag>
        </div>
        <div class="right">
          <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
          <el-tooltip content="刷新数据">
            <el-button :icon="Refresh" circle plain @click="refreshData" />
          </el-tooltip>
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column prop="merchantId" label="商户ID" width="80" fixed="left" />
        <el-table-column prop="merchantName" label="商户账号" width="120" />
        <el-table-column prop="upstream" label="渠道名称" width="120" />
        <el-table-column prop="upstreamChannelCode" label="渠道编码" width="120" />
        <el-table-column prop="upstreamOrderNo" label="上游单号" width="120" />
        <el-table-column prop="orderNo" label="平台单号" width="120" />
        <el-table-column prop="merchantOrderNo" label="商户单号" width="120" />
        <el-table-column prop="channelCode" label="通道编码" width="100" />
        <el-table-column prop="productName" label="支付产品名称" width="120" />
        <el-table-column prop="productCode" label="支付产品编码" width="100" />
        <el-table-column prop="orderAmount" label="订单金额" width="100" align="right">
          <template #default="scope">
            <span class="amount-cell">{{ formatAmount(scope.row.orderAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="手续费" width="100" align="right">
          <template #default="scope">
            <span class="amount-cell outcome">{{ formatAmount(scope.row.fee || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAmount" label="入账金额" width="100" align="right">
          <template #default="scope">
            <span class="amount-cell income">{{ formatAmount(scope.row.receiveAmount || scope.row.orderAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="channelCost" label="通道成本" width="100" align="right">
          <template #default="scope">
            <span class="amount-cell outcome">{{ formatAmount(scope.row.channelCost || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="100" align="center">
          <template #default="scope">
            <el-tag 
              :type="getStatusType(scope.row.orderStatus)" 
              size="small"
            >
              {{ getStatusText(scope.row.orderStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pushStatus" label="推送状态" width="90" align="center">
          <template #default="scope">
            <el-tag 
              :type="scope.row.pushResult === 'success' ? 'success' : 'danger'" 
              size="small"
              v-if="scope.row.pushResult === 'success' || scope.row.pushResult === 'failed'"
            >
              {{ scope.row.pushResult === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="pushResultContent" label="推送结果" width="120">
          <template #default="scope">
            <span v-if="scope.row.pushResult === 'success' || scope.row.pushResult === 'failed'">商户回调内容</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="isNextDay" label="隔日补单" width="90" align="center">
          <template #default="scope">
            <el-tag 
              :type="scope.row.isNextDay ? 'warning' : 'info'" 
              size="small"
            >
              {{ scope.row.isNextDay ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="订单创建时间" width="150" />
        <el-table-column prop="completeTime" label="订单完成时间" width="150" />
        <el-table-column prop="remarkInfo" label="备注" min-width="150" />
        <el-table-column label="操作" width="90" fixed="right">
          <template #default="scope">
            <el-dropdown @command="handleCommand">
              <el-button link type="primary">
                操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{type: 'resend', row: scope.row}">重新推送</el-dropdown-item>
                  <el-dropdown-item :command="{type: 'reorder', row: scope.row}">手动补单</el-dropdown-item>
                  <el-dropdown-item :command="{type: 'editAmount', row: scope.row}">修改金额</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { 
  Search, 
  Refresh, 
  Download, 
  ArrowDown, 
  Money, 
  Document, 
  Discount, 
  TrendCharts, 
  DataAnalysis, 
  GoldMedal, 
  CircleCheckFilled, 
  Ticket, 
  Service 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

// 加载状态
const loading = ref(false)

// 根据时间类型获取日期范围
const getDateRangeByType = (type) => {
  const today = dayjs()
  
  switch (type) {
    case 'today':
      return [today.format('YYYY-MM-DD'), today.format('YYYY-MM-DD')]
    case 'yesterday':
      const yesterday = today.subtract(1, 'day')
      return [yesterday.format('YYYY-MM-DD'), yesterday.format('YYYY-MM-DD')]
    case 'last7days':
      return [today.subtract(6, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')]
    default:
      return []
  }
}

// 搜索表单数据
const searchForm = reactive({
  timeType: 'today',
  timeRange: getDateRangeByType('today'),
  completeTimeRange: ['', ''],
  orderNo: '',
  merchantOrderNo: '',
  merchantId: '',
  merchantAccount: '',
  merchantName: '',
  upstreamOrderNo: '',
  productName: '',
  productCode: '',
  supplier: '',
  supplierChannel: '',
  upstreamChannelCode: '',
  orderStatus: '',
  minAmount: null,
  maxAmount: null,
  isNextDay: ''
})

// 表格数据
const tableData = ref([
  {
    merchantId: '1',
    merchantName: '商户账号A',
    upstream: '上游通道A',
    channelCode: 'wx_h5',
    orderNo: '102',
    merchantOrderNo: 'MO20230314001',
    productCode: '8888',
    productName: '支付产品A',
    orderAmount: '100.00',
    receiveAmount: '98.50',
    fee: '1.50',
    channelCost: '0.80',
    upstreamOrderNo: 'UP20230314001',
    upstreamChannelCode: 'wxpay_001',
    pushStatus: true,
    pushResult: 'success',
    isNextDay: false,
    orderStatus: 'success',
    createTime: '2023-03-14 17:31:32',
    completeTime: '2025-03-22 13:20:31',
    remarkInfo: '正常订单'
  },
  {
    merchantId: '2',
    merchantName: '商户账号B',
    upstream: '上游通道B',
    channelCode: 'alipay_h5',
    orderNo: '103',
    merchantOrderNo: 'MO20240228001',
    productCode: '9999',
    productName: '支付产品B',
    orderAmount: '200.00',
    receiveAmount: '196.00',
    fee: '4.00',
    channelCost: '2.60',
    upstreamOrderNo: 'UP20240228001',
    upstreamChannelCode: 'alipay_001',
    pushStatus: true,
    pushResult: 'failed',
    isNextDay: true,
    orderStatus: 'success',
    createTime: '2024-02-28 10:25:16',
    completeTime: '2024-02-28 10:30:45',
    remarkInfo: '补单'
  },
  {
    merchantId: '3',
    merchantName: '商户账号C',
    upstream: '上游通道C',
    channelCode: 'union_qr',
    orderNo: '104',
    merchantOrderNo: 'MO20240331001',
    productCode: '7777',
    productName: '支付产品C',
    orderAmount: '300.00',
    receiveAmount: '294.00',
    fee: '6.00',
    channelCost: '3.50',
    upstreamOrderNo: 'UP20240331001',
    upstreamChannelCode: 'union_002',
    pushStatus: false,
    pushResult: '',
    isNextDay: false,
    orderStatus: 'pending',
    createTime: '2024-03-31 14:22:10',
    completeTime: '',
    remarkInfo: '待处理'
  }
])

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 356
})

// 状态映射
const getStatusType = (status) => {
  const map = {
    created: 'info',
    pending: 'warning',
    success: 'success',
    failed: 'danger',
    pull_failed: 'danger',
    canceled: 'info',
    reorder_success: 'success',
    closed: 'info'
  }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = {
    created: '订单创建',
    pending: '待付款',
    success: '交易成功',
    failed: '交易失败',
    pull_failed: '拉单失败',
    canceled: '交易撤销',
    reorder_success: '补单成功',
    closed: '交易关闭'
  }
  return map[status] || '未知状态'
}

// 新金额输入变量
const newAmount = ref('')
// 当前选中的订单
const currentOrder = ref(null)

// 处理操作按钮点击
const handleOperate = (row) => {
  ElMessageBox.alert(`正在查看订单：${row.orderNo}`, '订单操作', {
    confirmButtonText: '确定'
  })
}

// 分页事件处理
const handleSizeChange = (val) => {
  pagination.pageSize = val
  // 这里应该调用获取数据的方法
}

const handleCurrentChange = (val) => {
  pagination.currentPage = val
  // 这里应该调用获取数据的方法
}

// 格式化金额
const formatAmount = (amount) => {
  return Number(amount).toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// 处理导出功能
const handleExport = () => {
  ElMessage.success('订单数据导出中，请稍后...')
}

// 处理查询
const handleSearch = () => {
  ElMessage.success('正在查询数据，请稍后...')
  // 实际项目中这里应该调用API接口获取数据
}

// 重置搜索条件
const handleReset = () => {
  // 重置搜索表单
  Object.assign(searchForm, {
    timeType: 'today',
    timeRange: getDateRangeByType('today'),
    completeTimeRange: ['', ''],
    orderNo: '',
    merchantOrderNo: '',
    merchantId: '',
    merchantAccount: '',
    merchantName: '',
    upstreamOrderNo: '',
    productName: '',
    productCode: '',
    supplier: '',
    supplierChannel: '',
    upstreamChannelCode: '',
    orderStatus: '',
    minAmount: null,
    maxAmount: null,
    isNextDay: ''
  })
  ElMessage.success('搜索条件已重置')
}

// 处理选择变化
const handleSelectionChange = (selectedRows) => {
  // 简单记录选中的行，但不再用于启用/禁用批量删除按钮
  console.log('选中的行:', selectedRows)
}

// 处理刷新数据
const refreshData = () => {
  // 实现刷新数据的逻辑
}

// 处理命令
const handleCommand = (command) => {
  const { type, row } = command
  
  switch (type) {
    case 'resend':
      ElMessageBox.confirm(`确定要重新推送订单 ${row.orderNo} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ElMessage.success(`订单 ${row.orderNo} 重新推送成功`)
      }).catch(() => {
        ElMessage.info('已取消操作')
      })
      break
      
    case 'reorder':
      ElMessageBox.confirm(`确定要为订单 ${row.orderNo} 手动补单吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ElMessage.success(`订单 ${row.orderNo} 手动补单成功`)
      }).catch(() => {
        ElMessage.info('已取消操作')
      })
      break
      
    case 'editAmount':
      // 设置当前订单和重置新金额
      currentOrder.value = row
      newAmount.value = ''
      
      // 打开修改金额对话框
      openEditAmountDialog()
      break
      
    default:
      break
  }
}

// 打开修改金额对话框
const openEditAmountDialog = () => {
  ElMessageBox.prompt('', {
    title: '修改订单金额',
    confirmButtonText: '立即修改',
    cancelButtonText: '取消',
    customClass: 'amount-edit-dialog',
    inputPlaceholder: '请输入新金额',
    inputValue: '',
    dangerouslyUseHTMLString: true,
    message: `
      <div class="amount-edit-form">
        <div class="form-item">
          <label class="required">原始金额</label>
          <div class="amount-value original-amount">${formatAmount(currentOrder.value.orderAmount)}</div>
        </div>
      </div>
    `,
    inputValidator: (value) => {
      return /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || '请输入有效的金额'
    }
  }).then(({ value }) => {
    ElMessage.success(`订单 ${currentOrder.value.orderNo} 金额已从 ${formatAmount(currentOrder.value.orderAmount)} 修改为 ${formatAmount(value)}`)
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 监听时间类型变化，自动设置日期范围
watch(() => searchForm.timeType, (newType) => {
  if (newType !== 'custom') {
    searchForm.timeRange = getDateRangeByType(newType)
  }
})
</script>

<style scoped>
.filter-container {
  margin-bottom: 16px;
  overflow: hidden;
}

.multi-line-filter-form {
  width: 100%;
}

.multi-line-filter-form .filter-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
  row-gap: 12px;
  column-gap: 12px;
}

.multi-line-filter-form .el-form-item {
  margin-bottom: 0;
  margin-right: 0;
  display: flex;
  align-items: center;
}

.multi-line-filter-form .el-form-item__label {
  line-height: 32px;
  white-space: nowrap;
  width: auto !important;
  padding-right: 6px;
}

/* 时间筛选容器样式 */
.time-filter-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* 日期选择器宽度 */
.date-range-picker {
  width: 230px !important;
}

/* 输入框宽度 */
.input-normal {
  width: 140px !important;
  box-sizing: border-box;
}

.input-large {
  width: 180px !important;
  box-sizing: border-box;
}

/* 金额范围容器样式 */
.amount-range-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.amount-range-container .amount-input {
  width: 130px !important;
}

.amount-range-container .amount-input :deep(.el-input-number__decrease),
.amount-range-container .amount-input :deep(.el-input-number__increase) {
  border-left: none;
}

.amount-range-container .amount-separator {
  padding: 5px 8px;
  margin: 0 2px;
  height: 32px;
  border-radius: 4px;
}

/* 确保筛选项不重叠 */
.multi-line-filter-form .el-input,
.multi-line-filter-form .el-select {
  margin: 0;
  flex-shrink: 0;
}

/* 筛选按钮样式 */
.filter-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-buttons-line {
  justify-content: flex-end;
  margin-top: 8px;
}

.horizontal-stat-cards {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.horizontal-stat-cards::-webkit-scrollbar {
  height: 4px;
}

.horizontal-stat-cards::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 4px;
}

.horizontal-stat-cards::-webkit-scrollbar-track {
  background-color: transparent;
}

.mini-stat-card {
  flex: 0 0 auto;
  width: 140px;
  padding: 8px 12px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  background-color: #ffffff;
}

.mini-stat-card:hover {
  border-color: #dcdfe6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.stat-header {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  font-family: 'Roboto Mono', monospace;
}

/* 媒体查询，适配小屏幕 */
@media (max-width: 1200px) {
  .horizontal-stat-cards {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .horizontal-stat-cards {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  .mini-stat-card {
    width: 130px;
  }
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.table-toolbar .left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-title {
  font-size: 16px;
  font-weight: 500;
}

.table-toolbar .right .el-button {
  margin-left: 8px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.amount-cell {
  font-family: 'Roboto Mono', monospace;
}

.amount-cell.income {
  color: #67C23A;
}

.amount-cell.outcome {
  color: #F56C6C;
}

/* 修改金额弹窗样式 */
:deep(.amount-edit-dialog) {
  max-width: 340px !important;
  border-radius: 3px !important;
  overflow: hidden !important;
}

:deep(.amount-edit-dialog .el-message-box__header) {
  background-color: #212121 !important;
  padding: 12px 15px !important;
}

:deep(.amount-edit-dialog .el-message-box__title) {
  color: #ffffff !important;
  font-size: 14px !important;
  font-weight: normal !important;
}

:deep(.amount-edit-dialog .el-message-box__content) {
  padding: 20px !important;
}

:deep(.amount-edit-dialog .el-message-box__input) {
  margin-top: 20px !important;
  padding-top: 0 !important;
}

:deep(.amount-edit-dialog .el-input__inner) {
  height: 36px !important;
  line-height: 36px !important;
}

:deep(.amount-edit-form) {
  padding: 0 !important;
}

:deep(.amount-edit-form .form-item) {
  margin-bottom: 0 !important;
}

:deep(.amount-edit-form label) {
  display: block !important;
  font-size: 14px !important;
  margin-bottom: 8px !important;
  position: relative !important;
}

:deep(.amount-edit-form label.required::before) {
  content: "*" !important;
  color: #f56c6c !important;
  margin-right: 4px !important;
}

:deep(.amount-edit-form .amount-value) {
  font-size: 15px !important;
  font-weight: 500 !important;
  line-height: 36px !important;
  height: 36px !important;
  padding: 0 6px !important;
}

:deep(.amount-edit-dialog .el-message-box__btns) {
  padding: 12px 20px !important;
  text-align: right !important;
}

:deep(.amount-edit-dialog .el-button--primary) {
  background-color: #409eff !important;
}
</style> 