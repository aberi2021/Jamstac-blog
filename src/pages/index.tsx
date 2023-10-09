import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from './_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import TopAboutSite from '@/components/sections/top/about_site'
import TopAboutMe from '@/components/sections/top/about_me'
import TopSlider from '@/components/sections/top/slider'
import '@/styles/Home.module.css'
import styled from 'styled-components'
import BlogList from '@/components/molecules/bloglist'

// import { Monomaniac_One } from 'next/font/google'

// //GoogleFont
// const mono = Monomaniac_One({
//   weight: ['400'],
//   subsets: ['latin'],
//   display: 'swap',
// })

// ブログデータの型
interface Blog {
  id: string
  title: string
  content: string
  createdAt: string
  publishedAt: string
  eyecatch?: {
    url: string
    height: number
    width: number
  }
  datetime: string
  category: {
    name: string
  }
}

type Props = {
  allBlogs: Blog[]
}

const Home: NextPageWithLayout<Props> = ({ allBlogs }) => {
  return (
    <>
      <TopContentsWrapper>
        {/* このサイトについて */}
        <TopSection>
          <TopAboutSite />
        </TopSection>
        <TopSection>
          <SectionTitle>ブログだよ😊</SectionTitle>
          <BlogDescriotion>ほぼメモ。たまにポエム。</BlogDescriotion>
          <SectionContents>
            <BlogList allBlogs={allBlogs} />
          </SectionContents>
        </TopSection>

        <TopSection>
          <TopAboutMe />
        </TopSection>
        {/* スライダー */}
        <TopSection>
          <TopSlider />
        </TopSection>
      </TopContentsWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // 全体記事新着6件を取得
  const allBlogs = await client.get({
    endpoint: 'blogs',
    queries: { limit: 6, orders: '-date' },
  })

  return {
    props: {
      allBlogs: allBlogs.contents,
    },
  }
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

const TopContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  padding-bottom: 3rem;
`

const TopSection = styled.div`
  &:not(:first-child) {
    margin-top: 4rem;
  }
`

const SectionContents = styled.div`
  margin-top: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 4rem;
  text-align: center;
  font-family: vdl-megamarupop-futoline, sans-serif;
  font-weight: 400;
`

const BlogDescriotion = styled.p`
  text-align: center;
`

export default Home
