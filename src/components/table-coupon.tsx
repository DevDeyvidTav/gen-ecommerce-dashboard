"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, DatePicker, Input, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import pt_BR from "antd/lib/locale/pt_BR";
import "moment/locale/pt-br";

interface DataType {
  key: string;
  code: string;
  discount: number;
  type: string;
  expiresIn: string;
}

export function TableCouponComponent() {
  const [data, setData] = useState<any>({
    code: "",
    discount: "",
    type: "",
    expiresIn: "",
  });
  const [coupons, setCoupons] = useState<any>([]);
  const [couponsCustom, setCouponsCustom] = useState<any>([]);
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
    deleteCoupon(selectedId);
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
    updateCoupon(selectedId);
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Desconto",
      dataIndex: "discount",
      key: "discount",
      render: (_, { discount: tags }) => <Tag color="orange">{tags}%</Tag>,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Expira em",
      dataIndex: "expiresIn",
      key: "expiresIn",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, { key: id }) => (
        <div className="flex gap-5">
          <div onClick={() => showModalEdit(id)} className="cursor-pointer">
            <EditOutlined className="text-primary text-[16px]	" />
          </div>
          <div
            onClick={() => showModalDelete(selectedId)}
            className="cursor-pointer"
          >
            <DeleteOutlined className="text-red-500 text-[16px]	" />
          </div>
        </div>
      ),
    },
  ];

  async function getAllCoupons() {
    try {
      const response = await api.get("/coupons/get-all");
      setCoupons(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCoupon(id: string) {
    try {
      let dataUpdate = {};
      if (data.code !== "") {
        dataUpdate = { ...dataUpdate, code: data.code };
      }
      if (data.discount !== "") {
        dataUpdate = { ...dataUpdate, discount: parseInt(data.discount) };
      }
      if (data.type !== "") {
        dataUpdate = { ...dataUpdate, type: data.type };
      }
      if (data.expiresIn !== "") {
        dataUpdate = { ...dataUpdate, expiresIn: new Date(data.expiresIn) };
      }
      await api.put(`/coupons/updateCoupon/${id}`, dataUpdate);
      toast.success("Cupom atualizado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o cupom 😥");
    } finally {
      getAllCoupons();
      setData({
        code: "",
        discount: "",
        type: "",
        expiresIn: "",
      });
    }
  }

  async function deleteCoupon(id: string) {
    try {
      await api.delete(`/coupons/deleteCoupon/${id}`);
      toast.success("Cupom deletado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar o cupom 😥");
    } finally {
      getAllCoupons();
    }
  }
  useEffect(() => {
    const couponsCustom = coupons.map((coupon: any) => {
      return {
        key: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        type: coupon.type,
        expiresIn: format(coupon.expiresIn, "dd/MM/yyyy", { locale: ptBR }),
      };
    });
    setCouponsCustom(couponsCustom);
  }, [coupons]);

  useEffect(() => {
    getAllCoupons();
  }, []);
  return (
    <>
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={couponsCustom.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: couponsCustom.length,
          locale: { items_per_page: "/ página" },
          style: { marginRight: "9rem" },
        }}
        onChange={handleTableChange}
      />
      <Modal
        title={`Editar Produto`}
        open={isModalOpenEdit}
        okText="Salvar"
        onOk={handleOkEdit}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        onCancel={handleCancelEdit}
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <h1 className="py-3">preencha os campos:</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              className=" w-1/2"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              placeholder="Código"
              type="text"
            />
            <Input
              className="w-1/2"
              value={data.discount}
              onChange={(e) => setData({ ...data, discount: e.target.value })}
              placeholder="Desconto"
              type="text"
            />
          </div>

          <div className="flex gap-2">
            <Input
              className=" w-1/2"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
              placeholder="Tipo"
              type="text"
            />
            <ConfigProvider locale={pt_BR}>
              <DatePicker
                className="w-full"
                onChange={(e) => setData({ ...data, expiresIn: e })}
              />
            </ConfigProvider>
          </div>
        </div>
      </Modal>
      <Modal
        title={`Deletar Produto`}
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
  );
}
