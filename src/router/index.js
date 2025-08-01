import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import MerchantLayout from '@/layouts/MerchantLayout.vue'
import MultiMerchantLayout from '@/layouts/MultiMerchantLayout.vue'
import OperationLog from '@/views/bot/OperationLog.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
      meta: { title: '登录', noLayout: true }
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        // 仪表板
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/statistics/Dashboard.vue'),
          meta: { title: '仪表板' }
        },
        
        // 订单管理
        {
          path: '/order',
          name: 'Order',
          redirect: '/order/merchant',
          meta: { title: '订单管理' },
          children: [
            {
              path: 'merchant',
              name: 'MerchantOrder',
              component: () => import('@/views/order/MerchantOrder.vue'),
              meta: { title: '商户订单管理' }
            },
            {
              path: 'withdraw',
              name: 'WithdrawList',
              component: () => import('@/views/order/Withdraw.vue'),
              meta: { title: '商户提现审核', hidden: true }
            }
          ]
        },
        
        // 供应商管理
        {
          path: '/supplier',
          name: 'Supplier',
          redirect: '/supplier/list',
          meta: { title: '供应商管理' },
          children: [
            {
              path: 'list',
              name: 'SupplierList',
              component: () => import('@/views/supplier/SupplierList.vue'),
              meta: { title: '供应商列表' }
            },
            {
              path: 'channel',
              name: 'SupplierChannel',
              component: () => import('@/views/supplier/Channel.vue'),
              meta: { title: '供应商通道管理' }
            }
          ]
        },

        // 商户管理
        {
          path: '/product',
          name: 'Product',
          redirect: '/product/list',
          meta: { title: '商户管理' },
          children: [
            {
              path: 'list',
              name: 'ProductList',
              component: () => import(/* webpackChunkName: "product" */ '@/views/product/ProductList.vue'),
              meta: { title: '商户列表' }
            },
            {
              path: 'merchant-products',
              name: 'MerchantProductList',
              component: () => import(/* webpackChunkName: "product" */ '@/views/product/MerchantProductList.vue'),
              meta: { title: '商户产品列表' }
            }
          ]
        },

        // 支付配置
        {
          path: '/payment',
          name: 'Payment',
          redirect: '/payment/type',
          meta: { title: '支付配置' },
          children: [
            {
              path: 'type',
              name: 'PaymentType',
              component: () => import('@/views/payment/Type.vue'),
              meta: { title: '支付类型管理' }
            },
            {
              path: 'product',
              name: 'PaymentProduct',
              component: () => import('@/views/payment/Product.vue'),
              meta: { title: '支付产品管理' }
            },
            {
              path: 'setting',
              name: 'PaymentSetting',
              component: () => import('@/views/payment/Setting.vue'),
              meta: { title: '支付设置' }
            }
          ]
        },
        
        // 机器人管理
        {
          path: '/bot',
          name: 'Bot',
          redirect: '/bot/management',
          meta: { title: '机器人管理' },
          children: [
            {
              path: 'management',
              name: 'BotManagement',
              component: () => import('@/views/bot/BotManagement.vue'),
              meta: { title: '机器人列表' }
            },
            {
              path: 'command',
              name: 'CommandManagement',
              component: () => import('@/views/bot/CommandManagement.vue'),
              meta: { title: '指令管理' }
            },
            {
              path: 'role',
              name: 'BotRoleManagement',
              component: () => import('@/views/bot/RoleManagement.vue'),
              meta: { title: '角色权限管理' }
            },
            {
              path: 'group',
              name: 'GroupManagement',
              component: () => import('@/views/bot/GroupManagement.vue'),
              meta: { title: '群组管理' }
            },
            {
              path: 'mass-message',
              name: 'MassSendMessage',
              component: () => import('@/views/bot/MassSendMessage.vue'),
              meta: { title: '群发消息' }
            },
            {
              path: 'operation-log',
              name: 'BotOperationLog',
              component: OperationLog,
              meta: { title: '操作记录' }
            }
          ]
        },

        // 数据统计
        {
          path: '/statistics',
          name: 'Statistics',
          redirect: '/statistics/dashboard',
          meta: { title: '数据统计' },
          children: [
            {
              path: 'product',
              name: 'StatisticsProduct',
              component: () => import('@/views/statistics/ProductStats.vue'),
              meta: { title: '产品跑量统计' }
            },
            {
              path: 'upstream',
              name: 'StatisticsUpstream',
              component: () => import('@/views/statistics/Upstream.vue'),
              meta: { title: '上游渠道统计' }
            },
            {
              path: 'channel',
              name: 'StatisticsChannel',
              component: () => import('@/views/statistics/ChannelStats.vue'),
              meta: { title: '支付通道统计' }
            },
            {
              path: 'merchant-rank',
              name: 'StatisticsMerchantRank',
              component: () => import('@/views/statistics/MerchantRank.vue'),
              meta: { title: '商户支付排行' }
            },
            {
              path: 'platform-profit',
              name: 'StatisticsPlatformProfit',
              component: () => import('@/views/statistics/PlatformProfit.vue'),
              meta: { title: '平台分润统计' }
            },
            {
              path: 'merchant-income',
              name: 'StatisticsMerchantIncome',
              component: () => import('@/views/statistics/MerchantIncome.vue'),
              meta: { title: '商户收款统计' }
            },
            {
              path: 'merchant-outcome',
              name: 'StatisticsMerchantOutcome',
              component: () => import('@/views/statistics/MerchantOutcome.vue'),
              meta: { title: '商户出款统计' }
            },
            {
              path: 'merchant-balance',
              name: 'StatisticsMerchantBalance',
              component: () => import('@/views/statistics/MerchantBalance.vue'),
              meta: { title: '商户余额快照' }
            }
          ]
        },
        
        // 流水审计
        {
          path: '/audit',
          name: 'Audit',
          redirect: '/audit/merchant-fund',
          meta: { title: '流水审计' },
          children: [
            {
              path: 'merchant-fund',
              name: 'MerchantFund',
              component: () => import('@/views/audit/merchant-fund/index.vue'),
              meta: { title: '商户资金流水' }
            },
            {
              path: 'merchant-prepaid',
              name: 'MerchantPrepaid',
              component: () => import('@/views/audit/merchant-prepaid/index.vue'),
              meta: { title: '商户预付记录' }
            },
            {
              path: 'supplier-fund',
              name: 'SupplierFund',
              component: () => import('@/views/audit/supplier-fund/index.vue'),
              meta: { title: '供应商资金流水' }
            },
            {
              path: 'supplier-prepaid',
              name: 'SupplierPrepaid',
              component: () => import('@/views/audit/supplier-prepaid/index.vue'),
              meta: { title: '供应商预付记录' }
            }
          ]
        },

        // 系统管理
        {
          path: '/system',
          name: 'System',
          redirect: '/system/admin',
          meta: { title: '系统管理' },
          children: [
            {
              path: 'admin',
              name: 'AdminList',
              component: () => import('@/views/system/AdminList.vue'),
              meta: { title: '管理员管理' }
            },
            {
              path: 'role',
              name: 'RoleList',
              component: () => import('@/views/system/RoleList.vue'),
              meta: { title: '角色管理' }
            },
            {
              path: 'permission',
              name: 'PermissionList',
              component: () => import('@/views/system/PermissionList.vue'),
              meta: { title: '权限管理' }
            },
            {
              path: 'menu',
              name: 'MenuList',
              component: () => import('@/views/system/MenuList.vue'),
              meta: { title: '菜单管理' }
            },
            {
              path: 'super-password',
              name: 'SuperPassword',
              component: () => import('@/views/system/SuperPassword.vue'),
              meta: { title: '超级密码设置' }
            },
            {
              path: 'operation-log',
              name: 'OperationLog',
              component: () => import('@/views/system/OperationLog.vue'),
              meta: { title: '管理员操作日志' }
            },
            {
              path: 'business-log',
              name: 'BusinessLog',
              component: () => import('@/views/system/BusinessLog.vue'),
              meta: { title: '管理员业务日志' }
            }
          ]
        }
      ]
    },
    // 单商户后台路由 (复用 MerchantLayout)
    {
      path: '/merchant',
      component: MerchantLayout,
      redirect: '/merchant/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'MerchantDashboard',
          component: () => import('@/views/organized/dashboard/Overview.vue'),
          meta: { title: '商户工作台' }
        },
        {
          path: 'statistics/channel',
          name: 'MerchantStatisticsChannel',
          component: () => import('@/views/organized/statistics/Channel.vue'),
          meta: { title: '支付通道简报' }
        },
        {
          path: 'finance/prepaid',
          name: 'MerchantFinancePrepaid',
          component: () => import('@/views/organized/finance/Prepaid.vue'),
          meta: { title: '预付记录' }
        },
        {
          path: 'channel/payment',
          name: 'MerchantChannelPayment',
          component: () => import('@/views/organized/trade/PaymentChannel.vue'),
          meta: { title: '支付通道' }
        },
        {
          path: 'trade/payment',
          name: 'MerchantTradePayment',
          component: () => import('@/views/organized/trade/OrderList.vue'),
          meta: { title: '支付订单' }
        },
        {
          path: 'audit/merchant',
          name: 'MerchantAuditRecord',
          component: () => import('@/views/organized/finance/MerchantAudit.vue'),
          meta: { title: '商户流水' }
        },
        {
          path: 'account/info',
          name: 'MerchantAccountInfo',
          component: () => import('@/views/organized/account/Info.vue'),
          meta: { title: '账户信息' }
        },
        {
          path: 'account/login-record',
          name: 'MerchantAccountLoginRecord',
          component: () => import('@/views/organized/account/LoginRecord.vue'),
          meta: { title: '登录记录' }
        },

        {
          path: 'setting/profile',
          name: 'MerchantSettingProfile',
          component: () => import('@/views/organized/account/Info.vue'),
          meta: { title: '修改资料' }
        }
      ]
    },
    // 多商户后台路由 - 重定向到普通商户后台
    {
      path: '/multi-merchant/:mainMerchantId',
      redirect: to => {
        // 将多商户重定向到普通商户后台
        return { path: '/merchant/dashboard', query: { merchant: to.params.mainMerchantId } };
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
});

// 添加路由错误处理
router.onError((error) => {
  console.error('路由错误:', error);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.currentRoute.value.path;
  
  if (isChunkLoadFailed) {
    console.log('检测到组件加载失败，尝试重新加载...');
    // 尝试重载页面
    window.location.href = window.location.origin + targetPath;
  }
});

export default router