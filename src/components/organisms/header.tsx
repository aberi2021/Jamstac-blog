import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Header: FC = () => {
  return (
    <HeaderWrap>
      <HeaderInner>
        <h1>
          <Link href={'/'}>あべのサイト</Link>
        </h1>
        <p>
          <a href={'https://twitter.com/a_be_ri'}>X(Twitter)</a>
        </p>
      </HeaderInner>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  padding: 20px 40px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 100;
  width: 100%;
`
const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  h1 {
    font-size: 1.5rem;
  }
  p {
    text-align: right;
  }
`

export default Header
