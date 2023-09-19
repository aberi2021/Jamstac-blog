import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from '@/pages/_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import Button from '@/components/atoms/button'
import BreadCrumbs from '@/components/molecules/breadcrumb'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

// ブログデータの型
interface Blog {
  id: string
  title: string
}

type Props = {
  allBlogs: Blog[]
  pageTitle: string // pageTitleを追加
}

const AllBlogs: NextPageWithLayout<Props> = ({ allBlogs, pageTitle }) => {
  return (
    <>
      <NextSeo title={pageTitle} /> {/* pageTitleを使用 */}
      <BreadCrumbs
        lists={[
          {
            string: 'トップページ',
            path: '/',
          },
          {
            string: pageTitle, // タイトルを表示する
            path: '', // path プロパティを追加し、空文字列を指定
          },
        ]}
      />
      <PageTitle>{pageTitle}</PageTitle>
      <AllBlogList>
        <ul>
          {allBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </AllBlogList>
      <ButtonWrapper>
        <Button href={'/'} label={'トップへ戻る'} />
      </ButtonWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allBlogs = await client.get({
    endpoint: 'blogs',
    queries: { limit: 1000, orders: '-date' },
  })

  return {
    props: {
      allBlogs: allBlogs.contents,
      pageTitle: '記事一覧', // pageTitleを適切な値に設定
    },
  }
}

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

const PageTitle = styled.h1`
  margin-top: 2rem;
`

const AllBlogList = styled.div`
  margin-top: 1rem;
`

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`

export default AllBlogs
