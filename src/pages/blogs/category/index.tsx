// pages/index.js
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'
import { NextPageWithLayout } from '@/pages/_app'

// ブログデータの型
interface Blog {
  id: string
  title: string
  name: string
}

type Props = {
  allBlogs: Blog[]
  categories: { id: string; name: string }[]
}

const CategoryArticleList: NextPageWithLayout<Props> = ({
  allBlogs,
  categories,
}) => {
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {allBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: 'blogs' })
  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: 'categories' })

  return {
    props: {
      allBlogs: data.contents,
      categories: categoryData.contents,
    },
  }
}

CategoryArticleList.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default CategoryArticleList
