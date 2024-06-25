"use client";
import { Button, Input, Space } from "antd";
import { ListCategoryComponent } from "./list-category";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";

export function RegisterCategoryComponent() {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    name: "",
  });

  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function registerCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/categories/register", {
        name: data.name,
      });

      toast.success("Categoria criada com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar categoria 😥");
    } finally {
      setLoading(false);
      getAllCategories();
      setData({
        name: "",
      });
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div
      className="bg-white  h-[60vh] overflow-y-scroll
    rounded-xl shadow-lg p-5 border border-zinc-200
    border-opacity-60"
    >
      <Toaster position="bottom-right" richColors />
      <h1 className="text-xl font-semibold">Cadastre uma categoria</h1>

      <form
        onSubmit={(e) => registerCategory(e)}
        className="pt-10 flex flex-col gap-5"
      >
        <label className="font-semibold">Nome da categoria:</label>

        <Space.Compact style={{ width: "100%" }}>
          <Input
            className="w-1/4 border "
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nome da categoria"
          />
          <Button
            disabled={data.name === ""}
            loading={loading}
            htmlType="submit"
            className="font-semibold h-10 bg-[#E72F2B] text-white"
          >
            Cadastrar
          </Button>
        </Space.Compact>
      </form>

      <div className="pt-10">
        <h1 className="text-xl font-semibold pb-5">
          Lista de categorias cadastradas
        </h1>
        <div>
          <ListCategoryComponent
            data={categories}
            getAllCategories={getAllCategories}
          />
        </div>
      </div>
    </div>
  );
}
