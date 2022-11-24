import React from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { Dashboard } from '../features/dashboard'
import styled from 'styled-components'

export default function Home() {
  return (
    <AppLayout fullWidth={true}>
      <Container className="dashboard-card">
        <Header>
          <h1 className='z-9'>Dashboard</h1>
        </Header>
        <StyledDivForWrapper>
          <Dashboard />
        </StyledDivForWrapper>
      </Container>
    </AppLayout>
  )
}

const Header = styled.div`
  text-align: center;
  h1 {
    font-size: 40px;
    font-weight: 500;
    font-family: Trajan;
    margin-bottom:40px;
    @media (max-width: 1550px) {
      font-size: 30px;
    }
  }
  p {
    font-size: 24px;
    font-weight: 400;
    font-family: Trajan;
    @media (max-width: 1550px) {
      font-size: 14px;
    }
  }
`
const Container = styled.div`
  padding: 45px 75px;
  height: 100%;
  z-index:9;
`
const StyledDivForWrapper = styled.div`
  overflow: auto;
  right: 20px;
  left: 20px;
  bottom: 20px;
  top: 100px;
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
    top: 60px;
  }
  // padding: 0 10px;
`
