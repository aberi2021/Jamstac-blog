import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'

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
        <AboutTitle>{title}</AboutTitle>
        <ContentsWrapper>
          <div dangerouslySetInnerHTML={{ __html: context }}></div>
        </ContentsWrapper>
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
  pre,
  code {
    background-color: #000;
    color: #fff;
    font-size: 1rem;
  }
  pre {
    padding: 1rem;
    margin-top: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: auto;
  }
  p > code {
    padding: 0 0.5rem;
  }
`

export default About
