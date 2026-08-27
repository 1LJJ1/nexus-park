import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
export default function Surrender() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const navigate = useNavigate();
  const handleGoBack = () => {
    const params = new URLSearchParams();
    params.append('query', JSON.stringify(query));
    navigate({
      pathname: '/finance/contract',
      search: params.toString(),
    });
  };
  return (
    <>
      <Card>
        <Button onClick={handleGoBack}>返回</Button>
      </Card>
    </>
  );
}
