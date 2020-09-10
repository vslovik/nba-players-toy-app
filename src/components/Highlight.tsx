import React, {FunctionComponent} from 'react';

type Props = {
    highlight: string
}

const escapeRegExp = (str = '') => (
    str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
);

export const Highlight: FunctionComponent<Props> = ({children, highlight}) => {

    const patt = new RegExp(`(${escapeRegExp(highlight)})`, 'i');
    const parts = String(children).split(patt);

    if (highlight)
        return (
            <React.Fragment>
                {parts.map((part, index) => {
                    return patt.test(part) ? <mark key={index}>{part}</mark> : part
                })}
            </React.Fragment>
        );

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
};

export default Highlight;
