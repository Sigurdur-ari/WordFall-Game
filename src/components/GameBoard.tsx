"use client"

import React from "react"

export default function GameBoard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col content-center items-center bg-yellow-100 h-150 w-5xl gap-10">
            {children}
        </div>
    )
}