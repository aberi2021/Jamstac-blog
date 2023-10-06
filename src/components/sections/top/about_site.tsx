import styled from 'styled-components'

const TopAboutSite = () => {
  //:props
  return (
    <>
      <SectionTitle>このサイトについて💻</SectionTitle>
      <SectionContents>
        <p>
          このサイトはあべがブログを書いたり、Next.jsを練習したり、好き勝手するためのものです。
          <br />
          そのため、制作途中でガンガン崩れている場合もあります。ご了承ください。
        </p>
        <p>
          以下リンクでコードも見れます。拙いですがよろしければご確認ください。
          <br />
          <a
            href="https://github.com/aberi2021/jamstac-blog"
            aria-label="このサイトのGithubリポジトリへ移動する"
          >
            https://github.com/aberi2021/jamstac-blog
          </a>
          <br />
          ひたすらもがいているので、有識者の人がみたらめまいがするかもしれません。お気をつけください。
          <br />
          Next.jsもReactもTypeScriptも全然わからない、なんならJSも無理なレベルでほぼコピペとChatGPTにおんぶに抱っこです。
          <br />
          それでも楽しいので、理解を深めていきたいなと思っています。
        </p>
      </SectionContents>
    </>
  )
}

const SectionTitle = styled.h2`
  font-size: 4rem;
  text-align: center;
  font-family: vdl-megamarupop-futoline, sans-serif;
  font-weight: 400;
`

const SectionContents = styled.div`
  margin-top: 1rem;
`

export default TopAboutSite
