export interface ITag {
  value: string;
  isUsed: boolean;
  id: number;
}

export class Tag {
  value: string;
  isUsed: boolean;
  id: number;

  constructor(tagPrototype?: ITag) {
    this.value = tagPrototype?.value ? tagPrototype.value : '';
    this.isUsed = tagPrototype?.isUsed ? tagPrototype.isUsed: false;
    this.id = tagPrototype?.id ? tagPrototype.id : -1;
  }
}

/*export class TagSelect extends Tag{
  isSelected: boolean;
  constructor(tag: Tag) {
    super(tag);
    this.isSelected = false;
  }
}*/
