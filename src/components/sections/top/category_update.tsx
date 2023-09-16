import Link from 'next/link'
import TopSection from '@/components/layout/top_section'
import { client } from '@/lib/client'
import { GetStaticProps } from 'next'
import { FC } from 'react'

// ブログデータの型
interface Blog {
  id: string
  title: string
  // 他のプロパティもここに追加するか、実際のデータ構造に合わせて調整
}

type Props = {
  categoryBlogs: Blog[] // 正しい型を指定
}

const TopCategoryBlogs: FC<Props> = ({ categoryBlogs }) => {
  return (
    <TopSection label={'カテゴリー「更新情報」の新着三件を取得'}>
      <ul>
        {categoryBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </TopSection>
  )
}

// カテゴリー別新着三件（更新情報）を取得（ここでカテゴリーIDを指定）
export const getStaticProps: GetStaticProps = async () => {
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
      categoryBlogs: categoryBlogs.contents,
    },
  }
}

export default TopCategoryBlogs
