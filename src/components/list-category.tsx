import React, { useEffect, useState } from "react";
import { Input, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";

interface DataType {
  key: string;
  category: string;
}
interface DataCategoryProps {
  data: string[];
  getAllCategories: () => void;
}

export function ListCategoryComponent({
  data,
  getAllCategories,
}: DataCategoryProps) {
  const [dataCustom, setDataCustom] = useState<
    { key: string; category: string }[]
  >([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [categoryName, setCategoryName] = useState<string>("");

  const showModalDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpenDelete(true);
  };

  const handleOkDelete = () => {
    deleteCategory(selectedId);
    setIsModalOpenDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const showModalEdit = (id: string) => {
    setSelectedId(id);
    setIsModalOpenEdit(true);
  };

  const handleOkEdit = () => {
    updateCategory(selectedId, categoryName);
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  async function deleteCategory(id: string) {
    try {
      await api.delete(`/categories/delete/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      getAllCategories();
    }
  }

  async function updateCategory(id: string, name: string) {
    try {
      await api.put(`/categories/update/${id}`, {
        name: name,
      });
    } catch (error) {
      console.error(error);
    } finally {
      getAllCategories();
    }
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Categoria",
      key: "category",
      dataIndex: "category",
      render: (_, { category: tags }) => <Tag color="geekblue">{tags}</Tag>,
    },
    {
      title: "Ações",
      width: 1,
      fixed: "right",
      key: "actions",
      render: (_, { key: id }) => (
        <div className="flex gap-5">
          <div onClick={() => showModalEdit(id)} className="cursor-pointer">
            <EditOutlined className="text-blue-700 text-[16px]	" />
          </div>
          <div onClick={() => showModalDelete(id)} className="cursor-pointer">
            <DeleteOutlined className="text-red-500 text-[16px]	" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const dataCustom = data.map((item: any) => {
      return {
        key: item.id,
        category: item.name,
      };
    });

    setDataCustom(dataCustom);
  }, [data]);
  return (
    <>
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={dataCustom}
      />

      <>
        <Modal
          title={"Editar"}
          open={isModalOpenEdit}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
          okButtonProps={{ className: "bg-blue-500 text-white" }}
          okText="Salvar"
          cancelButtonProps={{ className: "bg-red-500 text-white" }}
        >
          <div className="flex flex-col">
            <label>informe o nome da categoria: </label>
            <Input
              className="mt-5 p-2 w-1/2"
              placeholder="Nome da categoria"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </Modal>

        <Modal
          title={`Deletar`}
          open={isModalOpenDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
          okButtonProps={{ className: "bg-blue-500 text-white" }}
          okText="Deletar"
          cancelButtonProps={{ className: "bg-red-500 text-white" }}
        >
          <p>Tem certeza que deseja deletar esta categoria?</p>
        </Modal>
      </>
    </>
  );
}
