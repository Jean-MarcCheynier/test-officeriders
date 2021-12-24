import React from "react";
import { Button, Card } from "react-bootstrap";

export interface IMyComponentProps {
    name: string;
    showContent: boolean;
    content: string;
    showButton: boolean;
    onButtonClicked: any;
}

const MyComponent: React.FC<IMyComponentProps> = ({name, showButton, onButtonClicked, showContent, content, children}) => {
    const handleOnClick = () => {
        onButtonClicked()
    }

    return <Card>
        <Card.Body>        
            <h1>{name}</h1>
            { showContent && <p>{ content}</p> }
            {showButton && <Button onClick={handleOnClick}>Click me</Button>}
            { children}
        </Card.Body>
    </Card>
}

export default MyComponent;