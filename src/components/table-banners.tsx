"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";

interface DataType {
  key: string;
  name: string;
  description: string;
}

export function TableBannerComponent() {
  const [dataUpdate, setDataUpdate] = useState<any>({
    name: "",
    description: "",
  });
  const [banner, setBanner] = useState<any>([]);
  const [customBanner, setCustomBanner] = useState<any>([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const showModalDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpenDelete(true);
  };

  const handleOkDelete = () => {
    deleteBanner(selectedId);
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
    updateBanner(selectedId);
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  async function getAllBanners() {
    try {
      const response = await api.get("/banners/get-all");
      setBanner(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateBanner(id: string) {
    let updateData = {};
    if (dataUpdate.name !== "") {
      updateData = { ...updateData, name: dataUpdate.name };
    }
    if (dataUpdate.description !== "") {
      updateData = { ...updateData, description: dataUpdate.description };
    }

    try {
      await api.put(`/banners/update/${id}`, updateData);
      toast.success("Banner atualizado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o banner 😥");
    } finally {
      getAllBanners();
      setDataUpdate({ name: "", description: "" });
    }
  }

  async function deleteBanner(id: string) {
    try {
      await api.delete(`/banners/delete/${id}`);
      toast.success("Banner excluído com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir o banner 😥");
    } finally {
      getAllBanners();
    }
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome do Banner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, { key: id }) => (
        <div className="flex gap-5">
          <div onClick={() => showModalEdit(id)} className="cursor-pointer">
            <EditOutlined className="text-blue-700 text-[16px]" />
          </div>
          <div onClick={() => showModalDelete(id)} className="cursor-pointer">
            <DeleteOutlined className="text-red-500 text-[16px]" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const customBanner = banner.map((item: any) => {
      return {
        key: item.id,
        name: item.name,
        description: item.description,
      };
    });

    setCustomBanner(customBanner);
  }, [banner]);

  useEffect(() => {
    getAllBanners();
  }, []);
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={customBanner.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: customBanner.length,
          locale: { items_per_page: "/ página" },
          style: { marginRight: "9rem" },
        }}
        onChange={handleTableChange}
      />
      <Modal
        title={`Editar Banner`}
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        okText="Confirmar"
        cancelText="Cancelar"
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <label className="font-semibold ml-6">Nome:</label>
            <Input
              className="w-1/2"
              value={dataUpdate.name}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, name: e.target.value })
              }
              placeholder="Nome do banner"
              type="text"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Descrição:</label>
            <Input
              className="w-1/2"
              value={dataUpdate.description}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, description: e.target.value })
              }
              placeholder="Descrição do banner"
              type="text"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title={`Deletar`}
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        okText="Deletar"
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
        onCancel={handleCancelDelete}
      >
        <p>Tem certeza que deseja deletar este banner?</p>
      </Modal>
    </>
  );
}
