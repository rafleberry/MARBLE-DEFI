import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Stack, HStack } from '@chakra-ui/react'
import { LiquidityInfoType, LiquidityReturnType } from 'hooks/usePoolLiquidity'
import { Staked, Reward, Bonded, APR } from 'icons'
import { useTokenList } from 'hooks/useTokenList'
import { getMultiplePoolsLiquidity } from 'hooks/usePoolLiquidity'
import StyledCard from './components/StateCard'
import {
  getFarms,
  getSeeds,
  getStakedListByAccountId,
  getRewards,
  FarmInfo,
} from 'util/farm'
import { DEFAULT_PAGE_LIMIT } from 'util/pool'
import db from 'store/RefDatabase'
import DepositCard from './components/DepositCard'
import { useSelector } from 'react-redux'

const page = 1
const perPage = DEFAULT_PAGE_LIMIT

export const Dashboard = () => {
  const [tokenList] = useTokenList()
  const [isLoading, setIsloading] = useState(false)
  const [liquidity, setLiquidity] = useState<LiquidityInfoType[]>()
  const coinPrice = useSelector((state: any) => state.uiData.token_value)
  const [farms, setFarms] = useState<FarmInfo[]>()
  const rewardToken = 'dust.cmdev0.testnet'
  const [supportedTokens, pools] = useMemo(() => {
    const safePoolList = tokenList?.pools || []

    const poolIdsCollection = safePoolList
      .map(({ pool_id, token_address, decimals }) => {
        return { pool_id, token_address, decimals }
      })
      .filter(({ pool_id }) => {
        return !isNaN(pool_id)
      })

    return [tokenList, poolIdsCollection]
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [tokenList?.pools])
  const getNearDollarValue = async () => {
    return '4.5405'
  }
  useEffect(() => {
    setIsloading(true)
    // eslint-disable-line react-hooks/rules-of-hooks
    getMultiplePoolsLiquidity({
      pools,
      coinPrice,
    }).then(({ liquidity }: LiquidityReturnType) => {
      setLiquidity(liquidity)
      if (liquidity.length > 0) loadFarmInfoList(liquidity, tokenList?.pools)
      setIsloading(false)
    })
  }, [pools, coinPrice])
  const loadFarmInfoList = async (liquidity, pools) => {
    let Params: [
      Promise<Record<string, string>>,
      Promise<Record<string, string>>,
      Promise<Record<string, string>>,
      Promise<string>
    ]
    Params = [
      getStakedListByAccountId({}),
      getRewards({}),
      getSeeds({}),
      getNearDollarValue(),
    ]

    const resolvedParams: [
      Record<string, string>,
      Record<string, string>,
      Record<string, string>,
      string
    ] = await Promise.all(Params)

    const stakedList: Record<string, string> = resolvedParams[0]
    const rewardList: any = resolvedParams[1]
    const seeds: Record<string, string> = resolvedParams[2]
    const tokenPrice: string = resolvedParams[3]
    const tokenPriceList = {
      // Todo: this needs to be changed to dust
      [rewardToken]: {
        price: tokenPrice,
      },
    }

    const farms = await getFarms({
      page,
      perPage,
      stakedList,
      rewardList,
      tokenPriceList,
      seeds,
      liquidity,
      pools,
    })
    setFarms(farms)
    await db.cacheFarms(farms)
    const farmsCahced = await db.queryFarms()
  }
  const getTVL = () => {
    let tvl = 0
    if (!farms) return '0'
    farms.forEach((farm) => {
      if (!farm) return
      tvl += farm.pool.tvl
    })
    return tvl.toLocaleString()
  }
  return (
    <StyledDivForWrapper>
      <StyldedGrid>
        <StyledCard
          color="#99E39E"
          icon={<Staked />}
          title={
            <CTitle>
              Staked
              <br />
              Marble
            </CTitle>
          }
          value={<CValue>51.76%</CValue>}
        />
        <StyledCard
          color="#FE9A45"
          icon={<Bonded />}
          title={
            <CTitle>
              Bonded Liquidity
              <br />
              Ratio
            </CTitle>
          }
          value={<CValue>59.86%</CValue>}
        />
        <StyledCard
          color="#B0954A"
          icon={<Reward />}
          title={
            <CTitle>
              Daily Dao Staking
              <br />
              Reward
            </CTitle>
          }
          value={<CValue>136986.3</CValue>}
        />
        <StyledCard
          color="#FF5368"
          icon={<APR />}
          title={
            <CTitle>
              Liquidity Staking
              <br />
              APR
            </CTitle>
          }
          value={<CValue>260.41%</CValue>}
        />
      </StyldedGrid>
      <div className="pt-5">
        <Value style={{ fontFamily: 'Trajan' }}>Protocol Stats</Value>
        <StateContent className="dashboard-card">
          <StateElement className="z-9">
            <Title>Liquidity Pools</Title>
            <CValue>${getTVL()}</CValue>
          </StateElement>
          <StateElement className="z-9">
            <Title>Bonded Liquidity</Title>
            <CValue>$61,971.74</CValue>
          </StateElement>
          <StateElement className="z-9">
            <Title>Staked Marble</Title>
            <CValue>$61,971.74</CValue>
          </StateElement>
          <StateElement className="z-9">
            <Title>Treasury</Title>
            <CValue>$61,971.74</CValue>
          </StateElement>
        </StateContent>
        {farms && (
          <DepositCardWrapper className="pt-5">
            <DepositCard param={farms[1]} />
            <DepositCard param={farms[2]} />
          </DepositCardWrapper>
        )}
      </div>
    </StyledDivForWrapper>
  )
}

const StyledDivForWrapper = styled.div`
padding: 20px 10px;
position: relative;
row-gap: 30px;
overflow: auto;
max-height: 600px;
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
  row-gap: 30px;
  @media (max-width: 1550px) {
    padding: 20px 20px;
    row-gap: 15px;
  }
`
const StyldedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 25px;
  @media (max-width: 1550px) {
    grid-column-gap: 15px;
  }
`
const Title = styled.div`
  font-size: 16px;
  color: #a1a1a1;
  font-weight: 400;
  font-family: Trajan;
  @media (max-width: 1550px) {
    font-size: 14px;
  }
`

const Value = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: white;
  margin-bottom:15px;
  @media (max-width: 1550px) {
    font-size: 16px;
  }
`
const CTitle = styled.div`
  font-size: 15px;
  color: #a1a1a1;
  font-weight: 400;
  font-family: Trajan;
  @media (max-width: 1550px) {
    font-size: 12px;
  }
`

const CValue = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin-top:5px;
  @media (max-width: 1550px) {
    font-size: 14px;
  }
`
const StateContent = styled.div`
  padding: 20px;
  border-radius: 20px;
  display: flex;
  // backdrop-filter: blur(40px);
  // background-color: #2e303e;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // box-shadow: 0px 4px 40px rgb(42 47 50 / 9%),
  //   inset 0px 7px 24px rgb(109 109 120 / 20%);
  justify-content: space-around;
  @media (max-width: 1550px) {
    padding: 12px;
  }
`
const StateElement = styled.div`
  text-align: center;
`
const DepositCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`
