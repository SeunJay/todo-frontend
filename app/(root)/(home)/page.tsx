"use client";


import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/utils/types";
import Spinner from "@/components/Spinner";
import { fetchTodos, removeTodo, updateTodo } from "@/services/todos";
import { toast } from "react-toastify";
import TodoItem from "@/components/TodoItem";

export interface IToggleCompletedArgs {
  id: number;
  dbId: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function Home() {
  const [myTodos, setMyTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      try {
        const todos = await fetchTodos();
        setMyTodos(todos);
        setCompletedTodos(todos.filter((todo) => todo.completed).length);
        setLoading(false);
      } catch (err: any) {}
    };

    getTodos();
  }, []);

  const navigateToCreateTodoPage = () => {
    router.push("/create");
  };

  const toggleCompleteStatus = async (args: IToggleCompletedArgs) => {
    const { id, dbId, color, title, completed } = args;
    const payload = {
      todoId: dbId,
      title,
      color,
      completed,
    };
    try {
      const response = await updateTodo(payload);

      if (response.success) {
        const updatedTodos = myTodos.map((todo, index) => {
          if (index === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          } else {
            return todo;
          }
        });

        setMyTodos(updatedTodos);
        setCompletedTodos(updatedTodos.filter((todo) => todo.completed).length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (params: { dbId: number; id: number }) => {
    const { id, dbId } = params;
    try {
      await removeTodo(dbId);
      const updatedTodos = myTodos.filter((todo, i) => i !== id);

      setMyTodos(updatedTodos);
      setCompletedTodos(updatedTodos.filter((todo) => todo.completed).length);
      toast.success("Task deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  let content;

  if (loading && myTodos.length === 0) {
    content = (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (!loading && myTodos.length > 0) {
    content = (
      <>
        {" "}
        <section className="w-full h-[19px] mt-[50px] flex justify-between items-center">
          <div className="h-full w-[80px] flex gap-[6px]">
            <h2 className="text-[#4EA8DE] text-[14px] font-bold">Tasks</h2>
            <span className="w-[25px] h-[19px] rounded-full bg-[#333333] flex justify-center items-center text-[#D9D9D9] text-[11px]">
              {myTodos.length}
            </span>
          </div>

          <div className="h-full w-[140px] flex gap-[6px]">
            <h2 className="text-[#8284FA] text-[14px] font-bold">Completed</h2>

            <span className="w-[52px] h-[19px] rounded-full bg-[#333333] flex justify-center items-center text-[#D9D9D9] text-[11px]">
              {completedTodos} of {myTodos.length}
            </span>
          </div>
        </section>
        <div className="flex flex-col gap-[10px] w-full h-auto mt-[25px]">
          {myTodos.map((todo, i) => (
            <TodoItem
              key={todo.id}
              id={i}
              todoId={todo.id}
              title={todo.title}
              color={todo.color}
              isCompleted={todo.completed}
              toggleCompleteStatus={toggleCompleteStatus}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <section className="w-full h-[19px] mt-[50px] flex justify-between items-center">
          <div className="h-full w-[80px] flex gap-[6px]">
            <h2 className="text-[#4EA8DE] text-[14px] font-bold">Tasks</h2>
            <span className="w-[25px] h-[19px] rounded-full bg-[#333333] flex justify-center items-center text-[#D9D9D9] text-[11px]">
              {myTodos.length}
            </span>
          </div>

          <div className="h-full w-[110px] flex gap-[6px]">
            <h2 className="text-[#8284FA] text-[14px] font-bold">Completed</h2>

            <span className="w-[25px] h-[19px] rounded-full bg-[#333333] flex justify-center items-center text-[#D9D9D9] text-[11px]">
              {completedTodos}
            </span>
          </div>
        </section>
        {/* Empty State */}
        <div className="mt-[25px] h-[0.6px] w-full bg-[#D9D9D9]"></div>
        <div className="w-full flex justify-center items-center h-[266px]">
          <div className="w-full md:w-[50%] h-[140px] flex flex-col items-center gap-[15px]">
            <Image
              src={"/assets/empty-state-icon.png"}
              width={50}
              height={50}
              alt="empty state icon"
            />

            <h2 className="text-[#808080] text-[16px] m-0 leading-[22px] font-bold text-center">
              You don't have any tasks registered yet.
            </h2>

            <h4 className="text-[#808080] text-[16px] m-0 leading-[22px] font-normal text-center">
              Create tasks and organize your todo items.
            </h4>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col w-[92%] md:w-[420px] lg:w-[736px] mx-auto h-auto md:h-[606px] mt-[-25px]">
      <Button onPress={navigateToCreateTodoPage} label="Create Task">
        <Image
          src={"/assets/plus-icon.png"}
          width={16}
          height={16}
          alt="plus icon"
        />
      </Button>

      {content}
    </div>
  );
}
