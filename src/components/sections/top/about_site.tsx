import styled from 'styled-components'

const TopAboutSite = () => {
  //:props
  return (
    <>
      <SectionTitle>このサイトについて</SectionTitle>
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
    </>
  )
}

const SectionTitle = styled.h2`
  font-size: 1.5rem;
`

export default TopAboutSite
