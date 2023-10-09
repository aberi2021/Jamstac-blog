import styled from 'styled-components'
import { contentsWidth } from '@/styles/globals'
// import Link from 'next/link'

const TopAboutSite = () => {
  //:props
  return (
    <>
      <SectionContents>
        <p>
          このサイトはあべのNext.js練習用兼ポートフォリオサイトです。
          <br />
          以下リンクでコードも見れます。拙いですがよろしければご確認ください。
          <br />
          <a href="https://github.com/aberi2021/jamstac-blog">
            このサイトのGithubリポジトリへ移動する
          </a>
        </p>
        <p>
          Next.jsもReactもTypeScriptも全然わからない、なんならJSも無理なレベルでほぼコピペとChatGPTにおんぶに抱っこです。
          <br />
        </p>
        {/* <h2>この記事を読んだらもっとわかるかも？</h2>
        <ul>
          <li>
            <Link href={`/blogs/rv4ohmwsguu`}>
              さっさとコードから書いておけばよかった
            </Link>
          </li>
        </ul> */}
      </SectionContents>
    </>
  )
}

const SectionContents = styled.div`
  margin: 1rem auto 0;
  max-width: ${contentsWidth.default};
`

export default TopAboutSite
