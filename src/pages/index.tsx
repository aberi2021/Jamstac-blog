import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from './_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import TopAboutSite from '@/components/sections/top/about_site'
import TopSlider from '@/components/sections/top/slider'
import Button from '@/components/atoms/button'
import '@/styles/Home.module.css'
import styled from 'styled-components'
import BlogList from '@/components/molecules/bloglist'

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
}

type Props = {
  allBlogs: Blog[]
  categoryBlogs: Blog[]
}

const Home: NextPageWithLayout<Props> = ({ allBlogs, categoryBlogs }) => {
  return (
    <>
      <TopContentsWrapper>
        {/* このサイトについて */}
        <TopSection>
          <TopAboutSite />
        </TopSection>
        <TopSection>
          <SectionTitle>新着記事6件を取得</SectionTitle>
          <SectionContents>
            <BlogList allBlogs={allBlogs} />
            <ButtonWrapper>
              <Button href={'/blogs'} label={'全ての記事を見る'} />
            </ButtonWrapper>
          </SectionContents>
        </TopSection>
        <TopSection>
          <SectionTitle>
            「このサイトについて」カテゴリーの新着6件を取得
          </SectionTitle>
          <SectionContents>
            <ul>
              {categoryBlogs.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
            <ButtonWrapper>
              <Button
                href={`/blogs/category/lbmyk28j226`}
                label={`このカテゴリーの記事をもっと読む`}
                aria-label="このサイトについての記事をもっと読む"
              />
            </ButtonWrapper>
          </SectionContents>
        </TopSection>
        <TopSection>
          <SectionTitle>私について</SectionTitle>
          <SectionContents>
            <Link href={'/about'}>ABOUT</Link>
          </SectionContents>
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

  // カテゴリー別新着6件（備忘録）を取得（ここでカテゴリーIDを指定）
  const categoryBlogs = await client.get({
    endpoint: 'blogs',
    queries: {
      limit: 6,
      orders: '-date',
      filters: 'category[equals]lbmyk28j226',
    },
  })

  return {
    props: {
      allBlogs: allBlogs.contents,
      categoryBlogs: categoryBlogs.contents,
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

const TopSection = styled.div``

const SectionContents = styled.div`
  margin-top: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
`

const ButtonWrapper = styled.div`
  margin: 2rem;
  text-align: center;
`

export default Home
