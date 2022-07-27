export class DataTree<T extends Data> {
  constructor(
    public name: string,
    public children: DataTree<T>[],
    public items: T[] = [],
    public edit: boolean = false,
    public parent?: DataTree<T>,
    public id?: string,
    public parentID?: string
  ) {}
}
export interface Data{
  id?: string
  title:string
}
