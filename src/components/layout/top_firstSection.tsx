import { FC } from 'react'
import styled from 'styled-components'
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

const TopFirstSection: FC<Props> = (props) => {
  return (
    <Section>
      <h2>{props.label}</h2>
      {props.children}
    </Section>
  )
}

const Section = styled.section``

export default TopFirstSection
