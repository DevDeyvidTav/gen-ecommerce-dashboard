"use client";
import { Button, Input } from "antd";
import { FormEvent, useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";
import { Login } from "@/firebase/functions";

export function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });
  const router = useRouter();
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Login({
        email: data.email,
        password: data.password,
      })
      console.log(response)
   
      if (response.success) {
        Cookies.set("userId", "fakerUserId");
        console.log(response.user);
        setTimeout(() => {
          router.push("/");
        }, 1500);
        return
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao efetuar o login 😥");
    } finally {
      setLoading(false);
      setData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-10 w-full justify-center items-center"
      >
        <Input
          type="text"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-2/3 p-4 text-lg"
          placeholder="Digite seu email"
          suffix={<MailOutlined className="text-[18px] text-red-500 " />}
        />

        <Input.Password
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-2/3 p-4 text-lg"
          placeholder="Digite sua senha"
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone className="text-[20px] " />
            ) : (
              <EyeInvisibleOutlined className="text-[20px] " />
            )
          }
        />
        <Button
          htmlType="submit"
          loading={loading}
          disabled={!data.email || !data.password}
          className="w-2/3 bg-[#E72F2B] rounded-md p-5 h-16 text-white hover:bg-[#E72F2B]/70
          transition-all duration-500"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
