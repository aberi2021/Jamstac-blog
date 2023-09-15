import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from './_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import style from '../styles/Home.module.css'
import TopAboutSite from '@/components/sections/top/about_site'
import TopSlider from '@/components/sections/top/slider'

// ブログデータの型
interface Blog {
  id: string
  title: string
  // 他のプロパティもここに追加するか、実際のデータ構造に合わせて調整
}

type Props = {
  allBlogs: Blog[]
  categoryBlogs: Blog[] // 正しい型を指定
}

const Home: NextPageWithLayout<Props> = ({ allBlogs, categoryBlogs }) => {
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
      {/* スライダー */}
      <TopSlider />
      {/* <Splide aria-label="お気に入りの写真">
        <SplideSlide>
          <Image
            src="/top/slider_images/binforest.jpg"
            alt="瓶の中に森が広がる幻想的なイラスト"
            width={512}
            height={512}
            decoding="async"
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src="/top/slider_images/cat.jpg"
            alt="風船に囲まれた白猫のイラスト"
            width={512}
            height={512}
            decoding="async"
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src="/top/slider_images/frog.jpg"
            alt="カエルの顔のイラスト"
            width={512}
            height={512}
            decoding="async"
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src="/top/slider_images/monster.jpg"
            alt="けむくじゃらの青色の可愛いモンスターがバナナを抱きしめているイラスト"
            width={512}
            height={512}
            decoding="async"
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src="/top/slider_images/snackhouse.jpg"
            alt="森の中に佇むお菓子の家のイラスト"
            width={512}
            height={512}
            decoding="async"
          />
        </SplideSlide>
      </Splide> */}
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
