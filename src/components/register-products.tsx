"use client";
import { Button, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";


export function RegisterProductsComponent() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const [data, setData] = useState<any>({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function registerProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      toast.error("Selecione uma imagem");
      setLoading(false);
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
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
            await api.post("/products/register", {
              name: data.name,
              description: data.description,
              price: parseFloat(data.price.replace(",", ".")) * 100,
              categoryId: data.category,
              valuePromotionInPercent: null,
              imageUrl: downloadURL,
            });
            toast.success("Produto criado com sucesso! 🎉");
          } catch (error) {
            console.error(error);
            toast.error("Erro ao criar o produto 😥");
          } finally {
            setLoading(false);
            setData({
              name: "",
              description: "",
              price: "",
              category: "",
              imageUrl: "",
            });
            setImage(null);
          }
        });
      }
    );
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={(e) => registerProduct(e)}
        className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg"
      >
        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nome do produto"
            type="text"
          />
          <Input
            className="p-2"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Descrição"
            type="text"
          />
        </div>

        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Preço"
            type="text"
          />
          <Select
            size="large"
            className="w-full"
            placeholder={"Selecione a categoria"}
            defaultValue={data.category === "" ? undefined : data.category}
            onChange={(value) => setData({ ...data, category: value })}
            options={categories.map((category: any) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </div>

        <div className="flex flex-col gap-2 border p-5 rounded-md bg-zinc-100">
          <label> Adicione uma imagem: </label>
          <Upload
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end items-end w-full pt-10">
          <Button
            disabled={
              data.name === "" ||
              data.description === "" ||
              data.price === "" ||
              data.category === ""
            }
            htmlType="submit"
            loading={loading}
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
