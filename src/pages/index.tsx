import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from './_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import TopSection from '@/components/layout/top_section'
import TopAboutSite from '@/components/sections/top/about_site'
import TopSlider from '@/components/sections/top/slider'
import Button from '@/components/atoms/button'
import '@/styles/Home.module.css'

// ブログデータの型
interface Blog {
  id: string
  title: string
}

type Props = {
  allBlogs: Blog[]
  categoryBlogs: Blog[]
}

const Home: NextPageWithLayout<Props> = ({ allBlogs, categoryBlogs }) => {
  return (
    <>
      {/* このサイトについて */}
      <TopAboutSite />
      <TopSection label={'新着記事6件を取得'}>
        <ul>
          {allBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
        <Button href={'/blogs'} label={'全ての記事を見る'} />
      </TopSection>
      <TopSection label={'「このサイトについて」カテゴリーの新着6件を取得'}>
        <ul>
          {categoryBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </TopSection>
      {/* スライダー */}
      <TopSlider />
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

export default Home
