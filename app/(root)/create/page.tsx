"use client";

import Button from "@/components/Button";
import ColorSelector from "@/components/ColorSelector";
import Input from "@/components/Input";
import { createTodo } from "@/services/todos";
import { bgColors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSelectColor = (color: string) => {
    setColor(color);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Title is required");
      return;
    }

    const payload = {
      title,
      color: color || "#fff",
    };
    setLoading(true);
    try {
      const response = await createTodo(payload);
      if (response.success) {
        setLoading(false);
        toast.success("New task added successfully!", {
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
            label="Add Task"
            type={"submit"}
            loading={loading}
          >
            <Image
              src={"/assets/plus-icon.png"}
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

export default CreateTodo;
