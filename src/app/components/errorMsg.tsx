import { ErrorMsgComp } from "@/types";
import React from "react";

function ErrorMsg({ msg }: ErrorMsgComp) {
  return (
    <div className="bg-rose-700 text-white rounded-md text-center p-3 mb-5">
      <p>{msg}</p>
    </div>
  );
}

export default ErrorMsg;
