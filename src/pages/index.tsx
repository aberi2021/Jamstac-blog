import { GetStaticProps, NextPageWithLayout } from 'next'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import style from '../styles/Home.module.css'
import TopAboutSite from '@/components/sections/top/about_site'

const Home: NextPageWithLayout = ({ allBlogs, categoryBlogs }) => {
  return (
    <>
      {/* このサイトについて */}
      <TopAboutSite />
      <section className={style.section}>
        <h2 className={style.sectionTitle}>全体記事の新着三件を取得</h2>
        <ul>
          {allBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={style.section}>
        <h2 className={style.sectionTitle}>
          「更新情報」カテゴリーの新着三件を取得
        </h2>
        <ul>
          {categoryBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // 全体記事新着三件を取得
  const allBlogs = await client.get({
    endpoint: 'blogs',
    queries: { limit: 3, orders: '-date' },
  })

  // カテゴリー別新着三件（更新情報）を取得（ここでカテゴリーIDを指定）
  const categoryBlogs = await client.get({
    endpoint: 'blogs',
    queries: {
      limit: 3,
      orders: '-date',
      // カテゴリーIDに適切な値を指定する必要があります
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
