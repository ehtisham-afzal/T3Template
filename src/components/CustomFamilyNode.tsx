"use client";

import { memo } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "./ui/card";
import { ShieldCheck, Signpost } from "lucide-react";
import { AdvancedNodeEditor } from "./UserNodeEditor";

interface FamilyMemberData {
  id : string;
  name: string;
  code?: string;
  status: "Living" | "Deceased";
  year?: string;
  image?: string;
}

function CustomFamilyNode({ data }: { data: FamilyMemberData }) {
  return (
    <Card className="relative min-w-[170px] justify-center p-4">
      <NodeToolbar>
        <AdvancedNodeEditor data={data}  />
      </NodeToolbar>
      <Handle type="target" position={Position.Top} className="h-2 w-2" />
      <div className="flex items-start gap-3">
        {data.image ? (
          <Avatar className="h-14 w-14 overflow-hidden">
            <AvatarImage src={data?.image} alt={data.name} />
            <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ) : null}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{data.name}</h3>
          </div>
          <div className="flex gap-1 text-xs">
            <span
              className={`flex w-fit flex-row items-center gap-1 rounded-full px-2 py-0.5 ${
                data.status === "Deceased"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {data.status === "Deceased" ? (
                <Signpost size={16} />
              ) : (
                <ShieldCheck size={14} />
              )}
              {data.year ? `${data.year} - ` : ""}
              {data.status}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="h-2 w-2" />
    </Card>
  );
}

export default memo(CustomFamilyNode);
