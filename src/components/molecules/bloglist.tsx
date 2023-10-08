import type { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import FormatDate from '@/components/molecules/datetime'
import VisuallyHidden from '@/components/atoms/visuallyhidden'
import { colorObj } from '@/styles/color'

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
  category: {
    name: string
  }
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
                <CategoryName>
                  {blog.category && blog.category.name}
                </CategoryName>
              </CardCategory>
              <CardTitle>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </CardTitle>
              <FormatDate date={blog.publishedAt} />
            </TextWrapper>
          </li>
        ))}
      </Articles>
      <LinkAria href={'/blogs'}>
        ブログを全て見る<LinkEye>👀</LinkEye>
      </LinkAria>
    </>
  )
}

const ImageWrapper = styled.div`
  filter: grayscale(0%);
  transition: all 0.3s;
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
  a {
    text-decoration: none; /* デフォルトの下線を非表示にする */
    background-image: linear-gradient(
      90deg,
      ${colorObj.mainColor},
      ${colorObj.mainColor}
    ); /* 線の色 */
    background-repeat: no-repeat;
    background-position: left bottom; /* 線の起点を左・下に設定 */
    background-size: 0; /* 線の横幅を0、縦幅を1pxに */
    transition: background-size 0.2s; /* 線を伸ばすアニメーション実行時間を指定 */
  }
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
  border-top: 2px solid ${colorObj.baseDarkGray};
  border-left: 2px solid ${colorObj.baseDarkGray};
  position: relative;
  li {
    position: relative;
    border-bottom: 2px solid ${colorObj.baseDarkGray};
    border-right: 2px solid ${colorObj.baseDarkGray};
    background-color: ${colorObj.baseGray};
    transition: all 0.3s;
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
    border: 5px solid transparent;
    transition: all 0.3s;
  }
  li:hover ${ImageWrapper} {
    filter: grayscale(100%);
  }
  li:hover ${CardTitle} a {
    background-size: 100%; /* 線の横幅を100%にする */
  }
  li:hover {
    background: ${colorObj.subGray};
  }
`

const LinkEye = styled.span``

const LinkAria = styled(Link)`
  border-bottom: 2px solid ${colorObj.baseDarkGray};
  padding: 1rem 0;
  text-align: center;
  display: block;
  background-color: ${colorObj.mainColor};
  font-weight: 700;
  transition: all 0.2s;
  font-size: 1.25rem;
  ${LinkEye} {
    opacity: 0;
    transition: all 0.1s;
    font-size: 2rem;
    vertical-align: middle;
    margin-left: 0.5rem;
  }
  &:hover {
    background: ${colorObj.subColor};
    ${LinkEye} {
      opacity: 1;
    }
  }
`

export default BlogList
