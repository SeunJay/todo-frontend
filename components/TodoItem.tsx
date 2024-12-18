"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { IToggleCompletedArgs } from "@/app/(root)/(home)/page";

interface IDeleteParams {
  dbId: number;
  id: number;
}

interface Props {
  id: number;
  todoId: number;
  title: string;
  color: string;
  isCompleted: boolean;
  toggleCompleteStatus: (payload: IToggleCompletedArgs) => Promise<void>;
  deleteTodo: (params: IDeleteParams) => void;
}

const TodoItem = ({
  id,
  title,
  todoId,
  color,
  isCompleted,
  deleteTodo,
  toggleCompleteStatus,
}: Props) => {
  const router = useRouter();

  const navigateToEditPage = () => {
    router.push(
      `/update?id=${todoId}&title=${title}&completed=${isCompleted}&color=${color.replace(
        "#",
        ""
      )}`
    );
  };

  return (
    <section
      className="w-full h-[72px] rounded-[8px] py-[20px] px-[13px] flex justify-between items-center !border !border-[#333333] drop-shadow-md cursor-pointer"
      onClick={navigateToEditPage}
    >
      <div className="flex gap-[9px] w-[85%] h-[40px]">
        {isCompleted ? (
          <span className="w-[25px] h-[25px]">
            <Image
              src={"/assets/check.png"}
              width={23}
              height={23}
              alt="delete icon"
              className="mb-[9px] w-full h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompleteStatus({
                  id,
                  dbId: todoId,
                  color,
                  title,
                  completed: !isCompleted,
                });
              }}
            />
          </span>
        ) : (
          <span
            className="rounded-full !border-2 !border-[#4EA8DE] h-[17.45px] md:h-[17.45px] w-[17.45px] md:w-[17.45px] mt-[3px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();

              toggleCompleteStatus({
                id,
                dbId: todoId,
                color,
                title,
                completed: !isCompleted,
              });
            }}
          ></span>
        )}
        <p
          className={
            isCompleted
              ? `text-[13px] text-[#F2F2F2] truncate line-through`
              : `text-[13px] text-[#F2F2F2] truncate`
          }
          style={{ color: color || "#F2F2F2" }}
        >
          {title}
        </p>
      </div>
      <div className="mb-[6px] flex gap-[5px] text-right">
        {/*  */}
        <Dialog>
          <DialogTrigger
            asChild
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="mt-auto cursor-pointer">
              <Image
                src={"/assets/trash.png"}
                width={24}
                height={24}
                alt="delete icon"
                className="mb-[9px] !ml-auto"
              />
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#333333]">
            <DialogHeader>
              <DialogTitle className="text-[#f2f2f2]">
                Delete This Task?
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this task?
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2"></div>
            </div>
            <DialogFooter className="!flex justify-between gap-[10px] sm:justify-start">
              <DialogClose asChild className="">
                <button
                  className="rounded-[8px] h-[30px] w-[100px] bg-[#f2f2f2] text-[13px] outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  No
                </button>
              </DialogClose>

              <button
                className="rounded-[8px] h-[30px] w-[100px] bg-[red] text-[13px] text-[#f2f2f2] outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo({ dbId: todoId, id });
                }}
              >
                Yes
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TodoItem;
