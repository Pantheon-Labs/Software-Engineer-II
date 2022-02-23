import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#5ce1e6",
      200: "#2888e5"
    },
  },
})

export default theme