# Changelog

# vNext

### Features

### Fixes

### Improvements

# v0.13.5 (2019.06.12)

### Improvements

- Windows target is included;
- Include Faucet deposit instruction and URL -- https://cennznet.js.org/faucet-ui/ ;

# v0.13.4 (2019.05.24)

### Improvements

- Add resetStorage button in homepage;

### Fixes

- Couple of UI issue fixes;

# v0.13.1 (2019.05.23)

### Improvements

- Add nav button in syncing page;

### Fixes

- Bug fixes and code refactoring;

# v0.13.0 (2019.05.23)

### Improvements

- Refactor to decrease branding code;

# v0.12.0 (2019.05.22)

### Improvements

- Update SDK and replace polkadotjs with thenet;

# v0.11.1 (2019.05.17)

### Fixes

- UI issues in staking validator list;
- File path issue in genesis file selection;

# v0.11.0 (2019.05.17)

### Features

- Upgrade towards thenet-node 0.9.20

# v0.9.2 (2019.04.09)

### Features

- Able to change/edit account name in accountDetails page

### Fixes

- change staking and spending token ids
- Fix switch local network some time not working issue
- Fix switch network apiRemote not re-connect issue
- Able to display custom tokens

# v0.9.1 (2019.04.08)

### Features

- upgrade thenet-node to 0.9.17

# v0.9.0 (2019.04.05)

### Features

- Able to handle WebSocket connection error

- Add GlobalModal component;
- Handle exiting app while staking;

### Fixes

- fix type issue when switch from Rimu to local test net

### Improvements

# v0.8.2 (2019.04.01)

### Fixes

- Add GA tracking id in prod

# v0.8.1 (2019.03.29)

### Improvements

- add thenet-node debug flag

# v0.8.0 (2019.03.29)

### Features

- upgrade sdk to 0.9.4

# v0.7.1 (2019.03.27)

### Fixes

- fix not able to stake without default validator preference
- update the scan links
- fix not able to start in linux issue
- fix sync node page local block num not update issue
- remove access to `KAURI(DEV)` to avoid blank page issue
- fix invalid staking key issue

# v0.7.0 (2019.03.26)

### Issues

- multiple subscribe after switch network

### Features

- upgrade to latest SDK and node
- support new staking APIs

### Fixes

- fix incorrect spending token balance in start to stake page
- fix fail to start/stop app

### Improvements

- ready for github release
- able to release as rUN
- mask username from telemetry
- fix duplicated console log by upgrade electron-log to 3.0.1
- Chain getting balances with new header
- move save staking preference to start to stake page
- remove `Validator Payment` option from save staking preference modal
- add new unstake epic
- add transition status `changeAppUiState` for unstake in manage stake page
- conditionally show/hide stake/manage sub menu
- improve stake epic error handling
- hide stake button after staking started in Staking overview page
- able to overwrite WEBSOCKET_LATENCY_PERIOD from runtime via cli args
- able to switch network with different remote api settings

# v0.6.1 (2019.03.12)

### Fixes

- add local net option back

# v0.6.0 (2019.03.12)

### Features

- able to get seed from wallet json
- able to stake and unstake
- Add Staking routes;
- able to do staking and restart node
- User able to unstake
- able to save staking preference
- able to view staking preference
- User friendly staking flow;
- Add Notification bar;
- Make Toaster configurable;
- Staking Overview;
- Able to start to stake;
- able to listen to reward events

### Fixes

- loading issue in homePage
- fix setInterval timer issue

### Improvements

- display node state in dev info top bar
- skip restart node when chose same network
- add bps to sync screen
- able to run node cluster locally
- upgrade cenznet-api to v0.7.4
- isDevOrDebugProd works for renderer
- height light self-own staking account;
- use stored staking wallet/account info for manage stake page

# v0.5.2 (2019.02.25)

### Features

- add Scan address link to account public address

### Improvements

- tidy up asset table layout
- update background gradient settings
- update field text bg color to match with design
- update sync info layout
- update side bar nav for launch process
- Refactor configure

# v0.5.0 (2019.02.20)

### Features

- able to send tx
- add Yup validations for send tx

### Fixes

- fix switch network issues

### Improvements

- Make 'Local test net' optional

# v0.4.1 (2019.02.12)

### Features

- Add tabs and scrollable components
- new data structure to store Wallets -> Accounts -> Assets
- Connect wallet with both HDKeyring and SimpleKeyring
- Able to display balance in Account detail page
- Add send tx confirmation flow

### Fixes

- fix cucumber not able to start issue
- able to check node process in tests

### Improvements

- re-enable isDevOrDebugProd to allow use dev tools in packaged app
- able to run `yarn cucumber` test in CI
- update refresh rate to 5s
- Improved styleguide
- upgrade to Rimu Node

# v0.3.1 (2019.01.31)

### Improvements

- Refactor reducer
- able to detect app state and able to show spinner on exit
- Single page seed phase PDF design
- Added download seed phrase confirm modal

# v0.3.0 (2019.01.27)

### Features

- Start up process
  (initial Node start && root route control)
- SyncNode page navigation after 100% synced
- able to handle hex blockNum
- add clean.sh to fix console undefine issue
- able to set default node args, default node name is Odin-USERNAME
- integrated thenet-api
- make yarn install works with gemfury
- enable PR build with Jenkins
- Add Google Analytics
- able to create wallet from DEV page, sync to redux state and electron-storage
- Add checkbox component
- Add wallet details page
- able to generate pdf

### Fixes

- fix static link issue for thenet-node windows and mac build

### Improvements

- networkOptions && genesisFile data storage
- default dev tools open on the right side
- rename ./npmrc to ./npmrc.template
- upgrade thenet-api and thenet-wallet to 0.5.2
- disable redux-log by default
- Change page layout and color themes
- support multiple wallets
- Refine secondary button

# v0.2.4 (2019.01.16)

### Improvements

- new logo
- change default remote URL to dev
- able to use `yarn package-win`

# v0.2.3 (2019.01.16)

### Improvements

- ready for demo
- able to switch network via UI
- basic screen flow

## v0.2.2 (2019.01.13)

### Fixes

- fix hot reload issue

### Improvements

- Able launch app with runtime parameter
- Able to launch app with thenet-node in windows
- Add ./scripts/init.sh to init dev env
- Add Select, Input, Spinner components into Styleguidist
- able to make network request
- able to restart thenet node with options
- Connect TopBarContainer to redux state
- Add JsonRPC support
- Add Websocket support
- Able to display network status

## v0.2.1 (2019.01.04)

#### Improvements

- Add Styleguidist for components development

## v0.2.0 (2019.01.04)

#### Features

- Add ToS page
- Add Button, Spinner components

## v0.1.2 (2019.01.02)

#### Features

- Able launch remote debug in vscode for main and renderer
- Able to run `yarn cucumber` for integration test
- Added preload.js script for security
- Able to run cennnznet-node as part of the app

## v0.1.1 (2018.12.26)

#### Features

- Able to process launch config and out put logs on mac

## v0.0.3 (2018.12.25)

#### Features

- Upgrade to the latest version of electron-react-boilerplate

## v0.0.2 (2018.12.20)

#### Features

- Able to show sync percentage

## v0.0.1 (2018.12.05)

#### Features

- initial project setup
