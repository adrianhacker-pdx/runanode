import React from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MainContent, MainLayout } from 'components/layout';
import { PageHeading, PageFooter, Tabs, TabPane } from 'components';
import PortfolioSection from './PortfolioSection';
import ReceiveSection from './ReceiveSection';

const AccountDetails = ({ wallet }) => {
  const publicWalletAddress =
    wallet.wallet.walltAddress || Object.keys(wallet.wallet._accountKeyringMap);

  return (
    <React.Fragment>
      <PageHeading subHeading={`Public Address: ${publicWalletAddress[0]}`}>
        {wallet.name}
      </PageHeading>
      <div className="content">
        <Tabs defaultActiveKey="1" styles={{ maxHeight: '730px' }}>
          <TabPane tab="Portfolio" key="1">
            <PortfolioSection />
          </TabPane>
          <TabPane tab="Receive" key="2">
            <ReceiveSection />
          </TabPane>
        </Tabs>
      </div>
      <PageFooter blank />
    </React.Fragment>
  );
};

export default AccountDetails;
