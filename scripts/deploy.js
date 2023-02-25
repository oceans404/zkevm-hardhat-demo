// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const THREE_MIN_IN_SECS = 3 * 60;
  const unlockTime = currentTimestampInSeconds + THREE_MIN_IN_SECS;
  const ethAmt = ".0007";
  const lockedAmount = hre.ethers.utils.parseEther(ethAmt);

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with ${ethAmt} ETH and unlock timestamp ${unlockTime} 
    
    Deployed to https://explorer.public.zkevm-test.net/address/${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
