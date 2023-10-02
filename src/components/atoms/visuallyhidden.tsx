import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  label: string
}

const VisuallyHidden: FC<Props> = (props) => {
  return <Text>{props.label}</Text>
}

const Text = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`

export default VisuallyHidden
