const { withTamagui } = require('@tamagui/next-plugin')

const tamaguiPlugin = withTamagui({
    config: './tamagui.config.ts',
    components: ['tamagui'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null
})
