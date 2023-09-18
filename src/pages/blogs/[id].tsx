import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'
import Image from 'next/image'
import Button from '@/components/atoms/button'
import BreadCrumbs from '@/components/molecules/breadcrumb'

type Props = {
  data: {
    content: string
    createdAt: string
    eyecatch?: {
      url: string
      height: number
      width: number
    }
    id: string
    publishedAt: string
    revisedAt: string
    title: string
    updatedAt: string
  }
}

const BlogDetail: NextPageWithLayout<Props> = (props) => {
  const { title, content, eyecatch } = props.data

  return (
    <>
      <NextSeo title={`${title} | あべのサイト`} />
      <BreadCrumbs
        lists={[
          {
            string: 'トップページ',
            path: '/',
          },
          {
            string: props.data.title, // タイトルを表示する
            path: '', // path プロパティを追加し、空文字列を指定
          },
        ]}
      />
      <BlogTitle>{title}</BlogTitle>
      {eyecatch && ( // eyecatch が存在する場合にのみ表示
        <Image
          src={eyecatch.url}
          width={eyecatch.width}
          height={eyecatch.height}
          alt={''}
        />
      )}
      <ContentsWrapper>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </ContentsWrapper>
      <Button href={'/'} label={'トップへ戻る'} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.get({ endpoint: 'blogs', queries: { limit: 1000 } })

  const paths = res.contents.map((post: { id: string }) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string
  const res = await client.get({ endpoint: 'blogs', contentId: id })

  return {
    props: {
      data: res,
    },
  }
}

BlogDetail.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

//styled-component
const BlogTitle = styled.h1`
  margin-top: 1rem;
`
const ContentsWrapper = styled.div`
  margin-top: 1rem;
  pre,
  code {
    background-color: #000;
    color: #fff;
    font-size: 1rem;
  }
  pre {
    padding: 1rem;
    margin-top: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: auto;
  }
  p > code {
    padding: 0 0.5rem;
  }
`

export default BlogDetail
