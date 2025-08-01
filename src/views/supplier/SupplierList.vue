<!-- 供应商管理/供应商列表 - 管理供应商列表信息 -->
<template>
  <div class="supplier-list-container">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="filter-container">
      <el-form :model="searchForm" inline class="filter-form">
        <!-- 第一行筛选项 -->
        <div class="filter-row">
          <el-form-item label="供应商ID：">
            <el-input v-model="searchForm.id" placeholder="请输入供应商ID" style="width: 168px" clearable />
          </el-form-item>
          <el-form-item label="渠道名称：">
            <el-input v-model="searchForm.supplierName" placeholder="请输入渠道名称" style="width: 220px" clearable />
          </el-form-item>
          <el-form-item label="模板：">
            <el-select 
              v-model="searchForm.supplierCode" 
              placeholder="请选择模板" 
              style="width: 220px" 
              filterable 
              clearable
            >
              <el-option
                v-for="item in templateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 168px" clearable>
              <el-option label="全部" value="" />
              <el-option label="启用" value="enabled" />
              <el-option label="禁用" value="disabled" />
            </el-select>
          </el-form-item>
        </div>
        
        <!-- 按钮区域 -->
        <div class="filter-buttons">
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button plain :icon="Refresh" @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </el-card>

    <!-- 数据展示区域 -->
    <el-card shadow="never">
      <!-- 表格工具栏 -->
      <div class="table-toolbar">
        <div class="left">
          <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        </div>
        <div class="right">
          <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
          <el-tooltip content="刷新数据">
            <el-button :icon="Refresh" circle plain @click="handleSearch" />
          </el-tooltip>
        </div>
      </div>
      
      <!-- 表格 -->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商ID" prop="id" width="80" align="center" />
        <el-table-column label="渠道名称" prop="supplier" min-width="120" />
        <el-table-column label="模板" prop="code" width="120">
          <template #default="scope">
            <el-tag size="small" type="info">{{ getTemplateLabel(scope.row.code) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="渠道商户号" prop="merchantNo" width="180" />
        <el-table-column label="余额" prop="amount" width="120" align="right">
          <template #default="scope">
            <span class="amount-cell">{{ formatAmount(scope.row.amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授信额度" prop="alertThreshold" width="120" align="right">
          <template #default="scope">
            <span class="amount-cell">{{ formatAmount(scope.row.alertThreshold || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-width="150" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.remark || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="scope">
            <el-tag
              :type="scope.row.enabled ? 'success' : 'danger'"
              effect="plain"
            >
              {{ scope.row.enabled ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="scope">
            <el-dropdown @command="(command) => handleCommand(command, scope.row)">
              <el-button type="primary" link class="operation-button">
                操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="delete" style="color: red;">删除</el-dropdown-item>
                  <el-dropdown-item command="balance">余额操作</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 添加/编辑对话框 -->
    <el-dialog
      :title="dialogType === 'add' ? '新增供应商' : '编辑供应商'"
      v-model="dialogVisible"
      width="600px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="supplierForm"
        :rules="rules"
        label-width="120px"
        class="supplier-form"
      >
        <el-form-item label="模板" prop="code">
          <el-select 
            v-model="supplierForm.code" 
            filterable 
            placeholder="请选择模板" 
            style="width: 100%"
          >
            <el-option
              v-for="item in templateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道名称" prop="supplier">
          <el-input v-model="supplierForm.supplier" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="渠道商户号" prop="merchantNo">
          <el-input v-model="supplierForm.merchantNo" placeholder="请输入渠道商户号" />
        </el-form-item>
        <el-form-item label="授信额度" prop="alertThreshold">
          <el-input-number 
            v-model="supplierForm.alertThreshold" 
            :precision="2" 
            :min="-999999999"
            :max="999999999"
            style="width: 100%"
            placeholder="请输入授信额度"
          />
        </el-form-item>
        <el-form-item label="API密钥" prop="apiKey">
          <el-input v-model="supplierForm.apiKey" placeholder="请输入API密钥" />
        </el-form-item>
        <el-form-item label="网关地址" prop="gatewayUrl">
          <el-input v-model="supplierForm.gatewayUrl" placeholder="请输入网关地址" />
        </el-form-item>
        <el-form-item label="异步通知网址" prop="notifyUrl">
          <el-input v-model="supplierForm.notifyUrl" placeholder="请输入异步通知网址" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="supplierForm.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="回调白名单" prop="whiteList">
          <el-input 
            v-model="supplierForm.whiteList" 
            type="textarea" 
            :rows="3"
            placeholder="请输入回调白名单IP，多个IP用英文逗号分隔"
          />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch
            v-model="supplierForm.enabled"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitForm">确认</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 查看详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="供应商详情"
      direction="rtl"
      size="400px"
      :close-on-click-modal="false"
    >
      <el-descriptions :column="1" border class="detail-descriptions" v-if="currentSupplier">
        <el-descriptions-item label="供应商ID">{{ currentSupplier.id }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{ currentSupplier.supplier }}</el-descriptions-item>
        <el-descriptions-item label="模板">{{ getTemplateLabel(currentSupplier.code) }}</el-descriptions-item>
        <el-descriptions-item label="渠道商户号">{{ currentSupplier.merchantNo }}</el-descriptions-item>
        <el-descriptions-item label="余额">{{ formatAmount(currentSupplier.amount) }}</el-descriptions-item>
        <el-descriptions-item label="授信额度">{{ formatAmount(currentSupplier.alertThreshold || 5000) }}</el-descriptions-item>
        <el-descriptions-item label="API密钥">{{ currentSupplier.apiKey || '-' }}</el-descriptions-item>
        <el-descriptions-item label="网关地址">{{ currentSupplier.gatewayUrl || '-' }}</el-descriptions-item>
        <el-descriptions-item label="异步通知网址">{{ currentSupplier.notifyUrl || '-' }}</el-descriptions-item>
        <el-descriptions-item label="回调白名单">{{ currentSupplier.whiteList || '-' }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ currentSupplier.remark || '-' }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-switch
            v-model="currentSupplier.enabled"
            disabled
          />
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    
    <!-- 余额操作弹窗 -->
    <el-dialog
      title="余额操作"
      v-model="balanceOperationVisible"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="balanceFormRef"
        :model="balanceForm"
        :rules="balanceRules"
        label-width="100px"
      >
        <el-form-item label="渠道名称">
          <el-input v-model="balanceForm.supplier" disabled />
        </el-form-item>
        <el-form-item label="模板">
          <el-input v-model="balanceForm.code" disabled />
        </el-form-item>
        <el-form-item label="当前余额">
          <el-input v-model="balanceForm.currentBalance" disabled>
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="操作类型" prop="operationType">
          <el-radio-group v-model="balanceForm.operationType">
            <el-radio label="add">增加余额</el-radio>
            <el-radio label="subtract">减少余额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作金额" prop="amount">
          <el-input-number 
            v-model="balanceForm.amount" 
            :precision="2" 
            :min="-999999999"
            :max="999999999"
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input 
            v-model="balanceForm.remark" 
            type="textarea" 
            :rows="3"
            placeholder="请输入操作备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="balanceOperationVisible = false">取消</el-button>
          <el-button type="primary" @click="submitBalanceOperation">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, Plus, ArrowDown, Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { supplierList, supplierTemplates } from '@/data/supplierData'

// 搜索表单
const searchForm = reactive({
  id: '',
  supplierName: '',
  supplierCode: '',
  status: ''
})

// 表格数据
const tableData = ref([])
const tableLoading = ref(false)

// 选中的行
const selectedRows = ref([])
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogType = ref('add') // 'add' 或 'edit'
const formRef = ref(null)
const supplierForm = reactive({
  id: '',
  supplier: '',
  code: '',
  merchantNo: '',
  apiKey: '',
  gatewayUrl: '',
  notifyUrl: 'https://testadmin.hxpay.vip/notify/NewSdPay/notify',
  whiteList: '',
  remark: '',
  enabled: true,
  amount: 0,
  alertThreshold: null
})
const rules = {
  supplier: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
  code: [{ required: true, message: '请选择模板', trigger: 'change' }],
  merchantNo: [{ required: true, message: '请输入商户号', trigger: 'blur' }],
  gatewayUrl: [{ required: true, message: '请输入网关地址', trigger: 'blur' }],
  notifyUrl: [{ required: true, message: '请输入异步通知网址', trigger: 'blur' }]
}

// 详情抽屉相关
const drawerVisible = ref(false)
const currentSupplier = ref(null)

// 模板选项
const templateOptions = ref(supplierTemplates)

// 余额操作相关
const balanceOperationVisible = ref(false)
const balanceFormRef = ref(null)
const balanceForm = reactive({
  supplier: '',
  code: '',
  currentBalance: '',
  operationType: 'add',
  amount: 0,
  remark: ''
})
const balanceRules = {
  operationType: [{ required: true, message: '请选择操作类型', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入操作金额', trigger: 'blur' }]
}

// 格式化金额
const formatAmount = (amount) => {
  return amount.toLocaleString('zh-CN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })
}

// 获取模板标签
const getTemplateLabel = (code) => {
  const template = templateOptions.value.find(item => item.value === code)
  return template ? template.label : code
}

// 搜索方法
const handleSearch = () => {
  tableLoading.value = true
  
  // 模拟API调用和前端过滤
  setTimeout(() => {
    let filteredData = [...supplierList]
    
    if (searchForm.id) {
      filteredData = filteredData.filter(item => 
        item.id.toString().includes(searchForm.id))
    }
    
    if (searchForm.supplierName) {
      filteredData = filteredData.filter(item => 
        item.supplier.includes(searchForm.supplierName))
    }
    
    if (searchForm.supplierCode) {
      filteredData = filteredData.filter(item => 
        item.code === searchForm.supplierCode)
    }
    
    if (searchForm.status) {
      const isEnabled = searchForm.status === 'enabled'
      filteredData = filteredData.filter(item => item.enabled === isEnabled)
    }
    
    tableData.value = filteredData
    total.value = filteredData.length
    
    tableLoading.value = false
    ElMessage.success('查询成功 (模拟操作)')
  }, 500)
}

// 重置搜索条件
const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = ''
  })
  handleSearch()
}

// 状态变更处理
const handleStatusChange = (row, val) => {
  const action = val ? '启用' : '禁用'
  
  ElMessageBox.confirm(
    `确认${action}供应商 "${row.supplier}"?`,
    `${action}确认`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 模拟API调用，实际应发送请求到后端更新状态
    row.enabled = val
    ElMessage.success(`${action}成功 (模拟操作)`)
  }).catch(() => {
    // 取消操作，恢复原状态
    row.enabled = !val
    ElMessage.info('已取消操作')
  })
}

// 添加供应商
const handleAdd = () => {
  dialogType.value = 'add'
  resetForm()
  dialogVisible.value = true
}

// 编辑供应商
const handleEdit = (row) => {
  dialogType.value = 'edit'
  resetForm()
  
  // 填充表单数据
  Object.keys(supplierForm).forEach(key => {
    if (key in row) {
      supplierForm[key] = row[key]
    }
  })
  
  dialogVisible.value = true
}

// 查看详情
const handleDetail = (row) => {
  currentSupplier.value = { ...row }
  drawerVisible.value = true
}

// 处理下拉菜单命令
const handleCommand = (command, row) => {
  switch (command) {
    case 'edit':
      handleEdit(row)
      break
    case 'delete':
      handleDelete(row)
      break
    case 'balance':
      handleBalance(row)
      break
    default:
      break
  }
}

// 删除供应商
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确认删除供应商 "${row.supplier}"?`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 模拟API调用，实际应发送请求到后端删除数据
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      tableData.value.splice(index, 1)
      ElMessage.success('删除成功 (模拟操作)')
    }
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 余额操作
const handleBalance = (row) => {
  balanceOperationVisible.value = true
  balanceForm.supplier = row.supplier
  balanceForm.code = row.code
  balanceForm.currentBalance = formatAmount(row.amount)
  balanceForm.amount = 0
  balanceForm.operationType = 'add'
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  
  Object.assign(supplierForm, {
    id: '',
    supplier: '',
    code: '',
    merchantNo: '',
    apiKey: '',
    gatewayUrl: '',
    notifyUrl: 'https://testadmin.hxpay.vip/notify/NewSdPay/notify',
    whiteList: '',
    remark: '',
    enabled: true,
    amount: 0,
    alertThreshold: null
  })
  
  // 如果是新增，清空模板下拉选择
  if (dialogType.value === 'add') {
    supplierForm.code = ''
  }
}

// 提交表单
const handleSubmitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (dialogType.value === 'add') {
        // 添加操作 (模拟前端生成ID和部分默认值)
        const newId = Math.max(...tableData.value.map(item => item.id), 0) + 1
        const newSupplier = {
          ...supplierForm,
          id: newId,
          amount: 0,
          freeze: 0,
          alertThreshold: 5000,
          flow: 0
        }
        tableData.value.push(newSupplier)
        ElMessage.success('添加成功 (模拟操作)')
      } else {
        // 编辑操作 (模拟前端数据更新)
        const index = tableData.value.findIndex(item => item.id === supplierForm.id)
        if (index !== -1) {
          // 保留原有金额和流转数据
          const { amount, freeze, alertThreshold, flow } = tableData.value[index]
          tableData.value[index] = {
            ...supplierForm,
            amount,
            freeze,
            alertThreshold,
            flow
          }
          ElMessage.success('更新成功 (模拟操作)')
        }
      }
      dialogVisible.value = false
    } else {
      return false
    }
  })
}

// 每页条数改变
const handleSizeChange = (size) => {
  pageSize.value = size
  handleSearch()
}

// 页码改变
const handleCurrentChange = (page) => {
  currentPage.value = page
  handleSearch()
}

// 提交余额操作
const submitBalanceOperation = () => {
  balanceFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟API调用，实际应发送请求到后端操作余额
      const index = tableData.value.findIndex(item => item.supplier === balanceForm.supplier && item.code === balanceForm.code)
      if (index !== -1) {
        if (balanceForm.operationType === 'add') {
          // 增加余额
          tableData.value[index].amount += parseFloat(balanceForm.amount)
          ElMessage.success(`余额增加成功，当前余额: ${formatAmount(tableData.value[index].amount)} (模拟操作)`)
        } else {
          // 减少余额
          tableData.value[index].amount -= parseFloat(balanceForm.amount)
          ElMessage.success(`余额减少成功，当前余额: ${formatAmount(tableData.value[index].amount)} (模拟操作)`)
        }
      }
      balanceOperationVisible.value = false
    } else {
      return false
    }
  })
}

// 导出数据
const handleExport = () => {
  // 实际项目中这里会准备数据并调用导出库或API
  console.log('handleExport (模拟)', tableData.value);
  ElMessage.success('供应商数据导出成功 (模拟操作)')
}

// 页面加载时获取数据
onMounted(() => {
  // 模拟从服务器获取数据
  tableLoading.value = true
  setTimeout(() => {
    tableData.value = supplierList // 直接使用导入的模拟数据
    total.value = supplierList.length
    tableLoading.value = false
    console.log('供应商列表数据已加载 (模拟数据源)');
  }, 500)
})
</script>

<style scoped>
.supplier-list-container {
  padding: 16px;
}

.filter-container {
  margin-bottom: 16px;
}

.filter-form {
  display: flex;
  flex-direction: column;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.filter-row .el-form-item {
  margin-bottom: 0;
  margin-right: 20px;
}

.filter-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.filter-buttons .el-button + .el-button {
  margin-left: 12px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.table-toolbar .left .el-button {
  margin-right: 8px;
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
  font-weight: 500;
}

.supplier-form .el-form-item {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.detail-descriptions {
  padding: 0 16px;
}

:deep(.el-drawer__body) {
  padding: 0;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #e4e7ed;
}

:deep(.el-descriptions__label) {
  width: 120px;
}

:deep(.el-input-number .el-input__inner) {
  text-align: left;
}

.operation-button {
  font-size: 14px;
}

:deep(.el-dropdown-menu__item) {
  font-size: 14px;
}
</style> 