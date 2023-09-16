import { GetStaticPaths, GetStaticProps } from 'next'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'
import Image from 'next/image'
import Button from '@/components/atoms/button'

type Props = {
  data: {
    content: string
    createdAt: string
    eyecatch: {
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
  return (
    <>
      <h1>{props.data.title}</h1>
      <Image
        src={props.data.eyecatch.url}
        width={props.data.eyecatch.width}
        height={props.data.eyecatch.height}
        //数値を指定してもOK
        // width={1000}
        // height={500}

        //空の場合
        alt={''}
        //タイトルを入れる場合
        //alt={props.data.title}
      />
      <div dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
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
