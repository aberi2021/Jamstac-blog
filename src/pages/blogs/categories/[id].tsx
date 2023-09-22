import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import { NextPageWithLayout } from '@/pages/_app'
import BreadCrumb from '@/components/molecules/breadcrumb'
import { NextSeo } from 'next-seo'
import Button from '@/components/atoms/button'
import styled from 'styled-components'

// ブログデータの型
interface Blog {
  id: string
  title: string
  name: string
}

type Props = {
  allBlogs: Blog[]
  pageTitle: string // pageTitleを追加
}

const AllBlogs: NextPageWithLayout<Props> = ({ allBlogs, pageTitle }) => {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (allBlogs.length === 0) {
    return (
      <>
        <NextSeo title={pageTitle} /> {/* pageTitleを使用 */}
        <BreadCrumb pageTitle={pageTitle} />
        <div>ブログコンテンツがありません</div>
        <ButtonWrapper>
          <Button href={'/'} label={'トップへ戻る'} />
        </ButtonWrapper>
      </>
    )
  }
  return (
    <div>
      <NextSeo title={pageTitle} /> {/* pageTitleを使用 */}
      <BreadCrumb pageTitle={pageTitle} />
      <h2>{pageTitle}</h2>
      <p>
        カテゴリー名がパンクズに出ないし、見出しにもとってこれない。今はベタうちされてるだけなのだよ。
      </p>
      <ul>
        {allBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <ButtonWrapper>
        <Button href={'/'} label={'トップへ戻る'} />
      </ButtonWrapper>
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'categories' })

  const paths = data.contents.map(
    (content: { id: string }) => `/blogs/categories/${content.id}`
  )
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  context
) => {
  const { params } = context
  if (!params || !params.id) {
    return {
      notFound: true, // パラメーターが存在しない場合、404 エラーを返す
    }
  }

  // パラメーターから id を取得
  const id = params.id
  // 正しいフィルターを使用してブログデータを取得
  const data = await client.get({
    endpoint: 'blogs',
    queries: { limit: 1000, filters: `category[equals]${id}` },
  })

  return {
    props: {
      allBlogs: data.contents,
      pageTitle: 'カテゴリー名を取得したいだけなのに', // pageTitleを適切な値に設定
    },
  }
}

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default AllBlogs
