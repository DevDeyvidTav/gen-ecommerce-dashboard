"use client";
import { Button, ConfigProvider, Input } from "antd";
import { FormEvent, useState } from "react";
import { DatePicker } from "antd";
import pt_BR from "antd/lib/locale/pt_BR";
import "moment/locale/pt-br";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";

export function CreateCouponComponent() {
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    type: "",
    code: "",
    discount: "",
    expirationDate: "",
  });
  async function registerCoupon(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/coupons/register", {
        code: data.code,
        discount: parseInt(data.discount),
        type: data.type,
        expiresIn: new Date(data.expirationDate),
      });
      toast.success("Cupom criado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o cupom 😥");
    } finally {
      setData({
        type: "",
        code: "",
        discount: "",
        expirationDate: "",
      });
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col w-full gap-5">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={(e) => registerCoupon(e)}
        className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg"
      >
        <div className="flex gap-5">
          <Input
            className="p-2 "
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            placeholder="Tipo do cupom"
            type="text"
          />
          <Input
            className="p-2"
            value={data.code}
            onChange={(e) => setData({ ...data, code: e.target.value })}
            placeholder="Código do cupom"
            type="text"
          />
        </div>
        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.discount}
            onChange={(e) => setData({ ...data, discount: e.target.value })}
            placeholder="Desconto"
            type="text"
          />
          <ConfigProvider locale={pt_BR}>
            <DatePicker
              className="w-full"
              onChange={(e) => setData({ ...data, expirationDate: e })}
            />
          </ConfigProvider>
        </div>
        <div className="flex justify-end items-end w-full pt-10">
          <Button
            htmlType="submit"
            loading={loading}
            disabled={
              !data.type || !data.code || !data.discount || !data.expirationDate
            }
            className="bg-[#E72F2B] text-white font-bold h-10 py-2 px-4 rounded
        hover:bg-[#E72F2B]/70 transition-all duration-500 w-1/6 "
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
