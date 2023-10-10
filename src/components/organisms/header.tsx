import { FC, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router' // useRouterをインポート
import Gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { colorObj } from '@/styles/globals'

const Header: FC = () => {
  const router = useRouter() // useRouterを初期化
  const currentPath = router.pathname // 現在のページパスを取得

  // トップページの場合、h1要素をdiv要素に変更
  const headerLogo =
    currentPath === '/' ? (
      <HeaderSiteName>
        <h1 id="headerLogo">
          <Link href={'/'}>あべのサイト</Link>
        </h1>
      </HeaderSiteName>
    ) : (
      <HeaderSiteName>
        <span id="headerLogo">
          <Link href={'/'}>あべのサイト</Link>
        </span>
      </HeaderSiteName>
    )

  //****************GSAP****************

  // ScrollTriggerの初期化
  Gsap.registerPlugin(ScrollTrigger)
  Gsap.config({
    nullTargetWarn: false,
  })

  useEffect(() => {
    // フェードイン表示するアニメーション
    Gsap.to('#headertext', {
      y: -40,
      scrollTrigger: {
        trigger: '#headertext',
        start: '120',
        markers: true,
        scrub: 2,
      },
    })
  }, [])

  return (
    <HeaderWrap>
      <HeaderInner>
        {headerLogo}
        <HeaderNavigation>
          <HamburgerButton type="button">メニュー</HamburgerButton>
          <NavigationList>
            <li>
              <span>
                <Link href={'/'}>トップ</Link>
              </span>
            </li>
            <li>
              <span>
                <Link href={'/blogs/'}>ブログ</Link>
              </span>
            </li>
            <li>
              <span>
                <Link href={'/about/'}>私について</Link>
              </span>
            </li>
            <li>
              <Twitter>
                <a href={'https://twitter.com/a_be_ri'}>X(Twitter)</a>
              </Twitter>
            </li>
          </NavigationList>
        </HeaderNavigation>
      </HeaderInner>
      <SiteExplanation id="headertext">
        {currentPath === '/' && (
          <ExplanationText>
            このサイトはあべの練習用兼ポートフォリオサイトです。詳しくは
            <Link href="/about-site/">このサイトについて</Link>をご覧ください。
          </ExplanationText>
        )}
      </SiteExplanation>
    </HeaderWrap>
  )
}

// 以下略

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: ${colorObj.baseGray};
`
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #333;
  a {
    display: block;
    transition: all 0.2s ease 0s;
    text-decoration: none;
  }
  && a:focus {
    outline-offset: -2px;
  }
`

//LOGO

const HeaderSiteName = styled.div`
  font-family: vdl-megamarupop-futoline;
  a {
    padding: 0 20px;
    border-right: 2px solid #333;
    background-color: ${colorObj.mainColor};
  }
  a:hover {
    background-color: ${colorObj.subColor};
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

//Navigation

const HeaderNavigation = styled.nav``

const HamburgerButton = styled.button`
  display: none;
  @media (width <= 980px) {
    display: block;
  }
`

const NavigationList = styled.ul`
  display: flex;
  height: 100%;
  a {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border-left: 2px solid #333;
    display: grid;
    place-content: center;
    font-weight: 700;
    //固有の設定
    position: relative;
  }
  a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: ${colorObj.mainColor};
    transform: scale(0, 1);
    transform-origin: left top;
    transition: all 0.2s ease 0s;
  }
  a:hover::before {
    transform: scale(1, 1);
  }
  @media (width <= 980px) {
    display: none;
  }
`

const Twitter = styled.span`
  a {
    font-family: vdl-megamarupop-futoline;
    background-color: ${colorObj.mainColor};
  }
  a:hover {
    background-color: ${colorObj.subColor};
    color: #333;
  }
`

//HeaderBottom
const SiteExplanation = styled.div`
  text-align: center;
  border-bottom: 2px solid #333;
  a {
    font-weight: 700;
  }
  div {
    display: inline-block;
  }
`

const ExplanationText = styled.p`
  && {
    margin: 0;
    font-size: 0.875rem;
    padding: 8px 0 4px;
  }
  span {
    display: inline-block;
  }
`

export default Header
