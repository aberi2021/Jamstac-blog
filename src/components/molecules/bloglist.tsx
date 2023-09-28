import type { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import FormatDate from '@/components/molecules/datetime'

// ブログデータの型
interface Blog {
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
            <ImageWrapper>
              <Image
                src={blog.eyecatch?.url || '/NoImage.png'} // 代替の画像パスを指定
                width={1200}
                height={630}
                alt={''}
              />
            </ImageWrapper>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <FormatDate date={blog.publishedAt} />
          </li>
        ))}
      </Articles>
    </>
  )
}

const Articles = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  li {
    background-color: #ededed;
    border: solid 1px #000;
    padding: 1rem;
  }
`

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1200/630;
    background-color: #fff;
  }
`

export default BlogList
