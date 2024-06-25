"use client";
import { api } from "@/axios/config";
import { Button, Input, Select } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export function RegisterVariantsComponent() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [data, setData] = useState<any>({
    name: "",
    amount: "",
    productId: "",
    length: "",
    width: "",
    height: "",
    weight: "",
  });

  async function getAllProducts() {
    try {
      const response = await api.get("/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createVariants(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/variants/register", {
        name: data.name,
        amount: parseInt(data.amount),
        productId: data.productId,
        length: parseInt(data.length),
        width: parseInt(data.width),
        height: parseInt(data.height),
        weight: parseInt(data.weight),
      });

      toast.success("Variante criado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o variante 😥");
    } finally {
      setData({
        name: "",
        amount: "",
        productId: "",
        length: "",
        width: "",
        height: "",
        weight: "",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={(e) => createVariants(e)}
        className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg"
      >
        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nome"
            type="text"
          />
          <Input
            className="p-2"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
            placeholder="Quantidade"
            type="text"
          />
        </div>

        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.length}
            onChange={(e) => setData({ ...data, length: e.target.value })}
            placeholder="Comprimento (cm)"
            type="text"
          />
          <Input
            className="p-2"
            value={data.width}
            onChange={(e) => setData({ ...data, width: e.target.value })}
            placeholder="Largura (cm)"
            type="text"
          />
          <Input
            className="p-2"
            value={data.height}
            onChange={(e) => setData({ ...data, height: e.target.value })}
            placeholder="Altura (cm)"
            type="text"
          />
          <Input
            className="p-2"
            value={data.weight}
            onChange={(e) => setData({ ...data, weight: e.target.value })}
            placeholder="Peso (g)"
            type="text"
          />
        </div>

        <div className="flex gap-5">
          <Select
            size="large"
            className="w-full"
            placeholder="Selecione o Produto"
            value={data.productId === "" ? undefined : data.productId}
            onChange={(value) => setData({ ...data, productId: value })}
            options={products.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>

        <div className="flex justify-end items-end w-full pt-10">
          <Button
            disabled={
              !data.name ||
              !data.amount ||
              !data.productId ||
              !data.length ||
              !data.width ||
              !data.height ||
              !data.weight
            }
            loading={loading}
            htmlType="submit"
            className="bg-[#E72F2B] text-white font-bold py-2 px-4 rounded
          hover:bg-[#E72F2B]/70 transition-all duration-500 w-1/6 h-10 "
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );

}
