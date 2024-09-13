import {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: fit-content;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

const PremiumButton=()=>{
    const navigate = useNavigate();
  

    const handleUpgrade = useCallback(() => {
        navigate('/subscription');
      }, [navigate]);

return(
    <>
        <Button onClick={handleUpgrade}>Upgrade to Premium</Button>
    </>
)
}

export default PremiumButton