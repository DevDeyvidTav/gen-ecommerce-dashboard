"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";

interface DataType {
  key: string;
  name: string;
  description: string;
  price: number;
  valuePromotionInPercent: string;
  category: string;
}

export function ProductWithPromotionComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [customProducts, setCustomProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

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

  async function removePromotion(id: string) {
    try {
      const response = await api.put(`/products/update/${id}`, {
        valuePromotionInPercent: null,
      });

      toast.success("Promocão removida com sucesso! 🎉");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover promocão 😥");
    } finally {
      getAllProducts();
    }
  }

  const showModal = (product: any) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    removePromotion(selectedProduct.key);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Desconto",
      dataIndex: "valuePromotionInPercent",
      key: "valuePromotionInPercent",
      render: (_, { valuePromotionInPercent: tags }) => (
        <Tag color="volcano">{tags}</Tag>
      ),
    },
    {
      title: "Remover",
      key: "actions",
      render: (_, product) => (
        <div onClick={() => showModal(product)} className="cursor-pointer">
          <DeleteOutlined className="text-red-500 text-[16px]" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const customProducts = products
      .filter((product: any) => product.valuePromotionInPercent !== null)
      .map((product: any) => {
        return {
          key: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat((product.price / 100) as any).toFixed(2),
          category: getCategoryById(product.categoryId),
          valuePromotionInPercent: product.valuePromotionInPercent + "%",
        };
      });

    setCustomProducts(customProducts);
  }, [products]);

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={customProducts.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: customProducts.length,
          locale: { items_per_page: "/ página" },
          style: { marginRight: "9rem" },
        }}
        onChange={handleTableChange}
        scroll={{ y: 280 }}
      />

      <Modal
        title={<div>Remover Desconto</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#E72F2B" } }}
        okText="Remover"
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
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Desconto:</label>
            <div>{selectedProduct?.valuePromotionInPercent}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
