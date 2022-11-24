import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Button } from 'components/Button'
import { getPoolLiquidity, LiquidityType } from 'hooks/usePoolLiquidity'
import { protectAgainstNaN } from 'util/conversion'
import { unsafelyGetTokenInfoFromAddress } from 'hooks/useTokenInfo'
import { useNearDollarValue } from 'hooks/useTokenDollarValue'
import { nearViewFunction } from 'util/near'
import { convertMicroDenomToDenom } from 'util/conversion'
import { useSelector } from 'react-redux'

const DepositCard = ({ param }) => {
  const { pool } = param
  const decimals = 24
  const [tokenPrice, setTokenPrice] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const nearPrice = useNearDollarValue()
  const token = unsafelyGetTokenInfoFromAddress(param.tokenIds[0])
  const coinPrice = useSelector((state: any) => state.uiData.token_value)
  useEffect(() => {
    getPoolLiquidity({
      poolId: Number(pool.id),
      tokenAddress: [param.tokenIds[0], param.tokenIds[1]],
      decimals,
      coinPrice,
    })
      .then(({ liquidity }) => {
        setTokenPrice(
          protectAgainstNaN(liquidity.reserve[1] / liquidity.reserve[0]) *
            nearPrice
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }, [param, coinPrice])
  useEffect(() => {
    ;(async () => {
      const total_supply = await nearViewFunction({
        tokenAddress: param.tokenIds[0],
        methodName: 'ft_total_supply',
        args: {},
      })
      setTotalSupply(convertMicroDenomToDenom(total_supply, 8))
    })()
  }, [param])
  return (
    <Container className="dashboard-card">
      <Header>
        <IconWrapper>
          <Img src={token.icon} alt="token" />
          {token.symbol}
        </IconWrapper>
        ${tokenPrice.toFixed(2)}
      </Header>
      <ValueCard>
        <h3>Supply</h3>
        <p>{totalSupply.toLocaleString()}</p>
      </ValueCard>
      <ValueCard>
        <h3>Market Cap</h3>
        <p>{(totalSupply * tokenPrice).toLocaleString()}</p>
      </ValueCard>
      <ButtonWrapper>
        <Link href="/swap">
          <StyledButton className="btn-default btn-wrapper" variant="primary">
            {' '}
            Buy
          </StyledButton>
        </Link>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 20px;
  // background-color: #2e303e;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // box-shadow: 0px 4px 40px rgb(42 47 50 / 9%),
    inset 0px 7px 24px rgb(109 109 120 / 20%);
  padding: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  // backdrop-filter: blur(40px);
  width: 100%;
  @media (max-width: 1550px) {
    padding: 20px;
  }
`
const IconWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 24px;
  align-items: center;
  font-family: Trajan;
  font-weight: 500;
  margin-bottom:20px;
  @media (max-width: 1550px) {
    font-size: 16px;
  }
`
const Img = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 1550px) {
    width: 30px;
    height: 30px;
  }
`
const Header = styled.div`
  font-size: 28px;
  font-weight: 700;
  display: flex;
  width: 100%;
  // align-items: center;
  justify-content: space-between;
  @media (max-width: 1550px) {
    font-size: 18px;
  }
`
const ValueCard = styled.div`
  width: 100%;
  border-radius: 18px;
  background: rgb(255 255 255 / 9%);
  height: 76px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    color: rgba(255, 255, 255, 0.7);
    font-family: Trajan;
    font-size: 20px;
  }

  p {
    font-size: 24px;
    color: #ffffff;
    font-family: Mulish;
  }
  @media (max-width: 1550px) {
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 16px;
    }
    height: 50px;
  }
`

const ButtonWrapper = styled.div`
  align-self: center;
`

const StyledButton = styled(Button)`
  background: #ffffff;
  color: black;
  stroke: black;
  border-radius: 20px;
  padding: 10px 30px;
  box-shadow: 0px 4px 40px rgba(42, 47, 50, 0.09);
  margin-top:15px;
  // font-weight:500;
  // font-family:'Trajan;
`

export default DepositCard
