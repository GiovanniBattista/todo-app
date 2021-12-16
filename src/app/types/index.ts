
export interface TodoCreate {
  title: string;
  done?: boolean;
  due?: string;
}

export interface Todo extends TodoCreate {
  id: string;
}
