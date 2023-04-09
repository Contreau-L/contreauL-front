import VaIcon from './components/va-icon'
import iconsConfig from './icons-config/icons-config'
import {COLOR_THEMES} from "./themes";
// import { COLOR_THEMES } from './themes'

export default {
  colors: {
    presets: {
      original: {
        textInverted: "#0B121A",
        textPrimary: "#F1F1F1",
        backgroundBorder: "#3D4C58",
        backgroundElement: "#131A22",
        backgroundPrimary: "#f6f6f6",
        backgroundSecondary: "#FFFFFF",
        shadow: "rgba(0, 0, 0, 0.37)",
        focus: "#FF0",
        primary: '#6F92DA',
        secondary: '#A8AEBA',
        success: '#3d9209',
        info: '#2c82e0',
        danger: '#e42222',
        warning: '#ffd43a',
      },
    },
  },
  icons: iconsConfig,
  breakpoint: {
    enabled: true,
    bodyClass: true,
    thresholds: {
      xs: 0,
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1440,
    },
  },
  components: {
    VaIcon,
    VaButton: {
      round: true,
    },
    presets: {
      VaButton: {
        outline: {
          backgroundOpacity: 0,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        plain: {
          round: false,
          plain: true,
          hoverBehaviour: 'mask',
          hoverOpacity: 0.15,
          pressedBehaviour: 'mask',
          pressedOpacity: 0.13,
        },
      },
    },
  },
}
