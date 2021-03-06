import React, { useEffect, useState } from 'react';
import { Select, Hint, Ellipsis, Card } from 'components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'theme';
import ROUTES from 'renderer/constants/routes';
import { PreDefinedAssetId, PreDefinedAssetIdName } from 'common/types/theNode.types';
import useApis from '../stakingOverviewPage/useApis';

const BalancesWrapper = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
`;

const BalanceDetailsWrapper = styled.div`
  width: 49%;
`;

const StepDescription = styled.div`
  line-height: 1.7rem;
  height: 8rem;
`;

const BalanceDetail = styled.div`
  font-size: 16px;
  line-height: 1.2rem;
  padding: 1rem 0;
  display: flex;
  color: ${p => (p.err ? colors.danger : colors.text)};
  display: flex;
  flex-direction: column;
`;

const Balance = styled.div`
  font-size: 22px;
  margin-right: 0.5rem;
  display: inline-block;
`;

const InsufficientGasFeeErr = styled.div`
  font-size: 14px;
  margin-right: 1.5rem;
`;

const DespositLink = styled(Link)`
  color: ${colors.text};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${colors.textHover};
  }
`;

const StakingAccountBalances = ({
  stakingBalance,
  cpayStakingBalance,
  gasFee,
  sufficientGasFee,
}) => {
  const stakingTokenString = PreDefinedAssetIdName[PreDefinedAssetId.stakingToken];
  const spendingTokenString = PreDefinedAssetIdName[PreDefinedAssetId.spendingToken];
  return (
    <BalancesWrapper>
      <BalanceDetailsWrapper>
        <StepDescription>
          Step 2: Check your available staking amount Before staking, make sure you have the right
          amount of tokens that you wish to stake available.
        </StepDescription>
        <Card
          title="Staking token available balance"
          hint={`In order to participate as a validator you need to have ${stakingTokenString} token(s) in your account.`}
        >
          <BalanceDetail>
            <div>
              <Ellipsis substrLength={6}>
                <Balance>{stakingBalance}</Balance>
              </Ellipsis>
              {`${stakingTokenString}`}
            </div>
          </BalanceDetail>
        </Card>
      </BalanceDetailsWrapper>
      <BalanceDetailsWrapper>
        <StepDescription>
          {`Step 3: Check your spending token balance In order to stake you need to have enough
          ${spendingTokenString} tokens. ${spendingTokenString} tokens are used to cover your transaction fee for staking and
          unstaking.`}
        </StepDescription>
        <div>
          <Card
            title="Spending token available balance"
            hint={`${spendingTokenString} is used for paying network fees. It is also used as the block reward for validators.`}
          >
            <BalanceDetail>
              <div>
                <Ellipsis substrLength={6}>
                  <Balance>{cpayStakingBalance}</Balance>
                </Ellipsis>
                {`${spendingTokenString}`}
              </div>
            </BalanceDetail>
          </Card>
          <Card
            title="Estimated transaction fee (stake + unstake)"
            hint="Transaction fees are required as they are needed for maintaining a healthy network."
          >
            <BalanceDetail err={!sufficientGasFee}>
              <div>
                <Ellipsis substrLength={6}>
                  <Balance>{gasFee}</Balance>
                </Ellipsis>
                {`${spendingTokenString}`}
              </div>
              {!sufficientGasFee && (
                <InsufficientGasFeeErr>
                  You don&#39;t have enough funds to pay the transaction fee required to stake.
                  Choose another account or{' '}
                  <DespositLink to={ROUTES.WALLET.ROOT}>deposit</DespositLink>
                  more tokens into the selected account.
                </InsufficientGasFeeErr>
              )}
            </BalanceDetail>
          </Card>
        </div>
      </BalanceDetailsWrapper>
    </BalancesWrapper>
  );
};

export default StakingAccountBalances;
