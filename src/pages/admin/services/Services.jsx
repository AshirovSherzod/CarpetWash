import {
  Space,
  Table,
  Modal,
  message,
  Input,
  Form,
  Button,
  Pagination,
} from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useCreateServiceMutation,
} from "../../../context/api/serviceApi";
import { useState } from "react";
import { useGetValue } from "../../../hooks/useGetValue";

const initialState = {
  name: "",
  traffic: "",
  price: 0,
  description: "",
};

const Services = () => {
  const { data: servicesData, refetch } = useGetAllServicesQuery({
    limit: 10,
    page: 1,
  });
  console.log(servicesData);
  
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const { formData, handleChange } = useGetValue(initialState);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleDelete = (serviceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      content: "Once deleted, the service cannot be recovered.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteService(serviceId);
          message.success("Service deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete service");
        }
      },
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      await updateService({ id: editingService.id, ...values });
      message.success("Service updated successfully");
      refetch();
      setEditModalVisible(false);
    } catch (error) {
      message.error("Failed to update service");
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    let newData = {
      name: formData.name,
      traffic: formData.traffic,
      price: +formData.price,
      description: formData.description,
    };
    try {
      createService(newData);
      message.success("Service created successfully");
      refetch();
    } catch {
      message.error("Failed to create service");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tariffs",
      key: "tariffs",
      dataIndex: "tariffs",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Manage",
      key: "manage",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleEdit(record)}>Edit</button>
          <button
            onClick={() => handleDelete(record.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const data =
    servicesData?.data.services.map((service) => ({
      name: service.name,
      tariffs: service.tariffs,
      price: service.price,
      description: service.description,
      id: service.id,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button
          onClick={() => setCreateModalVisible(true)}
          className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]"
        >
          Create Service
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={isDeleting || isUpdating || isCreating}
        pagination={true}
        
      />

      {/* { edit modal } */}
      <Modal
        title="Edit Service"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => {
          document.getElementById("editServiceForm").submit();
        }}
        confirmLoading={isUpdating}
      >
        {editingService && (
          <Form
            id="editServiceForm"
            layout="vertical"
            initialValues={editingService}
            onFinish={handleEditSubmit}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Tariffs" name="tariffs">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* { create modal } */}
      <Modal
        title="Create Service"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <form action="" className="space-y-4" onSubmit={handleCreateSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="traffic"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Tariffs
            </label>
            <input
              type="text"
              id="traffic"
              name="traffic"
              value={formData.tariffs}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#232627",
              borderColor: "#232627",
              width: "100%",
            }}
          >
            Submit
          </Button>
          {/* <button>Submit</button> */}
        </form>
      </Modal>
    </div>
  );
};

export default Services;
