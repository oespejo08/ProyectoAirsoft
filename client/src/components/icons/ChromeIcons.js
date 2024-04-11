import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChromeIcons(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width={20}
      height={20}        
      viewBox="0 0 190.5 190.5"
      {...props}
    >
      <Path
        fill="#fff"
        d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
      />
      <Path
        fill="#229342"
        d="M54.005 119.07l-41.24-71.43a95.227 95.227 0 00-.003 95.25 95.234 95.234 0 0082.496 47.61l41.24-71.43v-.011a47.613 47.613 0 01-17.428 17.443 47.62 47.62 0 01-47.632.007 47.62 47.62 0 01-17.433-17.437z"
      />
      <Path
        fill="#fbc116"
        d="M136.495 119.067l-41.239 71.43a95.229 95.229 0 0082.489-47.622A95.24 95.24 0 00190.5 95.248a95.237 95.237 0 00-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0123.819 6.372 47.618 47.618 0 0117.439 17.431 47.62 47.62 0 01-.001 47.633z"
      />
      <Path
        fill="#1a73e8"
        d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
      />
      <Path
        fill="#e33b2e"
        d="M95.252 47.628h82.479A95.237 95.237 0 00142.87 12.76 95.23 95.23 0 0095.245 0a95.222 95.222 0 00-47.623 12.767 95.23 95.23 0 00-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 01-.015-47.633 47.61 47.61 0 0141.252-23.815z"
      />
    </Svg>
  )
}

export default ChromeIcons