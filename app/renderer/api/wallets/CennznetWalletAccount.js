// @flow
import BN from 'bn.js';
import CennznetWalletAsset from './CennznetWalletAsset';

export default class CennznetWalletAccount {
  address: string;
  name: string;
  freeBalance: BN;
  assets: Map<BN, CennznetWalletAsset>;

  constructor(data: { address: string, name: string, assets: ?Map<BN, CennznetWalletAsset> }) {
    Object.assign(this, data);
  }
}