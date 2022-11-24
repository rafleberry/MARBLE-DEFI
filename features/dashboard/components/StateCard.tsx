import styled from 'styled-components'

const StyledCard = ({ icon, color, title, value }) => {
  return (
    <Container className="dashboard-card">
      <IconWrapper className="z-9" color={color}>{icon}</IconWrapper>
      <div className="z-9">
        {title}
        {value}
      </div>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 20px;
  padding: 14px;
  display: flex;
  // backdrop-filter: blur(40px);
  // background-color: #2e303e;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // box-shadow: 0px 4px 40px rgb(42 47 50 / 9%),
  //   inset 0px 7px 24px rgb(109 109 120 / 20%);
  @media (max-width: 1550px) {
    padding: 10px;
  }
`

const IconWrapper = styled.div<{ color: string }>`
  border-radius: 20px;
  width: 60px;
  height: 60px;
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  @media (max-width: 1550px) {
    width: 48px;
    height: 48px;
    border-radius: 15px;
  }
`
export default StyledCard
