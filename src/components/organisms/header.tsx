import { FC } from 'react'
import styled from 'styled-components'

const Header: FC = () => {
  return (
    <HeaderWrap>
      <h1>あべのサイト</h1>
      <p>ここはheader</p>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);

  ul {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`

export default Header
