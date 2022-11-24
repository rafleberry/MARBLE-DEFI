import { styled } from 'components/theme'
import { ChakraProvider, Text, Stack } from '@chakra-ui/react'
import { __POOL_REWARDS_ENABLED__ } from 'util/constants'
import { useTokenInfo } from 'hooks/useTokenInfo'
import { dollarValueFormatterWithDecimals } from '../../../util/conversion'

export const PoolBondedLiquidityCard = ({
  onButtonClick,
  tokenASymbol,
  tokenBSymbol,
  myLiquidity,
  totalLiquidity,
  stakedAmount,
}) => {
  const tokenA = useTokenInfo(tokenASymbol)
  const tokenB = useTokenInfo(tokenBSymbol)
  return (
    <StyledElementForCardLayout className='dashboard-card'
      kind="wrapper"
      css={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
    >
      <StyledElementForCardLayout kind="content" name="liquidity">
        <Title>Bonded liquidity</Title>
        <StyledStakedText>
          $
          {dollarValueFormatterWithDecimals(
            (Number(stakedAmount) / totalLiquidity?.coins) *
              totalLiquidity.dollarValue,
            {
              includeCommaSeparation: true,
              applyNumberConversion: false,
            }
          )}
        </StyledStakedText>
        <StyledUnstakedText>
          $
          {dollarValueFormatterWithDecimals(myLiquidity.dollarValue, {
            includeCommaSeparation: true,
            applyNumberConversion: false,
          })}{' '}
          unstaked tokens
        </StyledUnstakedText>
      </StyledElementForCardLayout>
      <StyledElementForCardLayout kind="wrapper" className='dashboard-card' style={{
        marginTop: '10px',
      }}>
        <>Current reward incentive</>

        <StyledElementForTokens kind="wrapper">
          <StyledElementForTokens kind="column">
            <StyledImageForToken src={tokenA?.logoURI} />
          </StyledElementForTokens>
          <Text color="body" variant="caption">
            Unbonding Duration 14 days
          </Text>
        </StyledElementForTokens>
      </StyledElementForCardLayout>
      <StyledElementForCardLayout kind="content">
        <Button
          disabled={!__POOL_REWARDS_ENABLED__}
          onClick={__POOL_REWARDS_ENABLED__ ? onButtonClick : undefined}
          css={{ fontFamily: 'Trajan', fontSize: '14px' }}
        >
          {__POOL_REWARDS_ENABLED__ ? 'Bond/Unbond tokens' : 'Coming soon'}
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

const StyledStakedText = styled('p', {
  fontSize: '22px',
  lineHeight: '$2',
  fontWeight: 600,
  '@media (max-width: 1550px)': {
    fontSize: '18px',
  },
})
const StyledUnstakedText = styled('div', {
  position: 'absolute',
  right: '35px',
  top: '45px',
  fontSize: '15px',
  fontWeight: '500',
  marginTop:'5px',
  '@media (max-width: 1550px)': {
    right: '28px',
    top: '34px',
    fontSize: '12px',
  },
})
const Button = styled('button', {
  cursor: 'pointer',
  boxShadow: '0px 10px 30px rgba(42, 47, 50, 0.2)',
  background: 'white',
  color: 'black',
  padding: '14px 35px',
  borderRadius: '20px',
  fontSize: '18px',
  fontWeight: '400',
  textAlign: 'center',
  margin: 'auto auto 20px auto',
  variants: {
    disabled: {
      true: {
        background: 'gray',
        cursor: 'not-allowed',
      },
    },
  },
})
const StyledElementForTokens = styled('div', {
  display: 'flex',
  alignItems: 'center',

  variants: {
    kind: {
      wrapper: {
        paddingTop: '$8',
        columnGap: '$space$5',
      },
      column: {},
    },
  },
})

const StyledImageForToken = styled('img', {
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#ccc',
  boxShadow: '0 0 0 1px #e7d9e3',
  '&:not(&:first-of-type)': {
    marginLeft: -3,
  },
})
const Title = styled('div', {
  fontFamily: 'Trajan',
  fontSize: '22px',
  '@media (max-width: 1550px)': {
    fontSize: '18px',
  },
})
