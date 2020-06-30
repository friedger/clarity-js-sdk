import { Client, Provider, Receipt, Result } from "@blockstack/clarity";

export class FungibleTokenClient extends Client {
  constructor(provider: Provider, contractAddress:string = "STR2BKSZQHTZGJB9QB97XDVTY70QM1HHZCDZYS2N") {
    super(
      `${contractAddress}.fungible-token`,
      "tokens/fungible-token",
      provider
    );
  }

  async transfer(to: string, value: number, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "transfer", args: [`'${to}`, `u${value}`] },
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async balanceOf(owner: string): Promise<number> {
    const query = this.createQuery({ method: { name: "balance-of", args: [`'${owner}`] } });
    const res = await this.submitQuery(query);
    return Result.unwrapUInt(res);
  }

  async approve(spender: string, amount: number, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "approve", args: [`'${spender}`, `u${amount}`] },
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async revoke(spender: string, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({ method: { name: "revoke", args: [`'${spender}`] } });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async allowanceOf(spender: string, owner: string): Promise<number> {
    const query = this.createQuery({
      method: { name: "get-allowance-of", args: [`'${spender}`, `'${owner}`] },
    });
    const res = await this.submitQuery(query);
    return Result.unwrapUInt(res);
  }

  async transferFrom(
    from: string,
    to: string,
    value: number,
    params: { sender: string }
  ): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "transfer-from", args: [`'${from}`, `'${to}`, `u${value}`] },
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }
}
