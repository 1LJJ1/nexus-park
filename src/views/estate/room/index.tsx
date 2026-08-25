import { Card, Row, Col, Radio, Image, message, Spin, type RadioChangeEvent } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import style from './index.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { getRoomListAPI } from '@/api/estate/room.api';
import type { RoomItem } from '@/api/estate/room.api';
export default function Room() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [list, setList] = useState<RoomItem[]>([]);
  const [previewImgUrl, setPreviewImgUrl] = useState<string>('');
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [currTab, setCurrTab] = useState<string>('Apple');
  const [messageApi, contextHolder] = message.useMessage();
  const optionsWithDisabled: CheckboxGroupProps<string>['options'] = [
    { label: 'Apple', value: 'Apple', className: 'label-1' },
    { label: 'Pear', value: 'Pear', className: 'label-2' },
  ];
  const handleChange = (e: RadioChangeEvent) => {
    setCurrTab(e.target.value);
  };

  const handlePreview = (e: React.MouseEvent<HTMLAnchorElement>, item: RoomItem) => {
    e.stopPropagation();
    setPreviewVisible(true);
    setPreviewImgUrl(item.src);
  };
  const fetchData = useCallback(
    async (currTab: string) => {
      console.log(currTab);
      try {
        setPageLoading(true);
        const res = await getRoomListAPI();
        setPageLoading(false);
        if (res.code !== 200) return messageApi.error(res.message);
        setList(res.data.rooms);
      } catch (err) {
        console.error(err, '获取房间列表失败');
        setPageLoading(false);
      }
    },
    [messageApi]
  );
  useEffect(() => {
    const loadData = () => {
      fetchData(currTab);
    };
    loadData();
  }, [fetchData, currTab]);
  return (
    <>
      <Spin spinning={pageLoading} description="房间数据加载中...">
        {contextHolder}
        {previewImgUrl && (
          <Image
            style={{ display: 'none' }}
            src={previewImgUrl}
            preview={{
              open: previewVisible,
              onOpenChange: setPreviewVisible,
            }}
          />
        )}
        <Row>
          <Card style={{ width: '100%' }}>
            <Radio.Group
              options={optionsWithDisabled}
              optionType="button"
              buttonStyle="solid"
              value={currTab}
              onChange={handleChange}
            />
          </Card>
        </Row>
        <Row style={{ marginTop: '20px' }} gutter={[22, 16]}>
          {list.map((item, index) => (
            <Col key={index}>
              <Card
                title="房间号"
                extra={<a onClick={(e) => handlePreview(e, item)}>户型图</a>}
                style={{ width: 317 }}
              >
                <h3 style={{ textAlign: 'center', fontSize: '18px' }}>{item.roomNumber}</h3>
                <div>
                  <div className={style.line}>
                    <span>装修情况</span>
                    <span>{item.decorationType}</span>
                  </div>
                  <div className={style.line}>
                    <span>房间面积</span>
                    <span>{item.area}</span>
                  </div>
                  <div className={style.line}>
                    <span>出租单间</span>
                    <span>{item.unitPrice}</span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
}
