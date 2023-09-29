import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

type Props = {
  pageTitle: string
  category?: {
    name: string
    id: string // カテゴリーのIDを追加
  }
}

const BreadCrumb: NextPage<Props> = ({ pageTitle, category }) => {
  const router = useRouter()
  const paths = decodeURI(router.asPath).substring(1).split('/')

  return (
    <nav aria-label="現在位置">
      <BreadcrumbList>
        <li>
          <Link href={'/'}>トップページ</Link>
        </li>
        {paths.map((x, i) => {
          if (x === 'category') return null // category がある場合は何も表示しない
          const currentPath = '/' + paths.slice(0, i + 1).join('/')
          return (
            <li key={i}>
              {i === paths.length - 1 ? (
                <a aria-current="page">{pageTitle}</a>
              ) : i === paths.length - 2 && category ? (
                <Link href={`/blogs/category/${category.id}`}>
                  {category.name}
                </Link>
              ) : (
                <Link href={currentPath}>
                  {x === 'blogs' ? '全ての記事' : x}
                </Link>
              )}
            </li>
          )
        })}
      </BreadcrumbList>
    </nav>
  )
}

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  li:not(:first-child)::before {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.1rem 0.5rem 0.1rem 0;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    transform: rotate(45deg);
  }
  a {
    margin-right: 0.5rem;
  }
`

export default BreadCrumb
