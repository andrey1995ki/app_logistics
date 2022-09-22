import React from "react";

export interface SplitterProps {
    rowRef: React.Ref<object>
    setSize: (size: { app: string, map: string }) => void
}