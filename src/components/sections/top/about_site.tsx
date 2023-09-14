import style from '@/styles/Home.module.css'
import TopSection from '@/components/atoms/top_section'

const TopAboutSite = () => {
  //:props
  return (
    <TopSection label={'このサイトについて'}>
      <p className={style.top_about_p}>
        このサイトはあべがブログを書いたり、Next.jsを練習したり、好き勝手するためのものです。
        <br />
        そのため、制作途中でガンガン崩れている場合もあります。ご了承ください。
        <br />
        今の所練習用のブログ記事しかありません。今後頑張る所存です。
      </p>
      <p className={style.top_about_p}>
        こちらでコードも見れます。拙いですがよろしければご確認ください。
        <br />
        <a
          href="https://github.com/aberi2021/jamstac-blog"
          aria-label="このサイトのGithubリポジトリへ移動する"
        >
          https://github.com/aberi2021/jamstac-blog
        </a>
      </p>
    </TopSection>
  )
}

export default TopAboutSite
