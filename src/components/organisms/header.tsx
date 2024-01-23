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

  //****************GSAP****************

  // ScrollTriggerの初期化
  Gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    // フェードインアウト
    Gsap.to('#headertext', {
      y: -60,
      scrollTrigger: {
        trigger: '#headertext',
        start: '120',
        end: '200',
        scrub: 1,
      },
    })
  }, [])

  return (
    <HeaderWrap>
      <HeaderInner>
        {headerLogo}
        <HeaderNavigation aria-label="メインメニュー">
          <HamburgerButton type="button">メニュー</HamburgerButton>
          <NavigationList>
            <li>
              <Link href={'/'}>
                <LinkText>トップ</LinkText>
              </Link>
            </li>
            <li>
              <Link href={'/blogs/'}>
                <LinkText>ブログ</LinkText>
              </Link>
            </li>
            <li>
              <Link href={'/about/'}>
                <LinkText>私について</LinkText>
              </Link>
            </li>
            <li>
              <a href={'https://twitter.com/a_be_ri'}>
                <LinkText>X(Twitter)</LinkText>
              </a>
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
`
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #333;
  background-color: ${colorObj.baseGray};
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
    position: relative;
    z-index: 1;
    font-family: vdl-megamarupop-futoline;
  }
  a::after {
    content: 'トップにもどるよ🏃‍♀️';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s;
    z-index: -1;
    font-size: 1.25rem;
    text-align: center;
    font-family: var(--font-cherry), sans-serif;
    font-weight: 500;
  }
  a:hover::after {
    right: -62%;
  }
  a:focus::after {
    right: -62%;
  }
`

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

const LinkText = styled.span`
  z-index: 1;
`

//HeaderBottom
const SiteExplanation = styled.div`
  background-color: ${colorObj.baseGray};
  text-align: center;
  border-bottom: 2px solid #333;
  position: relative;
  z-index: -1;
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
