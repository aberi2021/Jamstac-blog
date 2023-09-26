import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'
import Image from 'next/image'
import Button from '@/components/atoms/button'
import Link from 'next/link'

//パンクズ
import BreadCrumb from '@/components/molecules/breadcrumb'

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
  prevPost: {
    id: string
    title: string
  } | null
  nextPost: {
    id: string
    title: string
  } | null
}

const BlogDetail: NextPageWithLayout<Props> = (props) => {
  const { title, content, eyecatch } = props.data
  const { prevPost, nextPost } = props
  // const pageTitle = title

  return (
    <>
      <NextSeo title={`${title} | あべのサイト`} />
      <BlogPage>
        <BreadCrumb pageTitle={title} />
        <BlogTitle>{title}</BlogTitle>
        {eyecatch && (
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
        <PrevNextPosts>
          {prevPost && (
            <p>
              <Link href={`/blogs/${prevPost.id}`}>
                前の記事：{prevPost.title}
              </Link>
            </p>
          )}
          {nextPost && (
            <p>
              <Link href={`/blogs/${nextPost.id}`}>
                次の記事：{nextPost.title}
              </Link>
            </p>
          )}
        </PrevNextPosts>
        <ButtonWrapper>
          <Button href={'/'} label={'トップへ戻る'} />
        </ButtonWrapper>
      </BlogPage>
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

  // 全ての記事を取得する
  const resAllPosts = await client.get({ endpoint: 'blogs' })
  const allPosts = resAllPosts.contents

  // 現在の記事のインデックスを取得
  const currentIndex = allPosts.findIndex(
    (post: { id: string }) => post.id === id
  )

  // 前の記事と次の記事を取得
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return {
    props: {
      data: res,
      prevPost,
      nextPost,
    },
  }
}

BlogDetail.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

const BlogPage = styled.div`
  margin-top: 1rem;
  max-width: 47rem;
  margin: 0 auto;
`

const BlogTitle = styled.h1`
  font-size: 2rem;
  margin-top: 2rem;
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

const PrevNextPosts = styled.div`
  background-color: #ededed;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid #333;
`

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`

export default BlogDetail
