import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Request {
  id: string;
  customer: string;
  intent: string;
  status: string;
  history: string;
  collaborators: string;
}

const RequestHistory = () => {
  const [requests] = useState<Request[]>([
    {
      id: "REQ-001278",
      customer: "王五",
      intent: "复杂售后",
      status: "resolved",
      history: "售后组 -> 技术专家组",
      collaborators: "孙技术, 陈专家",
    },
    {
      id: "REQ-001277",
      customer: "张三",
      intent: "产品咨询",
      status: "completed",
      history: "售前组",
      collaborators: "李客服",
    },
    {
      id: "REQ-001276",
      customer: "李四",
      intent: "技术支持",
      status: "processing",
      history: "技术组 -> 高级工程师",
      collaborators: "王工程师, 张工程师",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      resolved: { label: "已解决", variant: "secondary" },
      completed: { label: "已完成", variant: "secondary" },
      processing: { label: "处理中", variant: "default" },
    };
    
    const statusInfo = statusMap[status] || statusMap.processing;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="animate-fade-in">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          客户请求历史与协作查询
        </h3>
        <div className="flex space-x-4 mb-4">
          <Input
            type="text"
            placeholder="搜索请求ID、客户名..."
            className="flex-1"
          />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            搜索
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>请求ID</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>意图</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>分配历史</TableHead>
                <TableHead>协作人员 (建群)</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.customer}</TableCell>
                  <TableCell>{request.intent}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.history}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.collaborators}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      查看详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RequestHistory;
