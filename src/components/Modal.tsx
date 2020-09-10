import React, {FunctionComponent, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop,
} from './Modal.style';

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
}

export const Modal: FunctionComponent<ModalProps> = ({isShown, hide, modalContent, headerText}) => {

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.keyCode === 27 && isShown) {
            hide();
        }
    }, [hide, isShown]);

    useEffect(() => {
        isShown
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "unset");
        document.addEventListener("keydown", onKeyDown, false);
        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        };
    }, [isShown, onKeyDown]);

    const modal = (
        <React.Fragment>
            <Backdrop onClick={hide}/>
            <Wrapper aria-modal aria-labelledby={headerText} tabIndex={-1} role="dialog">
                <StyledModal>
                    <Header>
                        <HeaderText>{headerText}</HeaderText>
                        <CloseButton onClick={hide}>x</CloseButton>
                    </Header>
                    <Content>{modalContent}</Content>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};