import {Tag} from "./tags.model";

export interface INote {
  id?: number;
  title: string;
  text: string;
  notifyTime: string;
  tags: Tag[];
}

export class Note {
  id?: number;
  title: string;
  text: string;
  notifyTime: string;
  tags: Tag[];

  constructor() {
    this.id = 0;
    this.title = '';
    this.text = '';
    this.notifyTime = '';
    this.tags = [];
  }
}
