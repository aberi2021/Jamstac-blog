import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
//header.tsx footer.tsxを読み込む

import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = (props) => {
  //:props
  return (
    <BodyWrapper>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </BodyWrapper>
  )
}

const BodyWrapper = styled.div`
  flex-direction: column;
  display: grid;
  grid-template: 'header' auto 'contents' 1fr 'footer' auto/100%;
  min-height: 100vh;
`

const Main = styled.main`
  width: 100%;
  max-width: 908px;
  margin: 7rem auto;
  padding: 0 1rem;
  grid-area: contents;
`

export default DefaultLayout
