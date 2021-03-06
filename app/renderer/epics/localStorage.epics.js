import { EMPTY, from, of } from 'rxjs';
import { mergeMap, map, concat } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import types from 'renderer/types';
import ROUTES from 'renderer/constants/routes';
import { storageKeys, getStorage, setStorage, clearStorage } from 'renderer/api/utils/storage';
import { Logger } from 'renderer/utils/logging';

const getStorageEpic = action$ =>
  action$.pipe(
    ofType(types.getStorage.requested),
    mergeMap(async ({ payload }) => {
      const value = await getStorage(payload.key);
      return { type: types.getStorage.completed, payload: { key: payload.key, value } };
    })
  );

const setStorageEpic = action$ =>
  action$.pipe(
    ofType(types.setStorage.requested),
    mergeMap(async ({ payload }) => {
      await setStorage(payload.key, payload.value);
      return { type: types.setStorage.completed, payload };
    })
  );

const clearStorageEpic = action$ =>
  action$.pipe(
    ofType(types.clearStorage.requested),
    mergeMap(async ({ payload }) => {
      const value = await clearStorage(payload.key);
      return { type: types.clearStorage.completed, payload: { key: payload.key, value } };
    })
  );

const resetLocalStorageEpic = action$ =>
  action$.pipe(
    ofType(types.resetLocalStorage.triggered),
    mergeMap(() => {
      return of(
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.STAKING_PREFERENCE },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.STAKING_STATUS },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.STAKING_STASH_WALLET_ID },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.STAKING_STASH_ACCOUNT_ADDRESS },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.TERMS_OF_USE_ACCEPTANCE },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.REMEMBER_NETWORK },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.SELECTED_NETWORK },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.GENESIS_CONFIG_FILE_INFO },
        },
        {
          type: types.clearStorage.requested,
          payload: { key: storageKeys.WALLETS },
        }
      );
    })
  );

export default [getStorageEpic, setStorageEpic, clearStorageEpic, resetLocalStorageEpic];
