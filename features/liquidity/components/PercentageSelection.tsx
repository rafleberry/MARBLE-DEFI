import styled from 'styled-components'

type PercentageSelectionProps = {
  maxLiquidity: number
  liquidity: number
  onChangeLiquidity: (liquidity: number) => void
}

export const PercentageSelection = ({
  liquidity,
  onChangeLiquidity,
  maxLiquidity,
}: PercentageSelectionProps): JSX.Element => {
  const valuesForSteps = [0.1, 0.25, 0.5, 0.75, 1]
  const percentage = liquidity / maxLiquidity
  return (
    <StyledDivForGrid className="dashboard-card">
      {valuesForSteps.map((valueForStep) => {
        return (
          <SecondaryButton
            active={Number(percentage.toFixed(4)) === valueForStep}
            key={valueForStep}
            onClick={() => {
              onChangeLiquidity(valueForStep * maxLiquidity)
            }}
          >
            {valueForStep * 100}%
          </SecondaryButton>
        )
      })}
    </StyledDivForGrid>
  )
}

const StyledDivForGrid = styled.div`
  display: flex;
  color: black;
  justify-content: space-around;
  width: 100%;
  padding: 20px 0;
  &:before{
    border-top-left-radius:0;
    border-top-right-radius:0;
    border:0 !important;
  }
  @media (max-width: 1550px) {
    padding: 15px 0;
  }
`

const SecondaryButton = styled.button<{ active: boolean }>`
  width: 50px;
  height: 27px;
  color: ${({ active }) => (active ? 'black' : 'white')};
  background: ${({ active }) => (active ? 'white' : '')};
  border-radius: 10px;
  font-size: 12px;
  font-weight: 300;
`
