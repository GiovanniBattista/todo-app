
export interface TodoCreate {
  title: string;
  dueDate?: Date;
}

export interface Todo extends TodoCreate {
  id: number;
  done?: boolean;
}
