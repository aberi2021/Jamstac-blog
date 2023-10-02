import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

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
  background: #333;
  border: 3px solid #333;
  && {
    color: #fff;
    font-weight: 700;
  }
  &:hover {
    background-color: #b7ff00;
    color: #000;
  }
`

export default Button
