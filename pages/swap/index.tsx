import React from 'react'
import { AppLayout } from 'components/Layout/AppLayout'
import { TokenSwap } from 'features/swap'
import { PageHeader } from 'components/Layout/PageHeader'
import styled from 'styled-components'

const Swap = () => {
  const [fullWidth, setFullWidth] = React.useState(true)
  return (
    <AppLayout fullWidth={fullWidth}>
      <Container >
        <Header>
          <h1>Swap</h1>
          <p>Swap between your favorite assets on Marble</p>
        </Header>
        <StyledDivForWrapper>
          <TokenSwap />
        </StyledDivForWrapper>
      </Container>
    </AppLayout>
  )
}
export default Swap
const Container = styled.div`
  padding: 50px 60px 0px 60px;
  // height: 100%;
  @media (max-width: 1550px) {
    padding: 20px 40px 0px 40px;
  }
`
const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 {
    font-size: 40px;
    font-weight: 500;
    font-family: Trajan;
    margin-bottom: 22px;
  }
  p {
    font-size: 20px;
    font-family: Trajan;
    opacity: 0.8;
    font-weight: 300;
    // margin-bottom:55px;
    @media (max-width: 1550px) {
      font-size: 14px;
    }
  }
  @media (max-width: 1550px) {
    margin-bottom: 0px;
  }
`
const StyledDivForWrapper = styled.div`
  overflow: auto;
  min-height:600px;
  height:100%;
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
  @media (max-width: 1550px) {
    top: 110px;
  }
  padding: 0 10px;
`
