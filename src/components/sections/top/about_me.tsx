import styled from 'styled-components'
import Button from '@/components/atoms/button'

const TopAboutSite = () => {
  //:props
  return (
    <>
      <SectionTitle>わたしについて🙋‍♀️</SectionTitle>
      <SectionContents>
        <p>
          宮崎県在住のほぼ無職のコーダーです。就職活動中です。
          <br />
          マークアップが好きです。
          <br />
          アクセシビリティを頑張れる会社で働きたいです！
        </p>
        <ButtonWrapper>
          <Button href={`/about`} label={`あべについてもっと知る`} />
        </ButtonWrapper>
      </SectionContents>
    </>
  )
}

const SectionTitle = styled.h2`
  font-size: 4rem;
  text-align: center;
  font-family: vdl-megamarupop-futoline, sans-serif;
  font-weight: 400;
  text-shadow: 4px 3px 0 #b7ff00;
`

const SectionContents = styled.div`
  margin-top: 1rem;
`
const ButtonWrapper = styled.div`
  margin: 2rem;
  text-align: center;
`

export default TopAboutSite
