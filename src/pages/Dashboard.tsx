import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Inbox, Clock, RefreshCw, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "今日请求总数",
      value: "1,280",
      icon: Inbox,
      colorClass: "bg-primary/10 text-primary",
    },
    {
      title: "待处理",
      value: "32",
      icon: Clock,
      colorClass: "bg-warning/10 text-warning",
    },
    {
      title: "处理中",
      value: "125",
      icon: RefreshCw,
      colorClass: "bg-success/10 text-success",
    },
    {
      title: "已完成",
      value: "1,123",
      icon: CheckCircle,
      colorClass: "bg-stat-indigo/10 text-stat-indigo",
    },
  ];

  const recentAllocations = [
    {
      id: "REQ-001280",
      customer: "张三",
      intent: "产品咨询",
      assignedTo: "李客服 (售前组)",
      time: "2分钟前",
      status: "processing",
    },
    {
      id: "REQ-001279",
      customer: "李四",
      intent: "技术支持",
      assignedTo: "王工程师 (技术组)",
      time: "5分钟前",
      status: "completed",
    },
    {
      id: "REQ-001278",
      customer: "王五",
      intent: "售后服务",
      assignedTo: "赵客服 (售后组)",
      time: "10分钟前",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      processing: { label: "处理中", variant: "default" },
      completed: { label: "已完成", variant: "secondary" },
      pending: { label: "待处理", variant: "outline" },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          最新分配历史
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>请求ID</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>识别意图</TableHead>
                <TableHead>分配至</TableHead>
                <TableHead>时间</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">{allocation.id}</TableCell>
                  <TableCell>{allocation.customer}</TableCell>
                  <TableCell>{allocation.intent}</TableCell>
                  <TableCell>{allocation.assignedTo}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {allocation.time}
                  </TableCell>
                  <TableCell>{getStatusBadge(allocation.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
