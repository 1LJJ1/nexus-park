import { Card, Form, Input, Button, Table, message, Tag, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getLesseeUserListAPI } from '@/api/lesseeUser/lesseeUser.api';
import type { LesseeUserListReq, LesseeUserItem } from '@/api/lesseeUser/lesseeUser.api';
import FormModal from './formModal.tsx';
export default function LesseeUserList() {
  const [tableData, setTableData] = useState<LesseeUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectRows, setSelectRows] = useState<LesseeUserItem[]>([]);
  const [query, setQuery] = useState<LesseeUserListReq>({
    companyName: '',
    contact: '',
    phone: '',
    page: 1,
    pageSize: 10,
  });
  const [formEdit] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<LesseeUserItem | null>(null);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const rowSelection: TableProps<LesseeUserItem>['rowSelection'] = {
    onChange: (_: React.Key[], selectedRows: LesseeUserItem[]) => {
      setSelectRows(selectedRows);
    },
  };
  const tableColumns: TableProps<LesseeUserItem>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_, _record, index) {
        return index + 1;
      },
    },
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      render(value) {
        if (value == 1) {
          return <Tag color="green">营业中</Tag>;
        } else if (value == 2) {
          return <Tag color="#f50">暂停营业</Tag>;
        } else if (value == 3) {
          return <Tag color="red">已关闭</Tag>;
        }
      },
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
    },
    {
      title: '所属行业',
      dataIndex: 'business',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '统一信用代码',
      dataIndex: 'creditCode',
    },
    {
      title: '工商注册号',
      dataIndex: 'industryNum',
    },
    {
      title: '组织机构代码',
      dataIndex: 'organizationCode',
    },
    {
      title: '法人名',
      dataIndex: 'legalPerson',
    },
    {
      title: '操作',
      render: (row: LesseeUserItem) => {
        return (
          <>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: '10px' }}
              onClick={() => handleEdit(row)}
            >
              编辑
            </Button>
            <Popconfirm
              title="二次确认"
              description="确认删除该数据?"
              onConfirm={() => handleDelete(row)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const fetchData = useCallback(
    async (params: LesseeUserListReq) => {
      setLoading(true);
      try {
        const res = await getLesseeUserListAPI(params);
        if (res.code !== 200) return messageApi.error(res.message);
        setTableData(res.data.list);
        setTotal(res.data.total);
      } finally {
        setLoading(false);
      }
    },
    [messageApi]
  );

  const handleSearch = () => {
    const value = form.getFieldsValue();
    setQuery((prev) => ({
      page: 1,
      pageSize: prev.pageSize,
      ...value,
    }));
  };
  const handleEdit = (row: LesseeUserItem) => {
    formEdit.setFieldsValue(row);
    setCurrentRow(row);
    setVisible(true);
  };
  const handleAdd = () => {
    setCurrentRow(null);
    setVisible(true);
  };
  const handleDelete = (row: LesseeUserItem) => {
    const newTableData = tableData.filter((item) => item.id !== row.id);
    messageApi.success('删除成功！');
    setTableData(newTableData);
    handleRefresh();
  };
  const handleBranchDelete = () => {
    console.log('批量删除', selectRows);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    if (currentRow) {
      console.log('编辑', formEdit.getFieldsValue());
      setTimeout(() => {
        console.log('编辑完成');
        setConfirmLoading(false);
        setVisible(false);
      }, 3000);
    } else {
      console.log('新增', formEdit.getFieldsValue());
      setTimeout(() => {
        console.log('新增完成');
        setConfirmLoading(false);
        setVisible(false);
      }, 3000);
    }
  };
  const handleCancel = () => {
    setVisible(false);
    formEdit.resetFields();
  };
  const handleReset = () => {
    form.resetFields();
    setQuery({
      companyName: '',
      contact: '',
      phone: '',
      page: 1,
      pageSize: 10,
    });
  };
  const handleTableChange = (pagination: any) => {
    const value = form.getFieldsValue();
    setQuery({
      ...value,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  // 刷新
  const handleRefresh = () => {
    setQuery((prev) => ({
      ...prev,
    }));
  };
  useEffect(() => {
    const run = async () => {
      await fetchData(query);
    };

    run().catch((err) => {
      console.error('列表加载失败', err);
    });
  }, [query, fetchData]);

  return (
    <>
      {contextHolder}
      <Card>
        <Form form={form} layout="inline">
          <Form.Item name="companyName" label="企业名称">
            <Input placeholder="企业名称" allowClear />
          </Form.Item>
          <Form.Item name="contact" label="联系人">
            <Input placeholder="联系人" allowClear />
          </Form.Item>
          <Form.Item name="phone" label="联系电话">
            <Input placeholder="联系电话" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ margin: '0 10px' }} onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" style={{ marginRight: '10px' }} onClick={handleAdd}>
            新增企业
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleBranchDelete}
            disabled={selectRows.length === 0}
          >
            批量删除
          </Button>
        </div>
      </Card>
      <Card style={{ marginTop: '10px' }}>
        <Table<LesseeUserItem>
          columns={tableColumns}
          dataSource={tableData}
          loading={loading}
          rowKey="id"
          pagination={{
            current: query.page,
            pageSize: query.pageSize,
            total: total,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (sum) => `共 ${sum} 条`,
          }}
          onChange={handleTableChange}
          rowSelection={{ type: 'checkbox', ...rowSelection }}
        />
      </Card>
      <FormModal
        open={visible}
        title={currentRow ? '编辑' : ' 新增'}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        width={{
          xxl: '40%',
          xl: '45%',
          lg: '55%',
          md: '70%',
          sm: '85%',
          xs: '100%',
        }}
        form={formEdit}
      ></FormModal>
    </>
  );
}
