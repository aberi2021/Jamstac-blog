import { FC } from 'react'
import styled from 'styled-components'

const Footer: FC = () => {
  return (
    <FooterWrap>
      <p>footerだよ</p>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  background: #232323;
  color: #fff;
  padding: 4rem;
  margin-top: 2rem;
  grid-area: footer;
`

export default Footer
