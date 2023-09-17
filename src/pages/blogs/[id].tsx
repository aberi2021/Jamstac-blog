import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
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
      <h1>{title}</h1>
      {eyecatch && ( // eyecatch が存在する場合にのみ表示
        <Image
          src={eyecatch.url}
          width={eyecatch.width}
          height={eyecatch.height}
          alt={''}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
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

export default BlogDetail
