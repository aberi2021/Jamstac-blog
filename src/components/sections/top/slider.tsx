import Image from 'next/image'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import styled from 'styled-components'

const TopSlider = () => {
  return (
    <>
      <SplideWrapper>
        <Splide aria-label="お気に入りの写真">
          <SplideSlide>
            <Image
              src="/top/slider_images/binforest.jpg"
              alt="瓶の中に森が広がる幻想的なイラスト"
              width={512}
              height={512}
              decoding="async"
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/top/slider_images/cat.jpg"
              alt="風船に囲まれた白猫のイラスト"
              width={512}
              height={512}
              decoding="async"
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/top/slider_images/frog.jpg"
              alt="カエルの顔のイラスト"
              width={512}
              height={512}
              decoding="async"
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/top/slider_images/monster.jpg"
              alt="けむくじゃらの青色の可愛いモンスターがバナナを抱きしめているイラスト"
              width={512}
              height={512}
              decoding="async"
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/top/slider_images/snackhouse.jpg"
              alt="森の中に佇むお菓子の家のイラスト"
              width={512}
              height={512}
              decoding="async"
            />
          </SplideSlide>
        </Splide>
        <p>
          スライダーは入れてみたかっただけです。画像はAdobe
          Fireflyで作りました。
        </p>
      </SplideWrapper>
    </>
  )
}

const SplideWrapper = styled.div`
  margin-top: 2rem;
`

export default TopSlider
