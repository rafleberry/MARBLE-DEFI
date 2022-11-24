import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getRewardByTokenId } from 'util/farm'
import { toReadableNumber } from 'util/numbers'
import { Button } from 'components/Button'
import { formatTokenBalance } from 'util/conversion'
import { withdrawReward } from 'util/m-token'
import { rewardToken } from 'util/constants'

export const RewardCard: React.FC = ({}) => {
  const [reward, setReward] = useState('0')
  const rewardToken = 'dust.cmdev0.testnet'
  const decimals = 8
  const REWARD_TOKEN_DECIMAL = 8
  const nearPrice = useSelector((state: any) => state.coinData.near_value)
  const dustPriceInNear = useSelector(
    (state: any) => state.uiData.token_value[rewardToken]
  )
  const dustPrice = dustPriceInNear * nearPrice

  useEffect(() => {
    getRewardByTokenId(rewardToken).then((reward) => {
      setReward(reward)
    })
  }, [])

  const withdraw = () => {
    withdrawReward({ token_id: rewardToken, amount: reward })
  }

  return (
    <StyledElementForCard className="dashboard-card">
      <StyledHeader>My reward</StyledHeader>
      <StyledRewardWrapper>
        <StyledDust>{`${toReadableNumber(
          REWARD_TOKEN_DECIMAL,
          reward
        )} DUST`}</StyledDust>
        <StyledDollar>{`$${formatTokenBalance(
          dustPrice * Number(toReadableNumber(REWARD_TOKEN_DECIMAL, reward))
        )}`}</StyledDollar>
      </StyledRewardWrapper>
      <StyledButtonWrapper>
        <PrimaryButton onClick={withdraw}>Withdraw</PrimaryButton>
      </StyledButtonWrapper>
    </StyledElementForCard>
  )
}

const StyledHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-family: Trajan;
`
const StyledDollar = styled.div`
  font-size: 20px;
  padding-top: 10px;
  font-weight: 700;
`
const StyledDust = styled.div`
  font-family: Trajan;
  font-size: 16px;
`

const StyledElementForCard = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 24px;
  margin-bottom: 10px;
  // backdrop-filter: blur(40px);
  border-radius: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  overflow: hidden;
  // background-color: #2e303e;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // box-shadow: 0px 4px 40px rgb(42 47 50 / 9%),
  //   inset 0px 7px 24px rgb(109 109 120 / 20%);
`

const StyledRewardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const StyledButtonWrapper = styled.div``
const PrimaryButton = styled(Button)`
  border: 1px solid rgba(255, 255, 255, 0.23);
  box-shadow: 0px 4px 40px rgba(42, 47, 50, 0.09),
    inset 0px 7px 24px rgba(109, 109, 120, 0.47);
  backdrop-filter: blur(40px);
  /* Note: backdrop-filter has minimal browser support */
  background: rgba(5, 6, 21, 0.2);
  border-radius: 10px;
  font-family: Trajan;
  font-size: 16px;
  font-weight: 500;
`
