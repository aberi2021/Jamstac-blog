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
type Props = {
  allBlogs: {
    id: string
    title: string
    name: string
  }[]
  category: {
    name: string
  }
}

const AllBlogs: NextPageWithLayout<Props> = ({ allBlogs, category }) => {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (allBlogs.length === 0) {
    return (
      <>
        <NextSeo title={category.name} />
        <BreadCrumb pageTitle={category.name} />
        <div>ブログコンテンツがありません</div>
        <ButtonWrapper>
          <Button href={'/'} label={'トップへ戻る'} />
        </ButtonWrapper>
      </>
    )
  }
  return (
    <div>
      <NextSeo title={category.name} />
      <BreadCrumb pageTitle={category.name} />
      <h2>{category.name}</h2>
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

  // カテゴリー名を取得し、Propsのcategoryにセット
  const categoryData = await client.get({
    endpoint: 'categories',
    contentId: id, // カテゴリーのIDを指定
  })

  return {
    props: {
      allBlogs: data.contents,
      category: categoryData, // カテゴリー情報をセット
    },
  }
}

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default AllBlogs
