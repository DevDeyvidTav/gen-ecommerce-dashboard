"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Modal, Select, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { api } from "@/axios/config";
import { toast } from "sonner";
import { format } from "date-fns";

interface DataType {
  key: string;
  orderId: string;
  cartItem: {
    productId: string;
    variantId: string;
    quantity: number;
    observation?: string;
    prevStock: number;
    variantName: string;
  }[];
  send_product: boolean;
  paymentStatus: string;
  shippingCost: number;
  totalAmount: number;
  user_address: string;
  client: string;
  user_email: string;
  user_telephone: string;
  created_at: string;
}

export function OrderTableComponent() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState("all");
  const [orderToCancel, setOrderToCancel] = useState<DataType>();

  const updateOrderStatus = useCallback(async (orderId: string) => {
    try {
      const order = orders.find((order) => order.orderId === orderId);
      if (!order) return;

      const send_product = order.send_product;
      await api.put(`/orders/update/${orderId}`, {
        send_product: !send_product,
      });
      toast.success(send_product ? "Pedido enviado! 🎉" : "Pedido pendente de envio!");
      getAllOrders();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o status do pedido! 😥");
    }
  }, [orders]);

  const columns: TableProps<DataType>["columns"] = useMemo(() => [
    {
      title: "Data de Criação",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, { created_at }) => <div>{format(new Date(created_at), "dd/MM/yyyy")}</div>,
    },
    {
      title: "Informação do Carrinho",
      dataIndex: "cartItem",
      key: "cartItem",
      render: (_, { cartItem }) => (
        <ul>
          {cartItem.length > 0 &&
            cartItem.map((item) => (
              <Tag color="geekblue" key={item.productId}>
                <div>Produtos: {item.productId}</div>
                <div>Quantidade: {item.quantity}</div>
                <div>Variante: {item.variantName}</div>
                {item.observation && <div>Observação: {item.observation}</div>}
              </Tag>
            ))}
        </ul>
      ),
    },
    {
      title: "Status do Pagamento",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Custo de Envio",
      dataIndex: "shippingCost",
      key: "shippingCost",
    },
    {
      title: "Valor Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, { totalAmount }) => <div>R$ {String(totalAmount.toFixed(2).replace(".", ","))}</div>,
    },
    {
      title: "Endereço do Cliente",
      dataIndex: "user_address",
      key: "user_address",
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Email do Cliente",
      dataIndex: "user_email",
      key: "user_email",
    },
    {
      title: "Telefone do Cliente",
      dataIndex: "user_telephone",
      key: "user_telephone",
    },
    {
      title: "Envio",
      key: "actions",
      render: (_, order) => (
        <div>
          <button className="cursor-pointer" onClick={() => updateOrderStatus(order.orderId)}>
            {order.paymentStatus === "approved" && (
              <Tag color={order.send_product ? "green" : "orange"}>
                {order.send_product ? "Enviado" : "Pendente"}
              </Tag>
            )}
          </button>
          {order.send_product === false && order.paymentStatus !== "cancelado" && (
            <button onClick={() => {
              setOrderToCancel(order);
              setIsDeleting(true);
            }} className="cursor-pointer hover:bg-opacity-80 duration-300 bg-red-500 rounded mt-2 text-white px-2">
              <p>
                Cancelar
              </p>
            </button>
          )}
          {
            order.paymentStatus === "cancelado" && (
              <p className="text-red-500">Cancelado</p>
            )
          }
        </div>
      ),
    },
  ], [updateOrderStatus]);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/getAll");
      const ordersData = await Promise.all(response.data.map(async (order: any) => {
        const cartItems = await getCartItemByOrderId(order.id);
        return {
          key: order.id,
          orderId: order.id,
          cartItem: cartItems,
          send_product: order.send_product,
          paymentStatus: order.paymentStatus,
          shippingCost: order.shippingCost,
          totalAmount: order.totalAmount / 100,
          user_address: order.user_adress,
          client: order.user_name,
          user_email: order.user_email,
          user_telephone: order.user_telephone,
          created_at: order.createdAt,
        };
      }));

      const filteredOrders = ordersData.filter((order) => {
        if (filter === "all") return true;
        if (filter === "pendente") return !order.send_product && order.paymentStatus === "approved";
        if (filter === "enviado") return order.send_product;
        if (filter === "cancelado") return order.paymentStatus === "cancelado";
        if (filter === "aprovado") return order.paymentStatus === "approved";
        return false;
      });

      const sortedOrders = filteredOrders.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await api.post(`/products/getById/${id}`);
      return { name: response.data.name, quantity: response.data.amount };
    } catch (error) {
      console.error(error);
    }
  };

  const getVariantById = async (id: string) => {
    try {
      const response = await api.get(`/variants/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      if (orderToCancel) {
        // Use Promise.all para garantir que todas as atualizações de estoque sejam realizadas antes de cancelar o pedido
        await Promise.all(orderToCancel.cartItem.map(async (item) => {
          const itemToEditInStock = item.variantId;
          const quantity = item.quantity;
          await api.put(`/variants/update/${itemToEditInStock}`, {
            amount: item.prevStock + quantity,
          });
        }));

        await api.put(`/orders/update/${orderId}`, {
          paymentStatus: "cancelado",
        });

        getAllOrders();
        toast.success("Pedido cancelado com sucesso! 🎉");
      }
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível cancelar o pedido 😥");
    }
  };

  const getCartItemByOrderId = async (orderId: string) => {
    try {
      const response = await api.post(`/cart-items/orderId/${orderId}`);
      const cartItems = await Promise.all(response.data.map(async (item: any) => {
        const product = await getProductById(item.productId);
        const variant = await getVariantById(item.variantId);
        return {
          productId: product?.name,
          quantity: item.quantity,
          variantId: variant.id,
          observation: item.observation,
          prevStock: variant.amount,
          variantName: variant.name,
        };
      }));
      return cartItems;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [filter]);

  return (
    <div className="w-full h-[60vh] overflow-x-hidden overflow-y-scroll">
      <Select
        value={filter}
        onChange={(value) => setFilter(value)}
        placeholder="Filtrar por status"
        defaultActiveFirstOption
        className="w-48 mb-2"
      >
        <Select.Option value="all">Todos</Select.Option>
        <Select.Option value="pendente">Pendentes</Select.Option>
        <Select.Option value="enviado">Enviados</Select.Option>
        <Select.Option value="cancelado">Cancelados</Select.Option>
        <Select.Option value="aprovado">Aprovados</Select.Option>
      </Select>
      <Table
        loading={loading}
        className="border rounded-md"
        columns={columns}
        dataSource={orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: orders.length,
          locale: { items_per_page: "/ página" },
          style: { marginRight: "9rem" },
        }}
        onChange={handleTableChange}
      />
      <Modal
        visible={isDeleting}
        onClose={() => setIsDeleting(false)}
        onCancel={() => setIsDeleting(false)}
        onOk={() => {
          cancelOrder(String(orderToCancel?.orderId));
          setIsDeleting(false);
        }}
        title="Cancelar pedido"
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        okText="Confirmar"
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <h2>Você deseja cancelar esse pedido?</h2>
      </Modal>
    </div>
  );
}
