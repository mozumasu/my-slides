// Slidev setup
import { defineAppSetup } from '@slidev/types'
import SelfIntroduction from '../../../../packages/shared-components/slides/SelfIntroduction.vue'

export default defineAppSetup(({ app, router }) => {
  // グローバルコンポーネント登録
  app.component('SelfIntroduction', SelfIntroduction)
})