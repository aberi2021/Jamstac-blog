import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  pageTitle: string
}

const BreadCrumb: NextPage<Props> = ({ pageTitle }) => {
  const router = useRouter()
  const paths = decodeURI(router.asPath).substring(1).split('/')
  let currentPath = ''

  return (
    <div>
      <Link href={'/'}>トップページ</Link>
      {paths.map((x, i) => {
        currentPath += '/' + x
        return (
          <React.Fragment key={i}>
            {'>'}
            {i === paths.length - 1 ? (
              x === 'blogs' ? (
                <span>ブログ</span>
              ) : (
                <span>{pageTitle}</span>
              )
            ) : (
              <Link href={currentPath} key={i}>
                {x === 'blogs' ? 'ブログ' : x}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumb
