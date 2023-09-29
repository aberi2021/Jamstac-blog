import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'
import Button from '@/components/atoms/button'
//パンクズ
import BreadCrumb from '@/components/molecules/breadcrumb'

type Props = {
  aboutData: {
    context: string
    title: string
  }
}

const About: NextPageWithLayout<Props> = ({ aboutData }) => {
  const { title, context } = aboutData

  return (
    <>
      <NextSeo title={`${title} | あべのサイト`} />
      <AboutPage>
        <BreadCrumb pageTitle={title} />
        <AboutTitle>{title}</AboutTitle>
        <ContentsWrapper>
          <div dangerouslySetInnerHTML={{ __html: context }}></div>
        </ContentsWrapper>
        <ButtonWrapper>
          <Button href={'/'} label={'トップへ戻る'} />
        </ButtonWrapper>
      </AboutPage>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await client.get({ endpoint: 'about' })

  return {
    props: {
      aboutData: about,
    },
  }
}

About.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

const AboutPage = styled.div`
  margin-top: 1rem;
  max-width: 47rem;
  margin: 0 auto;
`

const AboutTitle = styled.h1`
  font-size: 2rem;
  margin-top: 2rem;
`

const ContentsWrapper = styled.div`
  margin-top: 1rem;
  h2 {
    margin-top: 1rem;
  }
  h3 {
    margin-top: 1rem;
    font-weight: 700;
  }
  ul {
    list-style: disc;
    margin-top: 0.5rem;
    padding-left: 1rem;
  }
  ul + p,
  ol + p {
    margin-top: 1rem;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`

export default About
