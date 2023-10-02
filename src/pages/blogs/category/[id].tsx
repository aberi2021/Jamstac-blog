import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import { NextPageWithLayout } from '@/pages/_app'
import BreadCrumb from '@/components/molecules/breadcrumb'
import { NextSeo } from 'next-seo'
import Button from '@/components/atoms/button'
import styled from 'styled-components'
import BlogList from '@/components/molecules/bloglist'

type Blog = {
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
  category: Blog['category']
}

const AllBlogs: NextPageWithLayout<Props> = ({ allBlogs, category }) => {
  return (
    <>
      <NextSeo title={category.name} />
      <BreadCrumb pageTitle={category.name} />
      <ContentsWrapper>
        <PageTitle>{category.name}</PageTitle>
        <BlogList allBlogs={allBlogs} />
      </ContentsWrapper>
      <ButtonWrapper>
        <Button href={'/'} label={'トップへ戻る'} />
      </ButtonWrapper>
    </>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'category' })

  const paths = data.contents.map(
    (content: { id: string }) => `/blogs/category/${content.id}`
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
    endpoint: 'category',
    contentId: id, // カテゴリーのIDを指定
  })

  return {
    props: {
      allBlogs: data.contents,
      category: categoryData, // カテゴリー情報をセット
    },
  }
}

const PageTitle = styled.h1`
  margin-top: 2rem;
`

const ContentsWrapper = styled.div`
  margin-top: 2rem;
`

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default AllBlogs
