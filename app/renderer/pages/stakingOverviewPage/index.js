import React, { useEffect, useState } from 'react';
import { MainContent, MainLayout } from 'components/layout';
import { PageHeading, Button } from 'components';
import styled from 'styled-components';
import StakingProgressCard from './StakingProgressCard';
import withContainer from './container';
import ValidatorsList from './ValidatorsList';
import IntentionsList from './IntentionsList';
import useApis from './useApis';
import useApi from './useApi';

const PageTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListsWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
`;

const StakingOverviewPage = ({ subNav, onClickStakeButton }) => {
  const [
    eraProgress,
    eraLength,
    sessionProgress,
    sessionLength,
    validators,
    intentions,
    // freeBalances,
  ] = useApis(
    'getEraProgress',
    'getEraLength',
    'getSessionProgress',
    'getSessionLength',
    'getValidators',
    'getIntentions'
    // Working Exmaple
    // [
    //   'getGenericAssetFreeBalance',
    //   { noSubscription: true, params: ['0', '5FPGbDkvDaRDQTzqzs87PjLxDbM98p9hph3wp3KceiikF6Sy'] },
    // ]
  );

  /**
   * Can not use withApis in func
   * Otherwise: Rendered more hooks than during the previous render.
   *
   */

  const [intentionsWithBalances, setIntentionsWithBalances] = useState(null);
  useEffect(() => {
    if (intentions) {
      Promise.all(
        intentions.map(async intention => {
          const cennzBalance = await window.odin.api.cennz.getGenericAssetFreeBalance(
            '0',
            intention
          );
          return cennzBalance && { address: intention, cennzBalance: cennzBalance.toString(10) };
        })
      ).then(result => setIntentionsWithBalances(result));
    }
  }, [intentions]);

  const sortedValidators =
    intentionsWithBalances && validators
      ? intentionsWithBalances.filter(intentionWithBalance =>
          validators.includes(intentionWithBalance.address)
        )
      : [];

  const sortedIntentions = intentionsWithBalances
    ? intentionsWithBalances.filter(address => !sortedValidators.includes(address))
    : [];

  return (
    <MainLayout subNav={subNav}>
      <MainContent>
        <PageHeading subHeading="Here you can view when the next era is, and how your staking performs among other validators.">
          <PageTitleWrapper>
            <div>Staking overview</div>
            <Button size="lg" onClick={() => onClickStakeButton()}>
              Stake
            </Button>
          </PageTitleWrapper>
        </PageHeading>
        <StakingProgressCard
          eraProgress={eraProgress}
          eraLength={eraLength}
          sessionLength={sessionLength}
          sessionProgress={sessionProgress}
        />
        <ListsWrapper>
          <ValidatorsList validators={sortedValidators} />
          <IntentionsList intentions={sortedIntentions} />
        </ListsWrapper>
      </MainContent>
    </MainLayout>
  );
};

export default withContainer(StakingOverviewPage);