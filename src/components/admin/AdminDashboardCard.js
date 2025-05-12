import styled from "styled-components";

const Card = styled.div`
  padding: 24px;
  margin-bottom: 24px;
  min-width: 300px;
  width: 320px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #fff;
  border-radius: 8px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.16);
  }
`;
const Title = styled.h6`
  margin-bottom: 8px;
  font-size: 1.25rem;
`;
const Desc = styled.p`
  color: #666;
`;

function AdminDashboardCard({ title, description, onClick }) {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </Card>
  );
}

export default AdminDashboardCard;
