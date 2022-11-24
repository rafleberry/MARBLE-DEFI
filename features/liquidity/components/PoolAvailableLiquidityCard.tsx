import { ChakraProvider, Text, Stack } from '@chakra-ui/react'
import { styled } from 'components/theme'
import { convertMicroDenomToDenom, formatTokenBalance } from 'util/conversion'
import { parseCurrency } from './PoolCard'
import { LiquidityInfoType } from 'hooks/usePoolLiquidity'
import { useTokenInfo } from 'hooks/useTokenInfo'

type PoolAvailableLiquidityCardProps = Pick<
  LiquidityInfoType,
  'myLiquidity' | 'myReserve' | 'totalLiquidity' | 'tokenDollarValue'
> & {
  onButtonClick: () => void
  tokenASymbol: string
  tokenBSymbol: string
}

export const PoolAvailableLiquidityCard = ({
  onButtonClick,
  myLiquidity,
  myReserve,
  tokenDollarValue,
  totalLiquidity,
  tokenASymbol,
  tokenBSymbol,
}: PoolAvailableLiquidityCardProps) => {
  const tokenA = useTokenInfo(tokenASymbol)
  const tokenB = useTokenInfo(tokenBSymbol)
  return (
    <StyledElementForCardLayout className='dashboard-card'
      kind="wrapper"
      css={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
    >
      <StyledElementForCardLayout kind="content" name="liquidity">
        <Title>
          {typeof myLiquidity === 'number'
            ? `You own ${formatTokenBalance(
                ((myLiquidity as LiquidityInfoType['myLiquidity']).coins /
                  totalLiquidity.coins) *
                  100
              )}% of the pool`
            : 'Your liquidity'}
        </Title>
        <StyledTextForAmount>
          {parseCurrency(
            convertMicroDenomToDenom(myReserve[0]) * tokenDollarValue * 2 ||
              '0.00'
          )}
        </StyledTextForAmount>
      </StyledElementForCardLayout>
      <StyledElementForCardLayout className='dashboard-card'
        kind="wrapper"
        css={{ flexDirection: 'column', alignItems: 'flex-start',marginTop: '10px' }}
      >
        <>Underlying assets</>
        <StyledElementForTokens kind="wrapper">
          <StyledElementForTokens kind="element">
            <StyledImageForToken
              as={tokenA?.logoURI ? 'img' : 'div'} 
              src={tokenA?.logoURI}
              alt={tokenASymbol}
            />
            <Text>
              {formatTokenBalance(myReserve[0])} {tokenASymbol}
            </Text>
          </StyledElementForTokens>
          <StyledElementForTokens kind="element">
            <StyledImageForToken
              as={tokenA?.logoURI ? 'img' : 'div'}
              src={tokenB?.logoURI}
              alt={tokenBSymbol}
            />
            <Text>
              {formatTokenBalance(myReserve[1])} {tokenBSymbol}
            </Text>
          </StyledElementForTokens>
        </StyledElementForTokens>
      </StyledElementForCardLayout>
      <StyledElementForCardLayout kind="content">
        <Button
          onClick={onButtonClick}
          css={{ fontFamily: 'Trajan', fontSize: '14px'}}
        >
          {myReserve[1] > 0 ? 'Manage liquidity' : 'Add liquidity'}
        </Button>
      </StyledElementForCardLayout>
    </StyledElementForCardLayout>
  )
}




const StyledElementForCardLayout = styled('div', {
  variants: {
    kind: {
      wrapper: {
        borderRadius: '20px',
        padding: '17px 35px',
        // border: '1px solid rgba(255, 255, 255, 0.2)',
        // background: '#2e303e',
        // boxShadow:
        //   '0px 4px 40px rgb(42 47 50 / 9%),inset 0px 7px 24px rgb(109 109 120 / 20%)',
        backdropFilter: 'blur(40px)',
        
        '@media (max-width: 1550px)': {
          padding: '10px 28px',
        },
        fontFamily: 'Trajan',
        fontSize: '16px',
      },
      content: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    name: {
      liquidity: {},
    },
  },
})
const Button = styled('div', {
  cursor: 'pointer',
  boxShadow: '0px 10px 30px rgba(42, 47, 50, 0.2)',
  background: 'white',
  color: 'black',
  padding: '14px 35px',
  borderRadius: '20px',
  fontSize: '18px',
  fontWeight: '400',
  textAlign: 'center',
  margin: '0 auto',
})
const StyledTextForAmount = styled('p', {
  fontSize: '22px',
  lineHeight: '$2',
  fontWeight: 600,
  '@media (max-width: 1550px)': {
    fontSize: '18px',
  },
})

const StyledElementForTokens = styled('div', {
  display: 'grid',

  variants: {
    kind: {
      element: {
        gridTemplateColumns: '20px auto',
        alignItems: 'center',
        columnGap: '$space$3',
      },
      wrapper: {
        gridTemplateColumns: '1fr 1fr',
        columnGap: '$space$8',
        paddingTop: '$space$8',
      },
    },
  },
})

const StyledImageForToken = styled('img', {
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#ccc',
})

const Title = styled('div', {
  fontFamily: 'Trajan',
  fontSize: '22px',
  '@media (max-width: 1550px)': {
    fontSize: '18px',
  },
})
