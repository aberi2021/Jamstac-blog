import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { colorObj } from '@/styles/globals'

import { Noto_Sans_JP } from 'next/font/google'

//GoogleFont

const notoM = Noto_Sans_JP({
  weight: '400',
  variable: '--font-notoM',
  display: 'swap',
  preload: false,
})

import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = (props) => {
  //:props
  return (
    <BodyWrapper
      className={`${notoM.variable}`} //notoL.variable
    >
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </BodyWrapper>
  )
}

const BodyWrapper = styled.div`
  background-color: ${colorObj.baseGray};
  flex-direction: column;
  display: grid;
  grid-template: 'header' auto 'contents' 1fr 'footer' auto/100%;
  min-height: 100vh;
  font-family: var(--font-notoM), sans-serif;
  a {
    color: #000;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 4px solid #ff6110;
    outline-offset: 4px;
  }
`

const Main = styled.main`
  margin: 8rem auto;
  grid-area: contents;
  p {
    margin-top: 1rem;
    font-size: 1.25rem;
  }
`

export default DefaultLayout
