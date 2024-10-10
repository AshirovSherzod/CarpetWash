import React, { useState } from "react";
import { Space, Table, Tag, message, Modal, Input } from "antd";
import {
  useGetAllOrdersQuery,
  useUpdateOrdersMutation,
  useDeleteOrdersMutation,
} from "../../../context/api/ordersApi";

const Orders = () => {
  const {
    data: ordersData,
    error,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrdersMutation();
  const [deleteOrder] = useDeleteOrdersMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Edit modalini ochish
  const showEditModal = (order) => {
    setCurrentOrder({ ...order }); // Obyektni klonlash
    setIsModalVisible(true);
  };

  // Modalni yopish
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

  // Tahrirlangan ma'lumotlarni saqlash
  const handleSave = async () => {
    try {
      await updateOrder({
        id: currentOrder.id,
        body: {
          client: currentOrder.client,
          status: currentOrder.status,
        },
      }).unwrap();
      message.success("Order updated successfully");
      refetch(); // Ma'lumotlarni yangilash
      setIsModalVisible(false);
      setCurrentOrder(null);
    } catch (error) {
      message.error(
        `Failed to update order: ${error?.data?.message || error.message}`
      );
    }
  };

  // Delete funksiyasi
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      onOk: async () => {
        try {
          await deleteOrder(id).unwrap();
          message.success("Order deleted successfully");
          refetch(); // Ma'lumotlarni yangilash
        } catch (error) {
          message.error(
            `Failed to delete order: ${error?.data?.message || error.message}`
          );
        }
      },
    });
  };

  // Xatolik yuzaga kelganda xabar chiqarish
  if (error) {
    message.error("Failed to load orders");
  }

  // Table uchun ustunlar
  const columns = [
    {
      title: "Name",
      dataIndex: ["client", "full_name"],
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: ["client", "phone_number"],
      key: "phone",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "tayyor"
            ? "green"
            : status === "inprogress"
            ? "blue"
            : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Manage",
      key: "manage",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  // API-dan kelayotgan ma'lumotlarni Table uchun formatlash
  const data = ordersData?.data?.orders || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]">
          Create Order
        </button>
      </div>
      {/* Jadvalni ko'rsatish */}
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Order"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          value={currentOrder?.client?.full_name}
          onChange={(e) =>
            setCurrentOrder({
              ...currentOrder,
              client: {
                ...currentOrder.client,
                full_name: e.target.value,
              },
            })
          }
          placeholder="Name"
        />
        <Input
          value={currentOrder?.client?.phone_number}
          onChange={(e) =>
            setCurrentOrder({
              ...currentOrder,
              client: {
                ...currentOrder.client,
                phone_number: e.target.value,
              },
            })
          }
          placeholder="Phone Number"
          style={{ marginTop: 10 }}
        />
        <Input
          value={currentOrder?.status}
          onChange={(e) =>
            setCurrentOrder({
              ...currentOrder,
              status: e.target.value,
            })
          }
          placeholder="Status"
          style={{ marginTop: 10 }}
        />
      </Modal>
    </div>
  );
};

export default Orders;
