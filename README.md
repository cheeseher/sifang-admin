# 思方支付管理系统

基于 Vue 3 + Element Plus 的现代化支付管理系统。

## 项目结构

```
src/
├── views/                # 页面视图
│   ├── order/           # 订单管理模块
│   │   ├── MerchantOrder.vue   # 商户订单管理
│   │   ├── Recharge.vue       # 账户充值列表
│   │   └── Withdraw.vue       # 提现审核
│   ├── merchant/        # 商户管理模块
│   │   ├── MerchantList.vue   # 商户列表
│   │   └── Products.vue       # 商户产品列表
│   ├── supplier/        # 供应商管理模块
│   │   ├── SupplierList.vue   # 供应商列表
│   │   └── Channel.vue        # 供应商通道列表
│   ├── payment/         # 支付配置模块
│   │   ├── Type.vue           # 支付类型管理
│   │   └── Product.vue        # 支付产品管理
│   └── statistics/      # 数据统计模块
│       ├── Product.vue        # 产品跑量统计
│       ├── Upstream.vue       # 上游渠道统计
│       ├── Channel.vue        # 支付通道统计
│       ├── MerchantRank.vue   # 商户支付排行
│       ├── PlatformProfit.vue # 平台分润统计
│       ├── MerchantIncome.vue # 商户收款统计
│       ├── MerchantOutcome.vue # 商户出款统计
│       └── MerchantBalance.vue # 商户余额快照
├── components/          # 公共组件
├── layouts/            # 布局组件
├── router/             # 路由配置
├── stores/             # 状态管理（Pinia）
├── api/                # API 接口
├── utils/              # 工具函数
├── styles/             # 全局样式
├── composables/        # 组合式函数
├── config/             # 全局配置
├── data/              # 模拟数据
└── assets/             # 静态资源
```

## 功能模块

### 订单管理模块 (/order)
- 商户订单管理：订单列表、订单状态管理
- 账户充值列表：充值记录查询、充值状态管理
- 商户提现审核：提现申请处理、审核流程管理

### 商户管理模块 (/merchant)
- 商户列表：商户信息管理、状态管理
- 商户产品列表：产品配置、费率设置、产品上下架

### 供应商管理模块 (/supplier)
- 供应商列表：供应商信息管理、状态管理
- 供应商通道列表：通道配置、费率设置、通道状态管理

### 支付配置模块 (/payment)
- 支付类型管理：支付方式配置、状态管理
- 支付产品管理：产品参数配置、费率设置

### 数据统计模块 (/statistics)
- 产品跑量统计 (Product.vue)：产品交易量统计分析
- 上游渠道统计 (Upstream.vue)：上游渠道数据分析
- 支付通道统计 (Channel.vue)：支付通道数据分析
- 商户支付排行 (MerchantRank.vue)：商户交易排名分析
- 平台分润统计 (PlatformProfit.vue)：平台收益数据统计
- 商户收款统计 (MerchantIncome.vue)：商户收入详细分析
- 商户出款统计 (MerchantOutcome.vue)：商户出款数据统计
- 商户余额快照 (MerchantBalance.vue)：商户余额实时统计

## 技术栈

- Vue 3：前端框架
- Element Plus：UI 组件库
- Vue Router：路由管理
- Pinia：状态管理
- Axios：HTTP 请求
- ECharts：数据可视化
- Vite：构建工具

## 设计规范

- 使用 Element Plus 原生组件，保持界面统一性
- 下拉菜单统一宽度：168px
- 二级菜单仅使用文字，不显示图标
- 使用 Element Plus 线性图标，确保视觉统一

## 开发说明

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 部署说明

项目使用 Vercel 进行部署，配置文件位于根目录的 `vercel.json`。部署步骤：

1. 在 Vercel 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量（如需要）
4. 触发自动部署

## 开发团队

- 产品经理：负责产品规划和功能设计
- 前端开发：负责界面实现和交互开发
- UI 设计：负责视觉设计和用户体验
- 技术支持：负责系统维护和技术支持 