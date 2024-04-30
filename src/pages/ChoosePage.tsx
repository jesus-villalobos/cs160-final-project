import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ChoosePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="ChoosePageBody">
            <Title level={1} className="ChoosePageTitle">What would you like to do?</Title>
            <div className="ChoosePageButtons">
                <Button type="primary" onClick={() => handleNavigate('/chat-maker')} className="ChooseButton">
                    Create a Survey
                </Button>
                <Button type="primary" onClick={() => handleNavigate('/chat-taker')} className="ChooseButton">
                    Take a Survey
                </Button>
            </div>
        </div>
    );
};

export default ChoosePage;
