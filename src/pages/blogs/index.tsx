import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from '@/pages/_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import Button from '@/components/atoms/button'
import BreadCrumb from '@/components/molecules/breadcrumb'
import BlogList from '@/components/molecules/bloglist'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

// ブログデータの型
interface Blog {
  id: string
  title: string
  name: string
}

type Props = {
  allBlogs: Blog[]
  categories: { id: string; name: string }[]
  pageTitle: string // pageTitleを追加
}

const AllBlogs: NextPageWithLayout<Props> = ({
  allBlogs,
  categories = [],
  pageTitle,
}) => {
  return (
    <>
      <NextSeo title={pageTitle} />
      <BreadCrumb pageTitle={pageTitle} />
      <PageTitle>{pageTitle}</PageTitle>
      <ContentsWrapper>
        <Categories>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/blogs/category/${category.id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </Categories>
        <BlogList allBlogs={allBlogs} />
      </ContentsWrapper>
      <ButtonWrapper>
        <Button href={'/'} label={'トップへ戻る'} />
      </ButtonWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allBlogs = await client.get({
    endpoint: 'blogs',
    queries: { limit: 1000, orders: '-date' },
  })
  const categoryData = await client.get({ endpoint: 'category' })

  return {
    props: {
      allBlogs: allBlogs.contents,
      categories: categoryData.contents,
      pageTitle: '全ての記事', // pageTitleを適切な値に設定
    },
  }
}

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

const PageTitle = styled.h1`
  margin-top: 2rem;
`

const ContentsWrapper = styled.div`
  margin-top: 2rem;
`

const Categories = styled.ul`
  display: flex;
  gap: 1rem;
  li {
    padding: 0.2rem 1rem;
    border-radius: 8px;
    background-color: #e2e2e2;
    font-weight: 700;
  }
`

// const Articles = styled.ul`
//   margin-top: 2rem;
// `

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`

export default AllBlogs
