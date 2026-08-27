import { Card, Form, Input, Button, Table, Tag, Pagination } from 'antd';
import type { TableProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getContractListAPI } from '@/api/finance/finance.api';
import type { ContractListQuery, ContractItem } from '@/api/finance/finance.api';
const columns: TableProps<ContractItem>['columns'] = [
  {
    title: 'No.',
    key: 'index',
    render(_value, _record, index) {
      return index + 1;
    },
  },
  {
    title: '合同编号',
    dataIndex: 'contractNo',
    key: 'contractNo',
  },
  {
    title: '合同类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '合同名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '合同开始日期',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: '合同结束如期',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: '甲方',
    dataIndex: 'jia',
    key: 'jia',
  },
  {
    title: '乙方',
    dataIndex: 'yi',
    key: 'yi',
  },
  {
    title: '审批状态',
    dataIndex: 'status',
    key: 'status',
    render(value) {
      if (value == 1) {
        return <Tag>未审批</Tag>;
      } else if (value == 2) {
        return <Tag color="green">审批通过</Tag>;
      } else {
        return <Tag color="red">审批拒绝</Tag>;
      }
    },
  },
  {
    title: '操作',
    key: 'operate',
    render() {
      return (
        <Button type="primary" size="small">
          合同详情
        </Button>
      );
    },
  },
];
export default function Contract() {
  const [tableData, setTableData] = useState<ContractItem[]>([]);
  const [query, setQuery] = useState<ContractListQuery>({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const fetchData = useCallback(async () => {
    try {
      const res = await getContractListAPI(query);
      setTableData(res.data.list);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err, '获取合同列表失败');
    }
  }, [query]);
  // 查询
  const handleSearch = () => {
    const value = form.getFieldsValue();
    setQuery((prev) => ({
      ...prev,
      ...value,
      page: 1,
    }));
  };
  // 重置
  const handleReset = () => {
    setQuery({
      page: 1,
      pageSize: 10,
    });
  };
  const handleChange = (page: number, pageSize: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };
  useEffect(() => {
    const loadData = () => {
      fetchData();
    };
    loadData();
  }, [fetchData]);
  return (
    <>
      <Card>
        <Form form={form} layout="inline">
          <Form.Item label="合同编号" name="contractNo">
            <Input placeholder="请输入企业名称" allowClear />
          </Form.Item>
          <Form.Item label="联系人" name="person">
            <Input placeholder="请输入联系人" allowClear />
          </Form.Item>
          <Form.Item label="联系电话" name="tel">
            <Input placeholder="请输入联系电话" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={handleReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <Table dataSource={tableData} columns={columns} pagination={false} rowKey="contractNo" />
      </Card>
      <Pagination
        current={query.page}
        pageSize={query.pageSize}
        total={total}
        onChange={handleChange}
      />
      ;
    </>
  );
}
