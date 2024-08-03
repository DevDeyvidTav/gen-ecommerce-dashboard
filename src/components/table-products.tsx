import React, { useEffect, useState } from "react";
import { Modal, Space, Table, Tag, Button, Input, Select } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";

interface DataType {
  key: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface TableProductsProps {
  products: any;
  filter: any;
  getAllProducts: () => void;
}
export function TableProductsComponent({
  products,
  filter,
  getAllProducts,
}: TableProductsProps) {
  const [productCustom, setProductCustom] = useState<any>([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [categories, setCategories] = useState<any>([]);
  const [dataUpdate, setDataUpdate] = useState<any>({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const showModalDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpenDelete(true);
  };

  const handleOkDelete = () => {
    deleteProduct(selectedId);
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
    updateProduct(selectedId);
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/delete/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      getAllProducts();
    }
  }

  async function updateProduct(id: string) {
    try {
      let updatedData = {};

      if (dataUpdate.name) {
        updatedData = { ...updatedData, name: dataUpdate.name };
      }
      if (dataUpdate.description) {
        updatedData = { ...updatedData, description: dataUpdate.description };
      }
      if (dataUpdate.price) {
        updatedData = {
          ...updatedData,
          price: parseFloat(dataUpdate.price.replace(",", ".")) * 100,
        };
      }
      if (dataUpdate.category) {
        updatedData = { ...updatedData, categoryId: dataUpdate.category };
      }

      await api.put(`/products/update/${id}`, updatedData);
    } catch (error) {
      console.error(error);
    } finally {
      setDataUpdate({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      getAllProducts();
    }
  }

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
      title: "Ações",
      key: "actions",
      render: (_, { key: id }) => (
        <div className="flex gap-5">
          <div onClick={() => showModalEdit(id)} className="cursor-pointer">
            <EditOutlined className="text-primary text-[16px]	" />
          </div>
          <div onClick={() => showModalDelete(id)} className="cursor-pointer">
            <DeleteOutlined className="text-red-500 text-[16px]	" />
          </div>
        </div>
      ),
    },
  ];
  async function getCategoryById(id: string) {
    try {
      const response = await api.get(`/categories/get-category/${id}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTableChange(pagination: any, filters: any, sorter: any) {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const productsCustom = products
      .filter((product: any) => product.categoryId.includes(filter))
      .map((product: any) => {
        return {
          key: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat((product.price / 100) as any).toFixed(2),
          category: getCategoryById(product.categoryId),
        };
      });
    setProductCustom(productsCustom);
  }, [products, filter]);
  return (
    <>
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={productCustom.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: productCustom.length,
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
              value={dataUpdate.name}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, name: e.target.value })
              }
              placeholder="Nome"
              type="text"
            />
            <Input
              className="w-1/2"
              value={dataUpdate.description}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, description: e.target.value })
              }
              placeholder="Descrição"
              type="text"
            />
          </div>

          <div className="flex gap-2">
            <Input
              className=" w-1/2"
              value={dataUpdate.price}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, price: e.target.value })
              }
              placeholder="Preço"
              type="text"
            />
            <Select
              className="w-1/2"
              placeholder="Selecione uma categoria"
              defaultValue={
                dataUpdate.category === "" ? undefined : dataUpdate.category
              }
              onChange={(value) =>
                setDataUpdate({ ...dataUpdate, category: value })
              }
              options={categories.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))}
            />
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
