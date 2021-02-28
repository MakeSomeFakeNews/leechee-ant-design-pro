import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
  'app.setting.pagestyle': '页面样式',
  'app.setting.pagestyle.light': '明亮模式',
  'app.setting.pagestyle.dark': '暗黑模式',
  'app.setting.pagestyle.realdark': '全黑模式',
  'app.setting.themecolor': '主体颜色',
  'app.setting.navigationmode': '导航模式',
  'app.setting.content-width': '内容宽度',
  'app.setting.fixedheader': '头部固定',
  'app.setting.fixedsidebar': '侧边栏固定',
  'app.setting.sidemenu': '侧边栏布局',
  'app.setting.topmenu': '顶部菜单布局',
  'app.setting.content-width.fixed': '固定',
  'app.setting.content-width.fluid': '流体',
  'app.setting.othersettings': '其他设置',
  'app.setting.weakmode': '弱模式',
  'app.setting.copy': '复制设置',
  'app.setting.loading': '主题加载',
  'app.setting.copyinfo': '复制成功，请替换默认设置 src/models/setting.js',
  'app.setting.production.hint': '设置面板只在开发环境中显示，请手动修改'
}

export default {
  ...components,
  ...locale
}
