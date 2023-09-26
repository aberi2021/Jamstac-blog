import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

type Props = {
  pageTitle: string
}

const BreadCrumb: NextPage<Props> = ({ pageTitle }) => {
  const router = useRouter()
  const paths = decodeURI(router.asPath).substring(1).split('/')
  let currentPath = ''

  return (
    <nav aria-label="現在位置">
      <BreadcrumbList>
        <li>
          <Link href={'/'}>トップページ</Link>
        </li>
        {paths.map((x, i) => {
          if (x === 'categories') {
            return null // category がある場合は何も表示しない
          }
          currentPath += '/' + x
          return (
            <React.Fragment key={i}>
              {i === paths.length - 1 ? (
                <li aria-current="page">
                  <a aria-current="page">{pageTitle}</a>
                </li>
              ) : (
                <li>
                  <Link href={currentPath} key={i}>
                    {x === 'blogs' ? '全ての記事' : x}
                  </Link>
                </li>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </nav>
  )
}

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
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
