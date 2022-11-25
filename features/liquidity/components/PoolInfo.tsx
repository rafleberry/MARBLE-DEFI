import { styled } from '@stitches/react'
import DateCountdown from 'components/DateCountdown'
import { useBaseTokenInfo, useTokenInfoByPoolId } from 'hooks/useTokenInfo'
import React from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../components/Button'
import { useSelector } from 'react-redux'
import { Text } from '../../../components/Text'
import { rewardToken } from 'util/constants'
import { GradientBackground } from 'styles/styles'

const incentiveStart = 'April 27, 2022 00:00:00 UTC+00:00'
const incentiveEnd = 'March 27, 2099 00:00:00 UTC+00:00'

interface PoolInfoProps {
  poolId: string
  tokenDollarValue: number
  myDailyReward?: string
  reward_interval: string
  start_at: string
  onClaim?: () => void
}

export const PoolInfo: React.FC<PoolInfoProps> = ({
  poolId,
  tokenDollarValue,
  myDailyReward,
  reward_interval,
  start_at,
  onClaim,
}) => {
  const token = useBaseTokenInfo()
  const tokenInfo = useTokenInfoByPoolId(Number(poolId))
  const nearPrice = useSelector((state: any) => state.coinData.near_value)
  const dustPriceInNear = useSelector(
    (state: any) => state.uiData.token_value[rewardToken]
  )
  const dustPrice = dustPriceInNear * nearPrice

  if (!poolId) return null
  const currentTimeStamp = Math.floor(new Date().getTime() / 1000)
  const rewardCount = Math.ceil(
    (currentTimeStamp - Number(start_at)) / Number(reward_interval)
  )
  const dateTo =
    (Number(start_at) + Number(reward_interval) * rewardCount) * 1000

  const onClaimReward = async () => {
    const now = new Date()
    if (
      now.getTime() < new Date(incentiveStart).getTime() ||
      now.getTime() > new Date(incentiveEnd).getTime()
    ) {
      toast.error('Rewards are not distributed yet!')
      return
    }
    onClaim()
  }
  return (
    <StyledElementForCard>
      <StyledElementForToken>
        <Title>Dust Price</Title>
        <Value>${dustPrice.toFixed(2)}</Value>
      </StyledElementForToken>
      <StyledElementForToken>
        <Title>Rewards distribution in</Title>
        <Value>
          <DateCountdown
            dateTo={dateTo || Number(new Date()) / 1000}
            loop
            interval={Number(reward_interval) || 0}
            mostSignificantFigure="hour"
            numberOfFigures={3}
          />
        </Value>
      </StyledElementForToken>
      {myDailyReward !== undefined && (
        <StyledElementForToken>
          <Title>Epoch Rewards Estimate</Title>
          <StyledContainerForToken>
            <StyledImageForToken
              as={token?.logoURI ? 'img' : 'div'}
              src={token?.logoURI}
              alt=""
            />
            <Value>{myDailyReward}</Value>
            <Button
              css={{
                width: '68px',
                height: '28px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                margin: '0 10px',
                fontSize: '10px',
                fontWeight: '600',
                color: 'black',
                background: 'white',
                fontFamily: 'Trajan',
                '@media (max-width: 1550px)': {
                  width: '50px',
                  height: '24px',
                },
              }}
              disabled={!Number(myDailyReward)}
              onClick={() => {
                if (!Number(myDailyReward)) return
                onClaimReward()
              }}
            >
              Claim
            </Button>
          </StyledContainerForToken>
        </StyledElementForToken>
      )}
    </StyledElementForCard>
  )
}

const StyledElementForCard = styled(GradientBackground, {
  padding: '20px 40px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 1550px)': {
    padding: '10px 40px',
  },
  '&:before': {
    borderRadius: '20px',
  },
})

const StyledElementForToken = styled('div', {
  display: 'flex',
  flex: 1,
  minWidth: 200,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '10px',
  '@media (max-width: 1550px)': {
    rowGap: '5px',
  },
})

const StyledImageForToken = styled('img', {
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#ccc',
  marginRight: 10,
})

const StyledContainerForToken = styled('div', {
  display: 'flex',
  alignItems: 'center',
})
const Title = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  color: '#A1A1A1',
  fontFamily: 'Trajan',
  '@media (max-width: 1550px)': {
    fontSize: '16px',
  },
})
const Value = styled('div', {
  fontSize: '20px',
  fontWeight: '600',
  '@media (max-width: 1550px)': {
    fontSize: '20px',
  },
})
