"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Modal, Space, Table, Tag, InputNumber } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";

interface DataType {
  key: string;
  name: string;
  quantity: number;
  productName: string;
}

export function VariantTableComponent() {
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editingItem, setEditingItem] = useState<DataType | undefined>(undefined);
  const [deleteItem, setDeleteItem] = useState<DataType | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      render: (_, { name: tags }) => <Tag color="geekblue">{tags}</Tag>,
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nome do Produto",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => setEditingItem(record)}>
            <EditOutlined />
          </a>
        </Space>
      ),
    }
  ];

  const deleteVariant = async () => {
    try {
      console.log({deleteItem});
      await api.delete(`/variants/delete/${deleteItem?.key}`);
      getAllVariants();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(deleteItem)
  const updateVariant = async () => {
    try {
      await api.put(`/variants/update/${editingItem?.key}`, {
        amount: editingItem?.quantity,
      });
      getAllVariants();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const getProductById = async (productId: string): Promise<string> => {
    try {
      const response = await api.post(`/products/getById/${productId}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const getAllVariants = async () => {
    setLoading(true);
    try {
      const response = await api.get("/variants/list");
      const dataCustom = await Promise.all(response.data.map(async (item: any) => {
        const productName = await getProductById(item.productId);
        return {
          key: item.id,
          name: item.name,
          quantity: item.amount,
          productName: productName,
        };
      }));
      dataCustom.sort((a, b) => a.name.localeCompare(b.name));
      setData(dataCustom);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVariants();
  }, []);

  const handleQuantityChange = (value: number | null) => {
    if (editingItem && value !== null) {
      setEditingItem({ ...editingItem, quantity: value });
    }
  };

  return (
    <>
      <Table
      loading={loading}
        className="border rounded-md"
        columns={columns}
        dataSource={data.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          locale: { items_per_page: "/ página" },
          style: { marginRight: "9rem" },
        }}
        onChange={handleTableChange}
      />
      <Modal
        
        title="Editar estoque"
        open={editingItem !== undefined}
        onCancel={() => setEditingItem(undefined)}
        onOk={async() => {
          await updateVariant();
          setEditingItem(undefined);
        }}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        okText="Confirmar"
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <p>Você deseja editar o estoque desse item?</p>
        <div>
          <p>Nome: {editingItem?.productName} {editingItem?.name}</p>
          Quantidade:
          <InputNumber
            min={0}
            value={editingItem?.quantity}
            onChange={handleQuantityChange}
            className="border rounded-md mt-4 ml-4 px-4 h-10"
          />
        </div>
      </Modal>
      <Modal
        title="Remover estoque"
        open={deleteItem !== undefined}
        onCancel={() => setDeleteItem(undefined)}
        onOk={async() => {
          await deleteVariant();
          setDeleteItem(undefined);
        }}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        okText="Confirmar"
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <p>Você deseja remover esse estoque?</p>
      </Modal>
    </>
  );
}
