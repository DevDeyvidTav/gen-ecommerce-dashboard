"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";

interface DataType {
  key: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export function PromotionProductsComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [customProducts, setCustomProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [valuePromotionInPercent, setValuePromotionInPercent] =
    useState<any>("");

  async function getCategoryById(id: string) {
    try {
      const response = await api.get(`/categories/get-category/${id}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllProducts() {
    try {
      const response = await api.get("/products/list");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePromotion(id: string) {
    try {
      await api.put(`/products/update/${id}`, {
        valuePromotionInPercent: parseInt(valuePromotionInPercent),
      });
      toast.success("Promocão aplicada com sucesso! 🎉");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao aplicar promocão! 😥");
    } finally {
      setValuePromotionInPercent("");
    }
  }

  const showModal = (product: any) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handlePromotion(selectedProduct.key);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValuePromotionInPercent("");
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Categoria",
      key: "category",
      dataIndex: "category",
      render: (_, { category: tags }) => <Tag color="geekblue">{tags}</Tag>,
    },
    {
      title: "Selecionar",
      key: "actions",
      render: (_, product) => (
        <div onClick={() => showModal(product)} className="cursor-pointer">
          <FireOutlined className="text-red-400 text-[16px]" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const productCustom = products.map((item: any) => ({
      key: item.id,
      name: item.name,
      description: item.description,
      price: parseFloat(((item.price as any) / 100) as any).toFixed(2),
      category: getCategoryById(item.categoryId),
    }));

    setCustomProducts(productCustom);
  }, [products]);

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={customProducts}
      />

      <Modal
        title={<div>Adicionar Desconto</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#E72F2B" } }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Nome:</div>
            <div>{selectedProduct?.name}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Categoria:</div>
            <div>{selectedProduct?.category}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Descricão:</div>
            <div>{selectedProduct?.description}</div>
          </div>
          <div className="flex gap-2 pt-5 items-center">
            <label className="font-semibold">Desconto:</label>
            <Input
              className="w-1/6 bg-zinc-100"
              value={valuePromotionInPercent}
              onChange={(e) => setValuePromotionInPercent(e.target.value)}
              placeholder="Porcentagem de desconto"
              type="text"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
