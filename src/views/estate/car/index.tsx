import { Card, Row, Input, Button } from 'antd';
import { useState } from 'react';
export default function Car() {
  const [keyword, setKeyword] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <>
      <Row>
        <Card style={{ width: '100%' }}>
          <div style={{ width: '300px', display: 'flex', alignItems: 'center' }}>
            <Input
              value={keyword}
              placeholder="输入车牌号，手机或者联系人"
              allowClear
              onChange={handleChange}
            ></Input>
            <Button style={{ marginLeft: '10px' }} type="primary">
              查询
            </Button>
          </div>
        </Card>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Card>表格(略)</Card>
      </Row>
    </>
  );
}
