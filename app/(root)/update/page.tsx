"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import ColorSelector from "@/components/ColorSelector";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { updateTodo } from "@/services/todos";
import { toast } from "react-toastify";
import { bgColors } from "@/utils/constants";

const UpdateTodo = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const existingTitle = searchParams.get("title") as string;
  const existingCompletedStatus = searchParams.get("completed") as string;
  let existingTaskColor = searchParams.get("color") as string;

  const router = useRouter();

  existingTaskColor =
    existingTaskColor.length > 0 ? `#${existingTaskColor}` : "";
  const [title, setTitle] = useState(existingTitle);
  const [color, setColor] = useState(existingTaskColor);

  const [loading, setLoading] = useState(false);

  const handleSelectColor = (color: string) => {
    setColor(color);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      todoId: Number(id),
      title,
      color,
      completed: existingCompletedStatus === "true" ? true : false,
    };

    setLoading(true);
    try {
      const response = await updateTodo(payload);
      if (response.success) {
        setLoading(false);
        toast.success("Task updated successfully!", {
          position: "top-right",
        });
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col mt-[60px] lg:mt-[100px] w-[92%] md:w-[420px] lg:w-[736px] mx-auto h-auto md:h-[358px]">
      <Link href={"/"}>
        <Image
          src={"/assets/arrow-left.png"}
          width={24}
          height={24}
          alt="arrow left icon"
        />
      </Link>

      <form
        className="w-full mt-[35px] flex flex-col justify-between items-center h-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-[186px] flex flex-col gap-[25px]">
          <Input
            label="Title"
            value={title}
            onChange={handleChange}
            placeholder="Ex. Brush your teeth"
          />

          <ColorSelector
            label="Color"
            colors={bgColors}
            color={color}
            handleSelectColor={handleSelectColor}
          />
        </div>

        <div className="h-auto w-full mt-[45px]">
          {" "}
          <Button
            onPress={() => {}}
            label="Save"
            type={"submit"}
            loading={loading}
          >
            <Image
              src={"/assets/white-check.png"}
              width={16}
              height={16}
              alt="plus icon"
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
