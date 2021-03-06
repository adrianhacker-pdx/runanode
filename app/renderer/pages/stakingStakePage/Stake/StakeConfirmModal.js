import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { PreDefinedAssetIdName, PreDefinedAssetId } from 'common/types/theNode.types';
import { Button, PageHeading, Modal, ModalBody, ModalFooter } from 'components';
import styled from 'styled-components';
import { colors } from 'theme';

const FieldWrapper = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  background: ${colors.background};
  padding: 1rem;
`;

const Field = ({ label, value }) => {
  return (
    <FieldWrapper>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </FieldWrapper>
  );
};

const StakeConfirmModal = ({
  isStakeConfirmModalOpen,
  setStakeConfirmModalOpen,
  onStakeConfirmed,
  stakingBalance,
  gasFee,
  stakingAccount,
  isStakingEnabled,
}) => {
  return (
    <Modal isOpen={isStakeConfirmModalOpen}>
      <ModalBody>
        <PageHeading subHeading="Once confirmed, your stake will be added to the pool and you will become a validator at the beginning of the next era.">
          Confirm staking summary
        </PageHeading>
        <Grid rows={2} columns={2}>
          <Cell width={1}>
            <Field
              label="Stake"
              value={`${stakingBalance} ${PreDefinedAssetIdName[PreDefinedAssetId.stakingToken]}`}
            />
          </Cell>
          <Cell width={1}>
            <Field
              label="Transaction fee"
              value={`${gasFee} ${PreDefinedAssetIdName[PreDefinedAssetId.spendingToken]}`}
            />
          </Cell>
          <Cell width={2}>
            <Field
              label="Staking account address"
              value={`${stakingAccount && stakingAccount.address}`}
            />
          </Cell>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => setStakeConfirmModalOpen(false)}
            style={{ marginRight: '0.5rem' }}
            variant="nuetral"
            flat
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onStakeConfirmed();
              setStakeConfirmModalOpen(false);
            }}
            disabled={!isStakingEnabled}
          >
            Confirm
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default StakeConfirmModal;
