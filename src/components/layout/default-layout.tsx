import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { colorObj } from '@/styles/color'

import { Roboto } from 'next/font/google'

//GoogleFont
const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})

import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = (props) => {
  //:props
  return (
    <BodyWrapper className={`${roboto.variable}`}>
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
  font-family: var(--font-roboto), sans-serif;
  a {
    color: #000;
    text-decoration: none;
  }
  a:focus,
  button:focus {
    outline: 4px solid #ff6110;
    outline-offset: 4px;
  }
`

const Main = styled.main`
  width: 100%;
  max-width: 908px;
  margin: 7rem auto;
  padding: 0 1rem;
  grid-area: contents;
  p {
    margin-top: 1rem;
  }
`

export default DefaultLayout
