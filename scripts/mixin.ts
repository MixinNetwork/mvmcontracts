import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const BLS = await ethers.getContractFactory("BytesLib")
  const bls = await BLS.attach("0x4DB4032B274Db4Ef0530fA18F31897fF150F7fAc");
  // const bls = await BLS.deploy();
  // await bls.deployed();
  console.log("byteslib deployed to:", bls.address);

  const Registry = await ethers.getContractFactory("Registry", {
    libraries: {
      BLS: bls.address,
    },
  });
  // ["007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c", "2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425", "257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673"]
  // const registry = await Registry.deploy(ethers.utils.arrayify("0x007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673"), "0x3b2d4d74045b356ea55e14eb47edb96b");
  // await registry.deployed();
  const registry = Registry.attach("0x275C0148543A28972b8CE991106eCf870D5667F4");
  console.log("registry deployed to:", registry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
