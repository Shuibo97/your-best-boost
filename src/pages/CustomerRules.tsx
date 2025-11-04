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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface CustomerRule {
  id: string;
  customerId: string;
  binding: string;
  description: string;
}

const CustomerRules = () => {
  const [rules, setRules] = useState<CustomerRule[]>([
    {
      id: "1",
      customerId: "大客户A (ID: C001)",
      binding: "周主管 (个人)",
      description: "所有来自客户A的请求，优先分配给周主管",
    },
    {
      id: "2",
      customerId: "连锁集团B (ID: G005)",
      binding: "薪酬组 (技能组)",
      description: "集团B的所有薪酬问题，直接转接薪酬组",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<CustomerRule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerId: "",
    binding: "",
    description: "",
  });

  const handleAdd = () => {
    setEditingRule(null);
    setFormData({ customerId: "", binding: "", description: "" });
    setIsOpen(true);
  };

  const handleEdit = (rule: CustomerRule) => {
    setEditingRule(rule);
    setFormData({
      customerId: rule.customerId,
      binding: rule.binding,
      description: rule.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
    toast.success("客户规则已删除");
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
      const newRule: CustomerRule = {
        id: Date.now().toString(),
        ...formData,
      };
      setRules([...rules, newRule]);
      toast.success("规则已添加");
    }
    
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResult(searchQuery);
      toast.success("查询成功");
    } else {
      setSearchResult(null);
      toast.error("请输入查询内容");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            客户特殊分配规则
          </h3>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                新增客户规则
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? "编辑客户规则" : "新增客户规则"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customerId">客户标识 (ID或名称)</Label>
                  <Input
                    id="customerId"
                    value={formData.customerId}
                    onChange={(e) =>
                      setFormData({ ...formData, customerId: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="binding">绑定客服/技能组</Label>
                  <Input
                    id="binding"
                    value={formData.binding}
                    onChange={(e) =>
                      setFormData({ ...formData, binding: e.target.value })
                    }
                    placeholder="输入客服姓名或技能组名称"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">规则描述</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    {editingRule ? "保存更新" : "保存规则"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          为特定客户指定专属客服或服务组，实现VIP绑定。
        </p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户标识</TableHead>
                <TableHead>绑定客服/技能组</TableHead>
                <TableHead className="w-[35%]">规则描述</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">
                    {rule.customerId}
                  </TableCell>
                  <TableCell>{rule.binding}</TableCell>
                  <TableCell className="whitespace-normal">
                    {rule.description}
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          客户分配信息查看
        </h3>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="输入客户ID或名称进行查询..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            查询
          </Button>
        </div>

        {searchResult && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <p className="font-semibold">
              查询结果 for <span className="text-primary">{searchResult}</span>
            </p>
            <p className="mt-2">
              <strong>当前服务人员:</strong> 周主管
            </p>
            <p className="mt-1">
              <strong>后续协作人员 (预设):</strong> 薪酬顾问A (当涉及薪酬问题时)
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerRules;
