import styled from 'styled-components'
import { GetStaticProps, NextPageWithLayout } from 'next'
import { client } from '@/lib/client'
import DefaultLayout from '@/components/layout/default-layout'

const Home: NextPageWithLayout = (props) => {
  console.log(props)
  return (
    <>
      <Main></Main>
    </>
  )
}

const Main = styled.main``

export const getStaticProps: GetStaticProps = async () => {
  const res = await client.get({ endpoint: 'blogs' })
  return {
    props: {
      date: res.contents,
    },
  }
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default Home
