import { GetStaticProps } from 'next'
import type { NextPageWithLayout } from '@/pages/_app'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import Link from 'next/link'
import Button from '@/components/atoms/button'
import BreadCrumbs from '@/components/molecules/breadcrumb'

// ブログデータの型
interface Blog {
  id: string
  title: string
}

type Props = {
  allBlogs: Blog[]
}

const AllBlogs: NextPageWithLayout<Props> = ({ allBlogs }) => {
  const pageTitle = allBlogs.length > 0 ? allBlogs[0].title : ''

  return (
    <>
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
      <div>
        <ul>
          {allBlogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Button href={'/'} label={'トップへ戻る'} />
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
    },
  }
}

AllBlogs.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default AllBlogs
