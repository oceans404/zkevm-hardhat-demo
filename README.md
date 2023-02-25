# Deploy a smart contract to Polygon zkEVM Testnet with Hardhat and verify the contract

## Getting Started

Clone the repo and install dependencies

```shell
npm i
```

Create a .env file

```shell
cp .env.sample .env;
```

Update .env to set your ACCOUNT_PRIVATE_KEY environment variable. Here's [an article](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed) on how to get your private key from MetaMask.

## Code callouts in deploy.js

The base of this project is the [default Hardhat Project Lock contract](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) bootstrapped when you select "Create a JavaScript project." I modified the deploy script slightly for easier testing.

- lockedAmount: .0007 ETH
- unlockTime: 3 minutes
- include testnet explorer link in deployment console log statement

Default hardhat tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Deploy to the Polygon zkEVM Testnet

Before you deploy to the Polygon zkEVM Testnet, you need zkEVM Testnet ETH. Watch my [bridging video](https://www.youtube.com/watch?v=eYZAPkTCgwg&t=330s) to learn how to bridge Goerli ETH to Polygon zkEVM Testnet ETH.

If you already have Goerli ETH in your account, start the video [here](https://youtu.be/eYZAPkTCgwg?t=183).

Once you've funded your account with testnet ETH, run

```shell
npx hardhat run scripts/deploy.js --network zkEVM
```

My result was 

## Verify your Polygon zkEVM Testnet contract

As of today, there are no Polygon zkEVM Testnet explorer API keys, so you have to verify contracts manually.

1. Find your contract on the [Polygon zkEVM Testnet explorer](https://explorer.public.zkevm-test.net/).

2. Select the "Code" tab.

3. Click the "Verify and Publish" Button

4. Verify "Via Standard Input JSON"

5. Update "Compiler" based on your contract's compiler version

`pragma solidity ^0.8.9;` => v0.8.9+commit.e5eed63a

6. In your local repo folder, navigate to the file in the build-info folder. artifacts > build-info > superlongnumberfile.json. Save this file to format with prettier. Then find the input JSON object. It will look [something like this](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description) `"input": {}`. Copy the input object value into a new file. Name and save this file anywhere. Mine is example-standard-input.json in the root folder so you can see the format.

7. Upload this file in the drag and drop "Standard Input JSON" file field.

8. Since we have an input, set "Try to fetch constructor arguments automatically" to NO.

9. To add your ABI-encoded instrctor arguments, open the [Online ABI Encoder](https://abi.hashex.org/) and choose the auto-parse tab. 

10. In your local repo folder, navigate to the file in the build-info folder. artifacts > build-info > superlongnumberfile.json. Find your ABI json array `"abi": []`, and copy/paste the array value into the auto-parse text box. Click "Parse."

11. You'll see any inputs appear below. We need to specify the _unlockTime
input value. We console logged this timestamp in deploy.js and it was 1677340384. Paste it in and you'll see the Encoded Data generated below.

12. Copy the Encoded Data and use it for "ABI-encoded Constructor Arguments (if required by the contract)" back in the Polygon zkEVM Testnet explorer field.

13. Click "Verify and Publish." The form will be in loading state. I opened the contract in a new tab and after about 5m I saw a green check mark next to the "Code" tab for verified even though the Loader never updated on the UI.

// Verified contact
https://explorer.public.zkevm-test.net/address/0xDd051E843c5603AB168B4F55F385e40AD561eff6/contracts#address-tabs


## Read unlock time

Go to the "Read Contract" tab

https://explorer.public.zkevm-test.net/address/0xc97d80F068c7Ef0fBBE05eBECD8500427F319b7D/read-contract#address-tabs

## Withdraw locked funds

Before you withdraw funds you'll need to add the Polygon zkEVM Testnet as a Network within MetaMask. Watch my [video](https://www.youtube.com/watch?v=Y1gOkTsXgSY) to learn how to add the Polygon zkEVM Testnet to MetaMask in less than 2 minutes.

Go to your "Write Contract tab"

https://explorer.public.zkevm-test.net/address/0xc97d80F068c7Ef0fBBE05eBECD8500427F319b7D/write-contract#address-tabs

Click "write" next to the withdraw function. You will have to connect to Polygon zkEVM testnet with the same account you used to deploy your smart contract.