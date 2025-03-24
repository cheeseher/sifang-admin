/**
 * 统计模块数据文件
 * 包含各种统计页面所需的模拟数据
 */

// 商户余额快照数据
export const merchantBalanceData = [
  {
    merchantName: '云端科技有限公司',
    merchantId: 'M2024031401',
    balance: 125000.00,
    frozenAmount: 20000.00,
    availableAmount: 105000.00,
    todayIncome: 50000.00,
    todayOutcome: 30000.00,
    snapshotTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '星辰电子商务',
    merchantId: 'M2024031402',
    balance: 75800.50,
    frozenAmount: 5000.00,
    availableAmount: 70800.50,
    todayIncome: 12500.00,
    todayOutcome: 8000.00,
    snapshotTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '蓝海国际贸易',
    merchantId: 'M2024031403',
    balance: 235000.00,
    frozenAmount: 35000.00,
    availableAmount: 200000.00,
    todayIncome: 85000.00,
    todayOutcome: 45000.00,
    snapshotTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '绿洲生态科技',
    merchantId: 'M2024031404',
    balance: 50000.00,
    frozenAmount: 0.00,
    availableAmount: 50000.00,
    todayIncome: 25000.00,
    todayOutcome: 0.00,
    snapshotTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '红日网络科技',
    merchantId: 'M2024031405',
    balance: 180000.00,
    frozenAmount: 30000.00,
    availableAmount: 150000.00,
    todayIncome: 60000.00,
    todayOutcome: 35000.00,
    snapshotTime: '2024-03-14 15:30:00'
  }
];

// 商户收入统计数据
export const merchantIncomeData = [
  {
    merchantName: '云端科技有限公司',
    merchantId: 'M2024031401',
    totalIncome: 1250000.00,
    todayIncome: 50000.00,
    weekIncome: 350000.00,
    monthIncome: 1250000.00,
    successRate: 0.985,
    orderCount: 1250,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '星辰电子商务',
    merchantId: 'M2024031402',
    totalIncome: 758000.50,
    todayIncome: 12500.00,
    weekIncome: 87500.00,
    monthIncome: 375000.00,
    successRate: 0.965,
    orderCount: 850,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '蓝海国际贸易',
    merchantId: 'M2024031403',
    totalIncome: 2350000.00,
    todayIncome: 85000.00,
    weekIncome: 590000.00,
    monthIncome: 2350000.00,
    successRate: 0.995,
    orderCount: 2450,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '绿洲生态科技',
    merchantId: 'M2024031404',
    totalIncome: 500000.00,
    todayIncome: 25000.00,
    weekIncome: 175000.00,
    monthIncome: 500000.00,
    successRate: 1.0,
    orderCount: 520,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '红日网络科技',
    merchantId: 'M2024031405',
    totalIncome: 1800000.00,
    todayIncome: 60000.00,
    weekIncome: 420000.00,
    monthIncome: 1800000.00,
    successRate: 0.975,
    orderCount: 1850,
    updateTime: '2024-03-14 15:30:00'
  }
];

// 商户出款统计数据
export const merchantOutcomeData = [
  {
    merchantName: '云端科技有限公司',
    merchantId: 'M2024031401',
    totalOutcome: 750000.00,
    todayOutcome: 30000.00,
    weekOutcome: 210000.00,
    monthOutcome: 750000.00,
    successRate: 0.975,
    withdrawCount: 85,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '星辰电子商务',
    merchantId: 'M2024031402',
    totalOutcome: 455000.50,
    todayOutcome: 8000.00,
    weekOutcome: 56000.00,
    monthOutcome: 225000.00,
    successRate: 0.955,
    withdrawCount: 45,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '蓝海国际贸易',
    merchantId: 'M2024031403',
    totalOutcome: 1450000.00,
    todayOutcome: 45000.00,
    weekOutcome: 315000.00,
    monthOutcome: 1450000.00,
    successRate: 0.985,
    withdrawCount: 150,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '绿洲生态科技',
    merchantId: 'M2024031404',
    totalOutcome: 250000.00,
    todayOutcome: 0.00,
    weekOutcome: 75000.00,
    monthOutcome: 250000.00,
    successRate: 1.0,
    withdrawCount: 25,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    merchantName: '红日网络科技',
    merchantId: 'M2024031405',
    totalOutcome: 1050000.00,
    todayOutcome: 35000.00,
    weekOutcome: 245000.00,
    monthOutcome: 1050000.00,
    successRate: 0.965,
    withdrawCount: 105,
    updateTime: '2024-03-14 15:30:00'
  }
];

// 平台分润统计数据
export const platformProfitData = [
  {
    date: '2024-03-14',
    totalProfit: 125000.00,
    merchantProfit: 75000.00,
    channelProfit: 35000.00,
    otherProfit: 15000.00,
    orderCount: 1580,
    profitRate: 0.045
  },
  {
    date: '2024-03-13',
    totalProfit: 118500.50,
    merchantProfit: 71000.25,
    channelProfit: 33250.15,
    otherProfit: 14250.10,
    orderCount: 1485,
    profitRate: 0.044
  },
  {
    date: '2024-03-12',
    totalProfit: 132000.00,
    merchantProfit: 79200.00,
    channelProfit: 37000.00,
    otherProfit: 15800.00,
    orderCount: 1650,
    profitRate: 0.046
  },
  {
    date: '2024-03-11',
    totalProfit: 115000.00,
    merchantProfit: 69000.00,
    channelProfit: 32000.00,
    otherProfit: 14000.00,
    orderCount: 1425,
    profitRate: 0.043
  },
  {
    date: '2024-03-10',
    totalProfit: 98500.00,
    merchantProfit: 59100.00,
    channelProfit: 27600.00,
    otherProfit: 11800.00,
    orderCount: 1250,
    profitRate: 0.042
  }
];

