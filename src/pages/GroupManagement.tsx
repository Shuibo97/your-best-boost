import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Users as UsersIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SkillGroup {
  id: string;
  name: string;
  members: string[];
}

interface Staff {
  id: string;
  name: string;
  group: string;
  status: "online" | "offline";
}

const GroupManagement = () => {
  const [groups, setGroups] = useState<SkillGroup[]>([
    { id: "1", name: "默认组", members: ["李客服", "赵客服"] },
    { id: "2", name: "薪酬组", members: ["薪酬顾问A", "薪酬顾问B"] },
    { id: "3", name: "社保组", members: ["社保专员C"] },
  ]);

  const [staff] = useState<Staff[]>([
    { id: "1", name: "薪酬顾问A", group: "薪酬组", status: "online" },
    { id: "2", name: "薪酬顾问B", group: "薪酬组", status: "online" },
    { id: "3", name: "社保专员C", group: "社保组", status: "offline" },
    { id: "4", name: "李客服", group: "默认组", status: "online" },
    { id: "5", name: "赵客服", group: "默认组", status: "offline" },
  ]);

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id));
    toast.success("技能组已删除");
  };

  const getStatusBadge = (status: "online" | "offline") => {
    return status === "online" ? (
      <Badge variant="default" className="bg-success">在线</Badge>
    ) : (
      <Badge variant="secondary">离线</Badge>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">技能组管理</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新增技能组
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>技能组名称</TableHead>
                <TableHead>组成员</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.members.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      管理成员
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          客服人员列表
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>所属技能组</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.group}</TableCell>
                  <TableCell>{getStatusBadge(person.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default GroupManagement;
