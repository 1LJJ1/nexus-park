import { Form, Input, Modal, Radio, type FormInstance } from 'antd';
import type { ComponentProps } from 'react';
import { memo } from 'react';

type Props = ComponentProps<typeof Modal> & {
  form: FormInstance<any>;
};
function EditLesseeUser(props: Props) {
  return (
    <Modal {...props}>
      <Form form={props.form}>
        <Form.Item label="客户名称" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="联系电话" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="经营状态" name="state">
          <Radio.Group
            options={[
              { value: 1, label: '营业中' },
              { value: 2, label: '暂停营业' },
              { value: 3, label: '已关闭' },
            ]}
          />
        </Form.Item>
        <Form.Item label="所属行业" name="business">
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="统一信用代码" name="creditCode">
          <Input />
        </Form.Item>
        <Form.Item label="工商注册号" name="industryNum">
          <Input />
        </Form.Item>
        <Form.Item label="组织结构代码" name="organizationCode">
          <Input />
        </Form.Item>
        <Form.Item label="法人名" name="legalPerson">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default memo(EditLesseeUser);
