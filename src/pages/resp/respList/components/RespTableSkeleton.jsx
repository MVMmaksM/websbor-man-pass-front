import ContentLoader from "react-content-loader";
import React from 'react';

export const RespTableSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            style={{ width: '100%', height: 'auto' }}
            height="100%"
            backgroundColor="#cddcebff"
            foregroundColor="#e9ecef"
        >

            <rect x="45" y="20" rx="4" ry="4" width="50px" height="12" />
            <rect x="150" y="20" rx="4" ry="4" width="70px" height="12" />
            <rect x="250" y="20" rx="4" ry="4" width="470px" height="12" />
            <rect x="750" y="20" rx="4" ry="4" width="370px" height="12" />
            <rect x="1152" y="20" rx="4" ry="4" width="180px" height="12" />
            <rect x="1350" y="20" rx="4" ry="4" width="210px" height="12" />
            <rect x="1580" y="20" rx="4" ry="4" width="210px" height="12" />

            <rect x="45" y="60" rx="4" ry="4" width="50px" height="12" />
            <rect x="150" y="60" rx="4" ry="4" width="70px" height="12" />
            <rect x="250" y="60" rx="4" ry="4" width="470px" height="12" />
            <rect x="750" y="60" rx="4" ry="4" width="370px" height="12" />
            <rect x="1152" y="60" rx="4" ry="4" width="180px" height="12" />
            <rect x="1350" y="60" rx="4" ry="4" width="210px" height="12" />
            <rect x="1580" y="60" rx="4" ry="4" width="210px" height="12" />

            {/* Строки таблицы (6 строк) */}
            {Array.from({ length: 6 }).map((_, index) => {
                const y = 50 + index * 30;
                return (
                    <React.Fragment key={index}>
                        <rect x="45" y="20" rx="4" ry="4" width="50px" height="12" />
                        <rect x="150" y="20" rx="4" ry="4" width="70px" height="12" />
                        <rect x="250" y="20" rx="4" ry="4" width="470px" height="12" />
                        <rect x="750" y="20" rx="4" ry="4" width="370px" height="12" />
                        <rect x="1152" y="20" rx="4" ry="4" width="180px" height="12" />
                        <rect x="1350" y="20" rx="4" ry="4" width="210px" height="12" />
                        <rect x="1580" y="20" rx="4" ry="4" width="210px" height="12" />
                    </React.Fragment>
                );
            })}



        </ContentLoader>
    )
}