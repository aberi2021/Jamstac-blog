import type { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import FormatDate from '@/components/molecules/datetime'
import VisuallyHidden from '../atoms/visuallyhidden'

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
            <TextWrapper>
              <CardCategory>
                <VisuallyHidden label="カテゴリー名" />
                <CategoryName>カテゴリー名</CategoryName>
              </CardCategory>
              <CardTitle>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </CardTitle>
              <FormatDate date={blog.publishedAt} />
            </TextWrapper>
          </li>
        ))}
      </Articles>
    </>
  )
}

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1200/630;
    background-color: #fff;
  }
`

const TextWrapper = styled.div`
  padding: 1rem;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.5rem;
  time {
    align-self: end;
    justify-self: start;
  }
`

const CardCategory = styled.div``

const CategoryName = styled.span`
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-weight: 700;
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
`

const CardTitle = styled.p`
  && {
    font-weight: 700;
    margin-top: 0;
    font-size: 1.25rem;
  }
`

const Articles = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  li {
    display: grid;
    grid-template-rows: auto 1fr;
    border: solid 3px #000;
    overflow: hidden;
    border-radius: 22px;
    box-shadow: 5px 5px 0 #000;
    position: relative;
  }
  li:hover {
    box-shadow: 5px 5px 0 #b7ff00;
    /* ${CardTitle} {
      border-bottom: 3px solid #b7ff00;
    } */
  }
  li:has(a:focus) {
    box-shadow: 5px 5px 0 #b7ff00;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

export default BlogList
