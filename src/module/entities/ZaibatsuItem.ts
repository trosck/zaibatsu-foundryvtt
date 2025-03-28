// @ts-nocheck
export class ZaibatsuItem extends Item {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);
    return result;
  }
}
