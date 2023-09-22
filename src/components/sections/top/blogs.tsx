// import Link from 'next/link'
// import { client } from '@/lib/client'
// import { GetStaticProps } from 'next'
// import { FC } from 'react'
// import styled from 'styled-components'

// // ブログデータの型
// interface Blog {
//   id: string
//   title: string
// }

// type Props = {
//   allBlogs: Blog[]
// }

// const TopBlogs: FC<Props> = ({ allBlogs }) => {
//   return (
//     <TopSection>
//       <SectionTitle>全体記事の新着三件を取得</SectionTitle>
//       <ul>
//         {allBlogs.map((blog) => (
//           <li key={blog.id}>
//             <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </TopSection>
//   )
// }

// export const getStaticProps: GetStaticProps = async () => {
//   // 全体記事新着三件を取得
//   const allBlogs = await client.get({
//     endpoint: 'blogs',
//     queries: { limit: 3, orders: '-date' },
//   })

//   return {
//     props: {
//       allBlogs: allBlogs.contents,
//     },
//   }
// }

// const TopSection = styled.div``

// const SectionTitle = styled.h2`
//   font-size: 1.5rem;
// `
// export default TopBlogs
