import React from 'react';
import "./style.scss";

export default class ChartWrapper extends React.Component {
    render() {
        let { inRow, chartStyle } = this.props;
        if (!inRow) inRow = 1;
        if (!chartStyle) chartStyle = {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            minHeight: "300px",
            minWidth: "400px"
        };

        return <div className={"chart-wrapper"} style={{flexBasis: (100/inRow) + '%'}}>
            {!!this.props.children && React.Children.map(this.props.children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {style: chartStyle});
                } return child;
            })}
        </div>;
    }
}