import React from 'react'
import styled from 'styled-components'

type ListItem = {
  string: string
  path: string
}

type BreadCrumbsProps = {
  lists: ListItem[] | null | undefined
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ lists }) => {
  if (!lists) {
    return null // リストが存在しない場合、null を返す
  }

  return (
    <BreadCrumbsList aria-label="現在地の階層">
      {lists.map(({ string, path }, index) => (
        <li key={index}>
          {lists.length - 1 !== index ? (
            <>
              <a href={path}>{string}</a>
              {'/'}
            </>
          ) : (
            <span aria-current="page">{string}</span>
          )}
        </li>
      ))}
    </BreadCrumbsList>
  )
}

const BreadCrumbsList = styled.ol`
  display: flex;
`

export default BreadCrumbs
