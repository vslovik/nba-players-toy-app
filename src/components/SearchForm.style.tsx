import styled from 'styled-components';

export const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #444;
    margin-bottom: 1rem;
`;

export const Input = styled.input`
    background: #f5f6f7;
    padding: 0.5rem 1rem;
    border: 1px solid #ff9900;
    border-radius: 10px;
    display: block;
    margin: 0.3rem 1rem 0 0;
`;

export const Label = styled.label`
`;

export const Button = styled.button`
    background: #ff9900;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    margin-top: 4px;
`;