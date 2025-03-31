"use client"
import React from "react";
import Line from "./Line";
import data from "../../app/data/data";
import styles from "../../app/Assets.module.css";

type Props = {
    parcelX: number;
    parcelY: number;
    parcelID: number;
    scale: number;
};

const Bed = ({ parcelX, parcelY, parcelID, scale }: Props) => {

    return (
        <section className=" ml-5 z-10">
            <div className="flex flex-col">

{/* //BorderTopGlobal */}
                <div className="flex mt-5">
{/* //BorderTopLeft */}
                    <div className={`${styles.parcelBorderTopLeft} `}
                        style={{
                            width: scale * 0.1,
                            height: scale * 0.1
                        }}></div>

{/* //BorderTop */}
<div className={`${styles.parcelBorderTop} `}
                        style={{
                            width: parcelY * scale,
                            height: scale * 0.1
                        }}></div>

{/* //BorderTopRight */}
<div className={`${styles.parcelBorderTopRight} `}
                        style={{
                            width: scale * 0.1,
                            height: scale * 0.1
                        }}></div>
                </div>

                        <div className="flex">

{/* //BorderLeft */}
<div className={`${styles.parcelBorderLeft} `}
                        style={{
                            width: 0.1 * scale,
                            height: parcelX * scale
                        }}></div>


{/* //MainCore */}

                <div
                    className={`${styles.parcelBackground} flex flex-col justify-around`}
                    style={{
                        height: parcelX * scale,
                        width: parcelY * scale,
                    }}
                    >
                    {
                        data.lines.map((line) => (
                            line.parcelId === parcelID ? (
                                <Line
                                    key={line.id}
                                    line={line}
                                    lineX={line.length}
                                    lineStatus={line.status}
                                    // handleClick={handleClick}
                                    scale={scale} />
                                ) : null
                            ))
                        }
                    {/* <p>id : {parcel.id} length : {parcel.length} width : {parcel.width}</p> */}
                </div>

{/* //BorderRight */}
<div className={`${styles.parcelBorderRight} `}
                        style={{
                            width: 0.1 * scale,
                            height: parcelX * scale
                        }}></div>

                        </div>
{/* //BorderBottomGlobal */}
                <div className="flex">

{/* //BorderBottomLeft */}
<div className={`${styles.parcelBorderBottomLeft} `}
                        style={{
                            width: scale * 0.1,
                            height: scale * 0.1
                        }}></div>

{/* //BorderBottom */}
<div className={`${styles.parcelBorderBottom} `}
                        style={{
                            width: parcelY * scale,
                            height: scale * 0.1
                        }}></div>

{/* //BorderBottomRight */}
<div className={`${styles.parcelBorderBottomRight} `}
                        style={{
                            width: scale * 0.1,
                            height: scale * 0.1
                        }}></div>

                </div>
            </div>
        </section>
    );
};

export default Bed;