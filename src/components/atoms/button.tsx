import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { colorObj } from '@/styles/color'

type Props = {
  label: string
  href: string
}

const Button: FC<Props> = (props) => {
  return <StyledBtn href={props.href}>{props.label}</StyledBtn>
}

const StyledBtn = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 25px;
  background: ${colorObj.mainColor};
  border: 3px solid #333;
  transition: all 0.2s;
  && {
    color: #333;
    font-weight: 700;
  }
  &:hover {
    background: ${colorObj.subColor};
  }
`

export default Button
