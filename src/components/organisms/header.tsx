import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router' // useRouterをインポート

import { colorObj } from '@/styles/color'

const Header: FC = () => {
  const router = useRouter() // useRouterを初期化

  // 現在のページパスを取得
  const currentPath = router.pathname

  // トップページの場合、h1要素をdiv要素に変更
  const headerLogo =
    currentPath === '/' ? (
      <HeaderSiteName>
        <h1>
          <Link href={'/'}>あべのサイト</Link>
        </h1>
      </HeaderSiteName>
    ) : (
      <HeaderSiteName>
        <span>
          <Link href={'/'}>あべのサイト</Link>
        </span>
      </HeaderSiteName>
    )

  return (
    <HeaderWrap>
      <HeaderInner>
        {headerLogo}
        {/* <HeaderChanges>
          <li>
            <span>
              <a href={'https://twitter.com/a_be_ri'}>文字を変える</a>
            </span>
          </li>
          <li>
            <span>
              <a href={'https://twitter.com/a_be_ri'}>色を変える</a>
            </span>
          </li>
        </HeaderChanges> */}
        <HeaderContents>
          <li>
            <span>
              <a href={'https://twitter.com/a_be_ri'}>X(Twitter)</a>
            </span>
          </li>
          <li>
            <span>
              <a href={'https://twitter.com/a_be_ri'}>メニュー</a>
            </span>
          </li>
        </HeaderContents>
      </HeaderInner>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  border-bottom: 2px solid #333;
  position: fixed;
  z-index: 100;
  width: 100%;
  font-family: vdl-megamarupop-futoline;
  background-color: ${colorObj.baseGray};
`
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    background-color: ${colorObj.mainColor};
    display: block;
  }
  a:hover {
    background-color: #333;
    color: #b7ff00;
  }
  && a:focus {
    outline: 4px solid #ff6110;
    outline-offset: -2px;
  }
`
const HeaderSiteName = styled.div`
  a {
    padding: 0 20px;
    border-right: 2px solid #333;
  }
  h1,
  span {
    font-size: 2rem;
    font-weight: bold;
  }
`

// const HeaderChanges = styled.ul`
//   display: flex;
// `

const HeaderContents = styled.ul`
  display: grid;
  grid-template-columns: 1fr auto;
  li {
  }
  a {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border-left: 2px solid #333;
    display: grid;
    place-content: center;
  }
`

export default Header
