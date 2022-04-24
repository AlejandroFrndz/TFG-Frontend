import { Button, Form, Input, Modal } from "antd";

type ItemNameModalProps = {
  visible: boolean;
  title: string;
  defaultText?: string;
  handleHide: () => void;
  handleSubmit: (name: { name: string }) => void;
};

export const ItemNameModal: React.FC<ItemNameModalProps> = ({
  visible,
  title,
  defaultText,
  handleHide,
  handleSubmit,
}) => {
  return (
    <Modal
      title={title}
      centered={true}
      closable={true}
      maskClosable={false}
      visible={visible}
      onCancel={handleHide}
      footer={null}
      width={400}
      destroyOnClose
    >
      <Form onFinish={handleSubmit}>
        <Form.Item
          name={"name"}
          rules={[
            {
              required: true,
              message: "Folder name cannot be empty",
              type: "string",
            },
          ]}
          initialValue={defaultText}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
