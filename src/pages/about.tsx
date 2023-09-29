import { NextPageWithLayout } from 'next'
import { GetStaticProps } from 'next'
import DefaultLayout from '@/components/layout/default-layout'
import { client } from '@/lib/client'

type Props = {
  about: {
    context: string
  }
}

const About: NextPageWithLayout<Props> = ({ about }) => {
  return (
    <>
      <h1>About</h1>
      <div>{about.context}</div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // 全体記事新着6件を取得
  const about = await client.get({
    endpoint: 'about',
  })

  return {
    props: {
      about: about.contents,
    },
  }
}

About.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default About
