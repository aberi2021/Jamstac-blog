import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { FC } from 'react'
import styled from 'styled-components'

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  date: string
}

// UTC -> "2022_04" のフォーマットに変換
const FormatDate: FC<Props> = ({ date }) => {
  const formattedDate: string = dayjs
    .utc(date)
    .tz('Asia/Tokyo')
    .format('YYYY年MM月DD日')

  const timeDate: string = dayjs.utc(date).tz('Asia/Tokyo').format('YYYY-MM-DD')

  return (
    <>
      <Time dateTime={timeDate}>{formattedDate}</Time>
    </>
  )
}

const Time = styled.time`
  display: block;
`

export default FormatDate
