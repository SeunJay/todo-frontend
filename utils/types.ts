export interface Todo {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: "string";
}

export interface GetTodosResponse {
  success: boolean;
  todos: Todo[];
}

export interface TodoResponse {
  success: boolean;
  todo: Todo[];
}

export interface CreateTodoPayload {
  title: string;
  color: string;
}

export interface UpdateTodoPayload extends CreateTodoPayload {
  todoId: number;
  completed: boolean;
}
