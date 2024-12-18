import axiosClient from "@/utils/axiosClient";
import {
  CreateTodoPayload,
  GetTodosResponse,
  TodoResponse,
  UpdateTodoPayload,
} from "@/utils/types";

export const fetchTodos = async () => {
  try {
    const { data } = await axiosClient.get<GetTodosResponse>("/tasks");
    return data.todos;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (payload: CreateTodoPayload) => {
  const { title, color } = payload;

  try {
    const { data } = await axiosClient.post<TodoResponse>(`/tasks`, {
      title,
      color,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (payload: UpdateTodoPayload) => {
  const { todoId, ...rest } = payload;

  try {
    const { data } = await axiosClient.put<TodoResponse>(
      `/tasks/${payload.todoId}`,
      {
        ...rest,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeTodo = async (todoId: number) => {
  try {
    return await axiosClient.delete<TodoResponse>(`/tasks/${todoId}`);
  } catch (error) {
    throw error;
  }
};
