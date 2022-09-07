import { defineStore } from 'pinia'
import { getThemeSettings, getNaiveThemeOverrides, addThemeCssVarsToHtml } from '@/utils/common/helpers'

export const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: () => {
    return {
      siderCollapse: false,
      inverted: false,
      ...getThemeSettings(),
    }
  },
  getters: {
    /** naiveUI的主题配置 */
    naiveThemeOverrides(state) {
      const overrides = getNaiveThemeOverrides({ primary: state.themeColor, ...state.otherColor })
      if (overrides.common) {
        addThemeCssVarsToHtml(overrides.common)
      }
      return overrides
    },
  },
  actions: {
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse
    },
    changeDarkTheme() {
      this.inverted = !this.inverted
    },
    closeSettingDrawer() {
      this.settingDrawerVisible = false
    },
    toggleSettingdrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible
    },
    /** 重置theme状态 */
    resetThemeStore() {
      this.$reset()
    },
    /** 设置系统主题颜色 */
    setThemeColor(themeColor) {
      this.themeColor = themeColor
    },
  },
})
