import React from "react";

export default function Error({children}) {
    return <>
        <span className="error-span text-danger">{children}</span>

        <style jsx>{`
            .error-span {
                font-size: 13px;
                margin-top: -20px;
                margin-bottom: 4px;
                display: block;
                text-align: left;
            }
        `}
        </style>
    </>
}