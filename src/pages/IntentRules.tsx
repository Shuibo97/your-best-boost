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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface IntentRule {
  id: string;
  question: string;
  department: string;
  action: string;
  purpose: string;
}

const IntentRules = () => {
  const [rules, setRules] = useState<IntentRule[]>([
    {
      id: "1",
      question: "本月工资批量发放失败，提示'账户信息有误'怎么办？",
      department: "薪酬组",
      action: "在群里拉入薪酬顾问",
      purpose: "紧急处理发放故障，确保员工工资按时到账",
    },
    {
      id: "2",
      question: "我想咨询一下最新的员工福利政策，特别是关于年度体检的部分。",
      department: "福利组",
      action: "分配给福利专员",
      purpose: "了解公司福利，为自己和家人做计划",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<IntentRule | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    department: "",
    action: "",
    purpose: "",
  });

  const handleAdd = () => {
    setEditingRule(null);
    setFormData({ question: "", department: "", action: "", purpose: "" });
    setIsOpen(true);
  };

  const handleEdit = (rule: IntentRule) => {
    setEditingRule(rule);
    setFormData({
      question: rule.question,
      department: rule.department,
      action: rule.action,
      purpose: rule.purpose,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
    toast.success("规则已删除");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRule) {
      setRules(
        rules.map((rule) =>
          rule.id === editingRule.id ? { ...rule, ...formData } : rule
        )
      );
      toast.success("规则已更新");
    } else {
      const newRule: IntentRule = {
        id: Date.now().toString(),
        ...formData,
      };
      setRules([...rules, newRule]);
      toast.success("规则已添加");
    }
    
    setIsOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">意图规则示例</h3>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                新增规则
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? "编辑意图规则" : "新增意图规则"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="question">客户原始问题</Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    rows={3}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="department">转接部门 (意图)</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="action">对应动作</Label>
                  <Input
                    id="action"
                    value={formData.action}
                    onChange={(e) =>
                      setFormData({ ...formData, action: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">客户目的 (AI训练)</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    rows={2}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    {editingRule ? "保存更新" : "保存"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">客户原始问题 (示例)</TableHead>
                <TableHead>转接部门 (意图)</TableHead>
                <TableHead>对应动作</TableHead>
                <TableHead className="w-[25%]">客户目的 (AI训练)</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="whitespace-normal">
                    {rule.question}
                  </TableCell>
                  <TableCell>{rule.department}</TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell className="whitespace-normal">
                    {rule.purpose}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rule)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(rule.id)}
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
    </div>
  );
};

export default IntentRules;
