import * as React from "react"
import Svg, { Path } from "react-native-svg"

function YoutubeIcons(props) {
  return (
    <Svg
      viewBox="0 0 256 180"
      width={20}
      height={20}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <Path
        d="M250.346 28.075A32.18 32.18 0 00227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 005.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0022.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0022.657-22.657c6.338-35.348 8.291-89.1-.164-123.134z"
        fill="red"
      />
      <Path fill="#FFF" d="M102.421 128.06l66.328-38.418-66.328-38.418z" />
    </Svg>
  )
}

export default YoutubeIcons