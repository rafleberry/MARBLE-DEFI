import mergeRefs from 'react-merge-refs'
import { getTokenBalance } from 'hooks/useTokenBalance'
import { useNearDollarValue } from 'hooks/useTokenDollarValue'
import styled from 'styled-components'
import { IconWrapper } from 'components/IconWrapper'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenOptionsList } from './TokenOptionsList'
import { Union } from 'icons/Union'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { SelectorToggle } from './SelectorToggle'
import { SelectorInput } from './SelectorInput'
import { ConvenienceBalanceButtons } from './ConvenienceBalanceButtons'
import { useIsInteracted } from 'hooks/useIsInteracted'
import { formatTokenBalance } from '../../../util/conversion'

type TokenSelectorProps = {
  readOnly?: boolean
  disabled?: boolean
  amount: number
  tokenSymbol: string
  tokenAddress: string
  balance: number
  isDeposit: boolean
  onChange?: (token: { tokenSymbol; tokenAddress; amount; balance }) => void
}

export const TokenSelector = ({
  readOnly,
  disabled,
  tokenSymbol,
  tokenAddress,
  amount,
  onChange,
  balance,
  isDeposit,
}: TokenSelectorProps) => {
  const wrapperRef = useRef<HTMLDivElement>()
  const inputRef = useRef<HTMLInputElement>()
  const NearValue = useNearDollarValue()
  const tokenValues = useSelector((state: any) => state.uiData.token_value)
  const [refForInput, { isFocused: isInputFocused }] = useIsInteracted()

  const [isTokenListShowing, setTokenListShowing] = useState(false)

  useOnClickOutside(wrapperRef, () => {
    setTokenListShowing(false)
  })

  const balanceInUsd =
    tokenSymbol === 'NEAR'
      ? NearValue * balance
      : tokenValues[tokenAddress] * NearValue * balance
  const formattedAvailableAmount = formatTokenBalance(balanceInUsd, {
    includeCommaSeparation: true,
  })
  const handleAmountChange = (amount) => {
    onChange({ tokenSymbol, tokenAddress, amount, balance })
  }

  return (
    <StyledDivForContainer className="dashboard-card z-unset"
      ref={wrapperRef}
      isFirst={!readOnly}
      isOpened={isTokenListShowing}
    >
      <StyledDivForWrapper>
        <StyledDivForSelector>
          <SelectorToggle
            availableAmount={balance}
            tokenSymbol={tokenSymbol}
            isSelecting={isTokenListShowing}
            onToggle={
              !disabled
                ? () => setTokenListShowing((isShowing) => !isShowing)
                : undefined
            }
          />
          {!isTokenListShowing && tokenSymbol && !readOnly && (
            <ConvenienceBalanceButtons
              disabled={balance <= 0}
              tokenSymbol={tokenSymbol}
              availableAmount={balance}
              onChange={!disabled ? handleAmountChange : () => {}}
            />
          )}
        </StyledDivForSelector>
        <StyledDivForAmountWrapper>
          {isTokenListShowing && (
            <IconWrapper
              type="button"
              onClick={() => setTokenListShowing(false)}
              icon={<Union />}
            />
          )}
          {!isTokenListShowing && (
            <ColumnFlex>
              <Text>balance: ${formattedAvailableAmount}</Text>
              <SelectorInput
                inputRef={mergeRefs([inputRef, refForInput])}
                amount={amount}
                disabled={!tokenSymbol || readOnly || disabled}
                onAmountChange={handleAmountChange}
              />
            </ColumnFlex>
          )}
        </StyledDivForAmountWrapper>
        <StyledDivForOverlay
          interactive={readOnly ? false : !isInputFocused}
          onClick={() => {
            if (!readOnly) {
              if (isTokenListShowing) {
                setTokenListShowing(false)
              } else {
                inputRef.current?.focus()
              }
            }
          }}
        />
      </StyledDivForWrapper>
      {isTokenListShowing && (
        <StyledDivForTokensListWrapper>
          <TokenOptionsList
            activeTokenSymbol={tokenSymbol}
            isDeposit={isDeposit}
            onSelect={(selectedTokenSymbol, selectedTokenAddress) => {
              onChange({
                tokenSymbol: selectedTokenSymbol,
                tokenAddress: selectedTokenAddress,
                amount,
                balance,
              })
              setTokenListShowing(false)
            }}
          />
        </StyledDivForTokensListWrapper>
      )}
    </StyledDivForContainer>
  )
}

const StyledDivForWrapper = styled.div`
  padding: 10px 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  min-height: 64px;
`

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  text-align: -webkit-right;
  justify-content: space-between;
  row-gap: 15px;
`

const Text = styled.div`
  font-size: 14px;
  color: white;
  font-weight:100;
  opacity: 0.6;
  font-family: Trajan;
  @media (max-width: 1550px) {
    font-size: 14px;
  }
`

const StyledDivForSelector = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`

const StyledDivForAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
`

const StyledDivForTokensListWrapper = styled.div`
  padding: 2px 1px 7px;
  overflow: auto;
  max-height: 300px;
  position: relative;
  z-index: 999;
  background: linear-gradient(0deg, #191c2b, #272938) padding-box, linear-gradient(90.65deg, #505157 0.82%, rgba(0, 0, 0, 0) 65.47%) border-box !important;
  border: 1px solid;
  border-image-source: linear-gradient(90.65deg, #ffffff 0.82%, rgba(0, 0, 0, 0) 98.47%) !important;
  border-top: 0px;
  border-radius:20px;
  border-top-left-radius:0px;
  border-top-right-radius:0px;
  margin-top:-9px;

  // &::before {
  //   content: "";
  //   box-shadow: 0px 4px 40px rgb(42 47 50 / 9%), inset -2px -1px 24px #41414e;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: -1;
  //   inset: 0;
  //   // border-radius: 20px;
  //   padding: 1px;
  //   background:linear-gradient(0deg, #191c2b, #272938) padding-box, linear-gradient(90.65deg, #6c6c6c 0.82%, rgba(0, 0, 0, 0) 65.47%) border-box !important;
  //   // opacity:0.6;
  //   // border: 1px solid;
  //   // border-image-source: linear-gradient(
  //   //   90.65deg,
  //   //   #ffffff 0.82%,
  //   //   rgba(0, 0, 0, 0) 98.47%
  // );
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const StyledDivForOverlay = styled.div<{ interactive: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 20px;
  transition: background-color 0.1s ease-out;
  ${({ interactive }) => {
    interactive &&
      `
    cursor: pointer;
    &: hover {
      background-color: rgba(25, 29, 32, 0.05);
    }
    
    `
  }}
`

const StyledDivForContainer = styled.div<{
  isFirst: boolean
  isOpened: boolean
}>`
  border-radius: 20px;
  // padding: 0 20px;
  // background-color: #2e303e;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // box-shadow: 0px 4px 40px rgba(42, 47, 50, 0.09),
  //   inset 0px 7px 24px rgba(109, 109, 120, 0.2);
  // backdrop-filter: blur(400px);
  color: white;
  position: relative;
  z-index: ${({ isFirst, isOpened }) =>
    isFirst ? (isOpened ? '102' : '2') : '1'};
`
