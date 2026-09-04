import { Card, Form, Input, Button, Table, Tag, Pagination, Spin } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getContractListAPI } from '@/api/finance/finance.api';
import type { ContractListQuery, ContractItem } from '@/api/finance/finance.api';
import { useEffect } from 'react';

export default function Contract() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const query: ContractListQuery = {
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    contractNo: searchParams.get('contractNo') || undefined,
    person: searchParams.get('person') || undefined,
    tel: searchParams.get('tel') || undefined,
  };
  const setQuery = (partial: Partial<ContractListQuery>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (partial.page !== undefined) {
        params.set('page', String(partial.page));
      }
      if (partial.pageSize !== undefined) params.set('pageSize', String(partial.pageSize));

      (['contractNo', 'person', 'tel'] as const).forEach((key) => {
        const val = partial[key];
        if (val !== undefined && val !== null && val !== '') {
          params.set(key, val);
        } else if (key in partial) {
          params.delete(key);
        }
      });
      return params;
    });
  };
  const fetchData = async (context: QueryFunctionContext<['contractList', ContractListQuery]>) => {
    console.log('请求一次', context);
    const { queryKey } = context;
    const res = await getContractListAPI(queryKey[1]);
    if (res.code !== 200) throw new Error(res.message || '获取合同列表失败');
    return res;
  };
  const { data, isFetching } = useQuery({
    queryKey: ['contractList', query],
    queryFn: fetchData,
  });
  const tableData = data?.data?.list ?? [];
  const total = data?.data?.total ?? 0;

  useEffect(() => {
    form.setFieldsValue({
      contractNo: query.contractNo ?? '',
      person: query.person ?? '',
      tel: query.tel ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 查询
  const handleSearch = () => {
    const value = form.getFieldsValue();
    setQuery({ page: 1, pageSize: query.pageSize, ...value });
  };
  // 重置
  const handleReset = () => {
    form.resetFields();
    const value = form.getFieldsValue();
    setQuery({ page: 1, pageSize: 10, ...value });
  };
  // 分页
  const handlePageChange = (page: number, pageSize: number) => {
    const value = form.getFieldsValue();
    if (pageSize !== query.pageSize) {
      setQuery({ page: 1, pageSize, ...value });
    } else {
      setQuery({ page, pageSize, ...value });
    }
  };
  const handleGoDetail = (item: ContractItem) => {
    navigate({ pathname: '/finance/surrender', search: `?contractNo=${item.contractNo}` });
  };
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
      render(row: ContractItem) {
        return (
          <Button type="primary" size="small" onClick={() => handleGoDetail(row)}>
            合同详情
          </Button>
        );
      },
    },
  ];
  return (
    <Spin spinning={isFetching}>
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
        onChange={handlePageChange}
      />
    </Spin>
  );
}
