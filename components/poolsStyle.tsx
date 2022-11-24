import styled from 'styled-components'

export const ContentWrapper = styled.div`
  overflow: auto;
  // position: absolute;
  // right: 20px;
  // left: 20px;
  // bottom: 20px;
  // top: 140px;
  max-height:600px;
  padding:0px 10px 20px 10px;
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
  // padding: 0 10px;
  @media (max-width: 1550px) {
    top: 80px;
  }
`
export const Container = styled.div`
  padding: 60px;
  position: relative;
  height: 100%;
  @media (max-width: 1550px) {
    padding: 30px;
  }
`
export const StyledWrapperForNavigation = styled.nav`
  display: flex;
  alignitems: center;
  margin-bottom: 40px;
  @media (max-width: 1550px) {
    margin-bottom: 20px;
  }
`
