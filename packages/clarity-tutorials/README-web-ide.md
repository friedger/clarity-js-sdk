# Web IDE for Clarity

This github repository is setup so it can be used as a development environment 
for Clarity code in the browser. Just open the [gitpod url](https://gitpod.io/#https://github.com/friedger/clarity-js-sdk/blob/feature/web-ide/packages/clarity-tutorials/README-web-ide.md).

(The repo [clarity-smart-contracts](https://github.com/friedger/clarity-smart-contracts) uses the same setup.)

This is a contribution to the "Clarity Hackathon - Tools".
The contribution consists of
- a sharable gitpod configuration for Clarity ([.gitpod.yaml](/.gitpod.yaml) and [.gitpod.Dockerfile](/.gitpod.Dockerfile))
- a [JsonRcpProvider](/packages/clarity/src/providers/jsonRcp)
- a list of videos about how to use the Web IDE (TODO add videos and link)

## Proposed steps to get familiar with the Clarity Web IDE
1. Open this page in the Web IDE: 
https://gitpod.io/#https://github.com/friedger/clarity-js-sdk/blob/feature/web-ide/packages/clarity-tutorials/README-web-ide.md

1. Open a terminal (Ctrl + Shift + `)
1. Run test in clarity vm for fungible tokens: 
   1. `cd packages/clartity-tutorials`
   1. `yarn install`
   1. `yarn jest test/tokens/fungibleToken.test.ts`

1. Deploy contract to testnet:
    1. `npx ts-node scripts/fungible-token
