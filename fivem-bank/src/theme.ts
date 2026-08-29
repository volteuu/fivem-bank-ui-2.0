import { createTheme, MantineColorsTuple } from '@mantine/core'

const cyan: MantineColorsTuple = [
  '#e6fbff',
  '#c0f3fb',
  '#93e9f5',
  '#63ddef',
  '#3fd3ea',
  '#38d6ee',
  '#22d3ee',
  '#12b8d1',
  '#0096ac',
  '#00778a',
]

const dark: MantineColorsTuple = [
  '#e7ecf3',
  '#c4cdd9',
  '#98a2b8',
  '#6b7691',
  '#4a5570',
  '#2e3750',
  '#1a2030',
  '#0e131c',
  '#0b1018',
  '#06080d',
]

export const theme = createTheme({
  fontFamily: 'Manrope, system-ui, sans-serif',
  primaryColor: 'cyan',
  primaryShade: 5,
  defaultRadius: 'md',
  colors: {
    cyan,
    dark,
  },
  black: '#06080d',
  components: {
    Card: {
      defaultProps: {
        radius: 'lg',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Modal: {
      styles: {
        content: { background: 'var(--bg2)' },
        header: { background: 'var(--bg2)' },
      },
    },
  },
})
