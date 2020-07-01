# Web IDE for Clarity

**Developers can now start developing and testing Clarity programs directly from the browser!**

This repo (or any other on github or gitlab) can be used as a development environment 
for Clarity code in the browser. Just open the [gitpod url](https://gitpod.io/#https://github.com/friedger/clarity-js-sdk/blob/feature/web-ide/packages/clarity-tutorials/README-web-ide.md).

(The repo [clarity-smart-contracts](https://github.com/friedger/clarity-smart-contracts) uses the same setup.)

This is a contribution to the "Clarity Hackathon - Tools".
The contribution consists of two parts
- a sharable gitpod configuration for Clarity ([.gitpod.yaml](/.gitpod.yaml) and [.gitpod.Dockerfile](/.gitpod.Dockerfile))
- a [JsonRcpProvider](/packages/clarity/src/providers/jsonRcp) for the clarity-js-sdk
- two videos explaining the use of the Web IDE for Clarity and the JsonRpcProvider

## gitpod configuration for Clarity
Gitpod is an open-source Web IDE for github and gitlab repositories. The design and functionality is inspired by Visual Studio Code.
With extra configuration the Web IDE can be adjusted for the type of code hosted in the repo.
The developed configuration for Clarity development contains:
* Both Visual Studio Code plugins for Clarity
* the Clarity REPL
* the Stacks node
* the Blockstack cli


### Proposed steps to get familiar with the Clarity Web IDE
1. Open this page in the Web IDE: 
https://gitpod.io/#https://github.com/friedger/clarity-js-sdk/blob/feature/web-ide/packages/clarity-tutorials/README-web-ide.md

1. Open an existing clarity program by the following steps:
    1. In the explorer panel on the left, select folder `packages/clarity-tutorials/contracts/samples` 
    1. Click on `hello-world.clar`
    1. A popup might invite you to download the Clarity Language server, do it now.
    1. Start typing `define-` and see the autocompletion
    1. Press Ctrl + Space to see help on the Clarity language constructs
    
1. Open a terminal (Ctrl + Shift + `)
1. Run test in clarity vm for the fungible tokens program: 
   1. `cd packages/clartity-tutorials`
   1. `yarn install`
   1. `yarn jest test/tokens/fungibleToken.test.ts`
   1. See all the test results, the tests are written using the `FungibleTokensClient` with the default `Provider` that gives access to a Clarity VM.

1. Deploy a Clarity program to Stacks testnet using the same `FungibleTokensClient` using the **`JsonRCPPRovider`** :
    1. Open a new termin and create a new keychain by typing: `blockstack-cli make_keychain -t`
    1. Open file `packages/clarity-tutorials/scripts/fungible-tokens.ts`
    1. In the file editor, replace the private key with the value from the new created keychain (using Ctrl + c and Ctrl + v as usual)
    1. Replace also the address
    1. Make sure the line 17 `  // await client.deployContract();` is uncommented using Ctrl + /
    1. Save the file by pressing Ctrl + s
    1. Request test tokens from the faucet via https://testnet.blockstack.org/faucet and wait until they arrive in your wallet by checking https://sidecar.staging.blockstack.xyz/v2/accounts/ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV (with your own address)
    1. In the terminal type `npx ts-node scripts/fungible-token`
    1. See the logs
    1. (ignore the error due to https://github.com/blockstack/stacks-blockchain/issues/1699)
    1. In the file editor, comment line 17 again and make changes to the calls. **You can use the `FungibleTokenClient` for contract calls and query read-only methods**. Note, that is not yet possible to access the results of a contract call (relevant PR: https://github.com/blockstack/stacks-blockchain-sidecar/pull/129).

1. Use clarity read-eval-print-loop
    1. In terminal, type `clarity-repl` - use tab to auto-complete
    1. Start typing clarity statements like `(mod 3 2)`
    1. Press Ctrl + c twice to exit clarity-repl
    
1. Start stacks node
    1. In terminal, type `stacks-node mocknet`
    1. Watch the logs
    1. Click `Open Ports`, select port 20443 and click `Open in Browser`
    1. A new tab opens, add `/v2/info` behind the url in the addressbar
    1. See the information about your node
    1. You can also, type `stacks-node argon` to launch a public node of the testnet. Wait until the node has synced and the node is listening on port 20443, then you can deploy the contract through your own node:
        1. Make port 20443 public. 
        1. Update the coreApiUrl in `scripts/fungible-tokens.ts`
        1. Run `npx ts-node scripts/fungible-token`
    1. or you can configure your mocknet by typing `stacks-node start --config=~/tools/stacks-blockchain/testnet/stacks-node/Stacks.toml` after adding an initial amount to your address(es) in that file.

## JsonRCPPRovider
For testing Clarity contracts, the clarity-js-sdk helps to simplifies the process by providing a `Client` object, that can make contract calls and query the state of the clarity program. The Clients requires a `Provider` objects that knows how to execute these calls and queries. The default provider connects to a Clarity VM through the clarity-cli.

While this is great for unit testing Clarity contracts, until now, the contract calls and queries have to be rewritten using the `stacks-transactions-js` library when the developer wants to execute the calls and queries on a stacks blockchain. This is tedious and cumbersome. Therefore, a `JsonRCPPRovider` was developed that connects to a stacks network. 

Developers can now use the same `Client` object to make calls and queries also on a stacks blockchain by using the `JsonRCPPRovider`.

### Use (with FungibleTokenClient)
```
import { createJsonRpcProvider } from "@blockstack/clarity";
import { StacksTestnet } from "@blockstack/stacks-transactions";
import { FungibleTokenClient } from "../src/clients/tokens/fungibleToken";

(async () => {
  // create client with JsonRcpProvider
  client = new FungibleTokenClient(
    await createJsonRpcProvider(
      "44767e169d5146c704a308d7ff2e3edac573e2649fb690aa4e8526480678d19e01" // privateKey
    ),
    "STR2BKSZQHTZGJB9QB97XDVTY70QM1HHZCDZYS2N" // address
  );

  // use client to deploy contract to Stacks blockchain
  await client.deployContract();

  // use client to make a query on the Stacks blockchain
  const result = await client.balanceOf("ST398K1WZTBVY6FE2YEHM6HP20VSNVSSPJTW0D53M");
  console.log(result);
})();


```

Run the script, e.g. via `npx ts-node fungible-tokens.ts`

## Videos
* Introduction to the Web IDE for Clarity [https://youtu.be/61Vie1Hc608](https://youtu.be/61Vie1Hc608)
* Running unit tests and deploy a contract with the same `Client` using the clarity vm provider and the `JsonRpcProvider` [https://youtu.be/_jvk5L2GWok](https://youtu.be/_jvk5L2GWok)

