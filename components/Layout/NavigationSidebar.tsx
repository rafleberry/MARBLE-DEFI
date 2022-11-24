import { ChakraProvider, HStack, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { isClientMobie } from 'util/device'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import {
  Dashboard,
  Defi,
  Discord,
  Github,
  Marketplace,
  Medium,
  Telegram,
  Twitter,
} from '../../icons'
import Accordion, { MenuEntry, SubMenuEntry } from '../Accordion'
import { Button } from '../Button'
import { ConnectedWalletButton } from '../ConnectedWalletButton'
import { IconWrapper as LinkIconWrapper } from '../IconWrapper'
import { DepositButton } from './DepositButton'

export function NavigationSidebar() {
  const [accountId, setAccountId] = useState('')
  const { connectWallet, disconnectWallet, setAccount } = useConnectWallet()
  const { pathname, push } = useRouter()

  useEffect(() => {
    setAccount().then((id) => {
      setAccountId(formatId(id))
    })
  }, [])

  const formatId = (id) => {
    if (!id) return ''
    if (id.length < 20) return id
    else return id.slice(0, 8) + '...' + id.slice(id.length - 6)
  }

  const disconnect = async () => {
    await disconnectWallet()
    push('/')
    setAccountId('')
  }
  const linkWidth = isClientMobie() ? '30px' : '36px'

  const isActive = (path) => pathname === path
  const buttonIconCss = {
    borderRadius: '50%',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.43) 0%, rgba(255, 255, 255, 0.38) 100%)',
      // color:'#fff',
    border: '2px solid transparent',
    width: linkWidth,
    height: linkWidth,
  }
  return (
    <ChakraProvider>
      <StyledWrapper className="dashboard-card">
        <StyledMenuContainer className="wrap-menu container">
          <Link href="/" passHref>
            <StyledDivForLogo as="a">
              <StyledImageForLogoText src="/images/logo-black.svg" />
            </StyledDivForLogo>
          </Link>
          <Stack marginTop="40px">
            <Stack>
              <Link href="/" passHref>
                <MenuEntry isActive={isActive('/')}>
                  <IconWrapper isActive={isActive('/')}>
                    <Dashboard />
                  </IconWrapper>
                  &nbsp;&nbsp;Dashboard
                </MenuEntry>
              </Link>
              <Accordion
                label="DeFi"
                icon={
                  <IconWrapper
                    isActive={isActive('/swap') || isActive('/pools')}
                  >
                    <Defi />
                  </IconWrapper>
                }
                isActive={isActive('/swap') || isActive('/pools')}
              >
                <Link href="/swap" passHref>
                  <SubMenuEntry isActive={isActive('/swap')}>Swap</SubMenuEntry>
                </Link>
                <Link href="/pools" passHref>
                  <SubMenuEntry isActive={isActive('/pools')}>
                    Liquidity
                  </SubMenuEntry>
                </Link>
              </Accordion>
              <a href="https://near-nft.marbledao.finance/" target="__blank">
                <MenuEntry isActive={false}>
                  <IconWrapper isActive={false}>
                    <Marketplace />
                  </IconWrapper>
                  &nbsp;&nbsp;NFT Marketplace
                </MenuEntry>
              </a>
            </Stack>
          </Stack>
          <MenuFooter>
            <ButtonField>
              <DepositButton />
              <ConnectedWalletButton
                connected={!!accountId}
                walletName={accountId}
                onConnect={() => connectWallet()}
                onDisconnect={() => disconnect()}
                css={{ marginBottom: '$6' }}
              />
            </ButtonField>
            <HStack marginTop="20px">
              <Button
                as="a"
                href={process.env.NEXT_PUBLIC_DISCORD_LINK}
                target="__blank"
                icon={<LinkIconWrapper icon={<Discord />} />}
                variant="ghost"
                size="medium"
                css={buttonIconCss}
              />
              <Button
                as="a"
                href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
                target="__blank"
                icon={<LinkIconWrapper icon={<Telegram />} />}
                variant="ghost"
                size="medium"
                css={buttonIconCss}
              />
              <Button
                as="a"
                href={process.env.NEXT_PUBLIC_TWITTER_LINK}
                target="__blank"
                icon={<LinkIconWrapper icon={<Twitter />} />}
                variant="ghost"
                size="medium"
                css={buttonIconCss}
              />
              <Button
                as="a"
                href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK}
                target="__blank"
                icon={<LinkIconWrapper icon={<Github />} />}
                variant="ghost"
                size="medium"
                css={buttonIconCss}
              />
              <Button
                as="a"
                href={process.env.NEXT_PUBLIC_MEDIUM_LINK}
                target="__blank"
                icon={<LinkIconWrapper icon={<Medium />} />}
                variant="ghost"
                size="medium"
                css={buttonIconCss}
              />
            </HStack>
          </MenuFooter>
        </StyledMenuContainer>
      </StyledWrapper>
    </ChakraProvider>
  )
}

const StyledWrapper = styled.div`
  width: 25%;
  // min-height: calc(100vh - 60px);
  height:100%;
  padding:40px 60px;
  background: rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  position:relative;
  @media (max-width: 1550px) {
    height: calc(100vh - 80px);
    padding: 40px 30px;
    width: 25%;
  }
  svg {
    color:#fff !important;
  }
`
const MenuFooter = styled.div`
  position: absolute;
  bottom: 40px;
  text-align: -webkit-center;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
  @media (max-width: 1550px) {
    bottom: 20px;
  }
`
const StyledMenuContainer = styled.div``

const StyledDivForLogo = styled.div``

const ButtonField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledImageForLogoText = styled.img`
  height: 60px;
  margin: 0 auto;
  @media (max-width: 1550px) {
    height: 50px;
  }
`
const IconWrapper = styled.div<{ isActive: boolean }>`
  width: 34px;
  height: 34px;
  background: ${({ isActive }) =>
    isActive ? 'white' : 'rgba(255, 255, 255, 0.09)'};
  svg {
    fill: ${({ isActive }) => (isActive ? 'black' : 'white')};
  }
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right:10px;
`
