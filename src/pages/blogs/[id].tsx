import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { client } from '@/lib/client'
import Image from 'next/image'
import Button from '@/components/atoms/button'

//型定義
type Props = {
  data: {
    content: string
    createsAt: string
    eyecatch: {
      url: string
      height: number
      width: number
    }
    id: string
    publishedAt: string
    revisedAt: string
    title: string
    updateAt: string
  }
}

const NewsDetail: NextPage<Props> = (props) => {
  console.log(props)

  return (
    <>
      <h1>{props.data.title}</h1>
      <Button href={'/'} label={'トップへ戻る'} />
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
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.get({ endpoint: 'blogs', queries: { limit: 1000 } })

  const paths = res.contents.map((post) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await client.get({ endpoint: 'blogs', contentId: params.id })

  return {
    props: {
      data: res,
    },
  }
}

export default NewsDetail