// 商户排行榜数据
export const merchantRankData = [
  {
    rank: 1,
    merchantName: '蓝海国际贸易',
    merchantId: 'M2024031403',
    totalAmount: 2350000.00,
    orderCount: 2450,
    averageAmount: 959.18,
    growthRate: 0.15
  },
  {
    rank: 2,
    merchantName: '红日网络科技',
    merchantId: 'M2024031405',
    totalAmount: 1800000.00,
    orderCount: 1850,
    averageAmount: 972.97,
    growthRate: 0.12
  },
  {
    rank: 3,
    merchantName: '云端科技有限公司',
    merchantId: 'M2024031401',
    totalAmount: 1250000.00,
    orderCount: 1250,
    averageAmount: 1000.00,
    growthRate: 0.08
  },
  {
    rank: 4,
    merchantName: '星辰电子商务',
    merchantId: 'M2024031402',
    totalAmount: 758000.50,
    orderCount: 850,
    averageAmount: 891.77,
    growthRate: 0.05
  },
  {
    rank: 5,
    merchantName: '绿洲生态科技',
    merchantId: 'M2024031404',
    totalAmount: 500000.00,
    orderCount: 520,
    averageAmount: 961.54,
    growthRate: 0.18
  }
];

// 支付通道统计数据
export const channelStatsData = [
  {
    channelName: '微信支付通道A',
    channelId: 'CH2024010101',
    totalAmount: 985000.00,
    orderCount: 3250,
    successRate: 0.992,
    failureRate: 0.008,
    processingFee: 12525.50,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    channelName: '支付宝通道B',
    channelId: 'CH2024010102',
    totalAmount: 875000.00,
    orderCount: 2850,
    successRate: 0.985,
    failureRate: 0.015,
    processingFee: 11375.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    channelName: '银联快捷支付',
    channelId: 'CH2024010103',
    totalAmount: 650000.00,
    orderCount: 1950,
    successRate: 0.978,
    failureRate: 0.022,
    processingFee: 9100.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    channelName: '云闪付通道',
    channelId: 'CH2024010104',
    totalAmount: 520000.00,
    orderCount: 1650,
    successRate: 0.995,
    failureRate: 0.005,
    processingFee: 6760.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    channelName: '数字人民币通道',
    channelId: 'CH2024010105',
    totalAmount: 350000.00,
    orderCount: 950,
    successRate: 0.998,
    failureRate: 0.002,
    processingFee: 3850.00,
    updateTime: '2024-03-14 15:30:00'
  }
];

// 上游渠道统计数据
export const upstreamData = [
  {
    upstreamName: '金钥匙支付',
    upstreamId: 'UP2024010101',
    totalAmount: 1250000.00,
    orderCount: 4250,
    successRate: 0.988,
    failureRate: 0.012,
    costAmount: 15625.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    upstreamName: '通联支付',
    upstreamId: 'UP2024010102',
    totalAmount: 985000.00,
    orderCount: 3350,
    successRate: 0.975,
    failureRate: 0.025,
    costAmount: 12805.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    upstreamName: '汇付天下',
    upstreamId: 'UP2024010103',
    totalAmount: 750000.00,
    orderCount: 2550,
    successRate: 0.982,
    failureRate: 0.018,
    costAmount: 9750.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    upstreamName: '易宝支付',
    upstreamId: 'UP2024010104',
    totalAmount: 560000.00,
    orderCount: 1850,
    successRate: 0.990,
    failureRate: 0.010,
    costAmount: 7280.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    upstreamName: '钱方支付',
    upstreamId: 'UP2024010105',
    totalAmount: 420000.00,
    orderCount: 1450,
    successRate: 0.985,
    failureRate: 0.015,
    costAmount: 5460.00,
    updateTime: '2024-03-14 15:30:00'
  }
];

// 产品跑量统计数据
export const productStatsData = [
  {
    productName: '微信支付',
    productId: 'P2024010101',
    totalAmount: 1850000.00,
    orderCount: 6250,
    successRate: 0.990,
    failureRate: 0.010,
    profitAmount: 24050.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    productName: '支付宝',
    productId: 'P2024010102',
    totalAmount: 1650000.00,
    orderCount: 5850,
    successRate: 0.985,
    failureRate: 0.015,
    profitAmount: 21450.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    productName: '银联快捷',
    productId: 'P2024010103',
    totalAmount: 950000.00,
    orderCount: 3250,
    successRate: 0.975,
    failureRate: 0.025,
    profitAmount: 12350.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    productName: '云闪付',
    productId: 'P2024010104',
    totalAmount: 750000.00,
    orderCount: 2650,
    successRate: 0.995,
    failureRate: 0.005,
    profitAmount: 9750.00,
    updateTime: '2024-03-14 15:30:00'
  },
  {
    productName: '数字人民币',
    productId: 'P2024010105',
    totalAmount: 450000.00,
    orderCount: 1450,
    successRate: 0.998,
    failureRate: 0.002,
    profitAmount: 5850.00,
    updateTime: '2024-03-14 15:30:00'
  }
]; 