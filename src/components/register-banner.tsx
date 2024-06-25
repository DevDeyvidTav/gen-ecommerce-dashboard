"use client";
import { Button, Input, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { FormEvent, useState } from "react";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";
import { describe } from "node:test";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";

export function CreateBannerComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    name: "",
    description: "",
  });
  const [image, setImage] = useState<any>(null);
  async function registerBanner(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      //esperar firebase com a url da imagem
      const storageRef = ref(storage, `banners/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
          toast.error("Erro ao fazer upload da imagem 😥");
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log({ downloadURL });
            try {
              await api.post("/banners/create", {
                name: data.name,
                description: data.description,
                imageUrl: downloadURL,
              });

              toast.success("Banner criado com sucesso! 🎉");
            } catch (error) {
              console.error(error);
              toast.error("Erro ao criar o produto 😥");
            } finally {
              setLoading(false);
              setData({
                name: "",
                description: "",
              });
              setImage(null);
            }
          });
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o banner 😥");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col w-full">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={(e) => registerBanner(e)}
        className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg"
      >
        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nome do banner"
            type="text"
          />

          <Input
            className="p-2 "
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="dscrição do banner"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2 border p-5 rounded-md bg-zinc-100">
          <label> Adicione uma imagem: </label>
          <Upload beforeUpload={(file) => {
            setImage(file);
            return false;
          }}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end w-full">
          <Button
            loading={loading}
            htmlType="submit"
            disabled={!data.name || !data.description}
            className="bg-[#E72F2B] text-white h-10 font-bold py-2 px-4 rounded
        hover:bg-[#E72F2B]/70 transition-all duration-500 w-1/6 "
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
