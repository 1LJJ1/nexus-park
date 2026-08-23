import { Col, Row, Card, message, Progress, Statistic, Timeline, Tag } from 'antd';
import { RightCircleTwoTone } from '@ant-design/icons';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useEcharts } from '@/hooks/useEcharts';
import {
  getEnergyInfo,
  getEnterpriseQualifications,
  getLeaseInfo,
} from '@/api/dashboard/dashboard.api';
import type { EnergyInfo, LeaseInfo } from '@/api/dashboard/dashboard.api';
import type { EChartsOption } from 'echarts';
export default function DashBoard() {
  const [energyData, setEnergyData] = useState<EnergyInfo[]>([]); // 能源消耗数据
  const [enterpriseData, setEnterpriseData] = useState<EnergyInfo[]>([]); // 企业资质数据
  const [leaseData, setLeaseData] = useState<LeaseInfo[]>([]); // 租赁情况数据
  const [messageApi, contextHolder] = message.useMessage();
  // 获取dom容器
  const lineChartRef = useRef<HTMLDivElement>(null); // 能源
  const barChartRef = useRef<HTMLDivElement>(null); // 企业资质
  const pieChartRef = useRef<HTMLDivElement>(null); // 租赁情况
  const { renderChart: lineCharRender } = useEcharts(lineChartRef, {
    autoResize: true,
  });
  const { renderChart: barCharRender } = useEcharts(barChartRef, {
    autoResize: true,
  });
  const { renderChart: pieChartRender } = useEcharts(pieChartRef, {
    autoResize: true,
  });
  const cardData = [
    {
      number: 12329,
      desc: '园区总面积',
      icon: <RightCircleTwoTone style={{ fontSize: '28px', color: '#08c' }} />,
    },
    {
      number: 12329,
      desc: '园区总面积',
      icon: <RightCircleTwoTone style={{ fontSize: '28px', color: '#08c' }} />,
    },
    {
      number: 12329,
      desc: '园区总面积',
      icon: <RightCircleTwoTone style={{ fontSize: '28px', color: '#08c' }} />,
    },
    {
      number: 12329,
      desc: '园区总面积',
      icon: <RightCircleTwoTone style={{ fontSize: '28px', color: '#08c' }} />,
    },
  ];
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getEnergyInfo();
        if (res.code !== 200) return messageApi.error(res.message);
        const energySeries = res.data.map((item) => {
          return {
            name: item.name,
            type: 'line',
            data: item.data,
          };
        });
        setEnergyData(energySeries);
      } catch (err) {
        console.error(err, '获取能源信息失败');
      }
    };
    loadData();
  }, [messageApi]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getLeaseInfo();
        if (res.code !== 200) return messageApi.error(res.message);
        setLeaseData(res.data);
      } catch (err) {
        console.error(err, '获取能源信息失败');
      }
    };
    loadData();
  }, [messageApi]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getEnterpriseQualifications();
        if (res.code !== 200) return messageApi.error(res.message);
        const enterpriseSeries = res.data.map((item) => {
          return {
            name: item.name,
            type: 'bar',
            data: item.data,
          };
        });
        setEnterpriseData(enterpriseSeries);
      } catch (err) {
        console.error(err, '获取企业资质信息失败');
      }
    };
    loadData();
  }, [messageApi]);

  useEffect(() => {
    const initalOption: EChartsOption = {
      title: {
        text: '当日能源消耗',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: energyData.map((item) => item.name),
      },
      grid: {
        left: '%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0：00', '4：00', '8：00', '12：00', '16：00', '20：00', '24：00'],
      },
      yAxis: {
        type: 'value',
      },
      series: energyData,
    };
    lineCharRender(initalOption);
  }, [energyData, lineCharRender]);

  useEffect(() => {
    const initalOption: EChartsOption = {
      legend: {
        top: '10px',
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: leaseData,
        },
      ],
    };
    pieChartRender(initalOption);
  }, [leaseData, pieChartRender]);

  useEffect(() => {
    const initalOption: EChartsOption = {
      title: {
        text: '企业资质情况(家)',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['2014', '2016', '2018', '2020', '2022', '2024'],
      },
      yAxis: {
        type: 'value',
      },
      series: enterpriseData,
    };
    barCharRender(initalOption);
  }, [enterpriseData, barCharRender]);

  return (
    <>
      {contextHolder}
      <Row gutter={16}>
        {cardData.map((item, index) => (
          <Col span={6} key={index}>
            <Card>
              <div className={style.cardContent}>
                <div className={style.left}>
                  <div className={style.cardNumber}>{item.number}</div>
                  <div className={style.cardDesc}>{item.desc}</div>
                </div>
                {item.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="能源消耗情况">
            <div ref={lineChartRef} style={{ width: '100%', height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="企业资质情况">
            <div ref={barChartRef} style={{ flex: 1, height: '300px' }}></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="租赁情况">
            <div ref={pieChartRef} style={{ width: '100%', height: '300px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="充电桩空闲统计">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
              }}
            >
              <Progress type="circle" percent={75} />
              <Statistic title="总充电桩数" value={75} suffix="/ 100" />
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="实时车辆信息" style={{ height: '406px' }}>
            <Timeline
              items={[
                {
                  children: (
                    <>
                      <Tag color="green">进场</Tag>08:24车辆 京A66666
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Tag color="red">出场</Tag>09:15 车辆 京A66666{' '}
                    </>
                  ),
                  color: 'red',
                },
                {
                  children: (
                    <>
                      <Tag color="green">进场</Tag>09:22 车辆 京A23456{' '}
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Tag color="red">出场</Tag>10:43 车辆 京A18763{' '}
                    </>
                  ),
                  color: 'red',
                },
                {
                  children: (
                    <>
                      <Tag color="green">进场</Tag>13:38 车辆 京A88888{' '}
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Tag color="green">进场</Tag>14:46 车辆 京A23456{' '}
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
