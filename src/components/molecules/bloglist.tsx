import type { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import styled from 'styled-components'

// ブログデータの型
interface Blog {
  id: string
  title: string
}

type Props = {
  allBlogs: Blog[]
}

const BlogList: NextPageWithLayout<Props> = ({ allBlogs }) => {
  return (
    <>
      <Articles>
        {allBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </Articles>
    </>
  )
}

const Articles = styled.ul`
  margin-top: 2rem;
`

export default BlogList
