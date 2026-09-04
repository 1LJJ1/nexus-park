import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
export default function Surrender() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Card>
        <Button onClick={handleGoBack}>返回</Button>
      </Card>
    </>
  );
}
